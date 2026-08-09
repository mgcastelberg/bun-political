import type { WebSocketMessage, WebSocketResponse } from "../types";

const createErrorResponse = (error: string): WebSocketResponse => {
    return {
        type: 'ERROR',
        payload: {error: error}
    }
};

// Handlers especificos
const handleGetParties = ():WebSocketResponse => {
    return {
        type: 'PARTIES_LIST',
        payload: null
    }
};

const handleAddParty = (payload : unknown):WebSocketResponse => {
    return {
        type: 'PARTY_ADDED',
        payload: {
            name: 'Partido 1',
        }
    }
};

const handleUpdateParty = (payload : unknown):WebSocketResponse => {
    return {
        type: 'PARTY_UPDATED',
        payload: {}
    }
};

const handleDeleteParty = (payload : unknown):WebSocketResponse => {
    return {
        type: 'PARTY_DELETED',
        payload: {}
    }
};

const handleIncrementVotes = (payload : unknown):WebSocketResponse => {
    return {
        type: 'VOTES_UPDATED',
        payload: {}
    }
};

const handleDecrementVotes = (payload : unknown):WebSocketResponse => {
    return {
        type: 'VOTES_UPDATED',
        payload: {}
    }
};

// Controlador General
export const handdleMessage = (message: string): WebSocketResponse => {
    try {
        const jsonData: WebSocketMessage = JSON.parse(message);
        console.log({payload: jsonData});
        // ToDO: validar el objeto JSON
        const { type, payload } = jsonData;

        switch (type) {
            case 'GET_PARTIES': 
                return handleGetParties();
            case 'ADD_PARTY':
                return handleAddParty(payload);
            case 'UPDATE_PARTY':
                return handleUpdateParty(payload);
            case 'DELETE_PARTY':
                return handleDeleteParty(payload);
            case 'INCREMENT_VOTES':
                return handleIncrementVotes(payload);
            case 'DECREMENT_VOTES':
                return handleDecrementVotes(payload);
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