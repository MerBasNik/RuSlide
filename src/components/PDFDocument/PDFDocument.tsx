import React from "react";
import { Document, Page, View, Text, Image } from "@react-pdf/renderer";
import type { Slide } from "../../store/types/Presentation/Slide.ts";
import registerFonts from "./fonts.ts";
import { styles } from "./styles.ts";

interface PDFDocumentProps {
    slides: Slide[];
}
registerFonts();

const PDFDocumentComponent: React.FC<PDFDocumentProps> = ({ slides }) => {
    return (
        <Document>
            {slides.map((slide, index) => (
                <Page key={index} orientation="landscape" size={[540, 960]} style={styles.page}>
                    <View style={styles.slide}>
                        {slide.background.type === "color" && (
                            <View
                                style={[
                                    styles.background,
                                    { backgroundColor: slide.background.color },
                                ]}
                            />
                        )}
                        {slide.background.type === "picture" && (
                            <Image src={slide.background.base64} style={styles.background} />
                        )}
                        {slide.objectsOrder.map(objectId => {
                            const object = slide.objects[objectId];
                            if (!object) return null;

                            const x = object.position.x;
                            const y = object.position.y;
                            const width = object.size.width;
                            const height = object.size.height;

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
                                                fontSize: object.style.fontSize,
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
