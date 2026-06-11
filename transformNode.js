import { useState } from 'react';
import { BaseNode, NodeField, NodeSelect, NodeTextArea } from './BaseNode';

export const TransformNode = ({ id, data }) => {
  const [mode, setMode] = useState(data?.mode || 'uppercase');
  const [customExpr, setCustomExpr] = useState(data?.customExpr || '');

  return (
    <BaseNode
      id={id}
      title="Transform"
      color="#a855f7"
      icon="⚡"
      inputs={[{ id: 'input', label: 'input' }]}
      outputs={[{ id: 'output', label: 'output' }]}
    >
      <NodeField label="Operation">
        <NodeSelect value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="uppercase">Uppercase</option>
          <option value="lowercase">Lowercase</option>
          <option value="trim">Trim</option>
          <option value="reverse">Reverse</option>
          <option value="custom">Custom</option>
        </NodeSelect>
      </NodeField>
      {mode === 'custom' && (
        <NodeField label="Expression">
          <NodeTextArea
            value={customExpr}
            onChange={(e) => setCustomExpr(e.target.value)}
            rows={2}
            placeholder="e.g. input.split(',').join(' | ')"
          />
        </NodeField>
      )}
    </BaseNode>
  );
};