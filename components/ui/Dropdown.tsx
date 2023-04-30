import { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Pressable,
    FlatList,
    Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
    list: any[];
    itemPresentation: React.FC<{item: any}>;
};

export default function Dropdown(props: Props) {
    const [dropDownVisible, setDropdownVisible] = useState<boolean>(false);
    const [dropdownButtonPositionX, setDropdownPositionX] = useState<number>(0);
    const [dropdownButtonPositionY, setDropdownPositionY] = useState<number>(0);

    const chevron = dropDownVisible ? "chevron-up" : "chevron-down";

    const makeListItem = (item: object) => {
        return <props.itemPresentation item={item} />
    }

    return (
        <>
            <Pressable
                style={styles.rootContainer}
                onPress={() => {
                    setDropdownVisible(!dropDownVisible);
                }}
                onLayout={(event) => {
                    const layout = event.nativeEvent.layout;
                    setDropdownPositionX(layout.x);
                    setDropdownPositionY(layout.y);
                }}
            >
                <Text>Dropdown</Text>
                <Ionicons name={chevron} size={18} />
            </Pressable>
            <Modal visible={dropDownVisible} transparent>
                <Pressable
                    onPress={() => setDropdownVisible(false)}
                    style={{ width: "100%", height: "100%" }}
                >
                    <View
                        style={[
                            styles.dropdown,
                            {
                                top: dropdownButtonPositionY + 100,
                                left: dropdownButtonPositionX + 10,
                            },
                        ]}
                    >
                        <View style={styles.dropdownListContainer}>
                            <FlatList
                                data={props.list}
                                keyExtractor={(item) => item["Code"]}
                                renderItem={({ item }) => {
                                    return (
                                        makeListItem(item)
                                    );
                                }}
                            />
                        </View>
                    </View>
                </Pressable>
            </Modal>
        </>
    );
}
const styles = StyleSheet.create({
    rootContainer: {
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    dropdown: {
        position: "absolute",
        zIndex: 120,
        height: "100%",
    },
    dropdownListContainer: {
        backgroundColor: "white",
        shadowColor: "black",
        shadowRadius: 4,
        shadowOpacity: 0.1,
        shadowOffset: { height: 2, width: 0 },
        padding: 10,
        borderRadius: 20,
        height: 220,
        width: 140,
    },
});
