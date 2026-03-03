import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontSize: 34,
    fontWeight: '700',
    color: '#00FF00',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: '#888888',
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 32,
  },
  card: {
    backgroundColor: '#151515',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#222222',
    padding: 24,
    gap: 14,
    marginBottom: 24,
  },
  label: {
    color: '#888888',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#222222',
    borderRadius: 12,
    color: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
  },
  button: {
    backgroundColor: '#00FF00',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  buttonText: {
    color: '#000000',
    fontWeight: '700',
    fontSize: 15,
  },
  error: {
    color: '#FF4444',
    fontSize: 13,
    textAlign: 'center',
  },
  link: {
    color: '#888888',
    textAlign: 'center',
    fontSize: 14,
  },
  linkAccent: {
    color: '#00FF00',
    fontWeight: '600',
  },
});
