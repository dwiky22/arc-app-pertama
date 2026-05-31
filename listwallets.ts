import { initiateDeveloperControlledWalletsClient } from "@circle-fin/developer-controlled-wallets";

const client = initiateDeveloperControlledWalletsClient({
  apiKey: process.env.CIRCLE_API_KEY as string,
  entitySecret: process.env.ENTITY_SECRET as string,
});

const main = async () => {
  const res = await client.listWallets();
  res.data?.wallets?.forEach(w => {
    console.log("ID:", w.id);
    console.log("Address:", w.address);
    console.log("---");
  });
};

main().catch(console.error);
