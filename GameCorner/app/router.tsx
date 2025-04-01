import React, { useState } from 'react';
import { View, StyleSheet } from "react-native";
import data from "../assets/json/data.json";
import Recherche from './recherche';
import ProfilScreen from './profil';
import Test from './test';
import Accueil from './(tabs)/accueil';
import CustomBottomBar from './bottomBar';

export default function Router({ IdUser }: { IdUser: number }) {
    const [user, setUser] = useState(data.users);
    const [produits, setProduits] = useState(data.produits);
    const [relations, setRelations] = useState(data.relations);
    const [categories, setCategories] = useState(data.categories);
    const [favoris, setFavoris] = useState(data.favoris);
    const User = user.find((u: { id: number }) => u.id === IdUser) || null;
    const [page, setPage] = useState('recherche');

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {page === 'recherche' && <Recherche setPage={setPage} produits={produits} relations={relations} />}
                {page === 'user' &&
                    <ProfilScreen setPage={setPage} UserData={User} />}
                {page === 'accueil' && <Accueil setPage={setPage} />}
                {page === 'test' && <Test setPage={setPage} />}
            </View>

            <CustomBottomBar page={page} setPage={setPage} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
    }
});