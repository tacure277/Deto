import { Usuario } from '../entities/entities';

export interface IUsuarioRepository {
  login(correo: string, contraseña: string): Promise<Usuario>;
  register(nombre: string, correo: string, contraseña: string, descripcion?: string): Promise<Usuario>;
  getProfile(id: number): Promise<Usuario>;
}