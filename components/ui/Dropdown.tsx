import { useState } from "react";
import { StyleSheet, View, Pressable, FlatList, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useComponentPosition } from "../../utils/Hooks";

type Props = {
    list: any[];
    value: string | number | object;
    propertyValue?: string;
    itemPresentation?: any;
    onItemPress: (pressedItem: string | number | object) => void;
};

export default function Dropdown(props: Props) {
    const [dropDownVisible, setDropdownVisible] = useState<boolean>(false);

    const { position, onLayout } = useComponentPosition();

    const chevron = dropDownVisible ? "chevron-up" : "chevron-down";

    const makeListItem = (item: object) => {
        return <props.itemPresentation item={item} onPress={() => {}} />;
    };

    return (
        <>
            <Pressable
                style={styles.rootContainer}
                onPress={() => {
                    setDropdownVisible(!dropDownVisible);
                }}
                onLayout={onLayout}
            >
                <props.itemPresentation item={props.value} />
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
                                top: position ? position.y + 100 : 0,
                                left: position ? position.x : 0,
                            },
                        ]}
                    >
                        <View style={styles.dropdownListContainer}>
                            <FlatList
                                data={props.list}
                                keyExtractor={(item, index) => index.toString()}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item }) => {
                                    return (
                                        <Pressable
                                            style={styles.dropdownListItem}
                                            onPress={() => {
                                                props.onItemPress(item);
                                                setDropdownVisible(false);
                                            }}
                                        >
                                            {makeListItem(item)}
                                        </Pressable>
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
        flex: 1,
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
    dropdownListItem: {
        padding: 10,
    },
});
