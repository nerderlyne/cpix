'use client'

import { Address } from "viem";
import { HexImage } from "./hex-image";
import { useBytecode } from "wagmi";

export const ContractImage = ({
    address,
}: {
    address: Address;
}) => {
    const { data, error } = useBytecode({
        address,
        chainId: 1,
    })
    
    if (!data) {
        return <p className="text-4xl text-white">No code.</p>
    }

    if (data === '0x') {
        return null;
    }

    return <div>
        <h1 className="fixed top-0 left-0 text-4xl text-foreground">Contract <a href={`https://etherscan.io/address/${address}`} target="_blank" rel="noopener noreferrer">{address}</a></h1>
        <HexImage hex={data} />
    </div> 
}