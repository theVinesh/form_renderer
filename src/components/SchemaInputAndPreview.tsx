import {validateSchema} from "../Utils.ts";

function SchemaInputAndPreview({schemaText, setSchemaText}: {
    schemaText: string,
    setSchemaText: (schemaText: string) => void
}) {
    return (
        <>
            <div className="schema-input-container">
                <div className="schema-input">
                    <h4>Schema Input</h4>
                    <textarea value={schemaText} onChange={e => setSchemaText(e.target.value)}/>
                </div>
                <div className="schema-preview">
                    <h4>Preview</h4>
                    <textarea
                        value={
                            validateSchema(schemaText) ?
                                JSON.stringify(JSON.parse(schemaText), null, 2)
                                : "Invalid Schema"
                        }
                        readOnly={true}/>
                </div>
            </div>
        </>
    )
}

export default SchemaInputAndPreview;
