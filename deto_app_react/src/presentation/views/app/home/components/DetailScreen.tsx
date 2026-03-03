import React from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './DetailStyle';
import { useDetailViewModel } from './DetailViewModel';

export default function DetailScreen() {
  const {
    idea,
    comentarios,
    nuevoComentario,
    setNuevoComentario,
    cargando,
    enviando,
    error,
    handleEnviarComentario,
    handleVolver,
  } = useDetailViewModel();

  if (cargando) {
    return (
        <View style={[styles.container, styles.loading]}>
          <ActivityIndicator color="#00FF00" size="large" />
        </View>
    );
  }

  if (!idea) {
    return (
        <View style={[styles.container, styles.loading]}>
          <Text style={styles.error}>Idea no encontrada</Text>
        </View>
    );
  }

  const fechaFormateada = new Date(idea.fecha_publicacion).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleVolver}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.titulo}>Detalle</Text>
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.ideaCard}>
            <View style={styles.metaItem}>
              <Ionicons
                  name={idea.es_anonima ? 'eye-off' : 'person'}
                  size={16}
                  color="#888888"
              />
              <Text style={styles.metaText}>
                {idea.es_anonima ? 'Anonimo' : idea.autor}
              </Text>
            </View>

            <View style={styles.metaItem}>
              <Ionicons name="calendar-outline" size={16} color="#888888" />
              <Text style={styles.metaText}>{fechaFormateada}</Text>

            </View>

            <Text style={styles.ideaTitulo}>{idea.titulo}</Text>


            <View style={styles.ideaMeta}>

            </View>

            <Text style={styles.ideaDescripcion}>{idea.descripcion}</Text>
            {idea.imagen_url && (
                <Image
                    source={{ uri: idea.imagen_url }}
                    style={styles.ideaImagen}
                    resizeMode="cover"
                />
            )}
          </View>

          <Text style={styles.seccionTitulo}>
            Comentarios ({comentarios.length})
          </Text>

          {comentarios.length === 0 ? (
              <Text style={styles.empty}>No hay comentarios aun</Text>
          ) : (
              comentarios.map((comentario) => {
                let fechaTexto = 'Hace poco';

                try {
                  const fechaStr = comentario.fecha_comentario.replace(' ', 'T');
                  const fecha = new Date(fechaStr);

                  if (!isNaN(fecha.getTime())) {
                    const ahora = new Date();
                    const diffMs = ahora.getTime() - fecha.getTime();
                    const diffMins = Math.floor(diffMs / 60000);
                    const diffHoras = Math.floor(diffMs / 3600000);
                    const diffDias = Math.floor(diffMs / 86400000);

                    if (diffMins < 1) {
                      fechaTexto = 'Ahora';
                    } else if (diffMins < 60) {
                      fechaTexto = `Hace ${diffMins} min`;
                    } else if (diffHoras < 24) {
                      fechaTexto = `Hace ${diffHoras}h`;
                    } else if (diffDias < 7) {
                      fechaTexto = `Hace ${diffDias}d`;
                    } else {
                      fechaTexto = fecha.toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'short',
                      });
                    }
                  }
                } catch (e) {
                  console.log('Error parsing fecha:', comentario.fecha_comentario);
                }

                return (
                    <View key={comentario.comentario_id} style={styles.comentarioCard}>
                      <View style={styles.comentarioHeader}>
                        <Text style={styles.comentarioAutor}>Usuario #{comentario.usuario_id}</Text>
                        <Text style={styles.comentarioFecha}>{fechaTexto}</Text>
                      </View>
                      <Text style={styles.comentarioTexto}>{comentario.contenido}</Text>
                    </View>
                );
              })
          )}

          <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                value={nuevoComentario}
                onChangeText={setNuevoComentario}
                placeholder="Escribe tu comentario..."
                placeholderTextColor="#444444"
                multiline
            />

            {error !== '' && <Text style={styles.error}>{error}</Text>}

            {enviando ? (
                <ActivityIndicator color="#00FF00" />
            ) : (
                <TouchableOpacity style={styles.button} onPress={handleEnviarComentario}>
                  <Text style={styles.buttonText}>Enviar Comentario</Text>
                </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </View>
  );
}

