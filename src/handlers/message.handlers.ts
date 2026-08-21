import { messageSchema, type MessageParsed } from "../schemas/websocket-message.schema";
import { partyService } from "../services/party.service";
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
        payload: partyService.getAll()
    }
};

const handleAddParty = (payload : MessageParsed['payload']):WebSocketResponse => {

    if( !payload?.name || !payload?.color || !payload?.borderColor ) {
        return createErrorResponse('name, color or borderColor are required');
    }

    const newParty = partyService.add(
        payload.name, 
        payload.color, 
        payload.borderColor
    );

    return {
        type: 'PARTY_ADDED',
        payload: newParty
    }
};

const handleUpdateParty = (payload : MessageParsed['payload']):WebSocketResponse => {

    if( !payload?.id ) {
        return createErrorResponse('Party id is required');
    }

    const updatedParty = partyService.update(payload.id, {
        name: payload.name,
        color: payload.color,
        borderColor: payload.borderColor,
        votes: payload.votes
    });

    if( !updatedParty ) {
        return createErrorResponse(`Party with id ${payload.id} not found`);
    }

    return {
        type: 'PARTY_UPDATED',
        payload: updatedParty
    }
};

const handleDeleteParty = (payload : MessageParsed['payload']):WebSocketResponse => {

    if( !payload?.id ) {
        return createErrorResponse(`Party with id ${payload?.id} not found`);
    }

    const deleted = partyService.delete(payload.id);

    if( !deleted ) {
        return createErrorResponse(`Party with id ${payload.id} not found or cant be deleted`);
    }
    
    return {
        type: 'PARTY_DELETED',
        payload: { id: payload.id }
    }
};

const handleIncrementVotes = (payload : MessageParsed['payload']):WebSocketResponse => {
    
    if( !payload?.id ) {
        return createErrorResponse(`Party id is required`);
    }

    const updatedParty = partyService.incrementVotes(payload.id);

    if( !updatedParty ) {
        return createErrorResponse(`Party with id ${payload.id} not found`);
    }

    return {
        type: 'VOTES_UPDATED',
        payload: updatedParty
    }
};

const handleDecrementVotes = (payload : MessageParsed['payload']):WebSocketResponse => {
    if( !payload?.id ) {
        return createErrorResponse(`Party id is required`);
    }

    const updatedParty = partyService.decrementVotes(payload.id);

    if( !updatedParty ) {
        return createErrorResponse(`Party with id ${payload.id} not found`);
    }

    return {
        type: 'VOTES_UPDATED',
        payload: updatedParty
    }
};

// Controlador General
export const handdleMessage = (message: string): WebSocketResponse => {
    try {
        const jsonData: WebSocketMessage = JSON.parse(message);
        console.log({payload: jsonData});

        // ToDO: validar el objeto JSON
        const parseResult = messageSchema.safeParse(jsonData);
        if (!parseResult.success) {
            console.log({error: parseResult.error});
            const errorMessage = parseResult.error.issues
                .map(issue => issue.message)
                .join(', ');
            return createErrorResponse(`Validation error: ${errorMessage}`);
        }

        // const { type, payload } = jsonData;
        const { type, payload } = parseResult.data;

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