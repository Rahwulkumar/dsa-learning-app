// src/components/CodeEditor/CodeEditor.jsx
import { useState, useEffect } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { initializePyodide } from '../../lib/pyodide/pyodide';
import './CodeEditor.css';

function CodeEditor({ onEventsChange }) {
  const [code, setCode] = useState('# Write your code here\narr = VisualArray()\narr.insert(0, 5)\n');
  const [pyodide, setPyodide] = useState(null);
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(true);

  // Initialize Pyodide
  useEffect(() => {
    async function loadPyodide() {
      setLoading(true);
      try {
        const pyodideInstance = await initializePyodide();
        setPyodide(pyodideInstance);
        setOutput('Pyodide loaded successfully!');
      } catch (error) {
        setOutput(`Failed to load Pyodide: ${error.message}`);
      } finally {
        setLoading(false);
      }
    }
    loadPyodide();
  }, []);

  // Handle code execution
  const runCode = async () => {
    if (!pyodide) {
      setOutput('Pyodide is not loaded yet.');
      return;
    }
    try {
      // Reset events
      window.pyodideEvents = [];
      console.log('Executing VisualArray class...');
      // Load VisualArray class
      await pyodide.runPythonAsync(`
        from js import log_event, log_array_state, log_memory_state
        print("Imported JS functions:", log_event, log_array_state, log_memory_state)

        class VisualArray:
            def __init__(self):
                self.data = []
                self.memory = {}
                self.base_address = 1000
                self.address_step = 4
                print("Initial data:", self.data)
                print("Initial memory:", self.memory)
                self.log_state()

            def insert(self, index, value):
                try:
                    log_event({"step": "start", "action": "insert", "index": index, "value": value})
                    print("Before shift:", self.data)
                    for i in range(len(self.data) - 1, index - 1, -1):
                        self.data.append(self.data[i])
                        self.data[i + 1] = self.data[i]
                        new_address = self.base_address + (i + 1) * self.address_step
                        self.memory[new_address] = self.data[i]
                        log_event({
                            "step": i + 1,
                            "action": "shift",
                            "from_index": i,
                            "to_index": i + 1,
                            "value": self.data[i],
                            "to_address": new_address
                        })
                        print("After shift", i, ":", self.data, self.memory)
                    self.data[index] = value
                    insert_address = self.base_address + index * self.address_step
                    self.memory[insert_address] = value
                    log_event({
                        "step": "final",
                        "action": "insert",
                        "index": index,
                        "value": value,
                        "address": insert_address
                    })
                    print("After insert:", self.data, self.memory)
                    self.log_state()
                    return {"status": "success"}
                except Exception as e:
                    log_event({"step": "error", "action": "error", "message": str(e)})
                    print("Error:", str(e))
                    return {"status": "error", "message": str(e)}

            def log_state(self):
                print("Logging state:", self.data, self.memory)
                log_array_state(self.data)
                log_memory_state(self.memory)
      `);

      console.log('Running user code:', code);
      const result = await pyodide.runPythonAsync(code);
      setOutput(JSON.stringify(result, null, 2));
      console.log('Events captured:', window.pyodideEvents);
      onEventsChange(window.pyodideEvents);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
      console.error('Execution error:', error);
    }
  };

  return (
    <div className="code-editor">
      <h3>Code Editor</h3>
      {loading && <p>Loading Pyodide...</p>}
      <MonacoEditor
        height="400px"
        language="python"
        value={code}
        onChange={(value) => setCode(value)}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 16,
          scrollBeyondLastLine: false,
        }}
      />
      <button onClick={runCode} disabled={!pyodide || loading}>
        {loading ? 'Loading...' : 'Run Code'}
      </button>
      <div className="output">
        <pre>{output}</pre>
      </div>
    </div>
  );
}

export default CodeEditor;