import React from "react";

type DropdownMenuItemProps = {
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

const DropdownMenuItem: React.FC<DropdownMenuItemProps> = ({
  children,
  icon,
  onClick,
  disabled = false,
}) => {
  return (
    <button className="dropdown-action-button" disabled={disabled}>
      {children}
    </button>
  );
};

export default DropdownMenuItem;
