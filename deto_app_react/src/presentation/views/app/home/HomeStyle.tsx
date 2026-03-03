import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#222222',
  },
  spacer: {
    width: 48,
  },
  titleContainer: {
    flex: 1,

    alignItems: 'center',
  },
  titulo: {
    fontSize: 25,

    fontWeight: '700',
    color: '#00FF00',
    letterSpacing: 2,
  },
  subtitulo: {
    fontSize: 14,
    color: '#888888',
    marginTop: 4,
  },
  lista: {
    padding: 24,
    paddingBottom: 100,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: '#FF4444',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
    paddingHorizontal: 24,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  empty: {
    color: '#888888',
    textAlign: 'center',
    marginTop: 16,
    fontSize: 16,
    fontWeight: '600',
  },
  emptyHint: {
    color: '#555555',
    textAlign: 'center',
    marginTop: 8,
    fontSize: 14,
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#000000',

    justifyContent: 'center',
    alignItems: 'center',
  },
});