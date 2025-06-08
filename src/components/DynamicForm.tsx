import type {Field, Schema} from "../types/Schema.ts";
import {validateSchema} from "../Utils.ts";
import {useCallback, useMemo, useState} from "react";

function DynamicForm({schemaText}: { schemaText: string }) {
    const schema: Schema = useMemo(
        () => validateSchema(schemaText) ? JSON.parse(schemaText) : (
            {
                title: "Invalid Schema",
                fields: []
            }
        ),
        [schemaText]
    )

    const [formData, setFormData] = useState<Record<string, string | number | boolean>>({});
    const [submittedData, setSubmittedData] = useState<string | null>(null);

    const handleChange = (fieldName: string, value: any) => {
        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: value
        }))
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmittedData(JSON.stringify(formData, null, 2));
    }


    const renderField = useCallback((field: Field) => {
        switch (field.type) {
            case "text":
                return <input
                    type="text"
                    id={field.name}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={event => handleChange(field.name, event.target.value)}
                />
            case "number":
                return <input
                    type="number"
                    id={field.name}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={event => handleChange(field.name, event.target.value)}
                />
            case "select":
                return (
                    <select
                        id={field.name}
                        name={field.name}
                        value={formData[field.name] || field.options?.[0]}
                        onChange={event => handleChange(field.name, event.target.value)}
                    >
                        {field.options?.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                )
            case "checkbox":
                return <input
                    type="checkbox"
                    id={field.name}
                    name={field.name}
                    checked={formData[field.name] || false}
                    onChange={event => handleChange(field.name, event.target.checked)}
                />
            case "textarea":
                return <textarea
                    id={field.name}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={event => handleChange(field.name, event.target.value)}
                />
            /* case "date":
                 return <input type="date" id={field.name} name={field.name}/>*/
            // todo multiselect
            default:
                return <input type="text" id={field.name} name={field.name} value={formData[field.name] || ''}/>
        }
    }, [formData]);

    return (
        <>
            <h2>{schema.title}</h2>
            <form title={schema.title} onSubmit={handleSubmit}>
                {schema.fields.map((field) => (
                    <div key={field.name}>
                        <label htmlFor={field.name}>{field.label}</label>
                        {renderField(field)}
                    </div>
                ))}
                <button type="submit">Submit</button>
                {submittedData && (
                    <div>
                        <h3>Submitted Data</h3>
                        <textarea
                            value={submittedData}
                            readOnly={true}
                        />
                    </div>
                )}
            </form>
        </>
    )
}

export default DynamicForm;
