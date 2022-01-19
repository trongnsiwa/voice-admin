import { MutableRefObject } from 'react';

interface ModalProps {
  open: boolean;
  title: string;
  description: string;
  btnCancel: {
    name: string;
    class: string;
    onClick: () => void;
  };
  btnOK: {
    name: string;
    class: string;
    onClick: () => void;
  };
  ref: MutableRefObject<null>;
}

const Modal = ({
  open,
  title,
  description,
  btnCancel,
  btnOK,
  ref,
}: ModalProps) => {
  return open ? (
    <div className={`modal ${open && 'modal-open'}`}>
      <div
        className="modal-box font-semibold text-center text-gray-500"
        ref={ref}
      >
        <p className="font-bold text-xl text-black mt-3 mb-1">{title}</p>
        <p>{description}</p>
        <p>Are you sure?</p>
        <div className="modal-action mt-3">
          <button className={btnCancel.class} onClick={btnCancel.onClick}>
            {btnCancel.name}
          </button>
          <button onClick={btnOK.onClick} className={btnOK.class}>
            {btnOK.name}
          </button>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Modal;
