import type { JSX } from "react";
import classes from "./SlideThumbnail.module.css";
import type { DragItem } from "../../hooks/useDND/useDND.tsx";

interface DragPreviewProps {
    visible: boolean;
    position: { x: number; y: number };
    item: DragItem | null;
    renderThumbnail: (item: DragItem) => JSX.Element;
}

export const DragPreview = ({ visible, position, item, renderThumbnail }: DragPreviewProps) => {
    if (!visible || !item) return null;
    return (
        <div
            className={classes.dragPreview}
            style={{
                left: position.x,
                top: position.y,
            }}
        >
            {renderThumbnail(item)}
        </div>
    );
};
