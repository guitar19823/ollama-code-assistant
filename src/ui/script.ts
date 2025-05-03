export const script = `
  (function() {
    const vscode = acquireVsCodeApi();

    const elements = {
      output: document.getElementById('output'),
      input: document.getElementById('input'),
      modelSelect: document.getElementById('modelSelect')
    };

    // Настройка marked для лучшего отображения
    marked.setOptions({
      gfm: true,
      breaks: true,
      sanitize: false,
      smartLists: true,
      smartypants: true,
      xhtml: true,
      highlight: function(code, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(code, { language: lang }).value;
          } catch (e) {
            console.error('Highlight error:', e);
          }
        }
        return code;
      }
    });

    // Функция для применения подсветки синтаксиса
    function applySyntaxHighlighting() {
      document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightElement(block);
      });
    }

    // Функция для обновления вывода
    function updateOutput({
      prompt,
      response,
      streamId,
    }) {
      if (!elements.output) return;

      let seanse = document.getElementById(streamId);

      if (seanse) {
        seanse.remove();
      }

      seanse = document.createElement('div');
      seanse.id = streamId;

      const p = document.createElement('p');
      p.className = 'prompt';
      p.textContent = prompt;
      seanse.appendChild(p);

      seanse.appendChild(document.createElement('br'));

      const div = document.createElement('div');
      div.innerHTML = marked.parse(response);
      seanse.appendChild(div);

      elements.output.appendChild(seanse);

      elements.output.scrollTop = elements.output.scrollHeight;
      applySyntaxHighlighting();
    }

    function addSeanses(seanses) {
      seanses.forEach((seanse) => {
        updateOutput(seanse);
      });
    }

    function updateModels(text, selectedModel) {
      if (!elements.modelSelect) return;
      
      try {
        const models = JSON.parse(text);
        elements.modelSelect.innerHTML = '';
        
        models.forEach(model => {
          const option = document.createElement('option');
          option.value = model;
          option.textContent = model;
          elements.modelSelect.appendChild(option);
        });
        
        // Сохраняем выбранную модель
        if (selectedModel && models.includes(selectedModel)) {
          elements.modelSelect.value = selectedModel;
        } else if (models.length > 0) {
          elements.modelSelect.value = models[0];

          changeModel();
        }
      } catch (e) {
        console.error('Error parsing models:', e);
      }
    }

    // Функция для очистки вывода
    function clearOutput() {
      if (!elements.output) return;
      
      elements.output.innerHTML = '';

      vscode.postMessage({
        command: 'clearOutput',
      });
    }

    // Функция для очистки ввода
    function clearInput() {
      if (!elements.input) return;
      
      elements.input.value = '';
    }

    // Функция для отправки запроса
    function runStreaming() {
      if (!elements.input) return;
      
      const prompt = elements.input.value.trim();

      if (!prompt) return;

      try {
        vscode.postMessage({
          command: 'runStreaming',
          prompt: prompt,
        });

        clearInput();
      } catch (e) {
        console.error('Post message error:', e);
      }
    }

    function stopStreaming() {
      vscode.postMessage({
        command: 'stopStreaming',
      });
    }

    function checkModels() {
      vscode.postMessage({
        command: 'getModels',
      });
    }

    // Обработчик изменения модели
    function changeModel() {
      if (!elements.modelSelect) return;

      vscode.postMessage({
        command: 'changeModel',
        model: elements.modelSelect.value
      });
    }

    // Обработчик сообщений от VS Code
    window.addEventListener('message', ({ data: { command, text, selectedModel } }) => {
      switch (command) {
        case 'ollamaModels':
          updateModels(text, selectedModel);
          break;

        case 'getSeanses':
          addSeanses(JSON.parse(text));
          break;

        case 'getSeanse':
          updateOutput(JSON.parse(text));
          break;
      }
    });

    // Экспортируем функции для использования в HTML
    window.onUpdateOutput = updateOutput;
    window.onClearOutput = clearOutput;
    window.onClearInput = clearInput;
    window.onRunStreaming = runStreaming;
    window.onStopStreaming = stopStreaming;
    window.onCheckModels = checkModels;
    window.onChangeModel = changeModel;

    // Добавляем обработчик клавиш для textarea
    if (elements.input) {
      elements.input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
          e.preventDefault();
          runStreaming();
        }
      });
    }
    
    try {
      vscode.postMessage({
        command: 'getModels',
      });

      vscode.postMessage({
        command: 'getSeanses',
      });
    } catch (e) {
      console.error('Post message error:', e);
    }
  })();
`;
