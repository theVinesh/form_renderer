import type {Field, Schema} from "../types/Schema.ts";
import {validateSchema} from "../Utils.ts";

function DynamicForm({schemaText}: { schemaText: string }) {
    const schema: Schema = validateSchema(schemaText) ? JSON.parse(schemaText) : (
        {
            title: "Invalid Schema",
            fields: []
        }
    )

    const renderField = (field: Field) => {
        switch (field.type) {
            case "text":
                return <input type="text" id={field.name} name={field.name}/>
            case "number":
                return <input type="number" id={field.name} name={field.name}/>
            case "select":
                return (
                    <select id={field.name} name={field.name}>
                        {field.options?.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                )
            case "checkbox":
                return <input type="checkbox" id={field.name} name={field.name}/>
            case "textarea":
                return <textarea id={field.name} name={field.name}/>
            case "date":
                return <input type="date" id={field.name} name={field.name}/>
            // todo multiselect
            default:
                return <input type="text" id={field.name} name={field.name}/>
        }
    }
    return (
        <>
            <h2>{schema.title}</h2>
            <form title={schema.title}>
                {schema.fields.map((field) => (
                    <div key={field.name}>
                        <label htmlFor={field.name}>{field.label}</label>
                        {renderField(field)}
                    </div>
                ))}
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default DynamicForm;
