import { useState, useEffect } from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../navigation/AppNavigator';
import { IdeaRepository } from '../../../../../data/repositories/IdeaRepository';
import { ComentarioRepository } from '../../../../../data/repositories/ComentarioRepository';
import { obtenerComentariosUseCase, crearComentarioUseCase } from '../../../../../domain/useCases/comentariosUseCases';
import { useAuth } from '../../../../context/AuthContext';
import { Idea, Comentario } from '../../../../../domain/entities/entities';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Detail'>;
type Route = RouteProp<RootStackParamList, 'Detail'>;

const ideaRepo = new IdeaRepository();
const comentarioRepo = new ComentarioRepository();
const obtenerComentarios = obtenerComentariosUseCase(comentarioRepo);
const crearComentario = crearComentarioUseCase(comentarioRepo);

export function useDetailViewModel() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { user } = useAuth();
  const { ideaId } = route.params;

  const [idea, setIdea] = useState<Idea | null>(null);
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [nuevoComentario, setNuevoComentario] = useState('');
  const [cargando, setCargando] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    cargarDatos();
  }, [ideaId]);

  async function cargarDatos() {
    setCargando(true);
    try {
      const [ideaData, comentariosData] = await Promise.all([
        ideaRepo.obtenerIdea(ideaId),
        obtenerComentarios(ideaId),
      ]);
      setIdea(ideaData);
      setComentarios(comentariosData);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Error al cargar datos');
    } finally {
      setCargando(false);
    }
  }

  async function handleEnviarComentario() {
    if (!user) {
      setError('Debes iniciar sesion');
      return;
    }

    setError('');
    setEnviando(true);
    try {
      const comentario = await crearComentario(nuevoComentario, ideaId, user.usuario_id);
      setComentarios([comentario, ...comentarios]);
      setNuevoComentario('');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Error al enviar comentario');
    } finally {
      setEnviando(false);
    }
  }

  function handleVolver() {
    navigation.goBack();
  }

  return {
    idea,
    comentarios,
    nuevoComentario,
    setNuevoComentario,
    cargando,
    enviando,
    error,
    handleEnviarComentario,
    handleVolver,
  };
}
