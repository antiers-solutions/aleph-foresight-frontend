/**
 * CustomList Component
 *
 * Renders a list of items with links, icons, and labels.
 *
 *
 * @param {Array} props.list - List of items to render
 * @param {string} props.liClassName - Class name for list items
 * @param {string} props.ulClassName - Class name for the unordered list
 * @param {string} props.linkClasName - Class name for active links
 *
 */
import { Tooltip } from "antd";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { msgs } from "../../utils/appConstants";

const CustomList = ({
  list,
  liClassName,
  ulClassName,
  linkClasName,
  opentoNewTab,
  onClick,
}) => {
  const { state, pathname } = useLocation();

  return (
    <ul className={ulClassName}>
      {list?.map((item, index) => {
        return item?.label === "Points" ? (
          <Tooltip title={msgs.commingSoon} key={index}>
            <li key={index} className={liClassName}>
              <Link
                key={index}
                to={item?.to || "#"}
                state={{ key: state?.key }}
                className={
                  pathname === item?.to && linkClasName ? linkClasName : ""
                }
              >
                {item?.icon || null}
                {item?.label || "-"}
              </Link>
            </li>
          </Tooltip>
        ) : (
          <li key={index} className={liClassName}>
            <Link
              key={index}
              to={!opentoNewTab ? item?.to : "#"}
              onClick={() => onClick?.(item?.to)}
              state={{ key: state?.key }}
              className={
                pathname === item?.to && linkClasName ? linkClasName : ""
              }
            >
              {item?.icon || null}
              {item?.label || "-"}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default CustomList;
