import { useState } from "react";
import classes from "./BackgroundDropDown.module.css";
import Dropdown from "../../UI/Dropdown/Dropdown.tsx";
import ColorSelect from "./ColorSelect.tsx";
import ImageSelect from "./ImageSelect.tsx";

interface BackgroundDropdownProps {
    slideId: string;
    objId: string;
    onClose?: () => void;
}

const BackgroundDropdown = ({ slideId, onClose, objId }: BackgroundDropdownProps) => {
    const [selectedType, setSelectedType] = useState<"color" | "image">("color");

    return (
        <Dropdown onClose={() => onClose}>
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
            {selectedType === "color" ? (
                <ColorSelect slideId={slideId} objId={objId} />
            ) : (
                <ImageSelect slideId={slideId} />
            )}
        </Dropdown>
    );
};

export default BackgroundDropdown;
