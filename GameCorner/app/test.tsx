import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity, Image } from "react-native";
import { SearchBar } from "@/components/SearchBar";
import data from "../assets/json/data.json";

// Définition du type des props
interface RechercheProps {
    setPage: (page: string) => void;
}

export default function Recherche({ setPage }: RechercheProps) {
    return (
        <Text >Coucou</Text>
    )
}