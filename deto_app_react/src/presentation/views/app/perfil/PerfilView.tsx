import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

export default function PerfilView() {
  const { user, logout } = useAuth();
  const navigation = useNavigation();

  const handleLogout = async () => {
    await logout();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' as never }],
    });
  };

  const iniciales = user?.nombre
      ? user.nombre
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2)
      : 'U';

  return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.titulo}>Perfil</Text>
        </View>

        <View style={styles.content}>

          <View style={styles.avatarSection}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>{iniciales}</Text>
            </View>
            <Text style={styles.nombre}>{user?.nombre || 'Usuario'}</Text>
            <Text style={styles.correo}>{user?.correo || 'usuario@ejemplo.com'}</Text>
          </View>


          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Ionicons name="bulb" size={24} color="#00FF00" />
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Ideas</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Ionicons name="chatbubble" size={24} color="#00FF00" />
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Comentarios</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Ionicons name="heart" size={24} color="#00FF00" />
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Me gusta</Text>
            </View>
          </View>


          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sobre mi</Text>
            <View style={styles.card}>
              <Text style={styles.descripcion}>
                {user?.descripcion || 'Sin descripcion'}
              </Text>
            </View>
          </View>


          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Configuracion</Text>

            <TouchableOpacity style={styles.optionCard}>
              <View style={styles.optionLeft}>
                <Ionicons name="person-outline" size={22} color="#FFFFFF" />
                <Text style={styles.optionText}>Editar perfil</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#555555" />
            </TouchableOpacity>




          </View>

          {/* Botón cerrar sesión */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color="#FFFFFF" />
            <Text style={styles.logoutText}>Cerrar sesion</Text>
          </TouchableOpacity>


        </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#222222',
  },
  titulo: {
    fontSize: 32,
    fontWeight: '700',
    color: '#00FF00',
    letterSpacing: 2,
    textAlign: 'center',
  },
  content: {
    padding: 24,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#151515',
    borderWidth: 3,
    borderColor: '#00FF00',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: '700',
    color: '#00FF00',
  },
  nombre: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  correo: {
    fontSize: 14,
    color: '#888888',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#151515',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#222222',
    padding: 20,
    marginBottom: 32,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#222222',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#888888',
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#151515',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#222222',
    padding: 16,
  },
  descripcion: {
    color: '#CCCCCC',
    fontSize: 14,
    lineHeight: 20,
  },
  optionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#151515',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#222222',
    padding: 16,
    marginBottom: 8,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  optionText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FF4444',
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 16,
    marginBottom: 24,
  },
  logoutText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
  version: {
    textAlign: 'center',
    color: '#555555',
    fontSize: 12,
    marginBottom: 20,
  },
});