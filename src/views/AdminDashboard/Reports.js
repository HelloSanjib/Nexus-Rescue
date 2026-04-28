import React from 'react';
import { FileText, Download } from 'lucide-react';

export default function Reports() {
  return (
    <div style={{ backgroundColor: 'var(--bg-dark-panel)', borderRadius: '15px', padding: '30px', border: '1px solid var(--border-dark)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ margin: 0, color: 'white' }}>Incident Reports</h2>
        <button style={{ padding: '10px 20px', backgroundColor: 'var(--primary-red)', color: 'white', border: 'none', borderRadius: '5px', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'bold' }}>
          <Download size={18} /> Export All
        </button>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        <div style={{ padding: '20px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <FileText size={32} color="var(--primary-red)" />
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Daily Summary</div>
            <div style={{ fontWeight: 'bold', color: 'white' }}>Available</div>
          </div>
        </div>
        <div style={{ padding: '20px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <FileText size={32} color="var(--info)" />
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Weekly AI Analysis</div>
            <div style={{ fontWeight: 'bold', color: 'var(--warning)' }}>Generating...</div>
          </div>
        </div>
      </div>
    </div>
  );
}
