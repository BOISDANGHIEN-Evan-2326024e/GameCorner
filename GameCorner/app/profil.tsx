import {Link, Stack} from "expo-router";
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";

import {Button, Text} from "react-native";
import React, { useState } from "react";
interface ProfilScreenProps {
    setPage: (page: string) => void;
}

export default function ProfilScreen({ setPage }: ProfilScreenProps) {
    return (
      <>
          <Text>Je suis un User</Text>
          <Button onPress={() => {setPage("list")}} title={"Back"}/>
      </>
  );
}