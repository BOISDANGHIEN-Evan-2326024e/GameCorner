import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Text, View } from 'react-native';
import { ThemedText } from "@/components/ThemedText";
import { HelloWave } from "@/components/HelloWave";
import React from 'react';

const users = require('../assets/json/data.json'); // Charge le fichier JSON local

// @ts-ignore
export default function HomeScreen({ logMe, setIdUser }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        const user = users.users.find(
            (user: { email: string; pwd: string; }) => user.email === email && user.pwd === password
        );

        if (user) {
            logMe(true);
            setIdUser(user.id);
        } else {
            setError('Identifiants incorrects');
        }
    };

    return (
        <ThemedView style={styles.container}>
            <View style={styles.logoContainer}>
                <ThemedText type="title" style={styles.logoText}>GameCorner</ThemedText>
                <HelloWave />
            </View>

            <View style={styles.formContainer}>
                <ThemedText type="title" style={styles.title}>Connexion</ThemedText>

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#9d9d9d"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Mot de passe"
                    placeholderTextColor="#9d9d9d"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />

                {error ? <ThemedText style={styles.error}>{error}</ThemedText> : null}

                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.loginButtonText}>Se connecter</Text>
                </TouchableOpacity>


            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#121212",
        padding: 20,
    },
    logoContainer: {
        marginBottom: 40,
        alignItems: 'center',
    },
    logoText: {
        fontSize: 36,
        fontWeight: "bold",
        color: "#ffffff",
        marginBottom: 10,
    },
    waveIcon: {
        marginTop: 10,
    },
    formContainer: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: '#1e1e1e',
        borderRadius: 16,
        padding: 30,
        shadowColor: '#8257fe',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#8257fe",
        marginBottom: 24,
        textAlign: 'center',
    },
    input: {
        width: "100%",
        height: 55,
        borderColor: "#333333",
        borderWidth: 2,
        borderRadius: 12,
        paddingHorizontal: 15,
        marginVertical: 12,
        fontSize: 16,
        color: "#ffffff",
        backgroundColor: "rgba(30, 30, 30, 0.8)",
    },
    loginButton: {
        marginTop: 24,
        backgroundColor: "#8257fe",
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    loginButtonText: {
        color: "#ffffff",
        fontSize: 18,
        fontWeight: "bold",
    },
    error: {
        color: "#ff6b6b",
        marginTop: 10,
        fontSize: 16,
        textAlign: 'center',
    },
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 24,
    },
    optionText: {
        color: "#8257fe",
        fontSize: 14,
    }
});