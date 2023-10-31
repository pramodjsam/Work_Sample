import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import "./RightClickDropdown.css";
import { connect } from "react-redux";

const RightClickDropdown = ({
  x,
  y,
  onClose,
  setOpenModal,
  setCssModal,
  setType,
  setTextModal,
  div,
}) => {
  const [show] = useState(true);

  const handleMenuItemClick = (menuItem) => {
    if (menuItem === "Css") {
      setCssModal(true);
    } else if (menuItem === "Text") {
      setTextModal(true);
    } else {
      setType(menuItem);
      setOpenModal(true);
    }
  };

  const isButton =
    div &&
    div[0] &&
    div[0].tagName &&
    div[0].tagName.toLowerCase() === "button";

  return (
    <Dropdown
      className={`custom-fade-in ${show ? "active" : ""}`}
      style={{
        position: "absolute",
        left: x - 30,
        top: y - 50,
      }}
      show={show}
      onToggle={(isOpen) => {
        if (!isOpen) {
          onClose();
        }
      }}
    >
      <Dropdown.Toggle
        variant="success"
        id="dropdown-basic"
        style={{ visibility: "hidden" }}
      >
        Right-Click Dropdown
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {!isButton && (
          <>
            <Dropdown.Item onClick={() => handleMenuItemClick("Div")}>
              Add Div
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleMenuItemClick("Section")}>
              Add Section
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleMenuItemClick("Button")}>
              Add Button
            </Dropdown.Item>
          </>
        )}
        <Dropdown.Item onClick={() => handleMenuItemClick("Css")}>
          Tweak CSS
        </Dropdown.Item>
        {isButton && (
          <Dropdown.Item onClick={() => handleMenuItemClick("Text")}>
            Edit Text
          </Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

const mapStateToProps = (state) => ({
  div: state.reducer,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(RightClickDropdown);
