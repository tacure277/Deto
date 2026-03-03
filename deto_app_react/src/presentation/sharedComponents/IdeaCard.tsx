import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Idea } from '../../domain/entities/entities';

interface IdeaCardProps {
  idea: Idea;
  onPress: () => void;
}

export function IdeaCard({ idea, onPress }: IdeaCardProps) {
  const fechaFormateada = new Date(idea.fecha_publicacion).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
  });

  return (
      <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
        {idea.imagen_url && (
            <Image source={{ uri: idea.imagen_url }} style={styles.imagen} resizeMode="cover" />
        )}

        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.autorContainer}>
              <Ionicons
                  name={idea.es_anonima ? 'eye-off' : 'person-circle'}
                  size={16}
                  color="#888888"
              />
              <Text style={styles.autor}>
                {idea.es_anonima ? 'Anonimo' : idea.autor}
              </Text>
            </View>
            <Text style={styles.fecha}>{fechaFormateada}</Text>
          </View>

          <Text style={styles.titulo}>{idea.titulo}</Text>
          <Text style={styles.descripcion} numberOfLines={2}>
            {idea.descripcion}
          </Text>

          <View style={styles.footer}>
            <View style={styles.tag}>
              <Ionicons name="bulb" size={14} color="#00FF00" />
              <Text style={styles.tagText}>Idea</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#151515',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#222222',
    marginBottom: 12,
    overflow: 'hidden',
  },
  imagen: {
    width: '100%',
    height: 200,
    backgroundColor: '#111111',
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  autorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  autor: {
    color: '#888888',
    fontSize: 13,
    fontWeight: '600',
  },
  fecha: {
    color: '#555555',
    fontSize: 12,
  },
  titulo: {
    color: '#00FF00',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    lineHeight: 24,
  },
  descripcion: {
    color: '#CCCCCC',
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#001a00',
    borderRadius: 6,
  },
  tagText: {
    color: '#00FF00',
    fontSize: 11,
    fontWeight: '600',
  },
});