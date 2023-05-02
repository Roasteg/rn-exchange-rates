import { useCallback, useState } from "react";
import { LayoutChangeEvent } from "react-native";

const useComponentDimensions = () => {
    const [dimensions, setDimensions] = useState<null | {x: number; y: number; width: number; height: number}>(null);

    const onLayout = useCallback((event: LayoutChangeEvent) => {
        const {x, y, width, height} = event.nativeEvent.layout;
        setDimensions({x, y, width, height});
    }, [])

    return {dimensions, onLayout};
}

export {useComponentDimensions as useComponentPosition};