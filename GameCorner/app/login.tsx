import { Image, StyleSheet, Platform, Button, TextInput, TouchableOpacity } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// @ts-ignore
export default function HomeScreen({ logMe }) {
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
            />

            <TextInput
                style={styles.input}
                placeholder="Mot de passe"
                placeholderTextColor="#eee"
                secureTextEntry
            />

            <TouchableOpacity style={styles.button}>
                <Button title="Se connecter" onPress={() => logMe(true)} />
            </TouchableOpacity>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#606060", // Fond gris
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#93d49a", // Texte accentué en vert clair
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
        backgroundColor: "rgba(147, 212, 154, 0.3)", // Fond vert transparent
    },
    button: {
        marginTop: 20,
        backgroundColor: "#93d49a",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 10,
        alignItems: "center", // 🔥 Centre le texte horizontalement
        justifyContent: "center", // 🔥 Centre le texte verticalement
    },
    buttonText: {
        fontSize: 18,
        color: "#606060",
        fontWeight: "bold",
    },
});
