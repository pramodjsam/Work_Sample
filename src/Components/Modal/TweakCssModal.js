import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import "./TweakCssModal.css";
export default function TweakCssModal({
  openCssModal,
  setOpenCssModal,
  tweakCssHandler,
}) {
  const [, setContent] = useState("");
  const [formValues, setFormValues] = useState({});

  const closeModal = () => {
    setOpenCssModal(false);
    setContent("");
  };
  const submitHandler = (e) => {
    e.preventDefault();
    closeModal();
    tweakCssHandler(formValues);
    setFormValues({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  return (
    <Modal show={openCssModal} onHide={closeModal} centered>
      <Form onSubmit={submitHandler}>
        <Modal.Body>
          <h4 className="mainHeading">Tweak CSS</h4>

          {/* // margin parent */}

          <div className="marginContainer">
            <Form.Label className="label">Margin</Form.Label>
            <div className="rightContainer">
              <div className="rightContainerFirstContainer">
                <Form.Control
                  name="margin-top"
                  type="text"
                  className="control"
                  placeholder="Top"
                  onChange={handleInputChange}
                ></Form.Control>
              </div>

              <div className="rightContainerSecondContainer">
                <Form.Control
                  name="margin-left"
                  type="text"
                  className="control"
                  placeholder="Left"
                  onChange={handleInputChange}
                ></Form.Control>

                <Form.Control
                  name="margin-right"
                  type="text"
                  className="control"
                  placeholder="Right"
                  onChange={handleInputChange}
                ></Form.Control>
              </div>
              <div className="rightContainerThirdContainer">
                <Form.Control
                  name="margin-bottom"
                  type="text"
                  className="control"
                  placeholder="Bottom"
                  onChange={handleInputChange}
                ></Form.Control>
              </div>
            </div>
          </div>

          <div className="marginContainer">
            <Form.Label className="label">Padding</Form.Label>
            <div className="rightContainer">
              <div className="rightContainerFirstContainer">
                <Form.Group>
                  <Form.Control
                    name="padding-top"
                    type="text"
                    className="control"
                    placeholder="Top"
                    onChange={handleInputChange}
                  ></Form.Control>
                </Form.Group>
              </div>

              <div className="rightContainerSecondContainer">
                <Form.Control
                  name="padding-left"
                  type="text"
                  className="control"
                  placeholder="Left"
                  onChange={handleInputChange}
                ></Form.Control>

                <Form.Control
                  name="padding-right"
                  type="text"
                  className="control"
                  placeholder="Right"
                  onChange={handleInputChange}
                ></Form.Control>
              </div>
              <div className="rightContainerThirdContainer">
                <Form.Control
                  name="padding-bottom"
                  type="text"
                  className="control"
                  placeholder="Bottom"
                  onChange={handleInputChange}
                ></Form.Control>
              </div>
            </div>
            <div className="group">
              <Form.Label className="label">Height</Form.Label>
              <Form.Control
                onChange={handleInputChange}
                name="height"
                className="control"
              ></Form.Control>
            </div>
            <div className="group">
              <Form.Label className="label">Width</Form.Label>
              <Form.Control
                onChange={handleInputChange}
                name="width"
                className="control"
              ></Form.Control>
            </div>
            <div className="group">
              <Form.Label className="label">Display</Form.Label>
              <Form.Control
                onChange={handleInputChange}
                name="display"
                className="control"
              ></Form.Control>
            </div>
            <div className="group">
              <Form.Label className="label">Position</Form.Label>
              <Form.Control
                onChange={handleInputChange}
                name="position"
                className="control"
              ></Form.Control>
            </div>
            <div className="group">
              <Form.Label className="label">Background Color</Form.Label>
              <Form.Control
                type="color"
                onChange={handleInputChange}
                name="background-color"
                className="control_color"
              ></Form.Control>
            </div>
            <div className="group">
              <Form.Label className="label">Color</Form.Label>
              <Form.Control
                type="color"
                onChange={handleInputChange}
                name="color"
                className="control_color"
              ></Form.Control>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="footer_button"
            variant="secondary"
            onClick={closeModal}
          >
            Close
          </Button>
          <Button className="footer_button" variant="success" type="submit">
            Apply CSS
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
