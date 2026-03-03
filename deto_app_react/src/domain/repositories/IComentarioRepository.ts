import { Comentario } from '../entities/entities';

export interface IComentarioRepository {
  obtenerComentarios(ideaId: number): Promise<Comentario[]>;
  crearComentario(contenido: string, ideaId: number, usuarioId: number): Promise<Comentario>;
}
