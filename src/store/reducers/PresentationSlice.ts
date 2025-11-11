import { createSlice } from "@reduxjs/toolkit";
import  { createPresentation, type Presentation } from "../types/Presentation/Presentation.ts";
import {
    addSlideAction,
    deleteSlideAction,
    selectSlideAction,
    setBackgroundAction,
    setCurrentSlidePresAction,
    setPresentationNameAction,
    setSlidesOrderAction,
} from "./PresentationActions.ts";
import {
    addObjectAction,
    deleteObjectAction,
    moveObjectDownAction,
    moveObjectUpAction,
    selectObjectAction,
    setContentAction,
    setPositionAction,
    setRotationAction,
    setSizeAction,
} from "./ObjectActions.ts";

const initialState: Presentation = createPresentation("New Presentation");

const presentationSlice = createSlice({
    name: "presentation",
    initialState,
    reducers: {
        setPresentationName: setPresentationNameAction,
        addSlide: addSlideAction,
        deleteSlide: deleteSlideAction,
        selectSlide: selectSlideAction,
        setSlidesOrder: setSlidesOrderAction,
        setCurrentSlidePres: setCurrentSlidePresAction,
        addObject: addObjectAction,
        deleteObject: deleteObjectAction,
        moveObjectUp: moveObjectUpAction,
        moveObjectDown: moveObjectDownAction,
        selectObject: selectObjectAction,
        setBackground: setBackgroundAction,
        setSize: setSizeAction,
        setPosition: setPositionAction,
        setRotation: setRotationAction,
        setContent: setContentAction,
    },
});

export const {
    setPresentationName,
    addSlide,
    deleteSlide,
    selectSlide,
    setCurrentSlidePres,
    setSlidesOrder,
    addObject,
    deleteObject,
    moveObjectUp,
    moveObjectDown,
    selectObject,
    setBackground,
    setSize,
    setPosition,
    setRotation,
    setContent,
} = presentationSlice.actions;

export default presentationSlice.reducer;
