import { useState } from 'react';
import { BaseNode, NodeField, NodeSelect } from './BaseNode';

export const MergeNode = ({ id, data }) => {
  const [strategy, setStrategy] = useState(data?.strategy || 'concat');

  return (
    <BaseNode
      id={id}
      title="Merge"
      color="#f97316"
      icon="🔀"
      inputs={[
        { id: 'a', label: 'input A' },
        { id: 'b', label: 'input B' },
      ]}
      outputs={[{ id: 'merged', label: 'merged' }]}
    >
      <NodeField label="Strategy">
        <NodeSelect value={strategy} onChange={(e) => setStrategy(e.target.value)}>
          <option value="concat">Concatenate</option>
          <option value="zip">Zip</option>
          <option value="override">Override</option>
        </NodeSelect>
      </NodeField>
    </BaseNode>
  );
};