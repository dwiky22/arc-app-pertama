import { initiateDeveloperControlledWalletsClient } from "@circle-fin/developer-controlled-wallets";

const client = initiateDeveloperControlledWalletsClient({
  apiKey: process.env.CIRCLE_API_KEY as string,
  entitySecret: process.env.ENTITY_SECRET as string,
});

const WALLET_ID = "230247ca-75ed-5750-ba42-c6a366d390f7";

// fungsi mint NFT = 0x40c10f19 + address padded + amount padded
const MINT_ADDRESS = "0x230247ca75ed5750ba42c6a366d390f700000000";

const main = async () => {
  console.log("Arc Testnet NFT Minter");
  console.log("=========================");

  const res = await client.createTransaction({
    walletId: WALLET_ID,
    blockchain: "ARC-TESTNET",
    destinationAddress: "0x3600000000000000000000000000000000000001",
    amounts: ["0"],
    fee: {
      type: "level",
      config: {
        feeLevel: "MEDIUM",
      },
    },
    callData: "0x40c10f190000000000000000000000005b1754e5768a64c1955ef3abf05684fd99ab721a0000000000000000000000000000000000000000000000000000000000000001",
  });

  console.log("\nNFT Mint TX:", res.data?.id);
  console.log("Status:", res.data?.state);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});