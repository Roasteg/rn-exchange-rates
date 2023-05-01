import { StyleSheet, Text, View } from "react-native";
import ActionButton from "./ui/ActionButton";
import React from "react";

export default function Keypad() {
    const keys = ['9', '8', '7', '6', '5', '4', '3', '2', '1', 'C', ',', '0']
    return (
        <View style={styles.rootContainer}>
            <View style={styles.keypadContainer}>
                <View style={styles.keysContainer}>{keys.map((key) => {
                    return (
                        <View key={key} style={styles.keyContainer}>
                            <ActionButton label={key} onPress={()=>{}} />
                        </View>
                    )
                })}</View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
    },
    keypadContainer: {
        flex: 1,
        flexDirection: "row",
    },
    keysContainer: {
        flexDirection: "row-reverse",
        flexWrap: "wrap",
        padding: 12,
        flex: 1,
    },
    keyContainer: {
        flexShrink: 0,
        flexBasis: "33.333333333%",
        padding: 8,
    },
});
