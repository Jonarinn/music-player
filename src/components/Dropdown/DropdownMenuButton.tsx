import React from "react";

type DropdownMenuButtonProps = {
  children: React.ReactNode;
};

const DropdownMenuButton: React.FC<DropdownMenuButtonProps> = ({
  children,
}) => {
  return <button>{children}</button>;
};

export default DropdownMenuButton;
