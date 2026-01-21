import { type Slide } from "./Slide.ts";
import { generateId } from "./Id.ts";
import type { Theme } from "../Background/Background.ts";

type Presentation = {
    id: string;
    name: string;
    slides: Record<string, Slide>;
    slidesOrder: string[];
    selectedSlides: string[];
    currentSlide: string;
    theme: Theme | null;
};

function createPresentation(name?: string): Presentation {
    return {
        id: generateId(),
        name: name || "New Presentation",
        slides: {},
        slidesOrder: [],
        selectedSlides: [],
        currentSlide: "",
        theme: null,
    };
}

export type { Presentation };
export { createPresentation };
