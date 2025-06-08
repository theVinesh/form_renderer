export function validateSchema(schemaText: string) {
    try {
        JSON.parse(schemaText);
    } catch (e) {
        return false;
    }
    return true;
}