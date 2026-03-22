import './Modal.css';
import { X } from 'react-feather';

function RequestLimit({ isOpen, handleClose }) {
  return (
    <div
      className={isOpen ? 'modal display-block' : 'modal display-none'}
      onClick={(e) => {
        if (e.target.className === 'modal display-block') {
          handleClose();
        }
      }}>
      <section className="modal-main error">
        <X className="closeIcon" onClick={handleClose} />
        <h4>Error 429: Request limited</h4>
      </section>
    </div>
  );
}

export default RequestLimit;
