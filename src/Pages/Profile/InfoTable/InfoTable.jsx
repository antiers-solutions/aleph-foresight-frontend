/**
 * InfoTable component that renders a tabbed interface for displaying information.
 *
 */
import React from "react";
import { Tabs } from "antd";
import { tabItems } from "./info.helper";
import { useLocation } from "react-router-dom";
import { useInfoTabs } from "../../../Hooks/useInfoTabs";

const InfoTable = () => {
  const { state } = useLocation();
  // Destructure values from custom hook
  const { onChange, operations, tabActiveKey } = useInfoTabs();

  return (
    <div className="profileTab">
      <Tabs
        items={tabItems(tabActiveKey)} // Generate tab items dynamically based on active key
        className="commonTab"
        onChange={onChange}
        destroyInactiveTabPane={true} // Destroy inactive tab panes to free up resources
        defaultActiveKey={state?.key ?? tabActiveKey}
        tabBarExtraContent={operations} // Add extra content (e.g., buttons or filter) to the tab bar
      />
    </div>
  );
};

export default InfoTable;
