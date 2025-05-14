export async function initializePyodide() {
  console.log('Starting Pyodide initialization...');
  try {
    if (!window.loadPyodide) {
      throw new Error('window.loadPyodide is not available. Ensure Pyodide script is loaded.');
    }

    const pyodide = await window.loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/',
    });
    console.log('Pyodide loaded successfully!');

    window.pyodideEvents = [];

    const logEvent = (event) => {
      const jsEvent = event.toJs ? event.toJs() : event;
      console.log('Event:', jsEvent);
      window.pyodideEvents.push(jsEvent);
      return jsEvent;
    };
    
    const logArrayState = (data) => {
      const jsData = data.toJs ? data.toJs() : data;
      console.log('Array State:', jsData);
      window.pyodideEvents.push({ type: 'array_state', data: jsData });
      return jsData;
    };
    
    const logMemoryState = (memory) => {
      const jsMemory = memory.toJs ? memory.toJs() : memory;
      console.log('Memory State:', jsMemory);
      window.pyodideEvents.push({ type: 'memory_state', data: jsMemory });
      return jsMemory;
    };

    // ✅ Expose these globally for 'from js import ...' in Pyodide
    window.log_event = logEvent;
    window.log_array_state = logArrayState;
    window.log_memory_state = logMemoryState;

    // Optionally also expose them as Python globals if you'd like to use them without import
    pyodide.globals.set('log_event', logEvent);
    pyodide.globals.set('log_array_state', logArrayState);
    pyodide.globals.set('log_memory_state', logMemoryState);

    console.log('Logging functions registered:', {
      log_event: window.log_event,
      log_array_state: window.log_array_state,
      log_memory_state: window.log_memory_state,
    });

    return pyodide;
  } catch (error) {
    console.error('Pyodide initialization failed:', error);
    throw error;
  }
}
