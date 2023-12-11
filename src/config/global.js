import { mainnet, goerli } from "wagmi/chains";
import chiba_ic from "../assets/img/chiba.png"
import pls_ic from "../assets/img/pulse.png"
import dai_ic from "../assets/img/dai.png"
import usdc_ic from "../assets/img/usdc.png"
import usdt_ic from "../assets/img/usdt.svg"

export const IS_PRODUCT_MODE = false // TODO

export const staking_contract_mainnet = { // TODO ethereum Mainnet
    Main_14: "",
    Main_28: "",
    Main_56: "",
};
export const staking_extension_contract_mainnet = { // TODO ethereum Mainnet
    Main_14: "",
    Main_28: "",
    Main_56: "",
};

export const staking_contract_testnet = { // TODO goerli Testnet
    Testnet_14: "0x795d79e09fe0D9ae9930b52Ef1E907d946b4776b",
    Testnet_28: "0x6D160739022dE152D03D79924509AE43649f2430",
    Testnet_56: "0xF5823a9E4d62A9d149db1866Ca61e45a897e4944",
};
export const staking_extension_contract_testnet = { // TODO goerli Testnet
    Testnet_14: "0x6762E2460AE596d4f7e5D180aF56693D8A610BC8",
    Testnet_28: "0x6481e88296eF80E13aF3D9a8F44F32a048499EC2",
    Testnet_56: "0xa4AE2ceB1Efe03212a81Cb45b129453e6905D336",
};

export const chibaToken_mainnet = {
    name: 'CHIBA',
    address: '',
    decimals: 9,
    logo: chiba_ic,
    isNative: true
}

export const chibaToken_testnet = {
    name: 'My Chiba Neko',
    address: '0x4f6594FbeF7890C21B177948e06890467dE4E0b7',
    decimals: 9,
    logo: chiba_ic,
    isNative: true
}

export const global = {
    STAKING_CONTRACTS: IS_PRODUCT_MODE ? staking_contract_mainnet : staking_contract_testnet,
    STAKING_EXTENSION_CONTRACTS: IS_PRODUCT_MODE ? staking_extension_contract_mainnet : staking_extension_contract_testnet,
    // TOKEN_CONTRACT: IS_PRODUCT_MODE ? token_mainnet : token_testnet,
    CHIBA_TOKEN: IS_PRODUCT_MODE ? chibaToken_mainnet : chibaToken_testnet,
    chain: IS_PRODUCT_MODE ? mainnet : goerli,
    defaultGas: IS_PRODUCT_MODE ? 45 : 0.1,
    REFETCH_INTERVAL: 30000,
    REFETCH_SECOND: 1000,
    EthDecimals: 18,
    IUniswapV2Router01Address: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    WethContractAddress: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
    // totalVolume: 60_000_000,
}