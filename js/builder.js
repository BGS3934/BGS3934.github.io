// builder.js

let editor; // Monaco editor instance

// Initialize Monaco editor
require.config({ paths: { vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.34.1/min/vs" } });
require(["vs/editor/editor.main"], function () {
  editor = monaco.editor.create(document.getElementById("editor"), {
    value: "<!-- Loading starter template... -->",
    language: "html",
    theme: "vs-dark",
    automaticLayout: true
  });

  // Load starter template into editor
  loadStarter();

  // Update preview whenever code changes
  editor.onDidChangeModelContent(() => {
    updatePreview(editor.getValue());
  });
});

// Load starter.txt
async function loadStarter() {
  try {
    const res = await fetch("examples/starter.txt");
    const text = await res.text();
    editor.setValue(text);
    updatePreview(text);
  } catch (err) {
    console.error("Failed to load starter.txt", err);
    editor.setValue("<!-- Error: could not load starter template -->");
  }
}

// Update the iframe preview
function updatePreview() {
  const code = editor.getValue();
  const iframe = document.getElementById("preview-frame");
  const doc = iframe.contentDocument || iframe.contentWindow.document;
  doc.open();
  doc.write(code);

  // Inject scaling fix for A-Frame
  const style = doc.createElement("style");
  style.textContent = `
    html, body, a-scene {
      width: 100% !important;
      height: 100% !important;
      margin: 0;
      overflow: hidden;
    }
  `;
  doc.head.appendChild(style);

  doc.close();
}


// Save editor content as .html
function saveProject() {
  const content = editor.getValue();
  const blob = new Blob([content], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "project.html";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Load project from chosen file
function loadProjectFromFile(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const content = e.target.result;
    editor.setValue(content);
    updatePreview(content);
  };
  reader.readAsText(file);
}

// Hook up buttons
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("save-btn").addEventListener("click", saveProject);

  document.getElementById("reset-btn").addEventListener("click", loadStarter);

  document.getElementById("load-btn").addEventListener("click", () => {
    document.getElementById("load-input").click();
  });

  document.getElementById("load-input").addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      loadProjectFromFile(file);
    }
  });
});
