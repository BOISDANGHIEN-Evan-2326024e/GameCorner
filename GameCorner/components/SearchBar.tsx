import React, { useState } from 'react';
import { TextInput, View, StyleSheet, Text } from 'react-native';

// @ts-ignore
export function SearchBar({ onSearch }) {
    const [searchText, setSearchText] = useState('');

    const handleChangeText = (text: React.SetStateAction<string>) => {
        setSearchText(text);
        if (onSearch) {
            onSearch(text);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Rechercher un jeu..."
                value={searchText}
                onChangeText={handleChangeText}
            />
            {searchText !== '' && (
                <Text style={styles.resultText}>🔍 {searchText}</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 12,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        margin: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    input: {
        backgroundColor: '#f9f9f9',
        padding: 12,
        borderRadius: 8,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    resultText: {
        marginTop: 10,
        fontSize: 16,
        color: '#333',
        fontWeight: 'bold',
    },
});
