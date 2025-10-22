import classes from "../TopMenu/TopMenu.module.css";
import ToolBarButton from "./ToolBarButton.tsx";
import { addSlide, type Presentation } from "../../store/types/Presentation/Presentation.ts";
import { createText } from "../../store/types/SlideObject/Text/Text.ts";
import { addObject, createSlide, setBackground } from "../../store/types/Presentation/Slide.ts";
import { dispatch } from "../../store/StoreEditor/Editor.tsx";
import { createTextStyle } from "../../store/types/SlideObject/Text/TextStyle.ts";
import { createImage } from "../../store/types/SlideObject/Image.ts";

type ToolBarListProps = {
    editor: Presentation;
};

const ToolBarList = ({ editor }: ToolBarListProps) => {
    const handleAddImage = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";

        input.onchange = event => {
            const file = (event.target as HTMLInputElement).files?.[0];
            if (file) {
                const imageUrl = URL.createObjectURL(file);
                console.log(imageUrl);
                const slideId = editor.selectedSlides[0];
                const image = createImage(
                    imageUrl,
                    { width: 100, height: 100 },
                    { x: 100, y: 100 }
                );
                if (slideId) {
                    dispatch(addObject, {
                        editor,
                        data: [slideId, image],
                    });
                }
            }
        };

        input.click();
    };
    const handleAddText = () => {
        const newStyles = createTextStyle({
            fontSize: 20,
            fontWeight: "bold",
            fontFamily: "sans-serif",
            fontStyle: "italic",
            lineHeight: 1,
            color: "black",
            decoration: "underline",
        });
        const newText = createText("Text", newStyles, { width: 200, height: 200 }, { x: 0, y: 0 });
        dispatch(addObject, {
            editor,
            data: [editor.selectedSlides[0], newText],
        });
    };
    const handleAddSlide = () => {
        const slide = createSlide();
        console.log(editor);
        if (editor) {
            dispatch(addSlide, { editor, data: [slide] });
        }
    };
    const handleChangeBackground = () => {
        const colorInput = document.createElement("input");
        colorInput.type = "color";
        colorInput.value = "#ffffff";

        colorInput.onchange = event => {
            const color = (event.target as HTMLInputElement).value;
            dispatch(setBackground, {
                editor,
                data: [editor.selectedSlides[0], { type: "color", color: color }],
            });
        };
        colorInput.click();
    };
    return (
        <ul className={classes.toolBar}>
            <li>
                <ToolBarButton
                    editor={editor}
                    clickHandle={handleAddText}
                    nameAction={"приблизить"}
                    src={"/images/magnifier.png"}
                />
            </li>
            <li>
                <ToolBarButton
                    editor={editor}
                    clickHandle={handleAddText}
                    nameAction={"отменить"}
                    src={"/images/undo.png"}
                />
            </li>
            <li>
                <ToolBarButton
                    editor={editor}
                    clickHandle={handleAddText}
                    nameAction={"повторить"}
                    src={"/images/redo.png"}
                />
            </li>
            <li>
                <ToolBarButton
                    editor={editor}
                    clickHandle={handleAddSlide}
                    nameAction={"добавить слайд"}
                    src={"/images/plus.png"}
                />
            </li>
            <li>
                <ToolBarButton
                    editor={editor}
                    clickHandle={handleAddText}
                    nameAction={"создать текстовое поле"}
                    src={"/images/text_icon.png"}
                />
            </li>
            <li>
                <ToolBarButton
                    editor={editor}
                    clickHandle={handleAddText}
                    nameAction={"добавить линию"}
                    src={"/images/vector.png"}
                />
            </li>
            <li>
                <ToolBarButton
                    editor={editor}
                    clickHandle={handleAddText}
                    nameAction={"добавить фигуру"}
                    src={"/images/geometric_symbol.png"}
                />
            </li>
            <li>
                <ToolBarButton
                    editor={editor}
                    clickHandle={handleAddImage}
                    nameAction={"загрузить картинку"}
                    src={"/images/image.png"}
                />
            </li>
            <li>
                <ToolBarButton
                    editor={editor}
                    clickHandle={handleChangeBackground}
                    nameAction={"изменить фон"}
                >
                    Фон
                </ToolBarButton>
            </li>
        </ul>
    );
};

export default ToolBarList;
