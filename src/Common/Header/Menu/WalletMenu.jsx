/**
 * WalletMenu Component
 *
 * Displays the user's wallet balance and the total amount invested.
 *
 */
import React, { useContext, useEffect, useState } from "react";
import { apiUrls } from "../../../api/apiUrls";
import UseGetApi from "../../../api/makeRequest";
import {
  formatNumber,
  formattedBalance,
} from "../../../utils/helpers/commonHelper";
import { env, msgs } from "../../../utils/appConstants";
import { getWalletBalance } from "../../../utils/helpers/walletHelpers";
import { Context } from "../../../Pages/ContextProvider/ContextProvider";

function WalletMenu() {
  const { fetchBalance, setProfile } = useContext(Context);

  const [metaBalance, setBalance] = useState({
    userBalance: 0,
    betsPlaced: 0,
  });

  const userBalance = async () => {
    try {
      const amountInvested = await UseGetApi(apiUrls?.amountInvested());
      const volumeTraded = await UseGetApi(apiUrls?.volumeTraded());
      const getBalance = await formattedBalance(await getWalletBalance());
      const amountInvestedFormatted =
        Number(formatNumber(amountInvested?.data?.data?.amountInvested)).toFixed(env?.precision) || 0;
      const volumeFormatted =
        Number(formatNumber(volumeTraded?.data?.data?.volumeTraded)).toFixed(env.precision) || 0;

      setProfile((prev) => ({
        ...prev,
        volumeTraded: volumeFormatted,
      }));
      setBalance({
        userBalance: getBalance,
        betsPlaced: amountInvestedFormatted,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    userBalance();
  }, [fetchBalance]);

  return (
    <div className="walletMenu">
      <div className="innerWalletMenu">
        <h2>{msgs.amountInvested}</h2>
        <p>
          {metaBalance?.betsPlaced} {msgs.azero}
        </p>
      </div>
      <div className="innerWalletMenu">
        <h2>{msgs.fundsAvailable}</h2>
        <p>
          {metaBalance?.userBalance} {msgs.azero}
        </p>
      </div>
    </div>
  );
}

export default WalletMenu;
