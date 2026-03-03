export interface LoginRequest {
  correo: string;
  contraseña: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
  usuario: {
    usuario_id: number;
    nombre: string;
    correo: string;
    descripcion: string;
    fecha_creacion: string;
    foto_perfil_url: string | null;
  };
}

export interface RegisterRequest {
  nombre: string;
  correo: string;
  contraseña: string;
  descripcion?: string;
}

export interface RegisterResponse {
  access: string;
  refresh: string;
  usuario: {
    usuario_id: number;
    nombre: string;
    correo: string;
    descripcion: string;
    fecha_creacion: string;
    foto_perfil_url: string | null;
  };
}