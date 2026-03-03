import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../../../context/AuthContext';
import { RootStackParamList } from '../../../navigation/AppNavigator';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export function useLoginViewModel() {
  const navigation = useNavigation<Nav>();
  const { login } = useAuth();

  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {

    setError('');
    setLoading(true);
    try {
      await login(correo, password);

      navigation.replace('Home');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Error al iniciar sesion');
    } finally {
      setLoading(false);
    }
  }
  function goToRegister() {
    navigation.navigate('Register');
  }

  return { correo, setCorreo, password, setPassword, error, loading, handleLogin, goToRegister };
}