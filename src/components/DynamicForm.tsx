import type {Field} from "../types/Schema.ts";
import {useCallback, useState} from "react";
import {useSchemaParser} from "../hooks/useSchemaParser.ts";
import DateField from "./DateField.tsx";
import TextField from "./TextField.tsx";
import NumberField from "./NumberField.tsx";
import SelectField from "./SelectField.tsx";
import CheckboxField from "./CheckboxField.tsx";
import TextareaField from "./TextareaField.tsx";

function DynamicForm({schemaText}: { schemaText: string }) {
    const [schema, schemaError] = useSchemaParser(schemaText)
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [errors, setErrors] = useState<Record<string, any>>({});
    const [submittedData, setSubmittedData] = useState<string | null>(null);

    const handleChange = (fieldName: string, value: any) => {
        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: value
        }))
    }

    const validateForm = () => {
        const errors: Record<string, any> = {};
        schema?.fields.forEach((field) => {
            if (field.required && !formData[field.name]) {
                errors[field.name] = `${field.label} is required`;
            }
        });
        return errors;
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const validationErrors = validateForm();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            setSubmittedData(JSON.stringify(formData, null, 2));
        }
    }


    const renderField = useCallback((field: Field) => {
        switch (field.type) {
            case "text":
                return <TextField
                    id={field.name}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={(value) => handleChange(field.name, value)}
                    error={errors[field.name] || ''}
                />
            case "number":
                return <NumberField
                    id={field.name}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={(value) => handleChange(field.name, value)}
                    error={errors[field.name] || ''}
                />
            case "select":
                return <SelectField
                    id={field.name}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={(value) => handleChange(field.name, value)}
                    error={errors[field.name] || ''}
                    options={field.options || []}
                />
            case "checkbox":
                return <CheckboxField
                    id={field.name}
                    name={field.name}
                    checked={formData[field.name] || false}
                    onChange={(checked) => handleChange(field.name, checked)}
                    error={errors[field.name] || ''}
                />
            case "textarea":
                return <TextareaField
                    id={field.name}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={(value) => handleChange(field.name, value)}
                    error={errors[field.name] || ''}
                />
            case "date":
                return <DateField
                    id={field.name}
                    label={field.label}
                    value={formData[field.name] || ''}
                    onChange={(value) => handleChange(field.name, value)}
                    error={errors[field.name] || ''}
                />
            // todo multiselect
            default:
                return <TextField
                    id={field.name}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={(value) => handleChange(field.name, value)}
                    error={errors[field.name] || ''}
                />
        }
    }, [formData, errors]);

    if (!schema) {
        return <h2>{schemaError}</h2>
    } else {
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
}


export default DynamicForm;
