import { storage } from "../../../services/appwrite/config.ts";
import { ID } from "appwrite";

export const getImageDimensionsFromFile = (
    file: File
): Promise<{ width: number; height: number }> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const url = URL.createObjectURL(file);

        img.onload = () => {
            URL.revokeObjectURL(url);
            resolve({
                width: img.naturalWidth,
                height: img.naturalHeight,
            });
        };

        img.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new Error("Failed to load image"));
        };

        img.src = url;
    });
};
export const uploadImage = (): Promise<string | null> => {
    return new Promise(resolve => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = async event => {
            const file = (event.target as HTMLInputElement).files?.[0];
            if (file) {
                try {
                    const createdFile = await storage.createFile(
                        "69367bcc001ade42357f",
                        ID.unique(),
                        file
                    );
                    const downloadUrl = storage.getFileDownload(
                        "69367bcc001ade42357f",
                        createdFile.$id
                    );
                    const dimensions = await getImageDimensionsFromFile(file);
                    const base64 = await fileToBase64(file);
                    const data = {
                        dimensions: dimensions,
                        base64: base64,
                        fileUrl: downloadUrl,
                    };
                    resolve(JSON.stringify(data));
                } catch (error) {
                    resolve(null);
                }
            } else {
                resolve(null);
            }
        };
        input.oncancel = () => {
            resolve(null);
        };
        input.click();
    });
};

export const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};
