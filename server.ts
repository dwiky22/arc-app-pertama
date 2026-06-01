const express = require("express");
const cors = require("cors");
const { initiateDeveloperControlledWalletsClient } = require("@circle-fin/developer-controlled-wallets");

const app = express();
app.use(cors());
app.use(express.json());

const client = initiateDeveloperControlledWalletsClient({
  apiKey: process.env.CIRCLE_API_KEY,
  entitySecret: process.env.ENTITY_SECRET,
});

const WALLET_ID = "230247ca-75ed-5750-ba42-c6a366d390f7";

app.get("/balance", async (req: any, res: any) => {
  try {
    const result = await client.getWalletTokenBalance({ id: WALLET_ID });
    res.json(result.data?.tokenBalances);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/send", async (req: any, res: any) => {
  try {
    const { to, amount } = req.body;
    const result = await client.createTransaction({
      walletId: WALLET_ID,
      tokenId: "15dc2b5d-0994-58b0-bf8c-3a0501148ee8",
      destinationAddress: to,
      amounts: [amount],
      blockchain: "ARC-TESTNET",
      fee: { type: "level", config: { feeLevel: "MEDIUM" } },
    });
    res.json({ txId: result.data?.id, status: result.data?.state });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});