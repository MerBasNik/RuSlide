import { Slide } from "../Slide/Slide.tsx";
import classes from "./WorkSpace.module.css";
import { useAppSelector } from "../../hooks/useRedux.ts";

const WorkSpace = () => {
    const presentation = useAppSelector(state => state.presentation);
    const { currentSlide } = presentation;
    return (
        <section className={classes.workSpace}>
            <Slide slideId={currentSlide} />
        </section>
    );
};

export default WorkSpace;
