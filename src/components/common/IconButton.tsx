import { AiFillEdit, AiFillPlusCircle, AiOutlineClear } from "react-icons/ai";
import { BiMicrophone, BiMicrophoneOff } from "react-icons/bi";
import { BsArrowRepeat, BsFillRecordCircleFill } from "react-icons/bs";
import { FaPlay, FaStop, FaTrashAlt } from "react-icons/fa";
import { FiMinimize, FiSave } from "react-icons/fi";
import { GiTunePitch } from "react-icons/gi";
import { HiChevronDoubleRight, HiChevronDoubleLeft, HiOutlineArrowsExpand } from "react-icons/hi";
import { MdOutlineCancel, MdOutlineExpandMore, MdOutlineExpandLess } from "react-icons/md";
import { IoCopyOutline, IoSettingsSharp } from "react-icons/io5";
import { RiDownload2Fill, RiPlayListLine, RiSendPlaneFill } from "react-icons/ri";
import { TbHeadphonesFilled, TbHeadphonesOff } from "react-icons/tb";

interface Props {
  icon: string;
  size?: number;
  className?: string;
  title: string;
  type?: "button" | "submit" | "reset";
  id?: string;
  disabled?: boolean;
  name?: string;
  inverse?: boolean;
  onClick?: (any?: any) => void;
}

const buttonIconOptions = {
  edit: <AiFillEdit className="icon" />,
  copy: <IoCopyOutline className="icon" />,
  save: <FiSave className="icon" />,
  cancel: <MdOutlineCancel className="icon" />,
  trash: <FaTrashAlt className="icon" />,
  clear: <AiOutlineClear className="icon" />,
  add: <AiFillPlusCircle className="icon" />,
  expand: <HiOutlineArrowsExpand className="icon" />,
  minimize: <FiMinimize className="icon" />,
  arrowUp: <MdOutlineExpandLess className="icon" />,
  arrowDown: <MdOutlineExpandMore className="icon" />,
  arrowLeft: <HiChevronDoubleLeft className="icon" />,
  arrowRight: <HiChevronDoubleRight className="icon" />,
  tuner: <GiTunePitch className="icon" />,
  load: <RiDownload2Fill className="icon" />,
  send: <RiSendPlaneFill className="icon" />,
  mic: <BiMicrophone className="icon" />,
  micOff: <BiMicrophoneOff className="icon" />,
  settings: <IoSettingsSharp className="icon" />,
  update: <BsArrowRepeat className="icon" />,
  record: <BsFillRecordCircleFill className="icon" />,
  play: <FaPlay className="icon" />,
  stop: <FaStop className="icon" />,
  list: <RiPlayListLine className="icon" />,
  headphones: <TbHeadphonesFilled className="icon" />,
  headphonesOff: <TbHeadphonesOff className="icon" />
};

export const IconButton = ({ icon, size, className, title, type, id, disabled, name, inverse, onClick }: Props) => {
  return (
    <button
      className={`icon-button ${inverse ? "icon-button--inverse" : ""} ${className}`}
      id={id}
      style={{ fontSize: `${size}px` }}
      title={title}
      type={type || "button"}
      disabled={disabled}
      name={name}
      onClick={onClick}
    >
      {
        // @ts-ignore
        buttonIconOptions[icon]
      }
    </button>
  );
};
