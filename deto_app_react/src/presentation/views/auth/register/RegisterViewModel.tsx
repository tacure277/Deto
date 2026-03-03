import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../../../context/AuthContext';
import { RootStackParamList } from '../../../navigation/AppNavigator';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Register'>;

export function useRegisterViewModel() {
  const navigation = useNavigation<Nav>();
  const { register } = useAuth();

  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    setError('');
    setLoading(true);
    try {
      await register(nombre, correo, password, descripcion || undefined);
      navigation.replace('Login');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Error al registrarse');
    } finally {
      setLoading(false);
    }
  }

  function goToLogin() {
    navigation.navigate('Login');
  }

  return {
    nombre, setNombre,
    correo, setCorreo,
    password, setPassword,
    descripcion, setDescripcion,
    error, loading,
    handleRegister, goToLogin,
  };
}
