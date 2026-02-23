import './Modal.css';
import { X } from 'react-feather';

function RequestLimit({ isOpen, handleClose }) {
  return (
    <div className={isOpen ? 'modal display-block' : 'modal display-none'}>
      <div className="modal-main">
        <X className="closeIcon" onClick={handleClose} />
        <div>
          <h2>Error Message</h2>
        </div>
      </div>
    </div>
  );
}

export default RequestLimit;
