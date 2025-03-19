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
      styling: "bg-sky-600 text-white",
    },
    {
      style: "REGULAR_OUTLINE",
      styling: "bg-inherit text-sky-600 border-2 border-sky-600 ",
    },
    {
      style: "DANGER",
      styling: "bg-red-600 text-white",
    },
    {
      style: "DANGER_OUTLINE",
      styling: "bg-inherit text-red-600 border-2 border-red-600 ",
    },
    {
      style: "GOOD",
      styling: "bg-green-600 text-white",
    },
    {
      style: "GOOD_OUTLINE",
      styling: "bg-inherit text-green-600 border-2 border-green-600 ",
    },
    {
      style: "DISABLED",
      styling: "bg-neutral-600 text-white",
    },
    {
      style: "DISABLED_OUTLINE",
      styling: "bg-inherit text-neutral-600 border-2 border-neutral-600 ",
    },
  ];

  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={`${
        stylings.find((s) => s.style === style)?.styling
      } px-4 py-1 rounded-md font-semibold`}
    >
      {children}
    </button>
  );
};

export default Button;
