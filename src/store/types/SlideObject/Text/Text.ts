import { type DefaultObj, type Position, type Size, TypeObject } from "../DefaultObject.ts";
import { generateId } from "../../Presentation/Id.ts";
import { createTextStyle, type TextStyle } from "./TextStyle.ts";

type Text = DefaultObj & {
    type: TypeObject.Text;
    content: string;
    style: TextStyle;
};

function createText(content: string, style: TextStyle, size: Size, position: Position): Text {
    return {
        id: generateId(),
        type: TypeObject.Text,
        content: content,
        style: createTextStyle(style),
        size: { ...size },
        position: { ...position },
        rotation: 0,
    };
}

export type { Text };

export { createText };
