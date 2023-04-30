import { StyleSheet, Text, View } from "react-native";
import ActionButton from "./ui/ActionButton";
import React from "react";
export default function Keypad() {
    const generateKeypad = () => {
        const keypad = [];
        for (let i = 9; i > 0; i--) {
            keypad.push(
                <View key={i} style={styles.numberContainer}>
                    <ActionButton label={i.toString()} onPress={() => {}} />
                </View>
            );
        }
        keypad.push(
            <React.Fragment key="lastrow">
                <View key="clear" style={styles.numberContainer}>
                    <ActionButton label="C" onPress={() => {}} />
                </View>
                <View key="comma" style={styles.numberContainer}>
                    <ActionButton label="." onPress={() => {}} />
                </View>
                <View key={0} style={styles.numberContainer}>
                    <ActionButton label="0" onPress={() => {}} />
                </View>
            </React.Fragment>
        );
        return keypad;
    };

    return (
        <View style={styles.rootContainer}>
            <View style={styles.keypadContainer}>
                <View style={styles.numbersContainer}>{generateKeypad()}</View>
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
    numbersContainer: {
        flexDirection: "row-reverse",
        flexWrap: "wrap",
        padding: 12,
        flex: 1,
    },
    numberContainer: {
        flexShrink: 0,
        flexBasis: "33.333333333%",
        padding: 8,
    },
});
