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
//
// export const ResizeHandles = () => {
//     const handles = [
//         { action: "resize-top", cursor: "ns-resize", style: { top: -6, left: "50%" } },
//         { action: "resize-bottom", cursor: "ns-resize", style: { bottom: -6, left: "50%" } },
//         { action: "resize-left", cursor: "ew-resize", style: { left: -6, top: "50%" } },
//         { action: "resize-right", cursor: "ew-resize", style: { right: -6, top: "50%" } },
//
//         { action: "resize-tl", cursor: "nwse-resize", style: { top: -6, left: -6 } },
//         { action: "resize-br", cursor: "nwse-resize", style: { bottom: -6, right: -6 } },
//     ];
//
//     return (
//         <>
//             {handles.map(h => (
//                 <div
//                     key={h.action}
//                     data-action={h.action}
//                     style={{
//                         position: "absolute",
//                         width: 12,
//                         height: 12,
//                         background: "#333",
//                         transform: "translate(-50%, -50%)",
//                         cursor: h.cursor,
//                         ...h.style,
//                     }}
//                 />
//             ))}
//         </>
//     );
// };
