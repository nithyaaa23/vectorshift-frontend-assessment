// BaseNode.js - Reusable node abstraction for all node types

import { Handle, Position } from 'reactflow';

/**
 * BaseNode abstraction.
 * 
 * Props:
 *  - id: node id
 *  - title: display name in the header
 *  - color: header gradient color (e.g. '#6366f1')
 *  - icon: emoji or text icon shown in header
 *  - inputs: array of { id, label, position? } for left-side target handles
 *  - outputs: array of { id, label } for right-side source handles
 *  - children: rendered content inside the node body
 *  - minWidth / minHeight: optional sizing overrides
 */
export const BaseNode = ({
  id,
  title,
  color = '#6366f1',
  icon = '⚙️',
  inputs = [],
  outputs = [],
  children,
  minWidth = 220,
  minHeight = undefined,
  style = {},
}) => {
  const totalHandles = Math.max(inputs.length, outputs.length, 1);

  return (
    <div
      style={{
        minWidth,
        minHeight,
        background: '#1e2235',
        border: '1.5px solid #2e3454',
        borderRadius: 12,
        boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
        overflow: 'visible',
        position: 'relative',
        ...style,
      }}
    >
      {/* Header */}
      <div
        style={{
          background: `linear-gradient(135deg, ${color}cc, ${color}88)`,
          borderRadius: '10px 10px 0 0',
          padding: '8px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          borderBottom: '1px solid #2e3454',
        }}
      >
        <span style={{ fontSize: 14 }}>{icon}</span>
        <span style={{ color: '#fff', fontWeight: 600, fontSize: 13, letterSpacing: 0.3 }}>
          {title}
        </span>
      </div>

      {/* Input handles with labels */}
      {inputs.map((handle, i) => {
        const pct = ((i + 1) / (inputs.length + 1)) * 100;
        return (
          <div key={handle.id}>
            <Handle
              type="target"
              position={Position.Left}
              id={`${id}-${handle.id}`}
              style={{
                top: handle.position != null ? `${handle.position}%` : `${pct}%`,
                background: color,
                border: '2px solid #fff',
                width: 10,
                height: 10,
              }}
            />
            {handle.label && (
              <span
                style={{
                  position: 'absolute',
                  left: 14,
                  top: handle.position != null
                    ? `calc(${handle.position}% - 8px)`
                    : `calc(${pct}% - 8px)`,
                  fontSize: 10,
                  color: '#94a3b8',
                  pointerEvents: 'none',
                }}
              >
                {handle.label}
              </span>
            )}
          </div>
        );
      })}

      {/* Output handles with labels */}
      {outputs.map((handle, i) => {
        const pct = ((i + 1) / (outputs.length + 1)) * 100;
        return (
          <div key={handle.id}>
            <Handle
              type="source"
              position={Position.Right}
              id={`${id}-${handle.id}`}
              style={{
                top: `${pct}%`,
                background: color,
                border: '2px solid #fff',
                width: 10,
                height: 10,
              }}
            />
            {handle.label && (
              <span
                style={{
                  position: 'absolute',
                  right: 14,
                  top: `calc(${pct}% - 8px)`,
                  fontSize: 10,
                  color: '#94a3b8',
                  pointerEvents: 'none',
                }}
              >
                {handle.label}
              </span>
            )}
          </div>
        );
      })}

      {/* Body */}
      <div style={{ padding: '10px 14px 12px' }}>{children}</div>
    </div>
  );
};

// Reusable styled field components for use inside nodes
export const NodeField = ({ label, children }) => (
  <div style={{ marginBottom: 8 }}>
    {label && (
      <label style={{ fontSize: 11, color: '#94a3b8', display: 'block', marginBottom: 3 }}>
        {label}
      </label>
    )}
    {children}
  </div>
);

export const NodeInput = (props) => (
  <input
    {...props}
    style={{
      width: '100%',
      background: '#0f1120',
      border: '1px solid #2e3454',
      borderRadius: 6,
      color: '#e2e8f0',
      fontSize: 12,
      padding: '5px 8px',
      outline: 'none',
      boxSizing: 'border-box',
      ...props.style,
    }}
  />
);

export const NodeSelect = (props) => (
  <select
    {...props}
    style={{
      width: '100%',
      background: '#0f1120',
      border: '1px solid #2e3454',
      borderRadius: 6,
      color: '#e2e8f0',
      fontSize: 12,
      padding: '5px 8px',
      outline: 'none',
      boxSizing: 'border-box',
      ...props.style,
    }}
  />
);

export const NodeTextArea = (props) => (
  <textarea
    {...props}
    style={{
      width: '100%',
      background: '#0f1120',
      border: '1px solid #2e3454',
      borderRadius: 6,
      color: '#e2e8f0',
      fontSize: 12,
      padding: '5px 8px',
      outline: 'none',
      resize: 'none',
      boxSizing: 'border-box',
      fontFamily: 'inherit',
      ...props.style,
    }}
  />
);