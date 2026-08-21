import { z } from 'zod';

/*
{
 type: 'GET_PARTIES',
 payload: {
   id: string;
   name: string;
   color: string;
   borderColor: string;
   votes: number;
 }
}
*/
const typeSchema = z.enum([
    'GET_PARTIES', 
    'ADD_PARTY', 
    'UPDATE_PARTY', 
    'DELETE_PARTY', 
    'INCREMENT_VOTES', 
    'DECREMENT_VOTES'
]);

const payloadSchema = z.object({
    id: z.string().optional(),
    name: z.string().optional(),
    color: z.string().optional(),
    borderColor: z.string().optional(),
    votes: z.number().optional()
});

export const messageSchema = z.object({ 
    type: typeSchema,
    payload: payloadSchema.optional()
});

export type MessageParsed = z.infer<typeof messageSchema>;
export type MessagePayload = z.infer<typeof payloadSchema>;

