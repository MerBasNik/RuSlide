import React from "react";
import { Document, Page, View, Text, Image, StyleSheet } from "@react-pdf/renderer";
import type { Slide } from "../../store/types/Presentation/Slide.ts";
import registerFonts from "./fonts.ts";

interface PDFDocumentProps {
    slides: Slide[];
}
registerFonts();
const styles = StyleSheet.create({
    page: {
        flexDirection: "row",
        backgroundColor: "#ffffff",
        width: "100%",
        height: "100%",
    },
    slide: {
        width: "100%",
        height: "100%",
        position: "relative",
    },
    background: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
    },
    text: {
        position: "absolute",
    },
    image: {
        position: "absolute",
    },
});

const PDFDocumentComponent: React.FC<PDFDocumentProps> = ({ slides }) => {
    // Размеры A4 в ландшафтной ориентации: 297×210 мм
    // const PAGE_WIDTH_MM = 297;
    // const PAGE_HEIGHT_MM = 210;

    // Коэффициенты преобразования пикселей в миллиметры
    // const scaleX = PAGE_WIDTH_MM / 1920;
    // const scaleY = PAGE_HEIGHT_MM / 1080;
    // const SCALE = 5;

    return (
        <Document>
            {slides.map((slide, index) => (
                <Page key={index} orientation="landscape" size={[540, 960]} style={styles.page}>
                    <View style={styles.slide}>
                        {/* Фон */}
                        {slide.background.type === "color" && (
                            <View
                                style={[
                                    styles.background,
                                    { backgroundColor: slide.background.color },
                                ]}
                            />
                        )}
                        {slide.background.type === "picture" && (
                            <Image src={slide.background.src} style={styles.background} />
                        )}

                        {/* Объекты слайда */}
                        {slide.objectsOrder.map(objectId => {
                            const object = slide.objects[objectId];
                            if (!object) return null;

                            const x = object.position.x; // * scaleX;
                            const y = object.position.y; // * scaleY;
                            const width = object.size.width; // * scaleX;
                            const height = object.size.height; // * scaleY;
                            console.log(width, height);

                            switch (object.type) {
                                case "text":
                                    return (
                                        <Text
                                            key={objectId}
                                            style={{
                                                position: "absolute",
                                                left: `${x}px`,
                                                top: `${y}px`,
                                                width: `${width}px`,
                                                height: `${height}px`,
                                                fontSize: object.style.fontSize, // * scaleY,
                                                color: object.style.color || "#000000",
                                                textAlign: object.style.textAlign || "left",
                                                // fontFamily: object.style.fontFamily,
                                            }}
                                        >
                                            {object.content}
                                        </Text>
                                    );

                                case "image":
                                    return (
                                        <Image
                                            key={objectId}
                                            src={object.base64}
                                            style={{
                                                position: "absolute",
                                                left: `${x}px`,
                                                top: `${y}px`,
                                                width: `${width}px`,
                                                height: `${height}px`,
                                            }}
                                        />
                                    );

                                default:
                                    return null;
                            }
                        })}
                    </View>
                </Page>
            ))}
        </Document>
    );
};

export default PDFDocumentComponent;
