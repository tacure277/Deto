import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/AppNavigator';
import { IdeaRepository } from '../../../../data/repositories/IdeaRepository';
import { obtenerIdeasUseCase } from '../../../../domain/useCases/ideasUseCases';
import { Idea } from '../../../../domain/entities/entities';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const repo = new IdeaRepository();
const obtenerIdeas = obtenerIdeasUseCase(repo);

export function useHomeViewModel() {
  const navigation = useNavigation<Nav>();

  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    cargarIdeas();
  }, []);

  async function cargarIdeas() {
    setCargando(true);
    setError('');
    try {
      const data = await obtenerIdeas();
      setIdeas(data);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Error al cargar ideas');
    } finally {
      setCargando(false);
    }
  }

  function irADetalle(ideaId: number) {
    navigation.navigate('Detail', { ideaId });
  }

  function irACrear() {
    navigation.navigate('Create');
  }

  return { ideas, cargando, error, cargarIdeas, irADetalle, irACrear };
}