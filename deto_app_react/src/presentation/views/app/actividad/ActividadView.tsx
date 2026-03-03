import React from 'react';
import { View, Text, FlatList, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './ActividadStyle';
import { useActividadViewModel } from './ActividadViewModel';
import { IdeaCard } from '../../../sharedComponents/IdeaCard';

export default function ActividadView() {
  const { misIdeas, cargando, error, cargarMisIdeas, irADetalle, irACrear } = useActividadViewModel();

  if (cargando && misIdeas.length === 0) {
    return (
        <View style={[styles.container, styles.loading]}>
          <ActivityIndicator color="#00FF00" size="large" />
        </View>
    );
  }

  return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.titulo}>ACTIVIDAD</Text>
            <Text style={styles.subtitulo}>Tus ideas publicadas</Text>
          </View>
          <TouchableOpacity style={styles.addButton} onPress={irACrear}>
            <Ionicons name="add" size={28} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {misIdeas.length > 0 && (
            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>{misIdeas.length}</Text>
                <Text style={styles.statLabel}>Ideas</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>{misIdeas.filter(i => !i.es_anonima).length}</Text>
                <Text style={styles.statLabel}>Públicas</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>{misIdeas.filter(i => i.es_anonima).length}</Text>
                <Text style={styles.statLabel}>Anónimas</Text>
              </View>
            </View>
        )}

        {error !== '' && <Text style={styles.error}>{error}</Text>}

        <FlatList
            data={misIdeas}
            keyExtractor={(item) => String(item.idea_id)}
            contentContainerStyle={styles.lista}
            renderItem={({ item }) => (
                <IdeaCard idea={item} onPress={() => irADetalle(item.idea_id)} />
            )}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Ionicons name="bulb-outline" size={64} color="#333333" />
                <Text style={styles.empty}>No has publicado ninguna idea</Text>
                <Text style={styles.emptyHint}>Toca el + para compartir tu primera idea</Text>
              </View>
            }
            refreshControl={
              <RefreshControl refreshing={cargando} onRefresh={cargarMisIdeas} tintColor="#00FF00" colors={['#00FF00']} />
            }
        />
      </View>
  );
}