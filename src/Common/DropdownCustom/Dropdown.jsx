/**
 * A custom dropdown component with an Avatar trigger.
 *
 *
 * @param {ReactNode} props.menu - The dropdown menu to render.
 * @param {ReactNode} props.icon - The icon to display in the Avatar.
 * @param {string} [props.className] - Additional CSS class to apply to the dropdown.
 * @param {string} [props.overlayClassName] - Additional CSS class to apply to the dropdown overlay.
 *
 */
import React from "react";
import { Avatar, Dropdown, Grid } from "antd";

const DropdownCustom = ({ menu, icon, className, overlayClassName }) => {
  const { useBreakpoint } = Grid;
  const { md } = useBreakpoint();

  return (
    <Dropdown
      menu={menu}
      className={className}
      trigger={["click"]}
      destroyPopupOnHide={true}
      placement="bottomRight"
      data-testid="dropdown-custom"
      overlayClassName={overlayClassName}
    >
      <Avatar size={md ? 40 : 30} icon={icon}></Avatar>
    </Dropdown>
  );
};

export default DropdownCustom;
