import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useSchemaParser } from './useSchemaParser';
import type { Schema } from '../types/Schema';

describe('useSchemaParser', () => {
    const validSchema: Schema = {
        title: "Test Form",
        fields: [
            { label: "Name", type: "text", name: "name", required: true },
            { label: "Email", type: "email", name: "email" },
            { label: "Age", type: "number", name: "age" }
        ]
    };

    const validSchemaText = JSON.stringify(validSchema);

    it('should parse valid schema correctly', () => {
        const { result } = renderHook(() => useSchemaParser(validSchemaText));
        const [schema, error] = result.current;

        expect(error).toBeNull();
        expect(schema).toEqual(validSchema);
        expect(schema?.title).toBe("Test Form");
        expect(schema?.fields).toHaveLength(3);
        expect(schema?.fields[0]).toEqual({
            label: "Name",
            type: "text", 
            name: "name",
            required: true
        });
    });

    it('should return error for invalid JSON', () => {
        const invalidJson = '{ "title": "Test", "fields": [invalid json}';
        const { result } = renderHook(() => useSchemaParser(invalidJson));
        const [schema, error] = result.current;

        expect(schema).toBeNull();
        expect(error).toBe("Invalid schema");
    });

    it('should return error for empty string', () => {
        const { result } = renderHook(() => useSchemaParser(''));
        const [schema, error] = result.current;

        expect(schema).toBeNull();
        expect(error).toBe("Invalid schema");
    });

    it('should return error for schema missing title', () => {
        const schemaWithoutTitle = JSON.stringify({
            fields: [{ label: "Name", type: "text", name: "name" }]
        });
        const { result } = renderHook(() => useSchemaParser(schemaWithoutTitle));
        const [schema, error] = result.current;

        expect(schema).toBeNull();
        expect(error).toBe("Incomplete schema; Title and fields are required");
    });

    it('should return error for schema missing fields', () => {
        const schemaWithoutFields = JSON.stringify({
            title: "Test Form"
        });
        const { result } = renderHook(() => useSchemaParser(schemaWithoutFields));
        const [schema, error] = result.current;

        expect(schema).toBeNull();
        expect(error).toBe("Incomplete schema; Title and fields are required");
    });

    it('should return error for schema with empty title', () => {
        const schemaWithEmptyTitle = JSON.stringify({
            title: "",
            fields: [{ label: "Name", type: "text", name: "name" }]
        });
        const { result } = renderHook(() => useSchemaParser(schemaWithEmptyTitle));
        const [schema, error] = result.current;

        expect(schema).toBeNull();
        expect(error).toBe("Incomplete schema; Title and fields are required");
    });

    it('should accept schema with empty fields array', () => {
        const schemaWithEmptyFields = JSON.stringify({
            title: "Test Form",
            fields: []
        });
        const { result } = renderHook(() => useSchemaParser(schemaWithEmptyFields));
        const [schema, error] = result.current;

        expect(error).toBeNull();
        expect(schema).toEqual({
            title: "Test Form",
            fields: []
        });
    });
});
