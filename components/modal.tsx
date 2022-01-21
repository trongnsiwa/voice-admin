import { Transition } from '@headlessui/react';
import { Fragment, MutableRefObject, useRef } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

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
}

const Modal = ({ open, title, description, btnCancel, btnOK }: ModalProps) => {
  const banModalRef = useRef(null);

  useOnClickOutside(banModalRef, btnCancel.onClick);

  return (
    <div className={`modal ${open && 'modal-open'}`}>
      <Transition
        show={open}
        enter="transition transform duration-300"
        enterFrom="scale-0"
        enterTo="scale-100"
        leave="transition transform duration-300"
        leaveFrom="scale-100"
        leaveTo="scale-0"
      >
        <div
          className="modal-box font-semibold text-center text-gray-500"
          ref={banModalRef}
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
      </Transition>
    </div>
  );
};

export default Modal;
