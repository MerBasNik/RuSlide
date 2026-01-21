import { Font } from "@react-pdf/renderer";

const registerFonts = () => {
    try {
        Font.register({
            family: "Roboto",
            fonts: [
                {
                    src: "/fonts/Roboto/static/Roboto-Regular.ttf",
                    fontWeight: "normal",
                },
                {
                    src: "/fonts/Roboto/static/Roboto-Regular.ttf",
                    fontWeight: "normal",
                },
                {
                    src: "/fonts/Roboto/static/Roboto-Bold.ttf",
                    fontWeight: "bold",
                },
                {
                    src: "/fonts/Roboto/static/Roboto-Italic.ttf",
                    fontWeight: "normal",
                    fontStyle: "italic",
                },
                {
                    src: "/fonts/Roboto/static/Roboto-Regular.ttf",
                    fontWeight: "normal",
                },
                {
                    src: "/fonts/Roboto/static/Roboto-Bold.ttf",
                    fontWeight: "bold",
                },
                {
                    src: "/fonts/Roboto/static/Roboto-Italic.ttf",
                    fontWeight: "normal",
                    fontStyle: "italic",
                },
            ],
        });

        Font.register({
            family: "Open Sans",
            fonts: [
                {
                    src: "/fonts/Open_Sans/static/OpenSans-Regular.ttf",
                    fontWeight: "normal",
                },
                {
                    src: "/fonts/Open_Sans/static/OpenSans-Bold.ttf",
                    fontWeight: "bold",
                },
                {
                    src: "/fonts/Open_Sans/static/OpenSans-Italic.ttf",
                    fontWeight: "normal",
                    fontStyle: "italic",
                },
            ],
        });

        Font.register({
            family: "Montserrat",
            fonts: [
                {
                    src: "/fonts/Montserrat/static/Montserrat-Regular.ttf",
                    fontWeight: "normal",
                },
                {
                    src: "/fonts/Montserrat/static/Montserrat-Bold.ttf",
                    fontWeight: "bold",
                },
                {
                    src: "/fonts/Montserrat/static/Montserrat-Italic.ttf",
                    fontWeight: "normal",
                    fontStyle: "italic",
                },
            ],
        });
    } catch (error) {
        console.warn("Ошибка при регистрации шрифтов:", error);
    }
};

export default registerFonts;
