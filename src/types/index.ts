export interface WebSocketResponse {
    type: ResponseType;
    payload?: unknown;
}

export type ResponseType = 
| 'PARTIES_LIST'
| 'PARTY_ADDED'
| 'PARTY_UPDATED'
| 'PARTY_DELETED'
| 'VOTES_UPDATED'
| 'ERROR';

export interface WebSocketData {
    clientId: string;
}