import { useState } from 'react';
import { BaseNode, NodeTextArea } from './BaseNode';

export const NoteNode = ({ id, data }) => {
  const [note, setNote] = useState(data?.note || 'Add your notes here...');

  return (
    <BaseNode
      id={id}
      title="Note"
      color="#64748b"
      icon="🗒️"
      inputs={[]}
      outputs={[]}
      minWidth={200}
    >
      <NodeTextArea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={4}
        placeholder="Write a note..."
      />
    </BaseNode>
  );
};