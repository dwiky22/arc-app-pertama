import { initiateDeveloperControlledWalletsClient } from "@circle-fin/developer-controlled-wallets";

const client = initiateDeveloperControlledWalletsClient({
  apiKey: process.env.CIRCLE_API_KEY as string,
  entitySecret: process.env.ENTITY_SECRET as string,
});

const main = async () => {
  console.log("🚀 Arc Testnet USDC Payment App");
  console.log("================================");

  const walletSetRes = await client.createWalletSet({
    name: "USDC Payment Wallet Set",
  });
  const walletSetId = walletSetRes.data?.walletSet?.id as string;
  console.log("\n✅ Wallet Set ID:", walletSetId);

  const walletRes = await client.createWallets({
    accountType: "EOA",
    blockchains: ["ARC-TESTNET"],
    count: 2,
    walletSetId,
  });

  const sender = walletRes.data?.wallets?.[0];
  const receiver = walletRes.data?.wallets?.[1];

  console.log("\n📤 Sender Wallet:");
  console.log("   Address:", sender?.address);

  console.log("\n📥 Receiver Wallet:");
  console.log("   Address:", receiver?.address);

  console.log("\n✅ App berjalan sempurna di ARC-TESTNET!");
  console.log("📍 Claim USDC di: https://faucet.circle.com");
  console.log("   Gunakan address:", sender?.address);
};

main().catch(console.error);