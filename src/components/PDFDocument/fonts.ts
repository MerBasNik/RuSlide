import { Font } from "@react-pdf/renderer";

// Регистрируем все необходимые шрифты
const registerFonts = () => {
    try {
        Font.register({
            family: "Helvetica",
            fonts: [
                {
                    src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf",
                    fontWeight: "normal",
                },
                {
                    src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf",
                    fontWeight: "bold",
                },
            ],
        });

        Font.register({
            family: "Times-Roman",
            src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf",
        });

        // Или используем встроенные псевдонимы
        Font.register({
            family: "sans-serif",
            src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf",
        });

        console.log("Fonts registered successfully");
    } catch (error) {
        console.warn("Font registration failed:", error);
    }
};

export default registerFonts;
