import { pdf } from "@react-pdf/renderer";
import type { Slide } from "../../src/store/types/Presentation/Slide.ts";
import PDFDocumentComponent from "../../src/components/PDFDocument/PDFDocument.tsx";

type PDFExportProps = {
    slides: Slide[];
    fileName: string;
};

export const exportSlidesToPDF = async ({ slides, fileName }: PDFExportProps): Promise<void> => {
    if (slides.length === 0) {
        throw new Error("Нет слайдов для экспорта");
    }

    try {
        const blob = await pdf(<PDFDocumentComponent slides={slides} />).toBlob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        link.click();
        setTimeout(() => URL.revokeObjectURL(url), 100);
    } catch (error) {
        throw new Error(`Не удалось экспортировать PDF: ${error}`);
    }
};
