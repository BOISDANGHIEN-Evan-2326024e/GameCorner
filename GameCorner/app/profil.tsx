import {Link, Stack} from "expo-router";
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";

import {Button, Text, TouchableOpacity} from "react-native";
import React, {useState} from "react";
import {User} from "@/Class/User";


export default function ProfilScreen({ setPage, UserData }: { setPage: (page: string) => void, UserData: User }) {
    console.log(UserData)
    console.log("UserData", UserData.email)
    return (
        <>
            <ThemedText type="title" style={{textAlign: "center"}}> cc {UserData?.email}</ThemedText>
            <Text>Je suis un </Text>
            <Button onPress={() => {
                setPage("list")
            }} title={"Back"}/>
            <Button onPress={() => {
                setPage("accueil")
            }} title={"Aller sur la page d'accueil"}/>


        </>
    );
}