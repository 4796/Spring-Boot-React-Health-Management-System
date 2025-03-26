import { useState } from "react";
import { BiCheck, BiX } from "react-icons/bi";

export type styleType =
  | "REGULAR"
  | "DANGER"
  | "GOOD"
  | "DISABLED"
  | "DANGER_OUTLINE"
  | "REGULAR_OUTLINE"
  | "GOOD_OUTLINE"
  | "DISABLED_OUTLINE";
const Button = ({
  type = "button",
  confirm = false,
  onClick,

  style = "REGULAR",
  disabled = false,
  ref,
  children,
}: {
  type?: "submit" | "reset" | "button";
  confirm?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;

  style?: styleType;
  disabled?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
  children: React.ReactNode;
}) => {
  const stylings: {
    style: styleType;
    styling: string;
  }[] = [
    {
      style: "REGULAR",
      styling: "bg-primary text-light border-transparent",
    },
    {
      style: "REGULAR_OUTLINE",
      styling: "bg-inherit text-primary border-primary ",
    },
    {
      style: "DANGER",
      styling: "bg-danger text-white border-transparent",
    },
    {
      style: "DANGER_OUTLINE",
      styling: "bg-inherit text-danger border-danger ",
    },
    {
      style: "GOOD",
      styling: "bg-good text-white border-transparent",
    },
    {
      style: "GOOD_OUTLINE",
      styling: "bg-inherit text-good border-good ",
    },
    {
      style: "DISABLED",
      styling: "bg-light text-white border-transparent",
    },
    {
      style: "DISABLED_OUTLINE",
      styling: "bg-inherit text-dark border-dark ",
    },
  ];
  const [clicked, setClicked] = useState<boolean>(false);
  const dialogButtons = (
    <>
      <Button
        style="DANGER"
        onClick={() => {
          setClicked(false);
        }}
      >
        <BiX className="mx-auto stroke-1 inline-block" />
      </Button>
      <Button
        type="submit"
        style="GOOD"
        onClick={(e) => {
          onClick ? onClick(e) : "";
          setClicked(false);
        }}
      >
        <BiCheck className="mx-auto stroke-1 inline-block" />
      </Button>
    </>
  );

  if (clicked) return dialogButtons;
  return (
    <button
      ref={ref}
      disabled={disabled}
      type={type}
      onClick={confirm ? () => setClicked(true) : onClick}
      className={`${
        stylings.find((s) => s.style === style)?.styling
      } px-4 py-1 rounded-md font-semibold xl:hover:bg-opacity-80 active:scale-95 transition-all border-2`}
    >
      {children}
    </button>
  );
};

export default Button;
