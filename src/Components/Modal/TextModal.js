import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { updateText } from "../../redux/Actions/ActionToDo";

function TextModal({ div, openTextModal, setOpenTextModal, updateText }) {
  const [name, setName] = useState("");

  const closeModal = () => {
    setOpenTextModal(false);
    setName("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    updateText({ content: name });
    closeModal();
  };
  return (
    <Modal show={openTextModal} onHide={closeModal}>
      <Form onSubmit={submitHandler}>
        <Modal.Body>
          <Form.Label>Edit text</Form.Label>

          <Form.Control
            type="text"
            required
            value={name}
            placeholder={
              div && div[0] && div[0].innerHTML
                ? div[0].innerHTML.split("<")[0]
                : ""
            }
            onChange={(e) => setName(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="success" type="submit">
            Save changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

const mapStateToProps = (state) => {
  return { div: state.reducer };
};

const mapDispatchToProps = (dispatch) => ({
  updateText: (currentDiv) => dispatch(updateText(currentDiv)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TextModal);
