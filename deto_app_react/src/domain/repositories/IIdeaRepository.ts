import { Idea } from '../entities/entities';

export interface IIdeaRepository {
  obtenerIdeas(): Promise<Idea[]>;
  obtenerIdea(ideaId: number): Promise<Idea>;
  crearIdea(titulo: string, descripcion: string, esAnonima: boolean, usuarioId: number, imagenUri?: string): Promise<Idea>;
  obtenerMisIdeas(): Promise<Idea[]>;
}