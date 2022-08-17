// import GoldyPetJson from "./abis/GoldyPet.json"
// import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";
// import { ProcessEnv } from "./../../constants";
// import FWLMerkleTree from "./whitelist/FWLMerkleTree.json";

// export const claimButton = async (petType, context) => {
//     return new Promise<void>(async (resolve, reject) => {
//         try {
//             const web3Provider: any = await detectEthereumProvider();
//             const web3Prov = new ethers.providers.Web3Provider(web3Provider);
//             const contract = new ethers.Contract("0xf294f4b766D8d6Eba1DA1D653A92D58c27dC5f2a", GoldyPetJson, web3Prov.getSigner());

//             const account = await web3Prov.getSigner().getAddress();
//             const merkleLeaf = FWLMerkleTree.claims[account];

//             let tx = await contract.claimFirstWhitelist(
//                 petType,
//                 !merkleLeaf ? 0 : merkleLeaf.index,
//                 !merkleLeaf ? [] : merkleLeaf.proof,
//                 {
//                     gasLimit: 8000000
//                 }
//             );

//             // context.setState({ open: true })
//             await tx.wait();
//             // context.setState({ open: false })
//             resolve();
//         }
//         catch(error) {
//             // context.setState({ open: false })
//             if(error.code != 4001) {
//                 if(error.error) {
//                     reject({ message: error.error.message });
//                 }
//                 else if (error.data) {
//                     reject({ message: error.data.message });
//                 }
//                 else if (error.reason) {
//                     reject({ message: error.reason });
//                 }
//                 else {
//                     reject({ message: error.message });
//                 }
//             }
//             else {
//                 reject({ message: "User rejected transaction." });
//             }
//         }
//     });
// }