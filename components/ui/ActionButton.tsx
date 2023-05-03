import { StyleSheet, Text, View, Pressable } from "react-native";
import { Theme } from "../../utils/Theme";


type Props = {
    label: string;
    onPress: () => void;
};

export default function ActionButton(props: Props) {
    return (
        <Pressable style={styles.rootContainer} onPress={props.onPress}>
            <View style={styles.labelContainer}>
                <Text style={styles.label}>{props.label}</Text>
            </View>
        </Pressable>
    );
}
const styles = StyleSheet.create({
    rootContainer: {
        backgroundColor: Theme.actionButton,
        paddingHorizontal: 14,
        paddingVertical: 20,
        borderRadius: 40,
    },
    labelContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    label: {
        fontSize: 28,
        fontWeight: "bold",
        color: Theme.text,
    },
});
