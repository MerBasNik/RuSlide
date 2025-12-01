import { Slide } from "../Slide/Slide.tsx";
import classes from "./WorkSpace.module.css";
import { useAppSelector } from "../../hooks/useRedux.ts";

type WorkSpaceProps = {
    push: (doFn: any, undoFn: any, ...argsToClone: any[]) => void;
};

const WorkSpace = ({ push }: WorkSpaceProps) => {
    const presentation = useAppSelector(state => state.presentation);
    const { currentSlide } = presentation;
    return (
        <section className={classes.workSpace}>
            <Slide slideId={currentSlide} push={push} />
        </section>
    );
};

export default WorkSpace;
