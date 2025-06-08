import type {Schema} from "../types/Schema.ts";
import {validateSchema} from "../Utils.ts";
import {useMemo} from "react";


export function useSchemaParser(schemaText: string): [schema: Schema | null, error: string | null] {
    return useMemo(() => {
        if (!validateSchema(schemaText)) {
            return [null, "Invalid schema"];
        }
        return [JSON.parse(schemaText), null];
    }, [schemaText]);
}