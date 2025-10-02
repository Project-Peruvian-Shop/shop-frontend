import { Icons, type IconName } from "./icons";

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
}

const IconSVG: React.FC<IconProps> = ({ name, size = 16, className }) => {
  const IconSrc = Icons[name];
  return (
    <img
      src={IconSrc}
      alt={name}
      width={size}
      height={size}
      className={className}
    />
  );
};

export default IconSVG;
