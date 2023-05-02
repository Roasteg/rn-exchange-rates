import { StyleSheet, Text, View, Image } from "react-native";

type Props = {
    item: Currency;
};
export default function DropdownCurrencyItem(props: Props) {
    return (
        <View style={styles.rootContainer}>
            <View style={styles.flagContainer}>
                {props.item.Flag !== "" && (
                    <Image
                        source={{ uri: props.item.Flag }}
                        style={styles.flag}
                    />
                )}
            </View>
            <Text>{props.item.Code}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    rootContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    flagContainer: {
        width: 30,
        height: 30,
        marginRight: 12,
    },
    flag: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
        borderRadius: 100,
    },
});
