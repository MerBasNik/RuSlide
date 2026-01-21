import classes from "./ThemeBar.module.css";
import { Themes } from "./consts.ts";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks/useRedux.tsx";
import {
    setBackground,
    setTheme,
    updateTextStyle,
} from "../../store/reducers/PresentationSlice.ts";
import type { Background } from "../../store/types/Background/Background.ts";
import { TypeObject } from "../../store/types/SlideObject/DefaultObject.ts";

const ThemeBar = () => {
    const dispatch = useDispatch();
    const { slides, slidesOrder } = useAppSelector(state => state.presentation);

    const changeTheme = (id: string) => {
        const theme = Themes.find(t => t.id === id);
        if (!theme) return;
        dispatch(setTheme(theme));
        if (!slides || !slidesOrder || slidesOrder.length === 0) return;
        const firstSlideId = slidesOrder[0];
        const firstSlide = slides[firstSlideId];
        const firstSlideObjectsOrder = slides[firstSlideId].objectsOrder;
        const firstSlideObjects = slides[firstSlideId].objects;

        if (firstSlide) {
            firstSlideObjectsOrder.map(objectId => {
                if (firstSlideObjects[objectId].type === TypeObject.Text) {
                    dispatch(
                        updateTextStyle({
                            slideId: firstSlideId,
                            objectId: objectId,
                            styleUpdates: { ...theme.mainSlide.textStyle },
                        })
                    );
                }
            });
            dispatch(
                setBackground({
                    slideId: firstSlideId,
                    background: theme.mainSlide.background,
                })
            );
        }

        slidesOrder.slice(1).forEach(slideId => {
            const objectsOrder = slides[slideId].objectsOrder;
            const objects = slides[slideId].objects;
            objectsOrder.map(objectId => {
                if (objects[objectId].type === TypeObject.Text) {
                    dispatch(
                        updateTextStyle({
                            slideId,
                            objectId,
                            styleUpdates: { ...theme.allSlides.textStyle },
                        })
                    );
                }
            });
            dispatch(
                setBackground({
                    slideId: slideId,
                    background: theme.allSlides.background,
                })
            );
        });
    };

    const setStyleBackground = (background: Background) => {
        if (background.type === "color") {
            return { backgroundColor: background.color };
        } else if (background.type === "picture") {
            return {
                backgroundImage: `url(${background.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            };
        }
        return {};
    };

    return (
        <div className={classes.themeContainer}>
            {Themes.map(theme => (
                <div key={theme.id} className={classes.themeItem}>
                    <p className={classes.themeTitle}>{theme.name}</p>
                    <div
                        className={classes.themeBackground}
                        onClick={() => changeTheme(theme.id)}
                        style={setStyleBackground(theme.mainSlide.background)}
                    />
                </div>
            ))}
        </div>
    );
};

export default ThemeBar;
