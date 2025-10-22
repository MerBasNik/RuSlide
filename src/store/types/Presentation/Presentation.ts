import { type Slide } from "./Slide.ts";
import { generateId } from "./Id.ts";

type Presentation = {
    name: string;
    slides: Map<string, Slide>;
    slidesOrder: Array<string>;
    selectedSlides: Array<string>;
    currentSlide: string;
};

function createPresentation(name: string): Presentation {
    return {
        name: name || "New Presentation",
        slides: new Map<string, Slide>(),
        slidesOrder: [],
        selectedSlides: [],
        currentSlide: generateId(),
    };
}

function setPresentationName(presentation: Presentation, name: string): Presentation {
    return { ...presentation, name: name };
}

function addSlide(presentation: Presentation, slide: Slide): Presentation {
    return {
        ...presentation,
        slides: new Map(presentation.slides).set(slide.id, slide),
        currentSlide: slide.id,
        selectedSlides: [slide.id],
        slidesOrder: [...presentation.slidesOrder, slide.id],
    };
}
function deleteSlide(presentation: Presentation, slideId: string): Presentation {
    const newSlides = new Map(presentation.slides);
    newSlides.delete(slideId);

    return {
        ...presentation,
        slides: newSlides,
        slidesOrder: presentation.slidesOrder.filter(id => id !== slideId),
        selectedSlides: presentation.selectedSlides.filter(id => id !== slideId),
        currentSlide:
            presentation.currentSlide === slideId
                ? presentation.slidesOrder[0] || ""
                : presentation.currentSlide,
    };
}
function selectSlide(presentation: Presentation, selectSlideId: string): Presentation {
    if (!presentation.slides.has(selectSlideId)) {
        return presentation;
    }
    return {
        ...presentation,
        currentSlide: selectSlideId,
        selectedSlides: [selectSlideId],
    };
}
function addSlideToSelection(presentation: Presentation, selectSlideId: string): Presentation {
    if (
        !presentation.slides.has(selectSlideId) ||
        presentation.selectedSlides.includes(selectSlideId)
    ) {
        return presentation;
    }
    return {
        ...presentation,
        selectedSlides: [...presentation.selectedSlides, selectSlideId],
    };
}

export type { Presentation };

export {
    createPresentation,
    setPresentationName,
    addSlide,
    deleteSlide,
    selectSlide,
    addSlideToSelection,
};
