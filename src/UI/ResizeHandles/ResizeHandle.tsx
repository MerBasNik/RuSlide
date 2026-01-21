import classes from "./ResizeHandles.module.css";

export type ResizeDirection = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";

interface ResizeHandlesProps {
    elementId: string;
    onResizeStart: (event: React.MouseEvent, direction: ResizeDirection, element: any) => void;
    isSelected: boolean;
}

export const ResizeHandles = ({ elementId, onResizeStart, isSelected }: ResizeHandlesProps) => {
    if (!isSelected) return null;

    const handles: ResizeDirection[] = ["n", "s", "e", "w", "ne", "nw", "se", "sw"];

    return (
        <div className={classes.resizeHandlesContainer}>
            {handles.map(direction => (
                <div
                    key={direction}
                    className={`${classes.resizeHandle} ${classes[`resize-${direction}`]}`}
                    onMouseDown={e => onResizeStart(e, direction, { id: elementId })}
                />
            ))}
        </div>
    );
};
