import { default as BootStrapButton } from "react-bootstrap/Button";

interface Props {
  className?: string;
  btnText?: string;
  title: string;
  type?: "button" | "submit" | "reset";
  id?: string;
  variant?: string;
  active?: boolean;
  disabled?: boolean;
  name?: string;
  children?: any;
  onClick?: (any?: any) => void;
}

export const Button = ({
  className,
  btnText,
  title,
  type,
  id,
  variant,
  active,
  disabled,
  name,
  children,
  onClick,
}: Props) => {
  return (
    <BootStrapButton
      className={`default-button ${className}`}
      id={id}
      title={title}
      name={name}
      variant={variant || "primary"}
      type={type || "button"}
      disabled={disabled}
      active={active}
      onClick={onClick}
    >
      {children || btnText}
    </BootStrapButton>
  );
};
