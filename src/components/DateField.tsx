function DateField(
    {id, label, value, onChange, error}: {
        id: string,
        label: string,
        value: string,
        onChange: (value: string) => void,
        error: string
    }
) {
    return <div>
        <input
            type="date"
            id={id}
            name={label}
            value={value}
            onChange={event => onChange(event.target.value)}
            className={error ? 'error' : ''}
        />
        {error && <span className="error-message">{error}</span>}
    </div>
}

export default DateField;
