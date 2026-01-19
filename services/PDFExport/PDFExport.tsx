import { pdf } from "@react-pdf/renderer";
import PDFDocumentComponent from "../../src/components/PDFDocument/PDFDocument.tsx";
import type { Slide } from "../../src/store/types/Presentation/Slide.ts";

export interface PDFExportOptions {
    fileName?: string;
}

export const exportSlidesToPDF = async (
    slides: Slide[],
    options: PDFExportOptions = {}
): Promise<void> => {
    // console.log("Slides to export:", slides.length);
    // console.log("First slide:", slides[0]?.objectsOrder?.length, "objects");
    const { fileName = "presentation.pdf" } = options;

    if (slides.length === 0) {
        throw new Error("Нет слайдов для экспорта");
    }

    try {
        // const slidesWithBase64Images = await Promise.all(
        //     slides.map(async slide => {
        //         const newSlide = { ...slide };
        //
        //         // Обрабатываем background picture
        //         if (newSlide.background.type === "picture" && newSlide.background.src) {
        //             newSlide.background.src = newSlide.background.src;
        //         }
        //
        //         // Обрабатываем объекты-изображения
        //         Object.keys(newSlide.objects).forEach(async objectId => {
        //             const obj = newSlide.objects[objectId];
        //             if (obj.type === "image" && obj.src) {
        //                 obj.src = obj.src;
        //             }
        //         });
        //
        //         return newSlide;
        //     })
        // );

        // Создаем PDF-документ
        const blob = await pdf(<PDFDocumentComponent slides={slides} />).toBlob();
        // console.log("PDF blob size:", blob.size);
        // Скачиваем
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        link.click();

        // Очистка
        setTimeout(() => URL.revokeObjectURL(url), 100);
    } catch (error) {
        console.error("Ошибка при экспорте PDF:", error);
        throw new Error(`Не удалось экспортировать PDF: ${error}`);
    }
};

// import { pdf } from "@react-pdf/renderer";
// import PDFDocumentComponent from "../../src/components/PDFDocument/PDFDocument.tsx";
// import type { Slide } from "../../src/store/types/Presentation/Slide.ts";
// import { storage } from "../appwrite/config.ts";
//
// export interface PDFExportOptions {
//     fileName?: string;
// }
//
// // Функция для получения публичного URL изображения
// const getPublicImageUrl = (fileId: string): string => {
//     // Используем preview URL с публичным доступом
//     return storage
//         .getFilePreview(
//             "69367bcc001ade42357f",
//             fileId,
//             1920, // максимальная ширина
//             1080 // максимальная высота
//         )
//         .toString();
// };
//
// // Проверяем, является ли строка fileId (только ID без URL)
// const isFileId = (str: string): boolean => {
//     return /^[a-zA-Z0-9]{10,}$/.test(str) && !str.includes("/") && !str.includes(".");
// };
//
// export const exportSlidesToPDF = async (
//     slides: Slide[],
//     options: PDFExportOptions = {}
// ): Promise<void> => {
//     const { fileName = "presentation.pdf" } = options;
//
//     if (slides.length === 0) {
//         throw new Error("Нет слайдов для экспорта");
//     }
//
//     try {
//         // Создаем глубокую копию слайдов для обработки
//         const processedSlides = slides.map(slide => {
//             // Создаем глубокую копию слайда
//             const newSlide = JSON.parse(JSON.stringify(slide));
//
//             // Обрабатываем background picture
//             if (newSlide.background.type === "picture" && newSlide.background.src) {
//                 // Если это fileId, конвертируем в публичный URL
//                 if (isFileId(newSlide.background.src)) {
//                     newSlide.background.src = getPublicImageUrl(newSlide.background.src);
//                 }
//                 // Если это уже URL, оставляем как есть
//             }
//
//             // Обрабатываем объекты-изображения
//             Object.keys(newSlide.objects).forEach(objectId => {
//                 const obj = newSlide.objects[objectId];
//                 if (obj.type === "image" && obj.src) {
//                     // Если это fileId, конвертируем в публичный URL
//                     if (isFileId(obj.src)) {
//                         obj.src = getPublicImageUrl(obj.src);
//                     }
//                     // Если это уже URL, оставляем как есть
//                 }
//             });
//
//             return newSlide;
//         });
//
//         console.log("Processed slides for PDF:", processedSlides);
//
//         // Создаем PDF-документ
//         const blob = await pdf(<PDFDocumentComponent slides={processedSlides} />).toBlob();
//
//         // Скачиваем
//         const url = URL.createObjectURL(blob);
//         const link = document.createElement("a");
//         link.href = url;
//         link.download = fileName;
//         link.click();
//
//         // Очистка
//         setTimeout(() => URL.revokeObjectURL(url), 100);
//     } catch (error) {
//         console.error("Ошибка при экспорте PDF:", error);
//         throw new Error(`Не удалось экспортировать PDF: ${error}`);
//     }
// };
