import { initiateDeveloperControlledWalletsClient } from "@circle-fin/developer-controlled-wallets";

const client = initiateDeveloperControlledWalletsClient({
	apiKey: process.env.CIRCLE_API_KEY as string,
	entitySecret: process.env.ENTITY_SECRET as string,
});

const main = async () => {
	// Buat Wallet Set
	const walletSetRes = await client.createWalletSet({
		name: "Arc Testnet Wallet Set",
	});

	const walletSetId = walletSetRes.data?.walletSet?.id as string;
	console.log("✅ Wallet Set ID:", walletSetId);

	// Buat Wallet di Arc Testnet
	const walletRes = await client.createWallets({
		accountType: "EOA",
		blockchains: ["ARC-TESTNET"],
		count: 1,
		walletSetId,
	});

	const wallet = walletRes.data?.wallets?.[0];
	console.log("✅ Wallet Address:", wallet?.address);
	console.log("✅ Wallet ID:", wallet?.id);
	console.log("✅ Blockchain:", wallet?.blockchain);
};

main().catch(console.error);
