export const handdleMessage = (message: string) => {
    try {
        const jsonData = JSON.parse(message);
        console.log({payload: jsonData});
        // return jsonData;
    } catch (error) {
        // TODO: handle error
        console.log({error});
        // return message;
    }
}