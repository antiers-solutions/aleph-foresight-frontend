/**
 * BetBig Component
 *
 * Renders a section with a logo and a heading text.
 *
 */
import React from "react";
import "../Footer.scss";
import VerLogo from "../../../assets/VerLogo.png";
import { msgs } from "../../../utils/appConstants";

function BetBig() {
  return (
    <div className="betBig">
      <img src={VerLogo} alt="Logo" />
      <h2>
        {msgs.betBigText?.question}:
        <br />
        {msgs.betBigText?.answer}
      </h2>
    </div>
  );
}

export default BetBig;
