'use client';

import { useState } from 'react';

interface Tab {
  id: string;
  title: string;
  content: string;
}

export default function TabBuilder() {
  const [tabs, setTabs] = useState<Tab[]>([
    { id: '1', title: 'Step 1', content: '' }
  ]);
  const [selectedTabId, setSelectedTabId] = useState<string>('1');
  const [generatedHTML, setGeneratedHTML] = useState<string>('Generated HTML will appear here...');

  const containerStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '250px 1fr 350px',
    gap: '20px',
    height: 'calc(100vh - 180px)',
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const panelStyle: React.CSSProperties = {
    backgroundColor: 'var(--panel)',
    border: '1px solid var(--border)',
    borderRadius: '6px',
    padding: '15px',
    display: 'flex',
    flexDirection: 'column',
  };

  const headerStyle: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: 'var(--text)',
  };

  const tabItemStyle = (isSelected: boolean): React.CSSProperties => ({
    padding: '8px',
    marginBottom: '6px',
    backgroundColor: isSelected ? 'var(--accent)' : 'transparent',
    color: isSelected ? '#fff' : 'var(--text)',
    cursor: 'pointer',
    borderRadius: '4px',
    border: '1px solid var(--border)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  });

  const outputStyle: React.CSSProperties = {
  backgroundColor: '#1e1e1e',
  color: '#d4d4d4',
  padding: '15px',
  borderRadius: '4px',
  fontFamily: 'Consolas, Monaco, "Courier New", monospace',
  fontSize: '12px',
  whiteSpace: 'pre-wrap',      // ✅ Wrap long lines
  wordWrap: 'break-word',      // ✅ Break words if too long
  overflow: 'auto',            // ✅ Add scrolling when needed
  maxHeight: '400px',          // ✅ Prevent crossing footer
  border: '1px solid #555',
};

  // ===================
  // ACTION HANDLERS
  // ===================
  const addTab = () => {
    const newId = (parseInt(tabs[tabs.length - 1]?.id || '0') + 1).toString();
    setTabs([...tabs, { id: newId, title: `Step ${newId}`, content: '' }]);
    setSelectedTabId(newId);
  };

  const removeTab = (id: string) => {
    if (tabs.length > 1) {
      const newTabs = tabs.filter(tab => tab.id !== id);
      setTabs(newTabs);
      if (selectedTabId === id) {
        setSelectedTabId(newTabs[0].id);
      }
    }
  };

  const updateTab = (id: string, field: 'title' | 'content', value: string) => {
    setTabs(tabs.map(tab =>
      tab.id === id ? { ...tab, [field]: value } : tab
    ));
  };

  const generateHTML = () => {
    const tabsHTML = tabs.map((tab, index) => `
      <button onclick="showTab(${index})" 
              style="padding:10px;border:1px solid #ccc;cursor:pointer;">
        ${tab.title}
      </button>`).join('');

    const panelsHTML = tabs.map((tab, index) => `
      <div id="panel-${index}" style="display:${index === 0 ? 'block' : 'none'};padding:10px;border:1px solid #ccc;">
        ${tab.content.split("\n").map(line => `<p>${line}</p>`).join('')}
      </div>`).join('');

    const html = `
<!DOCTYPE html>
<html>
<head><title>Generated Tabs</title></head>
<body>
  <div>${tabsHTML}</div>
  ${panelsHTML}

  <script>
    function showTab(i){
      document.querySelectorAll('div[id^="panel"]').forEach((p,j)=>{
        p.style.display = j===i ? "block":"none";
      });
    }
  </script>
</body>
</html>
    `;
    setGeneratedHTML(html);
  };

  const selectedTab = tabs.find(tab => tab.id === selectedTabId);

  // ===================
  // RENDER UI
  // ===================
  return (
    <div style={containerStyle}>
      {/* Tabs Sidebar */}
      <div style={panelStyle}>
        <div style={headerStyle}>
          Tabs Headers:
          <button onClick={addTab} style={{ marginLeft: '10px', padding: '2px 8px'}}>+ Add</button>
        </div>
        {tabs.map(tab => (
          <div key={tab.id} 
               onClick={() => setSelectedTabId(tab.id)}
               style={tabItemStyle(selectedTabId === tab.id)}>
            {tab.title}
            <button 
              onClick={(e) => {e.stopPropagation(); removeTab(tab.id);}} 
              style={{marginLeft: '10px'}}
            >-</button>
          </div>
        ))}
      </div>

      {/* Tab Content Editor */}
      <div style={panelStyle}>
        <div style={headerStyle}>Tabs Content</div>
        {selectedTab && (
          <>
            <label>Tab Title:</label>
            <input 
              type="text"
              value={selectedTab.title}
              onChange={(e)=>updateTab(selectedTab.id, 'title', e.target.value)}
              style={{marginBottom:'10px', padding:'6px'}}
            />
            <label>Tab Content:</label>
            <textarea
              value={selectedTab.content}
              onChange={(e)=>updateTab(selectedTab.id, 'content', e.target.value)}
              style={{minHeight:'200px', width:'100%', marginBottom:'10px'}}
            />
            <button onClick={generateHTML} style={{padding:'10px', background:'#007bff', color:'#fff'}}>
              Generate HTML
            </button>
          </>
        )}
      </div>

      {/* Output Panel */}
      
  {/* Output Panel */}
<div style={panelStyle}>
  <div style={headerStyle}>Output</div>
  <pre style={outputStyle}>
    {generatedHTML}
  </pre>
</div>

    </div>
  );
}