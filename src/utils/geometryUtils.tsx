import type { ResizeDirection } from '../hooks/useResize';

export interface ResizeCalculation {
    width: number;
    height: number;
    x: number;
    y: number;
}

export const calculateNewSize = (
    direction: ResizeDirection,
    startSize: { width: number; height: number },
    startPosition: { x: number; y: number },
    deltaX: number,
    deltaY: number,
    minWidth: number = 50,
    minHeight: number = 30
): ResizeCalculation => {
    let width = startSize.width;
    let height = startSize.height;
    let x = startPosition.x;
    let y = startPosition.y;

    switch (direction) {
        case 'e': // правая сторона
            width = Math.max(minWidth, startSize.width + deltaX);
            break;
        case 'w': // левая сторона
            width = Math.max(minWidth, startSize.width - deltaX);
            x = startPosition.x + deltaX;
            break;
        case 's': // нижняя сторона
            height = Math.max(minHeight, startSize.height + deltaY);
            break;
        case 'n': // верхняя сторона
            height = Math.max(minHeight, startSize.height - deltaY);
            y = startPosition.y + deltaY;
            break;
        case 'se': // правый нижний угол
            width = Math.max(minWidth, startSize.width + deltaX);
            height = Math.max(minHeight, startSize.height + deltaY);
            break;
        case 'sw': // левый нижний угол
            width = Math.max(minWidth, startSize.width - deltaX);
            height = Math.max(minHeight, startSize.height + deltaY);
            x = startPosition.x + deltaX;
            break;
        case 'ne': // правый верхний угол
            width = Math.max(minWidth, startSize.width + deltaX);
            height = Math.max(minHeight, startSize.height - deltaY);
            y = startPosition.y + deltaY;
            break;
        case 'nw': // левый верхний угол
            width = Math.max(minWidth, startSize.width - deltaX);
            height = Math.max(minHeight, startSize.height - deltaY);
            x = startPosition.x + deltaX;
            y = startPosition.y + deltaY;
            break;
    }

    return { width, height, x, y };
};

export const calculateNewPosition = (
    x: number,
    y: number,
    width: number,
    height: number,
    containerWidth: number,
    containerHeight: number
): ResizeCalculation => {
    const newX = Math.max(0, Math.min(x, containerWidth - width));
    const newY = Math.max(0, Math.min(y, containerHeight - height));
    const newWidth = Math.min(width, containerWidth - newX);
    const newHeight = Math.min(height, containerHeight - newY);

    return { width: newWidth, height: newHeight, x: newX, y: newY };
};