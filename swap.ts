import { initiateDeveloperControlledWalletsClient } from "@circle-fin/developer-controlled-wallets";

const client = initiateDeveloperControlledWalletsClient({
  apiKey: process.env.CIRCLE_API_KEY as string,
  entitySecret: process.env.ENTITY_SECRET as string,
});

const WALLET_ID = "230247ca-75ed-5750-ba42-c6a366d390f7";

const main = async () => {
  console.log("Arc Testnet Token Swap");
  console.log("======================");

  try {
    const res = await client.createTransaction({
      walletId: WALLET_ID,
      amount: {
        amount: "1.0",
        currency: "USDC",
      },
      destination: {
        type: "wallet",
        id: "destination-wallet-id",
      },
      description: "Token swap on Arc testnet",
    });

    console.log("Transaction created:", res);
  } catch (error) {
    console.error("Error creating transaction:", error);
    process.exit(1);
  }
};

main();
