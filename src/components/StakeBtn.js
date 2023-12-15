/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

// import { ConnectWallet } from "./ConnectWallet";
import { toast } from "react-toastify";

import StakingOptionModal from "./StakingOptionModal";
import { useNetwork, useBalance } from "wagmi";
import { isSupportedChain } from "../utils/utils";
import { global } from "../config/global";

export const StakeBtn = function ({ connected = false, stakeModalOption = 0, amount = 0, allowance = 0, ethBalance = 0 }) {
  // const [walletConnected, setWalletConnected] = useState(false)
  const [open, setOpen] = useState(false);
  const [btnMsg, setBtnMsg] = useState("Connect Wallet");
  const [errMsg, setErrMsg] = useState(false)

  const { chain } = useNetwork()

  useEffect(() => {
    if (connected === false) {
      setBtnMsg("Connect Wallet");
      setErrMsg("Please connect wallet!");
      return
    } else {
      if (!isSupportedChain(chain)) {
        setBtnMsg("Worng Network");
        setErrMsg(`Please connect wallet to ${global.chain.name}`);
        return
      } else {
        setBtnMsg('Stake Now');
        return
      }
    }
  }, [chain, connected])

  const handleBtn = async () => {
    if (btnMsg === 'Stake Now') {
      if (amount <= 0) {
        setErrMsg(`Insufficient CHIBA token! Please buy more CHIBA!`)
        toast.warn(errMsg)
        return
      }
      setOpen(true);
      return
    }
    else if (btnMsg === 'Connect Wallet') {
      toast.error(errMsg);
      return
    }
    else if (btnMsg === 'Wrong Network') {
      toast.error(errMsg);
      return
    }
    toast.warn(errMsg)
  }

  return (
    <>
      <button className="font-medium text-center text-white text-sm rounded font-16 py-2.5 px-5 w-full" onClick={handleBtn}>{btnMsg}</button>

      <StakingOptionModal
        showOpen={open}
        onClose={() => setOpen(false)}
        stakeModalOption={stakeModalOption}
        walletBalance={amount}
        allowance={allowance}
        ethBalance={ethBalance}
      />
    </>
  );
};

export default StakeBtn;
