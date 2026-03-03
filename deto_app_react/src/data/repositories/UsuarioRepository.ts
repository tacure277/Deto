import { axiosClient, setAuthToken } from '../sources/remote/api/axiosClient';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../sources/remote/models/authModels';
import { IUsuarioRepository } from '../../domain/repositories/IUsuarioRepository';
import { Usuario } from '../../domain/entities/entities';

export class UsuarioRepository implements IUsuarioRepository {

  async login(correo: string, contraseña: string): Promise<Usuario> {
    const { data } = await axiosClient.post<LoginResponse>('/auth/login/', {
      correo,
      contraseña,
    } as LoginRequest);

    setAuthToken(data.access);

    return {
      usuario_id: data.usuario.usuario_id,
      nombre: data.usuario.nombre,
      correo: data.usuario.correo,
      descripcion: data.usuario.descripcion,
      fecha_creacion: data.usuario.fecha_creacion,
      foto_perfil_url: data.usuario.foto_perfil_url,
      token: data.access,
    };
  }

  async register(
      nombre: string,
      correo: string,
      contraseña: string,
      descripcion?: string,
  ): Promise<Usuario> {
    const body: RegisterRequest = { nombre, correo, contraseña };
    if (descripcion?.trim()) body.descripcion = descripcion.trim();

    const { data } = await axiosClient.post<RegisterResponse>('/auth/registro/', body);

    setAuthToken(data.access);

    return {
      usuario_id: data.usuario.usuario_id,
      nombre: data.usuario.nombre,
      correo: data.usuario.correo,
      descripcion: data.usuario.descripcion,
      fecha_creacion: data.usuario.fecha_creacion,
      foto_perfil_url: data.usuario.foto_perfil_url,
      token: data.access,
    };
  }

  async getProfile(id: number): Promise<Usuario> {
    const { data } = await axiosClient.get(`/auth/perfil/${id}/`);
    return {
      usuario_id: data.usuario_id,
      nombre: data.nombre,
      correo: data.correo,
      descripcion: data.descripcion,
      fecha_creacion: data.fecha_creacion,
      foto_perfil_url: data.foto_perfil_url ?? null,
    };
  }
}