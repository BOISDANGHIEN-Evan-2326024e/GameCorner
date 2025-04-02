import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from '@expo/vector-icons'; // Assurez-vous d'avoir installé expo/vector-icons

function CustomBottomBar({ page, setPage }: { setPage: (page: string) => void, page: string }) {

    const tabs = [
        { name: 'accueil', label: 'Accueil', icon: 'home' },
        { name: 'recherche', label: 'Recherche', icon: 'search' },
        { name: 'user', label: 'Profil', icon: 'person' },
        { name: 'test', label: 'Vendre', icon: 'game-controller' }
    ];

    return (
        <View style={styles.container}>
            {tabs.map((tab) => (
                <TouchableOpacity
                    key={tab.name}
                    style={[styles.tab, page === tab.name && styles.activeTab]}
                    onPress={() => setPage(tab.name)}
                >
                    <Ionicons
                        name={tab.icon as any}
                        size={24}
                        color={page === tab.name ? '#ffffff' : '#b5a6ff'}
                    />
                    <ThemedText style={page === tab.name ? styles.activeText : styles.text}>
                        {tab.label}
                    </ThemedText>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 70,
        backgroundColor: '#4527ff',
        borderTopWidth: 1,
        borderTopColor: '#5b42ff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 10,
    },
    tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
    },
    activeTab: {
        backgroundColor: '#3110ff',
        borderRadius: 16,
        margin: 4,
    },
    text: {
        fontSize: 12,
        color: '#b5a6ff',
        marginTop: 4,
    },
    activeText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#ffffff',
        marginTop: 4,
    },
});

export default CustomBottomBar;