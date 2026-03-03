import React from 'react';
import { View, Text, FlatList, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './HomeStyle';
import { useHomeViewModel } from './HomeViewModel';
import { IdeaCard } from '../../../sharedComponents/IdeaCard';

export default function HomeView() {
    const { ideas, cargando, error, cargarIdeas, irADetalle, irACrear } = useHomeViewModel();

    if (cargando && ideas.length === 0) {
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
                    <Text style={styles.titulo}>DETO</Text>

                </View>
                <TouchableOpacity style={styles.addButton} onPress={irACrear}>
                    <Ionicons name="add" size={28} color="#FFFFFF" />
                </TouchableOpacity>
            </View>

            {error !== '' && <Text style={styles.error}>{error}</Text>}

            <FlatList
                data={ideas}
                keyExtractor={(item) => String(item.idea_id)}
                contentContainerStyle={styles.lista}
                renderItem={({ item }) => (
                    <IdeaCard idea={item} onPress={() => irADetalle(item.idea_id)} />
                )}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Ionicons name="bulb-outline" size={64} color="#333333" />
                        <Text style={styles.empty}>No hay ideas publicadas aun</Text>
                        <Text style={styles.emptyHint}>Se el primero en compartir una idea</Text>
                    </View>
                }
                refreshControl={
                    <RefreshControl
                        refreshing={cargando}
                        onRefresh={cargarIdeas}
                        tintColor="#00FF00"
                        colors={['#00FF00']}
                    />
                }
            />
        </View>
    );
}