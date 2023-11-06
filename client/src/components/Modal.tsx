import ReactDOM from "react-dom";

import { AiOutlineClose } from "react-icons/ai";

import Button from "./Button";

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  hasCancel?: boolean;
  actionFunc?: (...args: unknown[]) => void;
  actionName?: string;
  onClose: () => void;
};

function Modal({
  children,
  isOpen,
  hasCancel = false,
  actionFunc,
  actionName = "OK",
  onClose,
}: ModalProps) {
  if (!isOpen) return null;
  const modalRoot = document.getElementById("portal");

  if (modalRoot)
    return ReactDOM.createPortal(
      <>
        {/* overlay */}
        <div
          onClick={onClose}
          className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-10"
        ></div>
        {/* content */}
        <div className="fixed flex flex-col overflow-hidden top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-5 border shadow-lg rounded-md bg-gray-200 bg-opacity-95 z-20">
          <AiOutlineClose
            className="ml-auto text-gray-500"
            fontSize={24}
            onClick={onClose}
          />
          <div className="m-2 p-2 text-center">{children}</div>
          <div className="flex flex-nowrap gap-4 justify-evenly">
            <Button onClick={actionFunc}>{actionName}</Button>
            {hasCancel && (
              <Button type="danger" onClick={onClose}>
                Cancel
              </Button>
            )}
          </div>
        </div>
      </>,
      modalRoot
    );
}

export default Modal;
