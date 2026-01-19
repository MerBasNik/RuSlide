import type { Text } from "./Text.ts";

type FontStyle = "normal" | "italic";
type FontWeight = number | "normal" | "bold";
type Decoration = "none" | "underline";
type TypeTextStyle = FontStyle | FontWeight | Decoration;

type TextStyle = {
    fontSize?: number;
    fontFamily?: string;
    fontStyle?: FontStyle;
    fontWeight?: FontWeight;
    decoration?: Decoration;
    color?: string;
    lineHeight?: number;
    textAlign?: "left" | "center" | "right" | "justify"; // Добавлено
};

function createTextStyle(textStyle: TextStyle): TextStyle {
    return { ...textStyle };
}

function isFontStyle(value: TypeTextStyle): value is FontStyle {
    return value === "normal" || value === "italic";
}

function isFontWeight(value: TypeTextStyle): value is FontWeight {
    return typeof value === "number" || value === "normal" || value === "bold";
}

function isDecoration(value: TypeTextStyle): value is Decoration {
    return value === "none" || value === "underline";
}

function setFontSize(textStyle: TextStyle, fontSize: number): TextStyle {
    return { ...textStyle, fontSize: fontSize };
}
function setFontFamily(textStyle: TextStyle, fontFamily: string): TextStyle {
    return { ...textStyle, fontFamily: fontFamily };
}
function setFontStyle(textStyle: TextStyle, fontStyle: FontStyle): TextStyle {
    if (isFontStyle(fontStyle)) {
        return { ...textStyle, fontStyle: fontStyle };
    }
    return { ...textStyle };
}
function setFontWeight(textStyle: TextStyle, fontWeight: FontWeight): TextStyle {
    if (isFontWeight(fontWeight)) {
        return { ...textStyle, fontWeight: fontWeight };
    }
    return { ...textStyle };
}
function setDecoration(textStyle: TextStyle, decoration: Decoration): TextStyle {
    if (isDecoration(decoration)) {
        return { ...textStyle, decoration: decoration };
    }
    return { ...textStyle };
}
function setColor(textStyle: TextStyle, color: string): TextStyle {
    return { ...textStyle, color: color };
}
function setLineHeight(textStyle: TextStyle, lineHeight: number): TextStyle {
    return { ...textStyle, lineHeight: lineHeight };
}
function setTextStyle(text: Text, style: TextStyle): Text {
    return { ...text, style: { ...style } };
}

export type { TextStyle };

export {
    createTextStyle,
    setFontFamily,
    setFontStyle,
    setDecoration,
    setColor,
    setLineHeight,
    setFontSize,
    setFontWeight,
    setTextStyle,
};
