import classes from "./ThemeBar.module.css";
import { Themes } from "./consts.ts";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks/useRedux.tsx";
import { setBackground, setTheme } from "../../store/reducers/PresentationSlice.ts";
import type { Background } from "../../store/types/Background/Background.ts";

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

        if (firstSlide) {
            dispatch(
                setBackground({
                    slideId: firstSlideId,
                    background: theme.mainSlide.background,
                })
            );
        }

        slidesOrder.slice(1).forEach(slideId => {
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
                <div
                    className={classes.themeItem}
                    onClick={() => changeTheme(theme.id)}
                    key={theme.id}
                    style={setStyleBackground(theme.mainSlide.background)}
                >
                </div>
            ))}
        </div>
    );
};

export default ThemeBar;
