import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { default as TooltipText } from "react-bootstrap/Tooltip";
import { FaRegQuestionCircle } from "react-icons/fa";

interface Props {
  text: string;
}
export const Tooltip = ({ text }: Props) => {
  return (
    <OverlayTrigger placement="bottom" overlay={<TooltipText>{text}</TooltipText>}>
      <button className="icon-button">
        <FaRegQuestionCircle className="icon" />
      </button>
    </OverlayTrigger>
  );
};
