import { saveDOMElements } from "../../Components/AddDiv/AddDiv";
import {
  Add_Element,
  Tweak_Css,
  Update_Parent,
  Update_Text,
} from "../Actions/action-types";

const initialState = [
  {
    parentDiv: "",
  },
];
export default function Reducer(state = initialState, action) {
  // helper functions

  const randomColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return randomColor;
  };

  switch (action.type) {
    case Add_Element:
      const parentDiv = state[0];

      //element creation
      const element_type = action.payload.type.toLowerCase();
      const element = document.createElement(element_type);
      element.innerHTML = action.payload.content;

      //element styling
      element.style.backgroundColor = `#${randomColor()}`;
      element.style.color = `#${randomColor()}`;

      //adding child to parent Div
      parentDiv.appendChild(element);
      element.classList.add("div-styling");
      //saving current DOM
      saveDOMElements();
      return [...state, action.payload];

    case Tweak_Css:
      const div = action.payload.parentDiv;
      const properties = action.payload.properties;

      // applying all the css
      for (const key in properties) {
        if (properties.hasOwnProperty(key)) {
          div.style[key] = properties[key];
        }
      }
      return state;

    case Update_Parent:
      return [action.payload.parentDiv];
    case Update_Text:
      const currentDiv = state[0];
      const parent_Div = currentDiv.parentElement;
      const newDiv = document.createElement(currentDiv.tagName.toLowerCase());
      newDiv.textContent = action.payload.content;
      newDiv.style.color = currentDiv.style.color;
      newDiv.style.backgroundColor = currentDiv.style.backgroundColor;
      newDiv.classList.add("div-styling");

      // Iterate through the children of currentDiv and append them to newDiv
      for (const child of currentDiv.children) {
        newDiv.appendChild(child);
      }

      // Replace the currentDiv with newDiv in the parentDiv
      parent_Div.replaceChild(newDiv, currentDiv);

      saveDOMElements();
      return state;

    default:
      return state;
  }
}
