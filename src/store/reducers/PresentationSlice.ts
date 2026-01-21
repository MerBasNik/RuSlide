import { createSlice } from "@reduxjs/toolkit";
import { type Presentation } from "../types/Presentation/Presentation.ts";
import {
    addSlideAction,
    deleteSlideAction,
    restoreStateAction,
    selectSlideAction,
    setBackgroundAction,
    setCurrentSlideAction,
    setPresentationAction,
    setPresentationNameAction,
    setSlidesOrderAction,
    setThemeAction,
} from "./PresentationActions.ts";
import {
    addObjectAction,
    deleteObjectAction,
    moveObjectDownAction,
    moveObjectUpAction,
    selectObjectAction,
    setContentAction,
    setCurrentObjectAction,
    setPositionAction,
    setRotationAction,
    setSizeAction,
    updateTextObjectAction,
    updateTextStyleAction,
} from "./ObjectActions.ts";

const initialState: Presentation = <Presentation>{};

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
        updateTextObject: updateTextObjectAction,
        updateTextStyle: updateTextStyleAction,
        setCurrentObject: setCurrentObjectAction,
        setTheme: setThemeAction,
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
    setPosition,
    setContent,
    updateTextObject,
    updateTextStyle,
    setCurrentObject,
    setTheme,
} = presentationSlice.actions;

export default presentationSlice.reducer;
