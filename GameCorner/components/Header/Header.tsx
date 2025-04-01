import { TouchableOpacity, View } from "react-native";
import { styles } from "./Header.styles";
import React from "react";
import { ThemedText } from "../ThemedText";
import { Ionicons } from "@expo/vector-icons";


export default function Header({ setPage }: { setPage: (page: string) => void }) {
    return(

    <View style={styles.header}>
        <ThemedText style={{ color: '#FFFFFF', fontSize: 22, fontWeight: 'bold' }}>
        GameCorner
        </ThemedText>
        <TouchableOpacity onPress={() => setPage("user")}>
            <Ionicons name="person-circle-outline" size={28} color="#FFFFFF" />
        </TouchableOpacity>
    </View>
    );
}