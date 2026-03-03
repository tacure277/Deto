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
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './CreateStyle';
import { useCreateViewModel } from './CreateViewModel';

export default function CreateView() {
  const {
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
  } = useCreateViewModel();

  return (
      <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <Text style={styles.titulo}>Nueva Idea</Text>
          <TouchableOpacity style={styles.closeButton} onPress={handleCancelar}>
            <Ionicons name="close" size={28} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} keyboardShouldPersistTaps="handled">
          <Text style={styles.label}>Titulo</Text>
          <TextInput
              style={styles.input}
              value={titulo}
              onChangeText={setTitulo}
              placeholder="Un titulo llamativo..."
              placeholderTextColor="#444444"
              maxLength={100}
          />

          <Text style={styles.label}>Descripcion</Text>
          <TextInput
              style={styles.textArea}
              value={descripcion}
              onChangeText={setDescripcion}
              placeholder="Describe tu idea en detalle..."
              placeholderTextColor="#444444"
              multiline
              numberOfLines={6}
          />

          <Text style={styles.label}>Imagen (opcional)</Text>
          {imagenUri ? (
              <View style={styles.imagePreviewContainer}>
                <Image source={{ uri: imagenUri }} style={styles.imagePreview} />
                <TouchableOpacity style={styles.removeImageButton} onPress={quitarImagen}>
                  <Ionicons name="close-circle" size={28} color="#FF4444" />
                </TouchableOpacity>
              </View>
          ) : (
              <TouchableOpacity style={styles.imagePickerButton} onPress={seleccionarImagen}>
                <Ionicons name="image-outline" size={32} color="#888888" />
                <Text style={styles.imagePickerText}>Seleccionar imagen</Text>
              </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.checkboxContainer} onPress={toggleAnonima}>
            <View style={[styles.checkbox, esAnonima && styles.checkboxChecked]}>
              {esAnonima && <Ionicons name="checkmark" size={16} color="#000000" />}
            </View>
            <Text style={styles.checkboxLabel}>Publicar de forma anonima</Text>
          </TouchableOpacity>

          {error !== '' && <Text style={styles.error}>{error}</Text>}

          {cargando ? (
              <ActivityIndicator color="#00FF00" size="large" />
          ) : (
              <TouchableOpacity style={styles.button} onPress={handleCrear}>
                <Text style={styles.buttonText}>Publicar Idea</Text>
              </TouchableOpacity>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
  );
}