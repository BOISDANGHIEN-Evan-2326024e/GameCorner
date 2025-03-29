import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Text, Button, TouchableOpacity, Image } from "react-native";
import { SearchBar } from "@/components/SearchBar";
import data from "../assets/json/data.json";
import Recherche from './recherche'
import ProfilScreen from './profil'
import Test from './test'


export default function Router() {
    const [page, setPage] = useState('list')
    return (

        <>
            {page === 'list' && <Recherche setPage={setPage} />}
            {page === 'user' && <ProfilScreen setPage={setPage} />}
            {page === 'test' && <Test setPage={setPage} />}
        </>

    )

}
