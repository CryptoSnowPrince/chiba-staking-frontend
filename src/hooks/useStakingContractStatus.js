import { useEffect, useState } from "react";
import StakingContractABI from "../assets/abi/stakingContract.json";
import tokenStakingContractABI from "../assets/abi/tokenStakingContract.json";
import chibaTokenContractABI from "../assets/abi/chibaTokenContract.json";
import { useAccount } from "wagmi";
import { multicall } from '@wagmi/core';
import { global } from "../config/global";
import { formatUnits } from "viem";

export function useStakingContractStatus() {
    const [data, setData] = useState({
        walletBalance: 0,             // Amount of connected account's CHIBA tokens 
        totalEthRewarded_14: 0,       // Sum of totalRewards
        totalStakedAmount_14: 0,      // totalSharesDeposited of contract
        stakedAmountPerUser_14: 0,    // staked amount per user
        stakedTimePerUser_14: 0,      // staked time per user
        unClaimed_14: 0,              // getUnpaid of stakingcontract_14
        // EthExcluded_14: 0,         // rewards read function of contract
        // EthRealised_14: 0,
        tokenRewarded_14: 0,          // RewardOf read function of TokenStakingPool contract
        totalEthRewarded_28: 0,       // Sum of totalRewards
        totalStakedAmount_28: 0,      // totalSharesDeposited of contract
        stakedAmountPerUser_28: 0,    // staked amount per user
        stakedTimePerUser_28: 0,      // staked time per user
        unClaimed_28: 0,              // getUnpaid of stakingcontract_28
        // EthExcluded_28: 0,            // rewards read function of contract
        // EthRealised_28: 0,
        tokenRewarded_28: 0,          // RewardOf read function of TokenStakingPool contract
        totalEthRewarded_56: 0,       // Sum of totalRewards
        totalStakedAmount_56: 0,      // totalSharesDeposited of contract
        stakedAmountPerUser_56: 0,    // staked amount per user
        stakedTimePerUser_56: 0,      // staked time per user
        unClaimed_56: 0,              // getUnpaid of stakingcontract_56
        // EthExcluded_56: 0,            // rewards read function of contract
        // EthRealised_56: 0,
        tokenRewarded_56: 0,          // RewardOf read function of TokenStakingPool contract
    })
    const { address } = useAccount();
    // console.log('address is:', address);

    const [refetch, setRefetch] = useState(false)

    useEffect(() => {
        const timerID = setInterval(() => {
            setRefetch((prevData) => {
                return !prevData;
            })
        }, global.REFETCH_INTERVAL);

        return () => {
            clearInterval(timerID);
        };
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const chibaTokenContractAddress = global.CHIBA_TOKEN.address;
                const stakingContractAddress_14 = global.STAKING_CONTRACTS.Testnet_14;
                const tokenStakingContractAddress_14 = global.STAKING_EXTENSION_CONTRACTS.Testnet_14;
                const stakingContractAddress_28 = global.STAKING_CONTRACTS.Testnet_28;
                const tokenStakingContractAddress_28 = global.STAKING_EXTENSION_CONTRACTS.Testnet_28;
                const stakingContractAddress_56 = global.STAKING_CONTRACTS.Testnet_56;
                const tokenStakingContractAddress_56 = global.STAKING_EXTENSION_CONTRACTS.Testnet_56;

                const contracts = [
                    // get the balance of user wallet's ChiBa token
                    {
                        address: chibaTokenContractAddress,
                        abi: chibaTokenContractABI,
                        functionName: 'balanceOf',
                        args: [address]
                    },
                    {
                        address: stakingContractAddress_14,
                        abi: StakingContractABI,
                        functionName: 'totalRewards',
                    },
                    // {
                    //     address: stakingContractAddress_14,
                    //     abi: StakingContractABI,
                    //     functionName: 'totalStakedUsers',
                    // },
                    {
                        address: stakingContractAddress_14,
                        abi: StakingContractABI,
                        functionName: 'totalSharesDeposited',
                    },
                    {
                        address: stakingContractAddress_14,
                        abi: StakingContractABI,
                        functionName: 'shares',
                        args: [address]
                    },
                    {
                        address: stakingContractAddress_14,
                        abi: StakingContractABI,
                        functionName: 'getUnpaid',
                        args: [address]
                    },
                    {
                        address: tokenStakingContractAddress_14,
                        abi: tokenStakingContractABI,
                        functionName: 'rewardOf',
                        args: [address]
                    },
                    {
                        address: stakingContractAddress_28,
                        abi: StakingContractABI,
                        functionName: 'totalRewards',
                    },
                    // {
                    //     address: stakingContractAddress_28,
                    //     abi: StakingContractABI,
                    //     functionName: 'totalStakedUsers',
                    // },
                    {
                        address: stakingContractAddress_28,
                        abi: StakingContractABI,
                        functionName: 'totalSharesDeposited',
                    },
                    {
                        address: stakingContractAddress_28,
                        abi: StakingContractABI,
                        functionName: 'shares',
                        args: [address]
                    },
                    {
                        address: stakingContractAddress_28,
                        abi: StakingContractABI,
                        functionName: 'getUnpaid',
                        args: [address]
                    },
                    {
                        address: tokenStakingContractAddress_28,
                        abi: tokenStakingContractABI,
                        functionName: 'rewardOf',
                        args: [address]
                    },
                    {
                        address: stakingContractAddress_56,
                        abi: StakingContractABI,
                        functionName: 'totalRewards',
                    },
                    // {
                    //     address: stakingContractAddress_56,
                    //     abi: StakingContractABI,
                    //     functionName: 'totalStakedUsers',
                    // },
                    {
                        address: stakingContractAddress_56,
                        abi: StakingContractABI,
                        functionName: 'totalSharesDeposited',
                    },
                    {
                        address: stakingContractAddress_56,
                        abi: StakingContractABI,
                        functionName: 'shares',
                        args: [address]
                    },
                    {
                        address: stakingContractAddress_56,
                        abi: StakingContractABI,
                        functionName: 'getUnpaid',
                        args: [address]
                    },
                    {
                        address: tokenStakingContractAddress_56,
                        abi: tokenStakingContractABI,
                        functionName: 'rewardOf',
                        args: [address]
                    },
                ]

                const _data = await multicall({
                    chainId: global.chain.id,
                    contracts
                })

                console.log(_data, "data is:");
                setData({
                    walletBalance: _data[0].status === "success" ? parseFloat(formatUnits(_data[0].result, global.CHIBA_TOKEN.decimals)).toFixed(2) : 0,
                    totalEthRewarded_14: _data[1].status === "success" ? parseFloat(formatUnits(_data[1].result, global.EthDecimals)).toFixed(2) : 0,
                    // totalStakedUsers: _data[2].status === "success" ? _data[2].result : 0,
                    totalStakedAmount_14: _data[2].status === "success" ? parseFloat(formatUnits(_data[2].result, global.CHIBA_TOKEN.decimals)).toFixed(2) : 0,
                    stakedAmountPerUser_14: _data[3].status === "success" ? parseFloat(formatUnits(_data[3].result[0], global.CHIBA_TOKEN.decimals)) : 0,
                    stakedTimePerUser_14: _data[3].status === "success" ? Number(_data[3].result[1]) : 0,
                    unClaimed_14: _data[4].status === "success" ? parseFloat(formatUnits(_data[4].result, global.EthDecimals)).toFixed(10) : 0,
                    // EthExcluded_14: _data[4].status === "success" ? parseFloat(formatUnits(_data[4].result[0], global.EthDecimals)).toFixed(12) :0,
                    // EthRealised_14: _data[4].status === "success" ? parseFloat(formatUnits(_data[4].result[1], global.EthDecimals)).toFixed(12) :0,
                    tokenRewarded_14: _data[5].status === "success" ? parseFloat(formatUnits(_data[5].result, global.CHIBA_TOKEN.decimals)).toFixed(5) : 0,
                    totalEthRewarded_28: _data[6].status === "success" ? parseFloat(formatUnits(_data[6].result, global.EthDecimals)).toFixed(2) : 0,
                    totalStakedAmount_28: _data[7].status === "success" ? parseFloat(formatUnits(_data[7].result, global.CHIBA_TOKEN.decimals)).toFixed(2) : 0,
                    stakedAmountPerUser_28: _data[8].status === "success" ? parseFloat(formatUnits(_data[8].result[0], global.CHIBA_TOKEN.decimals)) : 0,
                    stakedTimePerUser_28: _data[8].status === "success" ? Number(_data[8].result[1]) : 0,
                    unClaimed_28: _data[9].status === "success" ? parseFloat(formatUnits(_data[9].result, global.EthDecimals)).toFixed(10) : 0,
                    // EthExcluded_28: _data[9].status === "success" ? parseFloat(formatUnits(_data[9].result[0], global.EthDecimals)).toFixed(12) :0,
                    // EthRealised_28: _data[9].status === "success" ? parseFloat(formatUnits(_data[9].result[1], global.EthDecimals)).toFixed(12) :0,
                    tokenRewarded_28: _data[10].status === "success" ? parseFloat(formatUnits(_data[10].result, global.CHIBA_TOKEN.decimals)).toFixed(5) : 0,
                    totalEthRewarded_56: _data[11].status === "success" ? parseFloat(formatUnits(_data[11].result, global.EthDecimals)).toFixed(2) : 0,
                    totalStakedAmount_56: _data[12].status === "success" ? parseFloat(formatUnits(_data[12].result, global.CHIBA_TOKEN.decimals)).toFixed(2) : 0,
                    stakedAmountPerUser_56: _data[13].status === "success" ? parseFloat(formatUnits(_data[13].result[0], global.CHIBA_TOKEN.decimals)) : 0,
                    stakedTimePerUser_56: _data[13].status === "success" ? Number(_data[13].result[1]) : 0,
                    unClaimed_56: _data[14].status === "success" ? parseFloat(formatUnits(_data[14].result, global.EthDecimals)).toFixed(10) : 0,
                    // EthExcluded_56: _data[14].status === "success" ? parseFloat(formatUnits(_data[14].result[0], global.EthDecimals)).toFixed(12) :0,
                    // EthRealised_56: _data[14].status === "success" ? parseFloat(formatUnits(_data[14].result[1], global.EthDecimals)).toFixed(12) :0,
                    tokenRewarded_56: _data[15].status === "success" ? parseFloat(formatUnits(_data[15].result, global.CHIBA_TOKEN.decimals)).toFixed(5) : 0,
                })
            } catch (error) {
                console.log('useStakingContractStatus err', error)
            }
        };
        fetchData();
        // eslint-disable-next-line
    }, [address, refetch])
    // }, [address, refetch, refresh])

    return data
}
