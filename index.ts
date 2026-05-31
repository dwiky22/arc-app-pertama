import { initiateDeveloperControlledWalletsClient } from "@circle-fin/developer-controlled-wallets";

const client = initiateDeveloperControlledWalletsClient({
	apiKey: process.env.CIRCLE_API_KEY as string,
	entitySecret: process.env.ENTITY_SECRET as string,
});

const SENDER_WALLET_ID = "230247ca-75ed-5750-ba42-c6a366d390f7";
const RECEIVER_ADDRESS = "0x5785da332f4c52b2cd71dc6f66204e336ac5d9a7";

const main = async () => {
	console.log("🚀 Arc Testnet USDC Payment App");

	try {
		const transferRes = await client.createTransaction({
			walletId: SENDER_WALLET_ID,
			tokenId: "15dc2b5d-0994-58b0-bf8c-3a0501148ee8",
			destinationAddress: RECEIVER_ADDRESS,
			amounts: ["0.01"],
			blockchain: "ARC-TESTNET",
			fee: {
				type: "level",
				config: {
					feeLevel: "MEDIUM",
				},
			},
		});
		console.log("\n✅ Transfer berhasil!");
		console.log("   TX ID:", transferRes.data?.id);
		console.log("   Status:", transferRes.data?.state);
	} catch (err: any) {
		console.log("\n❌ Error:", err.message);
	}
};

main().catch(console.error);
