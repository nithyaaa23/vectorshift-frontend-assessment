import { DraggableNode } from './draggableNode';

const NODE_TYPES = [
  { type: 'customInput', label: 'Input', color: '#10b981', icon: '📥' },
  { type: 'customOutput', label: 'Output', color: '#f59e0b', icon: '📤' },
  { type: 'llm', label: 'LLM', color: '#8b5cf6', icon: '🤖' },
  { type: 'text', label: 'Text', color: '#ec4899', icon: '📝' },
  { type: 'filter', label: 'Filter', color: '#06b6d4', icon: '🔍' },
  { type: 'merge', label: 'Merge', color: '#f97316', icon: '🔀' },
  { type: 'transform', label: 'Transform', color: '#a855f7', icon: '⚡' },
  { type: 'note', label: 'Note', color: '#64748b', icon: '🗒️' },
  { type: 'api', label: 'API Call', color: '#0ea5e9', icon: '🌐' },
];

export const PipelineToolbar = () => {
  return (
    <div
      style={{
        background: '#131625',
        borderBottom: '1px solid #1e2235',
        padding: '10px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
      }}
    >
      <div
        style={{
          fontWeight: 700,
          fontSize: 16,
          color: '#e2e8f0',
          letterSpacing: '-0.5px',
          marginRight: 8,
          whiteSpace: 'nowrap',
        }}
      >
        🔗 VectorShift
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {NODE_TYPES.map((n) => (
          <DraggableNode key={n.type} type={n.type} label={n.label} color={n.color} icon={n.icon} />
        ))}
      </div>
    </div>
  );
};