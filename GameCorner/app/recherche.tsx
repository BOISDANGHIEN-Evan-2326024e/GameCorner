import ParallaxScrollView from "@/components/ParallaxScrollView";
import {IconSymbol} from "@/components/ui/IconSymbol";
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import {Collapsible} from "@/components/Collapsible";
import {ExternalLink} from "@/components/ExternalLink";
import {Image, Platform, StyleSheet, Text} from "react-native";

export default function TabTwoScreen() {
    return (
        <ThemedText>
            <Text>prout</Text>
        </ThemedText>
      )
}

const styles = StyleSheet.create({
    headerImage: {
        color: '#808080',
        bottom: -90,
        left: -35,
        position: 'absolute',
    },
    titleContainer: {
        flexDirection: 'row',
        gap: 8,
    },
});
