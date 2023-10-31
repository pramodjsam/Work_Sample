import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import CustomModal from "../Modal/Modal";
import {
  addElement,
  tweakCss,
  updateParent,
} from "../../redux/Actions/ActionToDo";
import RightClickDropdown from "../RightClickDropdown/RightClickDropdown ";
import TweakCssModal from "../Modal/TweakCssModal";
import TextModal from "../Modal/TextModal";
export const saveDOMElements = () => {
  const appContainer = document.querySelector("#dynamic-content");
  if (appContainer) {
    const serializedHTML = appContainer.innerHTML;
    sessionStorage.setItem("dynamic-content", serializedHTML);
    return document.querySelector("#dynamic-content");
  }
};

function AddDiv({ addElement, tweakCss, setParent }) {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("");
  const [openCssModal, setOpenCssModal] = useState(false);
  const [openTextModal, setOpenTextModal] = useState(false);
  const [parentDiv, setParentDiv] = useState("dynamic-content");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownX, setDropdownX] = useState(0);
  const [dropdownY, setDropdownY] = useState(0);

  const handleRightClick = (e) => {
    const scrollX = window.scrollX || window.scrollX; // Get horizontal scroll position
    const scrollY = window.scrollY || window.scrollY; // Get vertical scroll position
    e.preventDefault();
    setDropdownVisible(true);
    setDropdownX(e.clientX + scrollX);
    setDropdownY(e.clientY + scrollY);
    setParentDiv(e.target);
    setType(e.target.tagName);
    setParent({ parentDiv: e.target });
  };

  const closeDropdown = () => {
    setDropdownVisible(false);
  };

  const handleMenuItemClick = (menuItem) => {
    alert(`Clicked: ${menuItem}`);
    addElementHandler();

    closeDropdown();
  };

  useEffect(() => {
    const storedHTML = sessionStorage.getItem("dynamic-content");

    if (storedHTML) {
      document.querySelector("#dynamic-content").innerHTML = storedHTML;
    }
  }, []);

  const addElementHandler = (content) => {
    addElement({ parentDiv, type, content });
    setParentDiv({ parentDiv: "dynamic-content" });
  };

  const tweakCssHandler = (properties) => {
    tweakCss({ parentDiv, properties });
    setParentDiv({ parentDiv: "dynamic-content" });
  };

  return (
    <div className="text-end gap-2 p-0 text-center">
      {/* Modal for adding Div,section and button */}
      <CustomModal
        open={open}
        setOpen={setOpen}
        addElementHandler={addElementHandler}
        type={type}
      />

      {/* Modal to tweak CSS */}

      <TweakCssModal
        openCssModal={openCssModal}
        setOpenCssModal={setOpenCssModal}
        tweakCssHandler={tweakCssHandler}
        type={type}
      />

      <TextModal
        openTextModal={openTextModal}
        setOpenTextModal={setOpenTextModal}
        // textModalHandler={textModalHandler}
      />

      {/* navbar */}
      <div
        className="buttons_container"
        style={{
          display: "flex",
          justifyContent: "end",
          gap: "1rem",
          padding: "2rem 2rem",
        }}
      >
        <Button
          onClick={() => {
            setOpen(true);
            setType("Div");
            setParent({
              parentDiv: document.querySelector("#dynamic-content"),
            });
          }}
          type="button"
          variant="primary"
        >
          Add Div
        </Button>
        <Button
          onClick={() => {
            setOpen(true);
            setType("Section");
            setParent({
              parentDiv: document.querySelector("#dynamic-content"),
            });
          }}
          type="button"
          variant="primary"
        >
          Add Section
        </Button>

        <Button
          onClick={() => {
            setOpen(true);
            setType("Button");
            setParent({
              parentDiv: document.querySelector("#dynamic-content"),
            });
          }}
          type="button"
          variant="primary"
        >
          Add Button
        </Button>
      </div>

      <div
        onContextMenu={handleRightClick}
        style={{ height: "100%" }}
        id="dynamic-content"
        className="dynamic-content"
      >
        {dropdownVisible && (
          <RightClickDropdown
            x={dropdownX}
            y={dropdownY}
            onClose={closeDropdown}
            onMenuItemClick={handleMenuItemClick}
            //modal controls
            openModal={open}
            setOpenModal={setOpen}
            setCssModal={setOpenCssModal}
            addElementHandler={addElementHandler}
            type={type}
            setType={setType}
            setTextModal={setOpenTextModal}
          />
        )}
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return { divs: state.reducer };
};

const mapDispatchToProps = (dispatch) => ({
  addElement: (selectedDiv) => dispatch(addElement(selectedDiv)),
  tweakCss: (currentDiv) => dispatch(tweakCss(currentDiv)),
  setParent: (parentDiv) => dispatch(updateParent(parentDiv)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AddDiv);
