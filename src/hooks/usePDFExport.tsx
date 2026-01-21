import { useCallback, useRef } from "react";
import { exportSlidesToPDF } from "../../services/PDFExport/PDFExport.tsx";
import type { Slide } from "../store/types/Presentation/Slide.ts";

export const usePDFExport = () => {
    const slidesData = useRef<Slide[]>([]);

    const setSlidesData = useCallback((slides: Slide[]) => {
        slidesData.current = slides;
    }, []);

    const exportToPDF = useCallback(async (fileName: string) => {
        if (slidesData.current.length === 0) {
            throw new Error("Нет слайдов для экспорта");
        }
        await exportSlidesToPDF({ slides: slidesData.current, fileName });
    }, []);

    return {
        setSlidesData,
        exportToPDF,
        slidesData,
    };
};
