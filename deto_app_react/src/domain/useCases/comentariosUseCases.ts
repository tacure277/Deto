import { IComentarioRepository } from '../repositories/IComentarioRepository';
import { Comentario } from '../entities/entities';

export function obtenerComentariosUseCase(repo: IComentarioRepository) {
  return async (ideaId: number): Promise<Comentario[]> => {
    return repo.obtenerComentarios(ideaId);
  };
}

export function crearComentarioUseCase(repo: IComentarioRepository) {
  return async (contenido: string, ideaId: number, usuarioId: number): Promise<Comentario> => {
    if (!contenido.trim()) {
      throw new Error('El comentario no puede estar vacio');
    }
    if (contenido.length < 2) {
      throw new Error('El comentario debe tener al menos 2 caracteres');
    }
    return repo.crearComentario(contenido.trim(), ideaId, usuarioId);
  };
}
