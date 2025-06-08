import type {Schema} from "../types/Schema.ts";
import {validateSchema} from "../Utils.ts";
import {useMemo} from "react";


export function useSchemaParser(schemaText: string): [schema: Schema | null, error: string | null] {
    return useMemo(() => {
        if (!validateSchema(schemaText)) {
            return [null, "Invalid schema"];
        }
        const schema = JSON.parse(schemaText) as Schema;
        if (!schema.title || !schema.fields) {
            return [null, "Incomplete schema; Title and fields are required"];
        }
        return [schema, null];
    }, [schemaText]);
}