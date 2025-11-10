import { type Slide } from "./Slide.ts";

interface Presentation {
    name: string;
    slides: Record<string, Slide>;
    slidesOrder: string[];
    selectedSlides: string[];
    currentSlide: string;
}

function createPresentation(name?: string): Presentation {
    return {
        name: name || "New Presentation",
        slides: {},
        slidesOrder: [],
        selectedSlides: [],
        currentSlide: "",
    };
}

export type { Presentation };

export {
    createPresentation,
};
