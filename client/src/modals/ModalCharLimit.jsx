import './Modal.css';
import { X } from 'react-feather';

function CharLimit({ isOpen, handleClose }) {
  return (
    <div className={isOpen ? 'modal display-block' : 'modal display-none'}>
      <div className="modal-main">
        <X className="closeIcon" onClick={handleClose} />
        <div>
          <h3>Character must be between 0 and 15 and must be letters only</h3>
        </div>
      </div>
    </div>
  );
}

export default CharLimit;
