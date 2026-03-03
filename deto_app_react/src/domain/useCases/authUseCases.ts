import { IUsuarioRepository } from '../repositories/IUsuarioRepository';
import { Usuario } from '../entities/entities';

export function loginUseCase(repo: IUsuarioRepository) {
  return async (correo: string, contraseña: string): Promise<Usuario> => {
    if (!correo.trim() || !contraseña.trim()) throw new Error('Completa todos los campos');
    return repo.login(correo.trim(), contraseña);
  };
}

export function registerUseCase(repo: IUsuarioRepository) {
  return async (

      nombre: string,
      correo: string,
      contraseña: string,
      descripcion?: string,
  ): Promise<Usuario> => {
    if (!nombre.trim() || !correo.trim() || !contraseña.trim())
      throw new Error('Completa todos los campos');
    if (contraseña.length < 6) throw new Error('La contrasena debe tener al menos 6 caracteres');
    return repo.register(nombre.trim(), correo.trim(), contraseña, descripcion?.trim());
  };
}