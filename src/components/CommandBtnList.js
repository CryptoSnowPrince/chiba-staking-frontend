const CommandBtnList = ({ wrapperRef, handleCompoundAndRelock, handleClaimChibaRewards, handleUnstake, poolOption }) => {
    return (
        <div ref={wrapperRef} className="z-10 bg-violet-4 rounded-xl shadow w-64 absolute right-0 px-3 py-5 border border-gray-1 border-opacity-30">
            <div className="flex flex-col gap-3 items-start">
                <button onClick={() => { handleCompoundAndRelock(true, poolOption) }} className="font-medium text-center text-white px-5 py-2.5 text-sm rounded connect-button w-full">
                    Compound ETH &amp; Relock
                </button>
                <button onClick={() => handleCompoundAndRelock(false, poolOption)} className="font-medium text-center text-white px-5 py-2.5 text-sm rounded connect-button w-full">
                    Claim ETH &amp; Relock
                </button>
                <button onClick={() => handleClaimChibaRewards(poolOption)} className="font-medium text-center text-white px-5 py-2.5 text-sm rounded connect-button w-full">
                    Claim $PAAL Rewards
                </button>
                <button onClick={() => handleUnstake(poolOption)} className="font-medium text-center text-white px-5 py-2.5 text-sm rounded connect-button w-full">
                    Unstake
                </button>
            </div>
        </div>
    )
}

export default CommandBtnList;