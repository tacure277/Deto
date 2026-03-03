import { axiosClient } from '../sources/remote/api/axiosClient';
import { IIdeaRepository } from '../../domain/repositories/IIdeaRepository';
import { Idea } from '../../domain/entities/entities';

export class IdeaRepository implements IIdeaRepository {
  async obtenerIdeas(): Promise<Idea[]> {
    const { data } = await axiosClient.get<Idea[]>('/ideas/');
    return data;
  }

  async obtenerIdea(ideaId: number): Promise<Idea> {
    const { data } = await axiosClient.get<Idea>(`/ideas/${ideaId}/`);
    return data;
  }
  async obtenerMisIdeas(): Promise<Idea[]> {
    const { data } = await axiosClient.get<Idea[]>('/ideas/mis-ideas/');
    return data;
  }
  async crearIdea(titulo: string, descripcion: string, esAnonima: boolean, usuarioId: number, imagenUri?: string): Promise<Idea> {
    if (!usuarioId) {
      throw new Error('Usuario no autenticado');
    }

    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('descripcion', descripcion);
    formData.append('es_anonima', esAnonima ? 'true' : 'false');
    formData.append('usuario_id', String(usuarioId));

    if (imagenUri) {
      const filename = imagenUri.split('/').pop() || 'image.jpg';
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : 'image/jpeg';

      formData.append('imagen', {
        uri: imagenUri,
        name: filename,
        type: type,
      } as any);
    }

    const { data } = await axiosClient.post<Idea>('/ideas/crear/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  }
}