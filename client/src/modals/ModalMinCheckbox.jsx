import './Modal.css';
import { X } from 'react-feather';

function MinCheckbox({ isOpen, handleClose }) {
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
        <h4>Please have at least 1 news check box filled</h4>
      </section>
    </div>
  );
}

export default MinCheckbox;
