export default function Input({ label, error, ...props }) {
  return (
    <div className={`form-field${error ? ' has-error' : ''}`}>
      {label && <label>{label}</label>}
      <input {...props} />
      {error && <div className="field-error">{error}</div>}
    </div>
  )
}
