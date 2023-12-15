/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

// import { ConnectWallet } from "./ConnectWallet";
import { toast } from "react-toastify";

import StakingOptionModal from "./StakingOptionModal";
import { useNetwork, useBalance } from "wagmi";
import { isSupportedChain } from "../utils/utils";
import { global } from "../config/global";

export const StakeBtn = function ({ connected = false, stakeModalOption = 0, amount = 0, allowance = 0, ethBalance = 0 }) {
  const [open, setOpen] = useState(false);
  const { chain } = useNetwork()

  const handleBtn = async () => {
    if (connected === true) {
      if (!isSupportedChain(chain)) {
        toast.warn(`Please connect wallet to ${global.chain.name}`);
        return
      }

      if (Number(amount) === 0) {
        toast.warn("Insufficient CHIBA token! Please buy more CHIBA!")
        return
      }
      setOpen(true);
      return
    }
    else {
      toast.warn("Please connect wallet!");
      return
    }
  }

  return (
    <>
      <button className="font-medium text-center text-white text-sm rounded font-16 py-2.5 px-5 w-full"
        onClick={handleBtn}>
        {connected === true && isSupportedChain(chain) ? "Stake Now" : connected === true && !isSupportedChain(chain) ? "Wrong Network" : "Connect Wallet"}
      </button>

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
