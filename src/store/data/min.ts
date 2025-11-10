// import {
//     addSlide,
//     addSlideToSelection,
//     createPresentation,
//     deleteSlide,
//     type Presentation,
//     selectSlide,
//     setPresentationName,
// } from "../types/Presentation/Presentation.ts";
// import {
//     createSlide,
//     type Slide,
//     type SlideObject,
// } from "../types/Presentation/Slide.ts";
// import { createText } from "../types/SlideObject/Text/Text.ts";
// import { createTextStyle, type TextStyle } from "../types/SlideObject/Text/TextStyle.ts";
// import {
//     type Position,
//     type Size,
// } from "../types/SlideObject/DefaultObject.ts";
// import { createImage } from "../types/SlideObject/Image.ts";
// // import { type Background, createBackgroundPicture } from "../types/Background/Background.ts";
//
// export let presentationMin: Presentation = createPresentation("");
// export const slideMin: Slide = createSlide();
// export const slideMin2: Slide = createSlide();
// export const textStyleMin: TextStyle = createTextStyle({});
// const textSize: Size = {
//     width: 100,
//     height: 100,
// };
// const textPos: Position = {
//     x: 0,
//     y: 0,
// };
// export const textMin: SlideObject = createText("", textStyleMin, textSize, textPos);
// const imageSize: Size = {
//     width: 100,
//     height: 100,
// };
// const imagePos: Position = {
//     x: 0,
//     y: 0,
// };
// export const picture: SlideObject = createImage("", imageSize, imagePos);
//
// presentationMin = addSlide(presentationMin, slideMin);
// console.log("pres: ", presentationMin);
// // slideMin = addObject(slideMin, textMin);
// // slideMin = addObject(slideMin, picture);
// console.log("slide: ", slideMin);
//
// // const backgroundPicture: Background = createBackgroundPicture("./images/background.jpg");
// // slideMin = setBackground(slideMin, backgroundPicture);
// console.log("slide: ", slideMin);
// presentationMin = setPresentationName(presentationMin, "Change my presentation");
// console.log("pres: ", presentationMin);
//
// // slideMin = moveObjectUp(slideMin, textMin.id);
// console.log("slide: ", slideMin);
// // slideMin = moveObjectDown(slideMin, picture.id);
// console.log("slide: ", slideMin);
//
// // slideMin = selectObject(slideMin, picture.id);
// // slideMin = addObjectToSelection(slideMin, textMin.id); //?
// console.log("slide: ", slideMin);
//
// presentationMin = selectSlide(presentationMin, slideMin.id);
// presentationMin = addSlideToSelection(presentationMin, slideMin2.id);
// console.log("pres: ", presentationMin);
//
// // picture = setRotation(picture, 90);
// // picture = setSize(picture, { width: 230, height: 120 });
// // picture = setPosition(picture, { x: 30, y: 40 });
// console.log("picture: ", picture);
//
// // slideMin = deleteObject(slideMin, slideMin.id);
// console.log("slide: ", slideMin);
// presentationMin = deleteSlide(presentationMin, [slideMin.id]);
// console.log("pres: ", presentationMin);
