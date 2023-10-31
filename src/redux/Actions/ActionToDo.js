import {
  Add_Button,
  Add_Element,
  Tweak_Css,
  Update_Parent,
  Update_Text,
} from "./action-types";

export const addElement = (currentDiv) => {
  return {
    type: Add_Element,
    payload: currentDiv,
  };
};

export const addButton = (currentDiv) => ({
  type: Add_Button,
  payload: currentDiv,
});

export const tweakCss = (currentDiv) => ({
  type: Tweak_Css,
  payload: currentDiv,
});

export const updateParent = (currentDiv) => ({
  type: Update_Parent,
  payload: currentDiv,
});
export const updateText = (currentDiv) => ({
  type: Update_Text,
  payload: currentDiv,
});
