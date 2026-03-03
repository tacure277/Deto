import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { styles } from './LoginStyle';
import { useLoginViewModel } from './LoginViewModel';

export default function LoginView() {
  const { correo, setCorreo, password, setPassword, error, loading, handleLogin, goToRegister } =
      useLoginViewModel();

  return (
      <KeyboardAvoidingView
          style={styles.screen}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} keyboardShouldPersistTaps="handled">
          <Text style={styles.logo}>{'<DETO/>'}</Text>
          <Text style={styles.subtitle}>Inicia sesion para continuar</Text>

          <View style={styles.card}>
            <Text style={styles.label}>Correo</Text>
            <TextInput
                style={styles.input}
                value={correo}
                onChangeText={setCorreo}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="tu@correo.com"
                placeholderTextColor="#444444"
            />

            <Text style={styles.label}>Contrasena</Text>
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholder="••••••••"
                placeholderTextColor="#444444"
            />

            {error !== '' && <Text style={styles.error}>{error}</Text>}

            {loading ? (
                <ActivityIndicator color="#00FF00" />
            ) : (
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                  <Text style={styles.buttonText}>Iniciar sesion</Text>
                </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity onPress={goToRegister} disabled={loading}>
            <Text style={styles.link}>
              No tienes cuenta?{' '}
              <Text style={styles.linkAccent}>Registrate</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
  );
}