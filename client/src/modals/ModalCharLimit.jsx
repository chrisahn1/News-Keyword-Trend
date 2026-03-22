import './Modal.css';
import { X } from 'react-feather';

function CharLimit({ isOpen, handleClose }) {
  return (
    <div
      className={isOpen ? 'modal display-block' : 'modal display-none'}
      onClick={(e) => {
        if (e.target.className === 'modal display-block') {
          handleClose();
        }
      }}>
      <section className="modal-main">
        <X className="closeIcon" onClick={handleClose} />
        <h4>Character must be between 0 and 15 and must be letters only</h4>
      </section>
    </div>
  );
}

export default CharLimit;
