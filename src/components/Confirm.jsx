import { createPortal } from 'react-dom'

// Lightweight confirmation modal rendered in a portal
export default function Confirm({ open, title = 'Confirm', message = 'Are you sure?', confirmText = 'Confirm', cancelText = 'Cancel', onConfirm, onCancel }) {
  if (!open) return null
  return createPortal(
    <div className="modal-backdrop" onClick={onCancel}>
      <div className="modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <div className="modal-title">{title}</div>
        <div className="modal-body">{message}</div>
        <div className="modal-actions">
          <button className="btn btn-ghost" onClick={onCancel}>{cancelText}</button>
          <button className="btn btn-danger" onClick={onConfirm}>{confirmText}</button>
        </div>
      </div>
    </div>,
    document.body
  )
}


