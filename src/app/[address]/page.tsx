import { isAddress } from "viem";
import { ContractImage } from "./contract-image";
import Link from "next/link";

export default function Home({
    params
}: {
    params: { address: string };
}) {
  let render = null;
  if (!params.address) {
    render = <Link href="/">Go back</Link>
  } else if (!isAddress(params.address)) {
    render = <p className="text-4xl text-white">Invalid Address!</p>
  } else {
    render = <ContractImage address={params.address} />
  }
 
  return (<>
        {render}
        </>
  );
}