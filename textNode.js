import { useState, useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';

const VARIABLE_REGEX = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

const extractVariables = (text) => {
  const vars = [];
  const seen = new Set();
  let match;
  VARIABLE_REGEX.lastIndex = 0;
  while ((match = VARIABLE_REGEX.exec(text)) !== null) {
    const name = match[1];
    if (!seen.has(name)) {
      seen.add(name);
      vars.push(name);
    }
  }
  return vars;
};

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [nodeWidth, setNodeWidth] = useState(220);
  const [nodeHeight, setNodeHeight] = useState(80);
  const textareaRef = useRef(null);
  const mirrorRef = useRef(null);

  const variables = extractVariables(currText);

  useEffect(() => {
    const mirror = mirrorRef.current;
    if (!mirror) return;

    mirror.style.width = 'auto';
    mirror.style.whiteSpace = 'pre';
    mirror.textContent = currText || ' ';

    const scrollWidth = mirror.scrollWidth;
    const newWidth = Math.max(220, Math.min(500, scrollWidth + 80));

    mirror.style.width = (newWidth - 80) + 'px';
    mirror.style.whiteSpace = 'pre-wrap';
    mirror.textContent = currText || ' ';

    const scrollHeight = mirror.scrollHeight;
    const newHeight = Math.max(80, scrollHeight + 70);

    setNodeWidth(newWidth);
    setNodeHeight(newHeight);
  }, [currText]);

  const headerColor = '#ec4899';

  return (
    <div
      style={{
        width: nodeWidth,
        minHeight: nodeHeight,
        background: '#1e2235',
        border: '1.5px solid #2e3454',
        borderRadius: 12,
        boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
        position: 'relative',
      }}
    >
      {/* Hidden mirror div for accurate size measurement */}
      <div
        ref={mirrorRef}
        style={{
          position: 'absolute',
          visibility: 'hidden',
          pointerEvents: 'none',
          fontSize: 12,
          fontFamily: "'Inter', 'Segoe UI', sans-serif",
          padding: '5px 8px',
          lineHeight: '1.5',
          wordBreak: 'break-word',
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      />

      {/* Header */}
      <div
        style={{
          background: `linear-gradient(135deg, ${headerColor}cc, ${headerColor}88)`,
          borderRadius: '10px 10px 0 0',
          padding: '8px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          borderBottom: '1px solid #2e3454',
        }}
      >
        <span style={{ fontSize: 14 }}>📝</span>
        <span style={{ color: '#fff', fontWeight: 600, fontSize: 13 }}>Text</span>
      </div>

      {/* Variable input handles — left side */}
      {variables.map((varName, i) => {
        const topPct = variables.length === 1
          ? 50
          : 20 + (i / (variables.length - 1)) * 60;
        return (
          <div key={varName}>
            <Handle
              type="target"
              position={Position.Left}
              id={`${id}-${varName}`}
              style={{
                top: `${topPct}%`,
                background: headerColor,
                border: '2px solid #fff',
                width: 10,
                height: 10,
              }}
            />
            <span
              style={{
                position: 'absolute',
                left: 14,
                top: `calc(${topPct}% - 8px)`,
                fontSize: 10,
                color: '#94a3b8',
                pointerEvents: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              {varName}
            </span>
          </div>
        );
      })}

      {/* Output handle — right side */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{
          top: '50%',
          background: headerColor,
          border: '2px solid #fff',
          width: 10,
          height: 10,
        }}
      />

      {/* Body */}
      <div style={{ padding: '10px 14px 12px' }}>
        <label style={{ fontSize: 11, color: '#94a3b8', display: 'block', marginBottom: 3 }}>
          Content
        </label>
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={(e) => setCurrText(e.target.value)}
          style={{
            width: '100%',
            height: Math.max(60, nodeHeight - 70),
            background: '#0f1120',
            border: '1px solid #2e3454',
            borderRadius: 6,
            color: '#e2e8f0',
            fontSize: 12,
            padding: '5px 8px',
            outline: 'none',
            resize: 'none',
            boxSizing: 'border-box',
            fontFamily: "'Inter', 'Segoe UI', sans-serif",
            lineHeight: '1.5',
            overflow: 'hidden',
          }}
        />
        {variables.length > 0 && (
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {variables.map((v) => (
              <span
                key={v}
                style={{
                  background: '#ec489933',
                  color: '#ec4899',
                  borderRadius: 4,
                  fontSize: 10,
                  padding: '2px 6px',
                  border: '1px solid #ec489966',
                }}
              >
                {`{{${v}}}`}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};