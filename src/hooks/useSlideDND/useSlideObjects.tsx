import { useCallback } from "react";
import type { Presentation } from "../../store/types/Presentation/Presentation.ts";
import type { Slide as TSlide } from "../../store/types/Presentation/Slide.ts";
import { dispatch } from "../../store/StoreEditor/Editor.tsx";
import {
    type Position,
    setPosition,
    setSize,
} from "../../store/types/SlideObject/DefaultObject.ts";
import { setContent } from "../../store/types/SlideObject/Text/Text.ts";

interface UseSlideObjectsProps {
    editor: Presentation;
    slide: TSlide;
}

export const useSlideObjects = ({ editor, slide }: UseSlideObjectsProps) => {
    const updateObjectPosition = useCallback(
        (positions: Map<string, Position>) => {
            dispatch(setPosition, { editor, data: [slide.id, positions] });
        },
        [editor, slide.id]
    );

    const updateObjectSize = useCallback(
        (objId: string, width: number, height: number) => {
            dispatch(setSize, { editor, data: [slide.id, objId, { width, height }] });
        },
        [editor, slide.id]
    );

    const updateTextContent = useCallback(
        (objId: string, content: string) => {
            dispatch(setContent, { editor, data: [slide.id, objId, content] });
        },
        [editor, slide.id]
    );

    return {
        updateObjectPosition,
        updateObjectSize,
        updateTextContent,
    };
};
