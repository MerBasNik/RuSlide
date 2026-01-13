import { createSlice } from "@reduxjs/toolkit";
import  { createPresentation, type Presentation } from "../types/Presentation/Presentation.ts";
import {
    addSlideAction,
    deleteSlideAction,
    restoreStateAction,
    selectSlideAction,
    setBackgroundAction,
    setCurrentSlideAction, setPresentationAction,
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

const initialState: Presentation = {}; // = createPresentation("New Presentation");

const presentationSlice = createSlice({
    name: "presentation",
    initialState,
    reducers: {
        setPresentation: setPresentationAction,
        setPresentationName: setPresentationNameAction,
        addSlide: addSlideAction,
        deleteSlide: deleteSlideAction,
        selectSlide: selectSlideAction,
        setSlidesOrder: setSlidesOrderAction,
        setCurrentSlide: setCurrentSlideAction,
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
        restoreState: restoreStateAction,
    },
});

export const {
    setPresentation,
    setPresentationName,
    restoreState,
    addSlide,
    deleteSlide,
    selectSlide,
    setCurrentSlide,
    setSlidesOrder,
    addObject,
    deleteObject,
    setBackground,
    setSize,
    selectObject,
    setPosition,
    setContent,
} = presentationSlice.actions;

export default presentationSlice.reducer;
