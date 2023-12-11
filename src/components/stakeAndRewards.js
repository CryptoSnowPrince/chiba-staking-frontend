import { useEffect, useState } from "react";
import StakingContractABI from "../assets/abi/stakingContract.json";
import tokenStakingContractABI from "../assets/abi/tokenStakingContract.json";
import chibaTokenContractABI from "../assets/abi/chibaTokenContract.json";
import { useAccount } from "wagmi";
import { multicall, fetchBalance } from '@wagmi/core';
import { global } from "../config/global";
import { formatUnits } from "viem";
import { toast } from "react-toastify";

import LockRemain from "./LockRemain";
import StakeBtn from "./StakeBtn";
import { useStakingContractStatus } from "../hooks/useStakingContractStatus";



export const StakeAndRewards = function ({walletConnected }) {

	const {
		walletBalance,             // Amount of connected account's CHIBA tokens 
		totalEthRewarded_14,       // totalRewards
		totalStakedAmount_14,      // totalSharesDeposited of contract, total staked chiba amount
		stakedAmountPerUser_14,    // staked amount per user
		stakedTimePerUser_14,      // staked time per user
		unClaimed_14,
		// EthExcluded_14,            // excluded ETH amount
		// EthRealised_14,            // realised ETH amount
		tokenRewarded_14,          // Earned $CHIBA token amount
		totalEthRewarded_28,       // totalRewards
		totalStakedAmount_28,      // totalSharesDeposited of contract, total staked chiba amount
		stakedAmountPerUser_28,    // staked amount per user
		stakedTimePerUser_28,      // staked time per user
		unClaimed_28,
		tokenRewarded_28,          // Earned $CHIBA token amount
		totalEthRewarded_56,       // totalRewards
		totalStakedAmount_56,      // totalSharesDeposited of contract, total staked chiba amount
		stakedAmountPerUser_56,    // staked amount per user
		stakedTimePerUser_56,      // staked time per user
		unClaimed_56,
		tokenRewarded_56,          // Earned $CHIBA token amount
	} = useStakingContractStatus()

	// const [walletConnected, setWalletConnected] = useState(false)
	const [open, setOpen] = useState(false);

	return (
		<div className="w-full border border-gray-1 border-opacity-30 rounded-xl lg:px-6 px-3 py-5 relative bg-violet-6 bg-opacity-75 flex flex-col gap-5">
			{(stakedAmountPerUser_14 === 0 && stakedAmountPerUser_28 === 0 && stakedAmountPerUser_56 === 0) && (
				<div className="flex flex-col items-center justify-center w-full h-full py-6 md:py-10 gap-3">
					<img src="/image/chiba.png" alt="" className="h-8 md:h-16 w-auto" />
					<h1 className="text-center text-xl font-medium">Connect your wallet</h1>
					<div className="font-medium text-center text-white text-sm rounded connect-button">
						<StakeBtn
							connected={walletConnected}
							stakeModalOption={0}
							amount={walletBalance}
						/>
					</div>
				</div>
			)}
			{stakedAmountPerUser_14 !== 0 && (
				<div className="flex lg:flex-row flex-col lg:items-center lg:justify-between item-start lg:gap-0 gap-5 lg:p-5 p-3 rounded md:border-0 border border-gray-1 border-opacity-30 relative bg-violet-4">
					<div className="gap-3 w-full flex items-center">
						<div className="flex flex-col">
							<h1 className="lg:text-lg text-base font-bold">15% APR</h1>
							<h2 className="lg:text-base text-sm font-medium text-white text-opacity-75">14 Day Lockup</h2>
						</div>
					</div>
					<div className="gap-3 w-full flex flex-row lg:flex-col items-center lg:items-start">
						<img src={chibaIco} alt="" className="lg:h-10 lg:w-16 w-8 h-12" />
						<div className="flex flex-col">
							<h1 className="lg:text-lg text-base font-bold">{stakedAmountPerUser_14} $CHIBA</h1>
							<h2 className="lg:text-base text-sm font-medium text-white text-opacity-75">Staked</h2>
						</div>
					</div>
					<div className="gap-3 w-full flex flex-row lg:flex-col items-center lg:items-start">
						<img src={giftIco} alt="" className="lg:h-10 lg:w-10 w-8 h-8" />
						<div className="flex flex-col">
							<h1 className="lg:text-lg text-base font-bold">{unClaimed_14} ETH</h1>
							<h2 className="lg:text-base text-sm font-medium text-white text-opacity-75">Unclaimed ETH</h2>
						</div>
					</div>
					<div className="gap-3 w-full flex flex-row lg:flex-col items-center lg:items-start">
						<img src={chibaIco} alt="" className="lg:h-10 lg:w-16 w-8 h-12" />
						<div className="flex flex-col">
							<h1 className="lg:text-lg text-base font-bold">{tokenRewarded_14} $CHIBA</h1>
							<h2 className="lg:text-base text-sm font-medium text-white text-opacity-75">Earned $CHIBA</h2>
						</div>
					</div>
					<div className="gap-3 w-full flex items-center">
						<LockRemain stakedTimePerUser={stakedTimePerUser_14} type={14} />
					</div>
					<div className="lg:block hidden relative">
						<button className="outline-none" onClick={() => setShowButtonList_14(!showButtonList_14)}>
							<svg width="16" height="29" viewBox="0 0 16 29" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M5.74539 25.4064C5.74539 24.6634 6.04231 23.9509 6.57082 23.4256C7.09933 22.9002 7.81615 22.6051 8.56357 22.6051C9.311 22.6051 10.0278 22.9002 10.5563 23.4256C11.0848 23.9509 11.3818 24.6634 11.3818 25.4064C11.3818 26.1493 11.0848 26.8618 10.5563 27.3872C10.0278 27.9125 9.311 28.2076 8.56357 28.2076C7.81615 28.2076 7.09933 27.9125 6.57082 27.3872C6.04231 26.8618 5.74539 26.1493 5.74539 25.4064ZM5.74539 14.2012C5.74539 13.4583 6.04231 12.7458 6.57082 12.2204C7.09933 11.6951 7.81615 11.4 8.56357 11.4C9.311 11.4 10.0278 11.6951 10.5563 12.2204C11.0848 12.7458 11.3818 13.4583 11.3818 14.2012C11.3818 14.9442 11.0848 15.6567 10.5563 16.182C10.0278 16.7074 9.311 17.0025 8.56357 17.0025C7.81615 17.0025 7.09933 16.7074 6.57082 16.182C6.04231 15.6567 5.74539 14.9442 5.74539 14.2012ZM5.74539 2.99611C5.74539 2.25316 6.04231 1.54064 6.57082 1.0153C7.09933 0.489958 7.81615 0.194824 8.56357 0.194824C9.311 0.194824 10.0278 0.489958 10.5563 1.0153C11.0848 1.54064 11.3818 2.25316 11.3818 2.99611C11.3818 3.73905 11.0848 4.45157 10.5563 4.97691C10.0278 5.50225 9.311 5.79739 8.56357 5.79739C7.81615 5.79739 7.09933 5.50225 6.57082 4.97691C6.04231 4.45157 5.74539 3.73905 5.74539 2.99611Z" fill="white"></path>
							</svg>
						</button>
						{showButtonList_14 === true && (
							<div className="z-10 bg-violet-4 rounded-xl shadow w-64 absolute right-0 px-3 py-5 border border-gray-1 border-opacity-30">
								<div className="flex flex-col gap-3 items-start">
									<button className="font-medium text-center text-white px-5 py-2.5 text-sm rounded connect-button w-full">
										Compound ETH &amp; Relock
									</button>
									<button className="font-medium text-center text-white px-5 py-2.5 text-sm rounded connect-button w-full">
										Claim ETH &amp; Relock
									</button>
									<button className="font-medium text-center text-white px-5 py-2.5 text-sm rounded connect-button w-full">
										Claim $PAAL Rewards
									</button>
									<button className="font-medium text-center text-white px-5 py-2.5 text-sm rounded connect-button w-full">
										Unstake
									</button>
								</div>
							</div>
						)}
					</div>
				</div>
			)}
			{stakedAmountPerUser_28 !== 0 && (
				// <div className="w-full border border-gray-1 border-opacity-30 rounded-xl lg:px-6 px-3 py-5 relative bg-violet-6 bg-opacity-75 flex flex-col gap-5">
				<div className="flex lg:flex-row flex-col lg:items-center lg:justify-between item-start lg:gap-0 gap-5 lg:p-5 p-3 rounded md:border-0 border border-gray-1 border-opacity-30 relative bg-violet-4">
					<div className="gap-3 w-full flex items-center">
						<div className="flex flex-col">
							<h1 className="lg:text-lg text-base font-bold">40% APR</h1>
							<h2 className="lg:text-base text-sm font-medium text-white text-opacity-75">28 Day Lockup</h2>
						</div>
					</div>
					<div className="gap-3 w-full flex flex-row lg:flex-col items-center lg:items-start">
						<img src={chibaIco} alt="" className="lg:h-10 lg:w-16 w-8 h-12" />
						<div className="flex flex-col">
							<h1 className="lg:text-lg text-base font-bold">{stakedAmountPerUser_28} $CHIBA</h1>
							<h2 className="lg:text-base text-sm font-medium text-white text-opacity-75">Staked</h2>
						</div>
					</div>
					<div className="gap-3 w-full flex flex-row lg:flex-col items-center lg:items-start">
						<img src={giftIco} alt="" className="lg:h-10 lg:w-10 w-8 h-8" />
						<div className="flex flex-col">
							<h1 className="lg:text-lg text-base font-bold">{unClaimed_28} ETH</h1>
							<h2 className="lg:text-base text-sm font-medium text-white text-opacity-75">Unclaimed ETH</h2>
						</div>
					</div>
					<div className="gap-3 w-full flex flex-row lg:flex-col items-center lg:items-start">
						<img src={chibaIco} alt="" className="lg:h-10 lg:w-16 w-8 h-12" />
						<div className="flex flex-col">
							<h1 className="lg:text-lg text-base font-bold">{tokenRewarded_28} $CHIBA</h1>
							<h2 className="lg:text-base text-sm font-medium text-white text-opacity-75">Earned $CHIBA</h2>
						</div>
					</div>
					<div className="gap-3 w-full flex items-center">
						<LockRemain stakedTimePerUser={stakedTimePerUser_28} type={28} />
					</div>
					<div className="lg:block hidden relative">
						<button className="outline-none" onClick={() => setShowButtonList_28(!showButtonList_28)}>
							<svg width="16" height="29" viewBox="0 0 16 29" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M5.74539 25.4064C5.74539 24.6634 6.04231 23.9509 6.57082 23.4256C7.09933 22.9002 7.81615 22.6051 8.56357 22.6051C9.311 22.6051 10.0278 22.9002 10.5563 23.4256C11.0848 23.9509 11.3818 24.6634 11.3818 25.4064C11.3818 26.1493 11.0848 26.8618 10.5563 27.3872C10.0278 27.9125 9.311 28.2076 8.56357 28.2076C7.81615 28.2076 7.09933 27.9125 6.57082 27.3872C6.04231 26.8618 5.74539 26.1493 5.74539 25.4064ZM5.74539 14.2012C5.74539 13.4583 6.04231 12.7458 6.57082 12.2204C7.09933 11.6951 7.81615 11.4 8.56357 11.4C9.311 11.4 10.0278 11.6951 10.5563 12.2204C11.0848 12.7458 11.3818 13.4583 11.3818 14.2012C11.3818 14.9442 11.0848 15.6567 10.5563 16.182C10.0278 16.7074 9.311 17.0025 8.56357 17.0025C7.81615 17.0025 7.09933 16.7074 6.57082 16.182C6.04231 15.6567 5.74539 14.9442 5.74539 14.2012ZM5.74539 2.99611C5.74539 2.25316 6.04231 1.54064 6.57082 1.0153C7.09933 0.489958 7.81615 0.194824 8.56357 0.194824C9.311 0.194824 10.0278 0.489958 10.5563 1.0153C11.0848 1.54064 11.3818 2.25316 11.3818 2.99611C11.3818 3.73905 11.0848 4.45157 10.5563 4.97691C10.0278 5.50225 9.311 5.79739 8.56357 5.79739C7.81615 5.79739 7.09933 5.50225 6.57082 4.97691C6.04231 4.45157 5.74539 3.73905 5.74539 2.99611Z" fill="white"></path>
							</svg>
						</button>
						{showButtonList_28 === true && (
							<div className="z-10 bg-violet-4 rounded-xl shadow w-64 absolute right-0 px-3 py-5 border border-gray-1 border-opacity-30">
								<div className="flex flex-col gap-3 items-start">
									<button className="font-medium text-center text-white px-5 py-2.5 text-sm rounded connect-button w-full">
										Compound ETH &amp; Relock
									</button>
									<button className="font-medium text-center text-white px-5 py-2.5 text-sm rounded connect-button w-full">
										Claim ETH &amp; Relock
									</button>
									<button className="font-medium text-center text-white px-5 py-2.5 text-sm rounded connect-button w-full">
										Claim $PAAL Rewards
									</button>
									<button className="font-medium text-center text-white px-5 py-2.5 text-sm rounded connect-button w-full">
										Unstake
									</button>
								</div>
							</div>
						)}
					</div>
				</div>
			)}
			{stakedAmountPerUser_56 !== 0 && (
				<div className="flex lg:flex-row flex-col lg:items-center lg:justify-between item-start lg:gap-0 gap-5 lg:p-5 p-3 rounded md:border-0 border border-gray-1 border-opacity-30 relative bg-violet-4">
					<div className="gap-3 w-full flex items-center">
						<div className="flex flex-col">
							<h1 className="lg:text-lg text-base font-bold">60% APR</h1>
							<h2 className="lg:text-base text-sm font-medium text-white text-opacity-75">56 Day Lockup</h2>
						</div>
					</div>
					<div className="gap-3 w-full flex flex-row lg:flex-col items-center lg:items-start">
						<img src={chibaIco} alt="" className="lg:h-10 lg:w-16 w-8 h-12" />
						<div className="flex flex-col">
							<h1 className="lg:text-lg text-base font-bold">{stakedAmountPerUser_56} $CHIBA</h1>
							<h2 className="lg:text-base text-sm font-medium text-white text-opacity-75">Staked</h2>
						</div>
					</div>
					<div className="gap-3 w-full flex flex-row lg:flex-col items-center lg:items-start">
						<img src={giftIco} alt="" className="lg:h-10 lg:w-10 w-8 h-8" />
						<div className="flex flex-col">
							<h1 className="lg:text-lg text-base font-bold">{unClaimed_56} ETH</h1>
							<h2 className="lg:text-base text-sm font-medium text-white text-opacity-75">Unclaimed ETH</h2>
						</div>
					</div>
					<div className="gap-3 w-full flex flex-row lg:flex-col items-center lg:items-start">
						<img src={chibaIco} alt="" className="lg:h-10 lg:w-16 w-8 h-12" />
						<div className="flex flex-col">
							<h1 className="lg:text-lg text-base font-bold">{tokenRewarded_56} $CHIBA</h1>
							<h2 className="lg:text-base text-sm font-medium text-white text-opacity-75">Earned $CHIBA</h2>
						</div>
					</div>
					<div className="gap-3 w-full flex items-center">
						<LockRemain stakedTimePerUser={stakedTimePerUser_56} type={56} />
					</div>
					<div className="lg:block hidden relative">
						<button className="outline-none" onClick={() => setShowButtonList_56(!showButtonList_56)}>
							<svg width="16" height="29" viewBox="0 0 16 29" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M5.74539 25.4064C5.74539 24.6634 6.04231 23.9509 6.57082 23.4256C7.09933 22.9002 7.81615 22.6051 8.56357 22.6051C9.311 22.6051 10.0278 22.9002 10.5563 23.4256C11.0848 23.9509 11.3818 24.6634 11.3818 25.4064C11.3818 26.1493 11.0848 26.8618 10.5563 27.3872C10.0278 27.9125 9.311 28.2076 8.56357 28.2076C7.81615 28.2076 7.09933 27.9125 6.57082 27.3872C6.04231 26.8618 5.74539 26.1493 5.74539 25.4064ZM5.74539 14.2012C5.74539 13.4583 6.04231 12.7458 6.57082 12.2204C7.09933 11.6951 7.81615 11.4 8.56357 11.4C9.311 11.4 10.0278 11.6951 10.5563 12.2204C11.0848 12.7458 11.3818 13.4583 11.3818 14.2012C11.3818 14.9442 11.0848 15.6567 10.5563 16.182C10.0278 16.7074 9.311 17.0025 8.56357 17.0025C7.81615 17.0025 7.09933 16.7074 6.57082 16.182C6.04231 15.6567 5.74539 14.9442 5.74539 14.2012ZM5.74539 2.99611C5.74539 2.25316 6.04231 1.54064 6.57082 1.0153C7.09933 0.489958 7.81615 0.194824 8.56357 0.194824C9.311 0.194824 10.0278 0.489958 10.5563 1.0153C11.0848 1.54064 11.3818 2.25316 11.3818 2.99611C11.3818 3.73905 11.0848 4.45157 10.5563 4.97691C10.0278 5.50225 9.311 5.79739 8.56357 5.79739C7.81615 5.79739 7.09933 5.50225 6.57082 4.97691C6.04231 4.45157 5.74539 3.73905 5.74539 2.99611Z" fill="white"></path>
							</svg>
						</button>
						{showButtonList_56 === true && (
							<div className="z-10 bg-violet-4 rounded-xl shadow w-64 absolute right-0 px-3 py-5 border border-gray-1 border-opacity-30">
								<div className="flex flex-col gap-3 items-start">
									<button className="font-medium text-center text-white px-5 py-2.5 text-sm rounded connect-button w-full">
										Compound ETH &amp; Relock
									</button>
									<button className="font-medium text-center text-white px-5 py-2.5 text-sm rounded connect-button w-full">
										Claim ETH &amp; Relock
									</button>
									<button className="font-medium text-center text-white px-5 py-2.5 text-sm rounded connect-button w-full">
										Claim $PAAL Rewards
									</button>
									<button className="font-medium text-center text-white px-5 py-2.5 text-sm rounded connect-button w-full">
										Unstake
									</button>
								</div>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	)
};

export default StakeAndRewards;