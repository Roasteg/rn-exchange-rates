import { useCallback, useState } from "react";
import {
    LayoutChangeEvent,
    Dimensions,
    GestureResponderEvent,
} from "react-native";

const useComponentDimensions = () => {
    const [dimensions, setDimensions] = useState<null | {
        x: number;
        y: number;
        width: number;
        height: number;
    }>(null);

    const onLayout = useCallback((event: LayoutChangeEvent) => {
        const { x, y, width, height } = event.nativeEvent.layout;
        setDimensions({ x, y, width, height });
    }, []);

    return { dimensions, onLayout };
};

const useSwipe = (
    onSwipeLeft?: () => void | null,
    onSwipeRight?: () => void | null,
    rangeOffset?: number
) => {
    const clientWidth = Dimensions.get("window").width;

    let firstTouch = 0;

    const onTouchStart = (event: GestureResponderEvent) => {
        firstTouch = event.nativeEvent.pageX;
    };

    const onTouchEnd = (event: GestureResponderEvent) => {
        const positionX = event.nativeEvent.pageX;
        const range = clientWidth / (rangeOffset ?? 4);
        if (positionX - firstTouch > range) {
            onSwipeRight && onSwipeRight();
        } else if (firstTouch - positionX > range) {
            onSwipeLeft && onSwipeLeft();
        }
    };

    return { onTouchStart, onTouchEnd };
};

export { useComponentDimensions, useSwipe };
