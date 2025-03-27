import { useRef } from "react";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

const MyForm = ({
  showSubmit = true,
  cancelText = "Cancel",
  submitText = "Submit",
  onSubmit,
  className,
  children,
}: {
  showSubmit?: boolean | null;
  cancelText?: string;
  submitText?: string;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  className?: string;
  children: React.ReactNode;
}) => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const handleManualSubmit = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  return (
    <form ref={formRef} onSubmit={onSubmit} className={className}>
      {children}
      <div className="flex justify-between">
        {
          <Button
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
            style="DANGER"
          >
            {cancelText}
          </Button>
        }
        {showSubmit && (
          <div>
            <Button type="submit" confirm={true} onClick={handleManualSubmit}>
              {submitText}
            </Button>
          </div>
        )}
      </div>
    </form>
  );
};

export default MyForm;
