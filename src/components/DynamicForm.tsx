import type {Schema} from "../types/Schema.ts";
import {validateSchema} from "../Utils.ts";

function DynamicForm({schemaText}: { schemaText: string }) {
    const schema: Schema = validateSchema(schemaText) ? JSON.parse(schemaText) : (
        {
            title: "Invalid Schema",
            fields: []
        }
    )
    return (
        <>
            <h2>{schema.title}</h2>
            <form title={schema.title}>
                {schema.fields.map((field) => (
                    <div key={field.name}>
                        <label htmlFor={field.name}>{field.label}</label>
                        <input type={field.type} id={field.name} name={field.name}/>
                    </div>
                ))}
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default DynamicForm;
