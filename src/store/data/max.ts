import { createText } from "../types/SlideObject/Text/Text.ts";
import { createImage } from "../types/SlideObject/Image.ts";
import {
    addSlide,
    createPresentation,
    type Presentation,
    setCurrentSlidePres,
    setPresentationName,
} from "../types/Presentation/Presentation.ts";
import {
    addObject,
    addObjectToSelection,
    createSlide,
    selectObject,
    type Slide,
    type SlideObject,
} from "../types/Presentation/Slide.ts";
import {
    createTextStyle,
    setColor,
    setDecoration,
    setFontFamily,
    setFontSize,
    setFontStyle,
    setFontWeight,
    setLineHeight,
    setTextStyle,
    type TextStyle,
} from "../types/SlideObject/Text/TextStyle.ts";
import {
    type Size,
} from "../types/SlideObject/DefaultObject.ts";
import type { Position } from "../types/SlideObject/DefaultObject.ts";

export let presentationMax: Presentation = createPresentation("");
export const slideMax: Slide = createSlide(0);
export const slideMax2: Slide = createSlide(1);
export const slideMax3: Slide = createSlide(2);

export let textStyleMax: TextStyle = createTextStyle({
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "sans-serif",
    fontStyle: "italic",
    lineHeight: 1,
    color: "#000000",
    decoration: "underline",
});
const textSize: Size = {
    width: 300,
    height: 100,
};
const textPos: Position = {
    x: 300,
    y: 50,
};
export let textMax: SlideObject = createText(
    "We are learning typescript and react on course",
    textStyleMax,
    textSize,
    textPos
);
export const textMax2: SlideObject = createText(
    "ABCD",
    textStyleMax,
    textSize,
    {
        x: 50,
        y: 200,
    }
);
const imageSize: Size = {
    width: 100,
    height: 100,
};
const imagePos: Position = {
    x: 0,
    y: 0,
};
export const picture: SlideObject = createImage("./images/test_photo.jpg", imageSize, imagePos);
export const picture2: SlideObject = createImage("./images/test_photo.jpg", imageSize, {
    x: 100,
    y: 100,
});
export const picture3: SlideObject = createImage("./images/logo3.png", imageSize, {
    x: 200,
    y: 200,
});

// presentationMax = addSlide(presentationMax, slideMax);
// console.log("pres: ", presentationMax);
// slideMax = addObject(slideMax, textMax);
// slideMax = addObject(slideMax, picture);
// console.log("slide: ", slideMax);

// const backgroundPicture: Background = createBackgroundPicture("./images/background.jpg");
// slideMax = setBackground(slideMax, backgroundPicture);
// console.log("slide: ", slideMax);

// presentationMax = addSlide(presentationMax, slideMax2);
// presentationMax = addSlide(presentationMax, slideMax3);
// console.log("pres: ", presentationMax);

presentationMax = setPresentationName(presentationMax, "My presentation");
// console.log("pres: ", presentationMax);

textStyleMax = setFontSize(textStyleMax, 20);
textStyleMax = setFontFamily(textStyleMax, "sans-regular");
textStyleMax = setFontStyle(textStyleMax, "italic");
textStyleMax = setFontWeight(textStyleMax, "bold");
textStyleMax = setLineHeight(textStyleMax, 2.5);
textStyleMax = setColor(textStyleMax, "black");
textStyleMax = setDecoration(textStyleMax, "underline");
// textMax = setContent(textMax, "new content 12345");
textMax = setTextStyle(textMax, textStyleMax);
// console.log("text: ", textMax);

// slideMax = moveObjectUp(slideMax, textMax.id);
// console.log("slide: ", slideMax);
// slideMax = moveObjectDown(slideMax, picture.id);
// console.log("slide: ", slideMax);

// slideMax = selectObject(slideMax, picture.id);
// slideMax = addObjectToSelection(slideMax, textMax.id);
// console.log("slide: ", slideMax);

// presentationMax = selectSlide(presentationMax, slideMax.id);
// presentationMax = addSlideToSelection(presentationMax, slideMax2.id);
// console.log("pres: ", presentationMax);
// picture = setRotation(picture, 90);
// picture = setSize(picture, { width: 230, height: 120 });
// picture = setPosition(picture, { x: 30, y: 40 });
// console.log("picture: ", picture);

// slideMax = deleteObject(slideMax, slideMax.id);
// console.log("slide: ", slideMax);
// presentationMax = deleteSlide(presentationMax, slideMax.id);
// presentationMax = deleteSlide(presentationMax, slideMax2.id);
// console.log("pres: ", presentationMax);
// presentationMax = addSlide(presentationMax, slideMax);
// presentationMax = addSlide(presentationMax, slideMax2);

function FFFF(presentation: Presentation, slideId: string, objectIds: string[]): Presentation {
    const slide = presentation.slides.get(slideId);
    // console.log(objectIds.length);
    if (!slide || objectIds.length === 0) {
        return presentation;
    }
    const newPresentation = {
        ...presentation,
        slides: new Map(presentation.slides),
    };
    const order = [...slide.objectsOrder];
    // console.log("order: ", order);
    let hasChanges = false;
    const objectIndices = objectIds
        .map(id => order.indexOf(id))
        .filter(index => index !== -1)
        .sort((a, b) => b - a);
    // console.log("objectIndices: ", objectIndices);
    for (const currentIndex of objectIndices) {
        if (currentIndex < order.length - 1) {
            const nextIndex = currentIndex + 1;

            if (!objectIds.includes(order[nextIndex])) {
                [order[currentIndex], order[nextIndex]] = [order[nextIndex], order[currentIndex]];
                hasChanges = true;
            }
        }
    }
    if (!hasChanges) {
        return presentation;
    }
    const newSlide = {
        ...slide,
        objects: new Map(slide.objects),
        objectsOrder: order,
        selectedObjects: [...slide.selectedObjects],
    };
    newPresentation.slides.set(slideId, newSlide);
    return newPresentation;
}
const slide: Slide = createSlide(0);
presentationMax = addSlide(presentationMax, slide);
presentationMax = addObject(presentationMax, slide.id, textMax);
presentationMax = addObject(presentationMax, slide.id, picture);
presentationMax = addObject(presentationMax, slide.id, textMax2);
presentationMax = addObject(presentationMax, slide.id, picture2);
presentationMax = addObject(presentationMax, slide.id, picture3);
// console.log(presentationMax.slides.get(slide.id)?.objectsOrder);
presentationMax = selectObject(presentationMax, slide.id, textMax.id);
presentationMax = addObjectToSelection(presentationMax, slide.id, textMax2.id);
const selected = presentationMax.slides.get(slide.id)?.selectedObjects;
// console.log(selected);
if (selected) {
    presentationMax = FFFF(presentationMax, slide.id, selected);
}
// console.log(presentationMax.slides.get(slide.id)?.objectsOrder);
presentationMax = addSlide(presentationMax, slideMax);
presentationMax = addSlide(presentationMax, slideMax2);
presentationMax = addSlide(presentationMax, slideMax3);
presentationMax = setCurrentSlidePres(presentationMax, slide.id);

export const SlidesArray: Slide[] = presentationMax.slidesOrder
    .map(slideId => {
        return presentationMax.slides.get(slideId);
    })
    .filter((slide): slide is Slide => slide != undefined);
