function CheckboxField(
    {id, name, checked, onChange, error}: {
        id: string,
        name: string,
        checked: boolean,
        onChange: (checked: boolean) => void,
        error: string
    }
) {
    return (
        <div>
            <input
                type="checkbox"
                id={id}
                name={name}
                checked={checked}
                onChange={event => onChange(event.target.checked)}
            />
            {error && <span className="error-message">{error}</span>}
        </div>
    )
}

export default CheckboxField;
