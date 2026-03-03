import { IIdeaRepository } from '../repositories/IIdeaRepository';
import { Idea } from '../entities/entities';

export function obtenerIdeasUseCase(repo: IIdeaRepository) {
  return async (): Promise<Idea[]> => {
    return repo.obtenerIdeas();
  };
}

export function crearIdeaUseCase(repo: IIdeaRepository) {
  return async (titulo: string, descripcion: string, esAnonima: boolean, usuarioId: number, imagenUri?: string): Promise<Idea> => {
    if (!titulo.trim() || !descripcion.trim()) {
      throw new Error('Titulo y descripcion son obligatorios');
    }
    if (titulo.length < 3) {
      throw new Error('El titulo debe tener al menos 3 caracteres');
    }
    if (descripcion.length < 10) {
      throw new Error('La descripcion debe tener al menos 10 caracteres');
    }
    return repo.crearIdea(titulo.trim(), descripcion.trim(), esAnonima, usuarioId, imagenUri);
  };
}