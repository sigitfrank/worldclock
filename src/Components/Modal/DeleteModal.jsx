import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const DeleteModal = ({ show, toggleModal, selectedClock, onDeleteClock }) => {
    if (!selectedClock) return
    return <Modal show={show} onHide={() => toggleModal('delete', false)} centered>
        <Modal.Header closeButton>
            <Modal.Title>Delete Clock</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure deleting <span className='fw-bold'>{selectedClock.city}</span> clock?</Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={() => toggleModal('delete', false)}>
                Cancel
            </Button>
            <Button variant="danger" onClick={() => {
                onDeleteClock(selectedClock)
                toggleModal('delete', false)
            }}>
                Delete
            </Button>
        </Modal.Footer>
    </Modal>
}

export default DeleteModal