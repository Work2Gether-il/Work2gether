type ClickableIconProps = {
  Icon: React.ElementType;
  onClick?: () => void;
};

const ClickableIcon = ({ Icon, onClick }: ClickableIconProps) => {
  return (
    <Icon
      onClick={onClick}
      fontSize="large"
      sx={{
        color: "white",
        cursor: "pointer",
        transition: "transform 0.2s ease-in-out",
        "&:hover": {
          transform: "scale(1.2)",
        },
        "&:active": {
          transform: "scale(0.9)",
        },
      }}
    />
  );
};

export default ClickableIcon;
