import { useState } from "react";
import { useAppDispatch } from "../../hooks/useRedux.tsx";
import { updateTextStyle } from "../../store/reducers/PresentationSlice.ts";
import classes from "./BackgroundDropDown.module.css";
import { PRESET_COLORS } from "./consts.ts";

type ColorSelectProps = {
    slideId: string;
    objId: string;
};

const ColorSelect = ({ slideId, objId }: ColorSelectProps) => {
    const dispatch = useAppDispatch();
    const [colorValue, setColorValue] = useState("#ffffff");

    const handleColorChange = (color: string) => {
        setColorValue(color);
        dispatch(
            updateTextStyle({
                slideId,
                objectId: objId,
                styleUpdates: { color },
            })
        );
    };

    return (
        <div>
            <h4 className={classes.headerTitle}>Выберите цвет</h4>
            <input
                type="color"
                value={colorValue}
                onChange={e => handleColorChange(e.target.value)}
                className={classes.colorInput}
            />
            <div className={classes.colorDefaultValue}>
                {PRESET_COLORS.map(color => (
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
    );
};

export default ColorSelect;
