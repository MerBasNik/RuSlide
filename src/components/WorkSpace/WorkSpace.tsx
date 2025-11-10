import { Slide } from "../Slide/Slide.tsx";
import classes from "./WorkSpace.module.css";
import type { Presentation } from "../../store/types/Presentation/Presentation.ts";

type WorkSpaceProps = {
    editor: Presentation;
};

const WorkSpace = ({ editor }: WorkSpaceProps) => {
    const slide = editor.slides.get(editor.currentSlide);
    // const objects = Array.from(slide?.objects?.values() || []);
    if (!slide) {
        return null;
    }
    return (
        <section className={classes.workSpace}>
            <Slide slideId={editor.currentSlide} />
        </section>
    );
};

export default WorkSpace;
