import React, { useState, useEffect } from "react";

// import { ConnectWallet } from "./ConnectWallet";
import { toast } from "react-toastify";

import StakingOptionModal from "./StakingOptionModal";

export const StakeBtn = function ({ connected, stakeModalOption, amount }) {
  const [walletConnected, setWalletConnected] = useState(false)
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setWalletConnected(connected)
  }, [connected])
  // console.log (connected, ">>>>>>>>>>>")
  return (
    <>
      {walletConnected === false &&
        <button className="font-medium text-center text-white text-sm rounded font-16 py-2.5 px-5 w-full" onClick={() => toast.error("Please connect wallet!")}>Connect Wallet</button>
      }
      {walletConnected === true &&
        <button className="font-medium text-center text-white text-sm rounded font-16 py-2.5 px-5 w-full" onClick={() => {
          setOpen(true);
        }}>Stake Now</button>
      }
      <StakingOptionModal showOpen={open} onClose={() => setOpen(false)} stakeModalOption={stakeModalOption} walletBalance={amount} />
    </>
  );
};

export default StakeBtn;
