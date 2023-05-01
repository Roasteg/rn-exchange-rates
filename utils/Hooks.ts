import { useCallback, useState } from "react";
import { LayoutChangeEvent } from "react-native";

const useComponentPosition = () => {
    const [position, setPosition] = useState<null | {x: number; y: number;}>(null);

    const onLayout = useCallback((event: LayoutChangeEvent) => {
        const {x, y} = event.nativeEvent.layout;
        setPosition({x, y});
    }, [])

    return {position, onLayout};
}

export {useComponentPosition};