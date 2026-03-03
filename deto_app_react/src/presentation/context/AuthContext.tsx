import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAuthToken } from '../../data/sources/remote/api/axiosClient';
import { UsuarioRepository } from '../../data/repositories/UsuarioRepository';
import { loginUseCase, registerUseCase } from '../../domain/useCases/authUseCases';
import { Usuario } from '../../domain/entities/entities';

const repo = new UsuarioRepository();
const doLogin = loginUseCase(repo);
const doRegister = registerUseCase(repo);

interface AuthContextValue {
  token: string | null;
  user: Usuario | null;
  isLoading: boolean;
  login(correo: string, contraseña: string): Promise<void>;
  register(nombre: string, correo: string, contraseña: string, descripcion?: string): Promise<void>;
  logout(): Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<Usuario | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const savedToken = await AsyncStorage.getItem('authToken');
        if (savedToken) {
          setAuthToken(savedToken);
          setToken(savedToken);
        }

        const id = await AsyncStorage.getItem('userId');
        if (id) {
          const u = await repo.getProfile(Number(id));
          setUser({ ...u, token: savedToken ?? undefined });
        }
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);
  async function login(correo: string, contraseña: string) {
    const usuario = await doLogin(correo, contraseña);
    await AsyncStorage.setItem('userId', String(usuario.usuario_id));

    if (usuario.token) setAuthToken(usuario.token);
    await AsyncStorage.setItem('authToken', usuario.token ?? '');

    setUser(usuario);
  }

  async function register(nombre: string, correo: string, contraseña: string, descripcion?: string) {
    await doRegister(nombre, correo, contraseña, descripcion);
  }

  async function logout() {
    setAuthToken(null);
    await AsyncStorage.multiRemove(['userId', 'authToken']);
    setToken(null);
    setUser(null);
  }


  return (
      <AuthContext.Provider value={{ token, user, isLoading, login, register, logout }}>
        {children}
      </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}