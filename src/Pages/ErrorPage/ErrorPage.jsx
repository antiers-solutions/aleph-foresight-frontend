import React from "react";
import Logo from "../../assets/Logo.png";
import "./ErrorPage.scss";
import { msgs } from "../../utils/appConstants";
import { ButtonCustom } from "../../Common/ButtonCustom/ButtonCustom";
import { useNavigate } from "react-router-dom";
import Path from "../../Routing/Constant/RoutePaths";
/**
 * ErrorPage component to display error messages and provide navigation options.
 *
 * @param {object} props - Component props.
 * @param {string} props.error - Error message to display.
 * @param {string} props.desc - Description of the error.
 */
const ErrorPage = ({ error, desc }) => {
  const navigate = useNavigate();

  return (
    <div className="errorBoundary">
      <div className="errorBoundary_content">
        <img src={Logo} alt="Logo" />
        <h4>{error ? msgs.errorPage?.header : msgs.errorPage?.sorry}</h4>
        <h6>{error ?? msgs.errorPage?.pageNotFound}</h6>
        <>
          <p>{desc}</p>
          <div className="back-to-home">
            <ButtonCustom
              label={error ? msgs.reload : msgs.goToHome}
              onClick={() =>
                error ? window.location.reload() : navigate(Path?.HOME)
              }
            />
          </div>
        </>
      </div>
    </div>
  );
};

export default ErrorPage;
