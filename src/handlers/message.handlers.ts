import type { WebSocketResponse } from "../types";

const createErrorResponse = (error: string): WebSocketResponse => {
    return {
        type: 'ERROR',
        payload: {error: error}
    }
};

export const handdleMessage = (message: string): WebSocketResponse => {
    try {
        const jsonData = JSON.parse(message);
        console.log({payload: jsonData});
        // ToDO: validar el objeto JSON
        const { type, payload } = jsonData;

        switch (type) {
            case 'ADD_PARTY':
                return {
                    type: 'PARTY_ADDED',
                    payload: []
                };
            case 'ERROR':
                return {
                    type: 'ERROR',
                    payload: payload
                };
            default:
                return createErrorResponse(`Unknown message type: ${type}`);
        }
        // return jsonData;
    } catch (error) {
        // TODO: handle error
        console.log({error});
        return createErrorResponse(`validation error`);
    }
}