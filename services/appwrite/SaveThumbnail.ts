import html2canvas from "html2canvas";
import { storage } from "./config";
import { ID } from "appwrite";

export const saveSlideThumbnail = async (
    svgElement: SVGSVGElement,
    fileName: string
) => {
    const canvas = await html2canvas(svgElement, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
    });

    return new Promise((resolve, reject) => {
        canvas.toBlob(async (blob) => {
            if (!blob) {
                reject(new Error('Could not create blob'));
                return;
            }
            try {
                const file = await storage.createFile(
                    '69367bcc001ade42357f',
                    ID.unique(),
                    new File([blob], `${fileName}.png`, { type: 'image/png' })
                );
                resolve(file.$id);
            } catch (error) {
                reject(error);
            }
        }, 'image/png', 1.0);
    });
};
