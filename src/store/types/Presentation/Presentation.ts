import { type Slide } from "./Slide.ts";
import { generateId } from "./Id.ts";

interface Presentation {
    id: string;
    name: string;
    slides: Record<string, Slide>;
    slidesOrder: string[];
    selectedSlides: string[];
    currentSlide: string;
}

function createPresentation(name?: string): Presentation {
    return {
        id: generateId(),
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
