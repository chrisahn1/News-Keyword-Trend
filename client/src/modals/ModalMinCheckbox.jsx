import './Modal.css';
import { X } from 'react-feather';

function MinCheckbox({ isOpen, handleClose }) {
  return (
    <div className={isOpen ? 'modal display-block' : 'modal display-none'}>
      <div className="modal-main">
        <X className="closeIcon" onClick={handleClose} />
        <div>
          <h2>Please have at least 1 news check box filled</h2>
        </div>
      </div>
    </div>
  );
}

export default MinCheckbox;
