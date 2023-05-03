import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";
import { useSwipe } from "../../utils/Hooks";

type Props = {
    value: string;
    onPress: () => void;
    onSwipeLeft?: () => void;
    style?: ViewStyle | ViewStyle[];
};

export default function Input(props: Props) {
    const onSwipeLeft = () => {
        props.onSwipeLeft && props.onSwipeLeft();
    };

    const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft);

    return (
        <Pressable
            onPress={props.onPress}
            style={[styles.rootContainer, props.style]}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
        >
            <View style={styles.textContainer}>
                <Text style={styles.inputText}>{props.value}</Text>
            </View>
        </Pressable>
    );
}
const styles = StyleSheet.create({
    rootContainer: {
        borderBottomColor: "#cccccc",
        borderBottomWidth: 2,
        width: "100%",
    },
    textContainer: {
        height: 48,
        marginBottom: 20,
    },
    inputText: {
        fontSize: 48,
        fontWeight: "bold",
    },
});
