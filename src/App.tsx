import {useState} from "react";
import './App.css'
import SchemaInputAndPreview from "./components/SchemaInputAndPreview.tsx";
import type {Schema} from "./types/Schema.ts";
import DynamicForm from "./components/DynamicForm.tsx";

function App() {
    const defaultSchema: Schema = {
        title: "User Registration",
        fields: [
            {label: "Name", type: "text", name: "name"},
            {label: "Dob", type: "date", name: "dob", required: true},
            {label: "Subscribe", type: "checkbox", name: "subscribe"},
            {
                label: "Gender",
                type: "select",
                name: "gender",
                options: ["Male", "Female", "Other"]
            }
        ]
    }

    const [schemaText, setSchemaText] = useState(JSON.stringify(defaultSchema, null, 2))
    return (
        <>
            <SchemaInputAndPreview schemaText={schemaText} setSchemaText={setSchemaText}/>
            <DynamicForm schemaText={schemaText}/>
        </>
    )
}

export default App
