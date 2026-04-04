import './Modal.css';
import { X } from 'react-feather';

function InvalidAPIKey({ isOpen, handleClose }) {
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
        <h4>Invalid API Key</h4>
      </section>
    </div>
  );
}

export default InvalidAPIKey;
