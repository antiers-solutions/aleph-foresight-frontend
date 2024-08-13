/**
 * This hook is used to handle the logic for the info tabs in the profile page.
 * It manages the state of the active tab, the content of the operations tab,
 * and the functionality of the tab change.
 *
 * @returns {object} An object containing the following properties:
 * - tabActiveKey: The key of the currently active tab.
 * - onChange: A function that handles the change of the tab.
 * - operations: The content of the operations tab based on the active tab.
 */
import { Select } from "antd";
import { useContext, useEffect, useState } from "react";
import { dropDownOptions } from "../utils/appConstants";
import { Context } from "../Pages/ContextProvider/ContextProvider";

export const useInfoTabs = () => {
  const { setFilter, setProfileTab } = useContext(Context);
  const [activeKey, setActiveKey] = useState("All");
  const [tabActiveKey, setTabActiveKey] = useState("1");
  const [operationsContent, setOperationsContent] = useState();

  /**
   * Handles the change of the dropdown in the operations tab
   * @param {string} key - The selected key
   */
  const handleChange = (key) => {
    setActiveKey(key);
    setFilter(key);
  };

  const customSelect = (className, dropDownOptions) => (
    <Select
      value={activeKey}
      className={`${className}`}
      onChange={handleChange}
      options={dropDownOptions}
      defaultValue={dropDownOptions?.[0]?.label}
    />
  );

  /**
   * Renders the operations tab content based on the active tab
   * @returns {JSX.Element} The operations tab content
   */
  const renderOperations = () => {
    switch (operationsContent) {
      case "activity":
        return customSelect(
          "tabSelect activitySelect",
          dropDownOptions?.activityTab
        );
      case "eventsCreated":
      case "myDisputes":
        return customSelect("tabSelect", dropDownOptions?.myDisputeTab);
      default:
        break;
    }
  };

  const operations = renderOperations();

  /**
   * Handles the change of the tab
   * @param {string} key - The selected tab key
   */
  const onChange = (key) => {
    window.history.replaceState({}, "");
    setTabActiveKey(key);
    setActiveKey("All");
    setFilter(null);
    setProfileTab(key);
    switch (key) {
      case "1":
        return setOperationsContent("openPositions");
      case "2":
        return setOperationsContent("closedPositions");
      case "3":
        return setOperationsContent("activity");
      case "4":
        return setOperationsContent("eventsCreated");
      case "5":
        return setOperationsContent("myDisputes");

      default:
        break;
    }
  };

  useEffect(() => {
    renderOperations();
    return () => {
      setFilter("volume");
    };
  }, []);

  return {
    tabActiveKey,
    onChange,
    operations,
  };
};
