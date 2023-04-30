import { useState } from "react";
import { StyleSheet, Text, View, Pressable, FlatList } from "react-native";
import {Ionicons} from "@expo/vector-icons";
export default function Dropdown() {
    const [dropDownVisible, setDropdownVisible] = useState<boolean>(false);
    const [dropdownButtonPositionX, setDropdownPositionX] = useState<number>(0);
    const [dropdownButtonPositionY, setDropdownPositionY] = useState<number>(0);

    return (
        <>
            <Pressable
                style={styles.rootContainer}
                onPress={() => setDropdownVisible(!dropDownVisible)}
                onLayout={(event) => {
                    const layout = event.nativeEvent.layout;
                    setDropdownPositionX(layout.x);
                    setDropdownPositionY(layout.y);
                }}
            >
                <Text>Dropdown</Text>
            </Pressable>
            <View
                style={[
                    styles.dropdown,
                    {
                        display: dropDownVisible ? "flex" : "none",
                        top: dropdownButtonPositionY + 40,
                        left: dropdownButtonPositionX,
                    },
                ]}
            >
                <View style={styles.dropdownListContainer}>
                    <FlatList
                        data={["one", "two", "three"]}
                        renderItem={({ item }) => {
                            return (
                                <View>
                                    <Text>{item}</Text>
                                </View>
                            );
                        }}
                    />
                </View>
            </View>
        </>
    );
}
const styles = StyleSheet.create({
    rootContainer: {
        padding: 10,
    },
    dropdown: {
        position: "absolute",
        flex: 1,
        width: 120,
    },
    dropdownListContainer: {
        backgroundColor: "white",
        shadowColor: "black",
        shadowRadius: 4,
        shadowOpacity: 0.1,
        shadowOffset: { height: 2, width: 0 },
        padding: 10,
        zIndex: 20,
        borderRadius: 20,
        height: "100%",
    },
});
