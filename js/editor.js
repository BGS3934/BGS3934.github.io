require.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs' } });

require(['vs/editor/editor.main'], function () {
  const editor = monaco.editor.create(document.getElementById('editor'), {
    value: '',
    language: 'html',
    theme: 'vs-dark',
    automaticLayout: true,
  });

  const exampleSelect = document.getElementById('exampleSelect');
  const preview = document.getElementById('preview');
  const descriptionDiv = document.getElementById('description');

  // Template for preview iframe
  function wrapCode(sceneContent) {
    return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <script src="https://aframe.io/releases/1.7.0/aframe.min.js"></script>
    <script src="https://unpkg.com/aframe-event-set-component@5.x.x/dist/aframe-event-set-component.min.js"></script>
    <script src="https://unpkg.com/aframe-extras@7.2.0/dist/aframe-extras.min.js"></script>
    <script src="thumbstick-move.js"></script>
  </head>
  <body>
    ${sceneContent}
  </body>
</html>`;
  }

  // Load code and description
  function loadExample(file) {
    // Load example file into editor
    fetch(file)
      .then(res => res.text())
      .then(data => {
        editor.setValue(data);
        updatePreview(data);
      })
      .catch(() => {
        editor.setValue('// Error loading example');
        updatePreview('');
      });

    // Extract number from filename to load matching HTML description
    const match = file.match(/example(\d+)\.txt$/);
    if (match) {
      const number = match[1];
      const descriptionFile = `examples/description${number}.md`;

      fetch(descriptionFile)
        .then(res => res.text())
        .then(html => {
          descriptionDiv.innerHTML = html; // Direct HTML injection
        })
        .catch(err => {
          console.error('Error loading description file:', err);
          descriptionDiv.textContent = 'Error loading description.';
        });
    }
  }

  // Update preview (with debounce)
  let timeout;
  editor.onDidChangeModelContent(() => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      updatePreview(editor.getValue());
    }, 500);
  });

  function updatePreview(sceneContent) {
    const wrapped = wrapCode(sceneContent);
    preview.srcdoc = wrapped;
  }

  // On example change
  exampleSelect.addEventListener('change', () => {
    loadExample(exampleSelect.value);
  });

  // Initial load
  loadExample(exampleSelect.value);
});
