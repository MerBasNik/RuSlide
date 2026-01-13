import { useState, useRef, useEffect } from "react";
import { useAppDispatch } from "../../hooks/useRedux.tsx";
import { setBackground } from "../../store/reducers/PresentationSlice.ts";
import { TypeBackground } from "../../store/types/Background/Background.ts";
import classes from "./BackgroundDropDown.module.css";
import { storage } from "../../../services/appwrite/config.ts";
import { uploadImage } from "../ToolBarButton/ToolBarList.tsx";

interface BackgroundDropdownProps {
    slideId: string;
    onClose?: () => void;
}

const BackgroundDropdown = ({ slideId, onClose }: BackgroundDropdownProps) => {
    const dispatch = useAppDispatch();
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [selectedType, setSelectedType] = useState<"color" | "image">("color");
    const [colorValue, setColorValue] = useState("#ffffff");

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                onClose?.();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    const handleColorChange = (color: string) => {
        setColorValue(color);
        dispatch(
            setBackground({
                slideId,
                background: { type: TypeBackground.Color, color },
            })
        );
    };

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

    const presetColors = [
        "#ffffff",
        "#000000",
        "#a4a4a5",
        "#dee2e6",
        "#007bff",
        "#28a745",
        "#54b9ff",
        "#ffc107",
        "#cc1628",
        "#6f42c1",
        "#fd7e14",
        "#20c997",
    ];

    return (
        <div ref={dropdownRef} className={classes.dropdown}>
            <div className={classes.dropdownHeader}>
                <h3 className={classes.headerTitle}>Выберите тип фона</h3>
                <div className={classes.backgroundType}>
                    <button
                        onClick={() => setSelectedType("color")}
                        className={`${classes.backgroundTypeBtn} ${selectedType === "color" ? classes.backgroundTypeBtnActive : ""}`}
                    >
                        Цвет
                    </button>
                    <button
                        onClick={() => setSelectedType("image")}
                        className={`${classes.backgroundTypeBtn} ${selectedType === "image" ? classes.backgroundTypeBtnActive : ""}`}
                    >
                        Изображение
                    </button>
                </div>
            </div>

            {selectedType === "color" && (
                <div>
                    <h4 className={classes.headerTitle}>Выберите цвет</h4>
                    <input
                        type="color"
                        value={colorValue}
                        onChange={e => handleColorChange(e.target.value)}
                        className={classes.colorInput}
                    />
                    <div className={classes.colorDefaultValue}>
                        {presetColors.map(color => (
                            <button
                                key={color}
                                onClick={() => handleColorChange(color)}
                                style={{ backgroundColor: color }}
                                className={`${classes.colorBtnCase} ${color === "#ffffff" ? classes.colorBtnCaseWhite : ""}`}
                                title={color}
                            />
                        ))}
                    </div>
                </div>
            )}

            {selectedType === "image" && (
                <div>
                    <h4 className={classes.headerTitle}>Загрузите изображение</h4>
                    <button onClick={() => handleImageUpload()} className={classes.imageInput}>
                        Выберите файл
                    </button>
                </div>
            )}
        </div>
    );
};

export default BackgroundDropdown;
