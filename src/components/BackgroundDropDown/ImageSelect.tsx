import { useAppDispatch } from "../../hooks/useRedux.tsx";
import { setBackground } from "../../store/reducers/PresentationSlice.ts";
import { TypeBackground } from "../../store/types/Background/Background.ts";
import classes from "./BackgroundDropDown.module.css";
import { uploadImage } from "../ToolBarButton/lib.ts";

interface BackgroundDropdownProps {
    slideId: string;
}

const BackgroundDropdown = ({ slideId }: BackgroundDropdownProps) => {
    const dispatch = useAppDispatch();

    const handleImageUpload = async () => {
        const data = await uploadImage();
        if (data === null) return;
        const parseData = JSON.parse(data);
        dispatch(
            setBackground({
                slideId,
                background: {
                    type: TypeBackground.Picture,
                    src: parseData.fileUrl,
                    base64: parseData.base64,
                },
            })
        );
    };

    return (
        <div>
            <h4 className={classes.headerTitle}>Загрузите изображение</h4>
            <button onClick={() => handleImageUpload()} className={classes.imageInput}>
                Выберите файл
            </button>
        </div>
    );
};

export default BackgroundDropdown;
