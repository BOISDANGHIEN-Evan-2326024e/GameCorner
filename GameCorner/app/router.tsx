import React, { useState } from 'react';
import { View } from "react-native";
import data from "../assets/json/data.json";
import Recherche from './recherche';
import ProfilScreen from './profil';
import Test from './test';
import Accueil from './(tabs)/accueil';
import {ThemedText} from "@/components/ThemedText";

export default function Router({ IdUser }: { IdUser: number }) {
    const [user, setUser] = useState(data.users);
    const [produits, setProduits] = useState(data.produits);
    const User = user.find((u: { id: number }) => u.id === IdUser) || null;
    const [page, setPage] = useState('recherche');
    return (
        <>
            {page === 'recherche' && <Recherche setPage={setPage} />}
            {page === 'user' &&
                <ProfilScreen setPage={setPage} UserData={User} />}
            {page === 'accueil' && <Accueil setPage={setPage} />}
            {page === 'test' && <Test setPage={setPage} />}
        </>
    );
}
