import React, { useState } from "react";
import DropdownMenuButton from "./DropdownMenuButton";

type DropdownMenuItemProps = {
  children: React.ReactNode;
  buttonIcon: React.ReactNode;
};

const DropdownMenu: React.FC<DropdownMenuItemProps> = ({
  children,
  buttonIcon,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="dropdown">
      <DropdownMenuButton>{buttonIcon}</DropdownMenuButton>

      <div className={`dropdown__menu`}>
        <ul className="dropdown__menu__items">{children}</ul>
      </div>
    </div>
  );
};

export default DropdownMenu;
