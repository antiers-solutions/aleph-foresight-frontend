import React, { useContext, useEffect } from "react";
import "./Profile.scss";
import InfoCard from "./InfoCard/InfoCard";
import InfoTable from "./InfoTable/InfoTable";
import UserDetails from "./Userdetails/UserDetails";
import { Context } from "../ContextProvider/ContextProvider";

/**
 * Profile component displays the user's profile section.
 * It includes user details, an info card, and an info table.
 *
 * @returns {JSX.Element} - Rendered component
 */
function Profile() {
 return (
    <div className="profileSec">
      <div className="container">
        {/* Component to display user details */}
        <UserDetails />
        {/* Component to display an informational card */}
        <InfoCard />
        {/* Component to display an informational table */}
        <InfoTable />
      </div>
    </div>
  );
}

export default Profile;
