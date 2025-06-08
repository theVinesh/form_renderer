interface Field {
    label: string;
    type: string;
    name: string;
    required?: boolean;
    options?: string[];
}

interface Schema {
    title: string;
    fields: Field[];
}

export type { Schema, Field };
