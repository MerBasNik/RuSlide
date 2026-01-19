import { useCallback, useRef } from "react";
import { exportSlidesToPDF, type PDFExportOptions } from "../../services/PDFExport/PDFExport.tsx";
import type { Slide } from "../store/types/Presentation/Slide.ts";

export const usePDFExport = () => {
    const slidesData = useRef<Slide[]>([]);

    const setSlidesData = useCallback((slides: Slide[]) => {
        slidesData.current = slides;
    }, []);

    const exportToPDF = useCallback(async (options: PDFExportOptions = {}) => {
        if (slidesData.current.length === 0) {
            throw new Error("Нет слайдов для экспорта");
        }
        await exportSlidesToPDF(slidesData.current, options);
    }, []);

    return {
        setSlidesData,
        exportToPDF,
        slidesData,
    };
};
