import { createServer } from "./server";

console.log("Hello via Bun Realtime!!!");

const server = await createServer();    

console.log("Bun v" + Bun.version);
console.log(`Server running on port ${server.port}`);