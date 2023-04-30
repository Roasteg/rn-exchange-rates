import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
    item: Currency;
};
export default function DropdownCountryItem(props: Props) {
    return (
        <Pressable
            onPress={() => {
                console.log(props.item.Code);
            }}
        >
            <Text>{props.item.Code}</Text>
        </Pressable>
    );
}
const styles = StyleSheet.create({});
