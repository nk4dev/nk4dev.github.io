import React from 'react';
import { css } from '../../styled-system/css';

type PopupProps = {
  title?: string;
  children?: React.ReactNode;
  initiallyMinimized?: boolean;
  onClose?: () => void;
};

export default function Popup({ title = 'Popup', children, initiallyMinimized = false, onClose }: PopupProps) {
  const [minimized, setMinimized] = React.useState(initiallyMinimized);
  const [visible, setVisible] = React.useState(true);

  if (!visible) return null;

  return (
    <div
      className={css({
        position: 'fixed',
        right: '20px',
        bottom: '20px',
        width: minimized ? '220px' : '360px',
        background: '#0b1220',
        color: '#fff',
        borderRadius: '8px',
        boxShadow: '0 8px 24px rgba(2,6,23,0.6)',
        zIndex: 9999,
        overflow: 'hidden',
      })}
    >
      <div
        className={css({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 12px',
          background: 'linear-gradient(90deg,#07102a 0%, #0b1632 100%)',
          borderBottom: minimized ? 'none' : '1px solid rgba(255,255,255,0.04)',
        })}
      >
        <div style={{ fontWeight: 600 }}>{title}</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            aria-label={minimized ? 'Restore' : 'Minimize'}
            onClick={() => setMinimized((s) => !s)}
            className={css({
              border: 'none',
              color: '#aab6ff',
            })}
          >
            {minimized ? '▣' : '▁'}
          </button>
        </div>
      </div>

      {!minimized && (
        <div className={css({ padding: '12px', fontSize: '14px', lineHeight: 1.4 })}>
          {children}
        </div>
      )}
    </div>
  );
}
