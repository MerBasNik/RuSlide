import { Slide } from "../Slide/Slide.tsx";
import classes from "./WorkSpace.module.css";
import type { Presentation } from "../../store/types/Presentation/Presentation.ts";

type WorkSpaceProps = {
    editor: Presentation;
};

const WorkSpace = ({ editor }: WorkSpaceProps) => {
    const slide = editor.slides.get(editor.currentSlide);
    const objects = Array.from(slide?.objects?.values() || []);
    if (!slide) {
        return null;
    }
    return (
        <section className={classes.workSpace}>
            <Slide
                editor={editor}
                slide={slide}
                selectedObjectId={slide.selectedObjects[0]}
                objects={objects}
            />
        </section>
    );
};

export default WorkSpace;
