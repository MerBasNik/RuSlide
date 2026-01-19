import { useAppDispatch } from "../../hooks/useRedux.tsx";
import { setBackground } from "../../store/reducers/PresentationSlice.ts";
import { TypeBackground } from "../../store/types/Background/Background.ts";
import classes from "./BackgroundDropDown.module.css";
import { storage } from "../../../services/appwrite/config.ts";
import { uploadImage } from "../ToolBarButton/lib.ts";

interface BackgroundDropdownProps {
    slideId: string;
}

const BackgroundDropdown = ({ slideId }: BackgroundDropdownProps) => {
    const dispatch = useAppDispatch();

    const handleImageUpload = async () => {
        const uploadFileId = await uploadImage();
        if (uploadFileId) {
            const imageUrl = storage.getFileView("69367bcc001ade42357f", uploadFileId);
            dispatch(
                setBackground({
                    slideId,
                    background: { type: TypeBackground.Picture, src: imageUrl },
                })
            );
        }
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
