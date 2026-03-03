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
import { styles } from './RegisterStyle';
import { useRegisterViewModel } from './RegisterViewModel';

export default function RegisterView() {
  const {
    nombre, setNombre,
    correo, setCorreo,
    password, setPassword,
    descripcion, setDescripcion,
    error, loading,
    handleRegister, goToLogin,
  } = useRegisterViewModel();

  return (
      <KeyboardAvoidingView
          style={styles.screen}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <Text style={styles.logo}>{'<DETO/>'}</Text>
          <Text style={styles.subtitle}>Crea tu cuenta</Text>

          <View style={styles.card}>
            <Text style={styles.label}>Nombre</Text>
            <TextInput
                style={styles.input}
                value={nombre}
                onChangeText={setNombre}
                autoCapitalize="words"
                placeholder="Tu nombre"
                placeholderTextColor="#444444"
            />

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
                placeholder="Min. 6 caracteres"
                placeholderTextColor="#444444"
            />

            <Text style={styles.label}>Descripcion (opcional)</Text>
            <TextInput
                style={styles.inputMultiline}
                value={descripcion}
                onChangeText={setDescripcion}
                multiline
                placeholder="Cuentanos algo sobre ti"
                placeholderTextColor="#444444"
            />

            {error !== '' && <Text style={styles.error}>{error}</Text>}

            {loading ? (
                <ActivityIndicator color="#00FF00" />
            ) : (
                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                  <Text style={styles.buttonText}>Crear cuenta</Text>
                </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity onPress={goToLogin} disabled={loading}>
            <Text style={styles.link}>
              Ya tienes cuenta?{' '}
              <Text style={styles.linkAccent}>Inicia sesion</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
  );
}