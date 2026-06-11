import { useState } from 'react';
import { BaseNode, NodeField, NodeInput, NodeSelect } from './BaseNode';

export const APINode = ({ id, data }) => {
  const [url, setUrl] = useState(data?.url || '');
  const [method, setMethod] = useState(data?.method || 'GET');

  return (
    <BaseNode
      id={id}
      title="API Call"
      color="#0ea5e9"
      icon="🌐"
      inputs={[{ id: 'body', label: 'body' }, { id: 'headers', label: 'headers' }]}
      outputs={[{ id: 'response', label: 'response' }, { id: 'error', label: 'error' }]}
    >
      <NodeField label="Method">
        <NodeSelect value={method} onChange={(e) => setMethod(e.target.value)}>
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
        </NodeSelect>
      </NodeField>
      <NodeField label="URL">
        <NodeInput value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://api.example.com/..." />
      </NodeField>
    </BaseNode>
  );
};