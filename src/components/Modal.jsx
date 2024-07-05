import '../styles/modal.scss'

const Modal = ({ isOpen, onClose, children }) => {
  return isOpen ? (
    <div className="modal">
      <button className="modal-close-btn" onClick={onClose}>
        <span aria-hidden="true">&times;</span>
      </button>
      <div className="content">{children}</div>
    </div>
  ) : null
}

export default Modal
