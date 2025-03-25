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
  onClick,
  style = "REGULAR",
  disabled = false,
  children,
}: {
  type?: "submit" | "reset" | "button";
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  style?: styleType;
  disabled?: boolean;
  children: React.ReactNode;
}) => {
  const stylings: {
    style: styleType;
    styling: string;
  }[] = [
    {
      style: "REGULAR",
      styling: "bg-primary text-light",
    },
    {
      style: "REGULAR_OUTLINE",
      styling: "bg-inherit text-primary border-2 border-primary ",
    },
    {
      style: "DANGER",
      styling: "bg-danger text-white",
    },
    {
      style: "DANGER_OUTLINE",
      styling: "bg-inherit text-danger border-2 border-danger ",
    },
    {
      style: "GOOD",
      styling: "bg-good text-white",
    },
    {
      style: "GOOD_OUTLINE",
      styling: "bg-inherit text-good border-2 border-good ",
    },
    {
      style: "DISABLED",
      styling: "bg-light text-white",
    },
    {
      style: "DISABLED_OUTLINE",
      styling: "bg-inherit text-dark border-2 border-dark ",
    },
  ];

  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={`${
        stylings.find((s) => s.style === style)?.styling
      } px-4 py-1 rounded-md font-semibold hover:bg-opacity-80 active:scale-95 transition-all`}
    >
      {children}
    </button>
  );
};

export default Button;
