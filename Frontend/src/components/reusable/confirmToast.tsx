import { toast } from "react-toastify";
import Button from "./Button";
import { useRef, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const ConfirmToast = ({
  message,
  onConfirm,
  closeToast,
  onCancel,
}: {
  message: string;
  onConfirm: () => void;
  closeToast: any;
  onCancel?: Function;
}) => {
  const inputRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  return (
    <div className="text-center">
      <p className="mb-2">{message}</p>
      <div className="flex justify-center gap-2">
        <Button
          ref={inputRef}
          onClick={() => {
            onConfirm();
            closeToast();
          }}
          style="GOOD"
        >
          Da
        </Button>
        <Button
          onClick={() => {
            closeToast();
            onCancel ? onCancel() : "";
          }}
          style="DANGER"
        >
          Ne
        </Button>
      </div>
    </div>
  );
};

const confirmToast = (
  message: string,
  onConfirm: () => void,
  onCancel?: Function
) => {
  toast(
    ({ closeToast }) => (
      <ConfirmToast
        message={message}
        onConfirm={onConfirm}
        closeToast={closeToast}
        onCancel={onCancel}
      />
    ),
    {
      position: "top-center",
      autoClose: false,
      closeOnClick: false,
      closeButton: false,
      draggable: false,
    }
  );

  return <></>;
};

export default confirmToast;
