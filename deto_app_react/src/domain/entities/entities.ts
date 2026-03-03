export interface Usuario {
  usuario_id: number;
  nombre: string;
  correo: string;
  descripcion: string;
  fecha_creacion: string;
  foto_perfil_url?: string | null;
  token?: string;
}

export interface Idea {
  idea_id: number;
  titulo: string;
  descripcion: string;
  es_anonima: boolean;
  fecha_publicacion: string;
  usuario_id: number;
  autor: string;
  imagen_url?: string | null;
  num_comentarios?: number;
}

export interface Comentario {
  comentario_id: number;
  contenido: string;
  fecha_comentario: string;
  usuario_id: number;
  idea_id: number;
  autor?: string;
  foto_autor_url?: string | null;
}