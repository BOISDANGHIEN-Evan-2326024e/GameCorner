import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';
import { StyleSheet, Button, TextInput, TouchableOpacity, Text } from 'react-native';
import {ThemedText} from "@/components/ThemedText";
import {HelloWave} from "@/components/HelloWave";
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
            <ThemedText type="title" style={styles.title}>Connexion</ThemedText>
            <HelloWave />

            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#eee"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                style={styles.input}
                placeholder="Mot de passe"
                placeholderTextColor="#eee"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            {error ? <ThemedText style={styles.error}>{error}</ThemedText> : null}

            <TouchableOpacity style={styles.button}>
                <Button title="Se connecter" onPress={handleLogin} />
            </TouchableOpacity>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#606060",
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#93d49a",
        marginBottom: 20,
    },
    input: {
        width: "80%",
        height: 50,
        borderColor: "#93d49a",
        borderWidth: 2,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginVertical: 10,
        fontSize: 16,
        color: "#fff",
        backgroundColor: "rgba(147, 212, 154, 0.3)",
    },
    button: {
        marginTop: 20,
        backgroundColor: "#93d49a",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    error: {
        color: "red",
        marginTop: 10,
        fontSize: 16,
    }
});