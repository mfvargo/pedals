import { BiWifi0, BiWifi1, BiWifi2, BiWifi } from "react-icons/bi";

interface Props {
  depth: number;
}
const DepthIcon = ({ depth }: Props) => {
  const iconTitle = `${Math.round(depth)}msec`;

  const getIcon = (depth: number) => {
    if (depth < 20) {
      return <BiWifi title={iconTitle} fontSize={'1.7rem'} />;
    }

    if (depth < 30) {
      return <BiWifi2 title={iconTitle} fontSize={'1.7rem'} />;
    }

    if (depth >= 30 && depth < 40) {
      return <BiWifi1 title={iconTitle} fontSize={'1.7rem'} />;
    }

    if (depth >= 40) {
      return <BiWifi0 title={iconTitle} fontSize={'1.7rem'} />;
    }
  };

  return <div>{getIcon(depth)}</div>;
};

export default DepthIcon;
