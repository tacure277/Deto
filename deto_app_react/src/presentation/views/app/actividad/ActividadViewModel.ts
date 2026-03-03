import { useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/AppNavigator';
import { IdeaRepository } from '../../../../data/repositories/IdeaRepository';
import { useAuth } from '../../../context/AuthContext';
import { Idea } from '../../../../domain/entities/entities';
import { setAuthToken } from '../../../../data/sources/remote/api/axiosClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

type Nav = NativeStackNavigationProp<RootStackParamList>;
const ideaRepo = new IdeaRepository();

export function useActividadViewModel() {
    const navigation = useNavigation<Nav>();
    const { user, isLoading: authLoading } = useAuth();

    const [misIdeas, setMisIdeas] = useState<Idea[]>([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');

    const cargarMisIdeas = useCallback(async () => {
        setCargando(true);
        setError('');

        const savedToken = await AsyncStorage.getItem('authToken');
        if (savedToken) setAuthToken(savedToken);

        try {
            const ideas = await ideaRepo.obtenerMisIdeas();
            setMisIdeas(ideas);
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : 'Error al cargar tus ideas');
        } finally {
            setCargando(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            if (!authLoading) {
                cargarMisIdeas();
            }
        }, [authLoading, cargarMisIdeas])
    );

    return {
        misIdeas,
        cargando,
        error,
        cargarMisIdeas,
        irADetalle: (ideaId: number) => navigation.navigate('Detail', { ideaId }),
        irACrear: () => navigation.navigate('Create'),
        user,
    };
}