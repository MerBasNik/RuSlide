import classes from "../TopMenu/TopMenu.module.css";
import ToolBarButton from "./ToolBarButton.tsx";
import { createText } from "../../store/types/SlideObject/Text/Text.ts";
import { createTextStyle } from "../../store/types/SlideObject/Text/TextStyle.ts";
import { createImage } from "../../store/types/SlideObject/Image.ts";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux.ts";
import { addObject, addSlide, setBackground } from "../../store/reducers/PresentationSlice.ts";
import { createSlide } from "../../store/types/Presentation/Slide.ts";
import { TypeBackground } from "../../store/types/Background/Background.ts";

const ToolBarList = () => {
    const dispatch = useAppDispatch();
    const presentation = useAppSelector(state => state.presentation);
    const { currentSlide } = presentation;
    const handleAddImage = (slideId: string) => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";

        input.onchange = event => {
            const file = (event.target as HTMLInputElement).files?.[0];
            if (file) {
                const imageUrl = URL.createObjectURL(file);
                console.log(imageUrl);
                const image = createImage(
                    imageUrl,
                    { width: 100, height: 100 },
                    { x: 100, y: 100 }
                );
                if (slideId) {
                    dispatch(addObject({ slideId, obj: image }));
                }
            }
        };

        input.click();
    };
    const handleAddText = (slideId: string) => {
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
        dispatch(addObject({ slideId, obj: newText }));
    };
    const handleAddSlide = () => {
        const slide = createSlide();
        dispatch(addSlide(slide));
    };
    const handleChangeBackground = (slideId: string) => {
        const colorInput = document.createElement("input");
        colorInput.type = "color";
        colorInput.value = "#ffffff";

        colorInput.onchange = event => {
            const color = (event.target as HTMLInputElement).value;
            dispatch(
                setBackground({ slideId, background: { type: TypeBackground.Color, color: color } })
            );
        };
        colorInput.click();
    };
    return (
        <ul className={classes.toolBar}>
            <li>
                <ToolBarButton
                    clickHandle={() => handleAddText(currentSlide)}
                    nameAction={"приблизить"}
                    src={"/images/magnifier.png"}
                />
            </li>
            <li>
                <ToolBarButton
                    clickHandle={() => handleAddText(currentSlide)}
                    nameAction={"отменить"}
                    src={"/images/undo.png"}
                />
            </li>
            <li>
                <ToolBarButton
                    clickHandle={() => handleAddText(currentSlide)}
                    nameAction={"повторить"}
                    src={"/images/redo.png"}
                />
            </li>
            <li>
                <ToolBarButton
                    clickHandle={handleAddSlide}
                    nameAction={"добавить слайд"}
                    src={"/images/plus.png"}
                />
            </li>
            <li>
                <ToolBarButton
                    clickHandle={() => handleAddText(currentSlide)}
                    nameAction={"создать текстовое поле"}
                    src={"/images/text_icon.png"}
                />
            </li>
            <li>
                <ToolBarButton
                    clickHandle={() => handleAddText(currentSlide)}
                    nameAction={"добавить линию"}
                    src={"/images/vector.png"}
                />
            </li>
            <li>
                <ToolBarButton
                    clickHandle={() => handleAddText(currentSlide)}
                    nameAction={"добавить фигуру"}
                    src={"/images/geometric_symbol.png"}
                />
            </li>
            <li>
                <ToolBarButton
                    clickHandle={() => handleAddImage(currentSlide)}
                    nameAction={"загрузить картинку"}
                    src={"/images/image.png"}
                />
            </li>
            <li>
                <ToolBarButton
                    clickHandle={() => handleChangeBackground(currentSlide)}
                    nameAction={"изменить фон"}
                >
                    Фон
                </ToolBarButton>
            </li>
        </ul>
    );
};

export default ToolBarList;
