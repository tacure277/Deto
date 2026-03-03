import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as ImagePicker from 'expo-image-picker';
import { RootStackParamList } from '../../../navigation/AppNavigator';
import { IdeaRepository } from '../../../../data/repositories/IdeaRepository';
import { crearIdeaUseCase } from '../../../../domain/useCases/ideasUseCases';
import { useAuth } from '../../../context/AuthContext';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {setAuthToken} from "../../../../data/sources/remote/api/axiosClient";

type Nav = NativeStackNavigationProp<RootStackParamList, 'Create'>;

const repo = new IdeaRepository();
const crearIdea = crearIdeaUseCase(repo);

export function useCreateViewModel() {
  const navigation = useNavigation<Nav>();
  const { user } = useAuth();

  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [esAnonima, setEsAnonima] = useState(false);
  const [imagenUri, setImagenUri] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  function toggleAnonima() {
    setEsAnonima(!esAnonima);
  }

  async function seleccionarImagen() {
    const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permiso.granted) {
      setError('Se necesita permiso para acceder a la galeria');
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!resultado.canceled && resultado.assets[0]) {
      setImagenUri(resultado.assets[0].uri);
    }
  }

  function quitarImagen() {
    setImagenUri(null);
  }

  async function handleCrear() {
    if (!user) {
      setError('Debes iniciar sesion para crear una idea');
      return;
    }

    setError('');
    setCargando(true);

    try {
      const savedToken = await AsyncStorage.getItem('authToken');
      if (savedToken) setAuthToken(savedToken);

      await crearIdea(
          titulo,
          descripcion,
          esAnonima,
          user.usuario_id,
          imagenUri ?? undefined,
      );

      navigation.goBack();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Error al crear la idea');
    } finally {
      setCargando(false);
    }
  }  function handleCancelar() {
    navigation.goBack();
  }

  return {
    titulo,
    setTitulo,
    descripcion,
    setDescripcion,
    esAnonima,
    toggleAnonima,
    imagenUri,
    seleccionarImagen,
    quitarImagen,
    error,
    cargando,
    handleCrear,
    handleCancelar,
  };
}