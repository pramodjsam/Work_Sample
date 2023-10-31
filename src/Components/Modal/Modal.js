import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { updateParent } from "../../redux/Actions/ActionToDo";

function CustomModal({ open, setOpen, addElementHandler, type, div }) {
  const [content, setContent] = useState("");
  const [depthverify, setDepthVerify] = useState(true);

  const closeModal = () => {
    setOpen(false);

    setTimeout(() => {
      setContent("");
      setDepthVerify(true);
    }, 800);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const depth = elementDepth(div[0]);
    if (depth < 5) {
      addElementHandler(content);
      closeModal();
    } else {
      setDepthVerify(false);
    }
  };

  const elementDepth = (element) => {
    let depth = 0;
    while (element && element.className !== "dynamic-content") {
      depth++;
      element = element.parentElement;
    }
    return depth;
  };

  return (
    <Modal show={open} onHide={closeModal}>
      <Form onSubmit={submitHandler}>
        {depthverify ? (
          <Modal.Body>
            <Form.Label>{type} Name</Form.Label>

            <Form.Control
              type="text"
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Modal.Body>
        ) : (
          <Modal.Body>
            {" "}
            <Form.Label style={{ color: "red", opacity: "0.7" }}>
              {" "}
              You can nest only upto 5 children
            </Form.Label>
          </Modal.Body>
        )}
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>

          {depthverify && (
            <Button variant="success" type="submit">
              Add {type}
            </Button>
          )}
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
const mapStateToProps = (state) => {
  return { div: state.reducer };
};

const mapDispatchToProps = (dispatch) => ({
  updateParent: (currentDiv) => dispatch(updateParent(currentDiv)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomModal);
