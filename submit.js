import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { useState } from 'react';

const selector = (state) => ({ nodes: state.nodes, edges: state.edges });

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      const data = await response.json();
      alert(
        `Pipeline Analysis\n` +
        `─────────────────\n` +
        `Nodes:    ${data.num_nodes}\n` +
        `Edges:    ${data.num_edges}\n` +
        `Is DAG:   ${data.is_dag ? '✅ Yes' : '❌ No (contains a cycle)'}`
      );
    } catch (err) {
      alert(`Error: ${err.message}\n\nMake sure the backend is running on http://localhost:8000`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        background: '#131625',
        borderTop: '1px solid #1e2235',
        padding: '10px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
      }}
    >
      <span style={{ fontSize: 12, color: '#64748b' }}>
        {nodes.length} node{nodes.length !== 1 ? 's' : ''} · {edges.length} edge{edges.length !== 1 ? 's' : ''}
      </span>
      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          background: loading ? '#2e3454' : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '8px 24px',
          fontSize: 13,
          fontWeight: 600,
          cursor: loading ? 'not-allowed' : 'pointer',
          transition: 'opacity 0.2s',
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading ? 'Analyzing…' : '▶ Submit Pipeline'}
      </button>
    </div>
  );
};