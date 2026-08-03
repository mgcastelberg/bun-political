import { SERVER_CONFIG } from "./config/server-config";
import indexHTML from "../public/index.html";
import { generateUUID } from "./utils/generate-uuid";
import type { WebSocketData } from "./types";
import { handdleMessage } from "./handlers/message.handlers";

export const createServer = () => {

    const server = Bun.serve<WebSocketData>({

        port: SERVER_CONFIG.port,

        routes:{
            "/": indexHTML
        },

        fetch(req, server) {

            // Identificar nuestros clientes
            const clientId = generateUUID();

            const upgraded = server.upgrade(req, {
                data: {
                    clientId
                }
            })

            if (upgraded) {
                return undefined;
            }

            return new Response("Upgrade failed", { status: 500 });
        },
        websocket: {
            open(ws) {
                ws.subscribe( SERVER_CONFIG.defaultChannelName );
                console.log(`Cliente: ${ ws.data.clientId }`);
            }, // a socket is opened
            message(ws, message: string) {
                const response = handdleMessage(message);
                console.log(response);
            }, // a message is received
            close(ws, code, message) {
                console.log(`Cliente Desconectado: ${ ws.data.clientId }`);
            }, // a socket is closed
            drain(ws) {}, // the socket is ready to receive more data
        }, // handlers
    });

    return server;
}

