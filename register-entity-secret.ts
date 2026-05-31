import { initiateDeveloperControlledWalletsClient } from "@circle-fin/developer-controlled-wallets";
import * as crypto from "crypto";

const client = initiateDeveloperControlledWalletsClient({
  apiKey: process.env.CIRCLE_API_KEY as string,
  entitySecret: process.env.ENTITY_SECRET as string,
});

const main = async () => {
  const response = await client.getPublicKey();
  const publicKey = response.data?.publicKey as string;
  console.log("✅ Public Key:", publicKey);

  const entitySecret = process.env.ENTITY_SECRET as string;
  const buff = Buffer.from(entitySecret, "hex");
  const encryptedData = crypto.publicEncrypt(
    { key: publicKey, padding: crypto.constants.RSA_PKCS1_OAEP_PADDING, oaepHash: "sha256" },
    buff
  );
  const ciphertext = encryptedData.toString("base64");
  console.log("✅ Ciphertext (paste ke Circle Console):");
  console.log(ciphertext);
};

main().catch(console.error);