export default function Card({ title, children, footer, actions }) {
  return (
    <div className="card">
      {title && <div className="card-header"><h3>{title}</h3>{actions && <div className="page-actions">{actions}</div>}</div>}
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  )
}
