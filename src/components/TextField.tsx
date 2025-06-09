function TextField(
    {id, name, value, onChange, error}: {
        id: string,
        name: string,
        value: string,
        onChange: (value: string) => void,
        error: string
    }
) {
    return (
        <div>
            <input
                type="text"
                id={id}
                name={name}
                value={value}
                onChange={event => onChange(event.target.value)}
            />
            {error && <span className="error-message">{error}</span>}
        </div>
    )
}

export default TextField;
