import { axiosClient } from '../sources/remote/api/axiosClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAuthToken } from '../sources/remote/api/axiosClient';
import { IComentarioRepository } from '../../domain/repositories/IComentarioRepository';
import { Comentario } from '../../domain/entities/entities';

export class ComentarioRepository implements IComentarioRepository {

  async obtenerComentarios(ideaId: number): Promise<Comentario[]> {
    const { data } = await axiosClient.get<Comentario[]>(`/ideas/${ideaId}/comentarios/`);
    return data;
  }

  async crearComentario(contenido: string, ideaId: number, usuarioId: number): Promise<Comentario> {
    const savedToken = await AsyncStorage.getItem('authToken');
    if (savedToken) setAuthToken(savedToken);

    const { data } = await axiosClient.post<Comentario>(`/ideas/${ideaId}/comentarios/crear/`, {
      contenido,
      usuario_id: usuarioId,
    });
    return data;
  }
}