import type { Slide } from "../../store/types/Presentation/Slide.ts";
import type { SlideObject } from "../../store/types/SlideObject/DefaultObject.ts";

interface SlideThumbnailProps {
    slide: Slide | null;
    objects: Record<string, SlideObject>;
    width: number;
    height: number;
}

export const SlideThumbnail = ({ slide, objects, width, height }: SlideThumbnailProps) => {
    const scale = width / 800;
    const renderBackground = () => {
        if (slide?.background.type === "color") {
            return <rect width={width} height={height} fill={slide.background.color} />;
        } else if (slide?.background.type === "picture") {
            return (
                <image
                    href={slide?.background.src}
                    width={width}
                    height={height}
                    preserveAspectRatio="xMidYMid slice"
                />
            );
        }
        return (
            <rect width={width} height={height} fill="#ffffff" stroke="#cccccc" strokeWidth={1} />
        );
    };

    const renderObject = (object: SlideObject) => {
        const x = object.position.x * scale;
        const y = object.position.y * scale;
        const objectWidth = object.size.width * scale;
        const objectHeight = object.size.height * scale;

        if (object.type === "image") {
            return (
                <image
                    key={object.id}
                    href={object.src}
                    x={x}
                    y={y}
                    width={objectWidth}
                    height={objectHeight}
                    preserveAspectRatio="xMidYMid meet"
                />
            );
        }

        if (object.type === "text") {
            const fontSize = (object.style.fontSize || 16) * scale;

            return (
                <text
                    key={object.id}
                    x={x + 4 * scale}
                    y={y + fontSize}
                    fontSize={fontSize}
                    fill={object.style.color}
                    fontFamily={object.style.fontFamily}
                    fontWeight={object.style.fontWeight}
                    width={objectWidth - 8 * scale}
                >
                    {object.content}
                </text>
            );
        }
        return null;
    };

    return (
        <svg>
            {renderBackground()}
            {Object.values(objects).map(object => renderObject(object))}
        </svg>
    );
};
