import { useState } from 'react';
import { BaseNode, NodeField, NodeSelect, NodeInput } from './BaseNode';

export const FilterNode = ({ id, data }) => {
  const [field, setField] = useState(data?.field || '');
  const [operator, setOperator] = useState(data?.operator || 'equals');
  const [value, setValue] = useState(data?.value || '');

  return (
    <BaseNode
      id={id}
      title="Filter"
      color="#06b6d4"
      icon="🔍"
      inputs={[{ id: 'data', label: 'data' }]}
      outputs={[{ id: 'pass', label: 'pass' }, { id: 'fail', label: 'fail' }]}
    >
      <NodeField label="Field">
        <NodeInput value={field} onChange={(e) => setField(e.target.value)} placeholder="field name" />
      </NodeField>
      <NodeField label="Operator">
        <NodeSelect value={operator} onChange={(e) => setOperator(e.target.value)}>
          <option value="equals">equals</option>
          <option value="contains">contains</option>
          <option value="greater_than">greater than</option>
          <option value="less_than">less than</option>
        </NodeSelect>
      </NodeField>
      <NodeField label="Value">
        <NodeInput value={value} onChange={(e) => setValue(e.target.value)} placeholder="compare value" />
      </NodeField>
    </BaseNode>
  );
};