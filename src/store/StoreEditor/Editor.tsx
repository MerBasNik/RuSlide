// import type { Presentation } from "../types/Presentation/Presentation.ts";
// import { presentationMax } from "../data/max.ts";
//
// export let editor: Presentation = presentationMax;
// let editorChangeHandler: () => void | null;
//
// function setEditor(newEditor: Presentation) {
//     editor = newEditor;
// }
//
//
// export function addEditorChangeHandler(handler: () => any) {
//     editorChangeHandler = handler;
// }
//
// type TypePayload = {
//     editor: Presentation;
//     data: any[];
// };
//
// export function dispatch(modifyFunc , payload: TypePayload) {
//     const newEditor = modifyFunc(payload.editor, ...payload.data);
//     setEditor(newEditor);
//     if (editorChangeHandler) {
//         editorChangeHandler();
//     }
// }
