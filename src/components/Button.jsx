// Small styled button component with variants, forwards any extra props to <button>
export default function Button({ children, variant = 'primary', ...props }) {
  return (
    <button className={`btn btn-${variant}`} {...props}>{children}</button>
  )
}
