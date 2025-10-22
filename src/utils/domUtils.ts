export const getElementBounds = (element: HTMLElement, container: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    return {
        left: rect.left - containerRect.left,
        top: rect.top - containerRect.top,
        width: rect.width,
        height: rect.height
    };
};

export const constrainToContainer = (
    x: number,
    y: number,
    width: number,
    height: number,
    containerWidth: number,
    containerHeight: number
) => {
    const newX = Math.max(0, Math.min(x, containerWidth - width));
    const newY = Math.max(0, Math.min(y, containerHeight - height));
    const newWidth = Math.min(width, containerWidth - newX);
    const newHeight = Math.min(height, containerHeight - newY);

    return { x: newX, y: newY, width: newWidth, height: newHeight };
};