import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000000' },
    loading: { justifyContent: 'center', alignItems: 'center' },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 56,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#1a1a1a',
    },
    titulo: { fontSize: 28, fontWeight: '800', color: '#00FF00', letterSpacing: 2 },
    subtitulo: { fontSize: 12, color: '#555555', marginTop: 2 },
    addButton: {
        width: 40, height: 40, borderRadius: 20,
        backgroundColor: '#111111',
        justifyContent: 'center', alignItems: 'center',
        borderWidth: 1, borderColor: '#333333',
    },
    statsRow: {
        flexDirection: 'row',
        paddingHorizontal: 20, paddingVertical: 12,
        gap: 16,
        borderBottomWidth: 1, borderBottomColor: '#111111',
    },
    statBox: {
        flex: 1, backgroundColor: '#0a0a0a',
        borderRadius: 12, padding: 12, alignItems: 'center',
        borderWidth: 1, borderColor: '#1a1a1a',
    },
    statNumber: { fontSize: 22, fontWeight: '800', color: '#00FF00' },
    statLabel: { fontSize: 11, color: '#555555', marginTop: 2 },
    lista: { padding: 16, paddingBottom: 32 },
    error: { color: '#FF4444', textAlign: 'center', padding: 12, fontSize: 13 },
    emptyContainer: { alignItems: 'center', paddingTop: 80, gap: 12 },
    empty: { color: '#444444', fontSize: 16, fontWeight: '600' },
    emptyHint: { color: '#333333', fontSize: 13, textAlign: 'center', paddingHorizontal: 40 },
});