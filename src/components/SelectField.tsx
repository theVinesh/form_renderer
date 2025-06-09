function SelectField(
    {id, name, value, onChange, error, options}: {
        id: string,
        name: string,
        value: string,
        onChange: (value: string) => void,
        error: string,
        options: string[]
    }
) {
    return (
        <div>
            <select
                id={id}
                name={name}
                value={value || options[0]}
                onChange={event => onChange(event.target.value)}
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            {error && <span className="error-message">{error}</span>}
        </div>
    )
}

export default SelectField;
