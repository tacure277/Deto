import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from '../context/AuthContext';
import LoginView from '../views/auth/login/LoginView';
import RegisterView from '../views/auth/register/RegisterView';
import MainTabNavigator from './MainTabNavigator';
import CreateView from '../views/app/crearIdea/CreateView';

export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Home: undefined;
    Detail: { ideaId: number };
    Create: undefined;
    Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerShown: false,
                animation: 'slide_from_right',
                contentStyle: { backgroundColor: '#000000' },
            }}
        >
            <Stack.Screen name="Login" component={LoginView} />
            <Stack.Screen name="Register" component={RegisterView} />
            <Stack.Screen name="Home" component={MainTabNavigator} />
            <Stack.Screen
                name="Create"
                component={CreateView}
                options={{
                    presentation: 'modal',
                    animation: 'slide_from_bottom',
                }}
            />
        </Stack.Navigator>
    );
}

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <AuthProvider>
                <RootNavigator />
            </AuthProvider>
        </NavigationContainer>
    );
}