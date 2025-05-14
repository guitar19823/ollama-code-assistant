export const script = `
  document.addEventListener('DOMContentLoaded', function() {
    const vscode = acquireVsCodeApi();

    const elements = {
      settingsDialog: document.getElementById('settingsDialog'),
      baseUrlInput: document.getElementById('baseUrl'),
      output: document.getElementById('output'),
      input: document.getElementById('input'),
      modelSelect: document.getElementById('modelSelect'),
      modelSelectorButton: document.getElementById('modelSelectorButton'),
      loadingIndicator: document.getElementById('loadingIndicator'),
      typingIndicator: document.getElementById('typingIndicator'),
      rulesDialog: document.getElementById('rulesDialog'),
      ruleEditDialog: document.getElementById('ruleEditDialog'),
      rulesContainer: document.getElementById('rulesContainer'),
      rulesCheckboxContainer: document.getElementById('rulesCheckboxContainer'),
      rulesSelector: document.getElementById('rulesSelector'),
      ruleName: document.getElementById('ruleName'),
      ruleContent: document.getElementById('ruleContent')
    };

    let currentRuleId = null;
    let rules = [];

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
          const option = document.createElement('span');
          option.className = 'model-option nowrap';
          option.onclick = () => {
            changeModel(model);
            elements.modelSelectorButton.textContent = model;
          };
          option.textContent = model;
          elements.modelSelect.appendChild(option);
        });
        
        // Сохраняем выбранную модель
        if (selectedModel && models.includes(selectedModel)) {
          elements.modelSelectorButton.textContent = selectedModel;
        } else if (models.length > 0) {
          elements.modelSelectorButton.textContent = models[0];

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
    function changeModel(model) {
      if (!elements.modelSelect) return;

      vscode.postMessage({
        command: 'changeModel',
        model
      });
    }

    function showLoadingIndicator() {
      if (elements.loadingIndicator) {
        elements.loadingIndicator.classList.add('active');
      }
    }

    function hideLoadingIndicator() {
      if (elements.loadingIndicator) {
        elements.loadingIndicator.classList.remove('active');
      }
    }

    function showTypingIndicator() {
      if (elements.typingIndicator) {
        elements.typingIndicator.classList.add('active');
      }
    }

    function hideTypingIndicator() {
      if (elements.typingIndicator) {
        elements.typingIndicator.classList.remove('active');
      }
    }
    

    function showSettings() {
      if (elements.settingsDialog) {
        elements.settingsDialog.classList.add('active');
      }
    }

    function hideSettings() {
      if (elements.settingsDialog) {
        elements.settingsDialog.classList.remove('active');
      }
    }

    function saveSettings() {
      if (!elements.baseUrlInput) return;
      
      const baseUrl = elements.baseUrlInput.value.trim();
      const sanitizedUrl = baseUrl.replace(/<[^>]*>/g, ''); // Remove any HTML tags
      
      vscode.postMessage({
        command: 'saveSettings',
        baseUrl: sanitizedUrl
      });
      
      hideSettings();
    }

    function setSettings(settings) {
      if (!elements.baseUrlInput) return;
      
      elements.baseUrlInput.value = settings.baseUrl;
    }

    function showRules() {
      if (elements.rulesDialog) {
        elements.rulesDialog.classList.add('active');
        loadRules();
      }
    }

    function hideRules() {
      if (elements.rulesDialog) {
        elements.rulesDialog.classList.remove('active');
      }
    }

    function showRuleEdit(ruleId = null) {
      currentRuleId = ruleId;

      if (elements.ruleEditDialog) {
        elements.ruleEditDialog.classList.add('active');

        if (ruleId) {
          const rule = rules.find(r => r.id === ruleId);

          if (rule) {
            elements.ruleName.value = rule.name;
            elements.ruleContent.value = rule.content;
          }
        } else {
          elements.ruleName.value = '';
          elements.ruleContent.value = '';
        }
      }
    }

    function hideRuleEdit() {
      if (elements.ruleEditDialog) {
        elements.ruleEditDialog.classList.remove('active');
      }
    }

    function addNewRule() {
      showRuleEdit();
    }

    function saveRule() {
      const name = elements.ruleName.value.trim();
      const content = elements.ruleContent.value.trim();

      if (!name || !content) return;

      if (currentRuleId) {
        const index = rules.findIndex(r => r.id === currentRuleId);

        if (index !== -1) {
          rules[index] = {
            ...rules[index],
            name,
            content,
            selected: false,
          };
        }
      } else {
        rules.push({
          id: Date.now().toString(),
          name,
          content,
          selected: false,
        });
      }

      vscode.postMessage({
        command: 'saveRules',
        rules: JSON.stringify(rules)
      });

      hideRuleEdit();
      loadRules();
      updateRulesSelector();
    }

    function loadRules() {
      if (!elements.rulesContainer) return;
      
      elements.rulesContainer.innerHTML = '';

      rules.forEach(rule => {
        const ruleElement = document.createElement('div');
        ruleElement.className = 'rule-item';
        ruleElement.onclick = () => editRule(rule.id);

        const span = document.createElement('span');
        span.textContent = rule.name;
        ruleElement.appendChild(span);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = (e) => {
          e.stopPropagation();
          deleteRule(rule.id);
        };
        ruleElement.appendChild(deleteButton);

        // const svg = document.createElement('svg');
        // svg.className = 'button-icon';
        // svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        // svg.setAttribute('width', '24');
        // svg.setAttribute('height', '24');
        // svg.setAttribute('viewBox', '0 0 24 24');
        // svg.setAttribute('fill', 'none');
        // svg.setAttribute('stroke', 'currentColor');
        // svg.setAttribute('stroke-width', '2');
        // svg.setAttribute('stroke-linecap', 'round');
        // svg.setAttribute('stroke-linejoin', 'round');

        // svg.onclick = (e) => {
        //   e.stopPropagation();
        //   deleteRule(rule.id);
        // };

        // const polyline = document.createElement('polyline');
        // polyline.setAttribute('points', '3 6 5 6 21 6');
        // svg.appendChild(polyline);

        // const path = document.createElement('path');
        // path.setAttribute('d', 'M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2');
        // svg.appendChild(path);

        // const line1 = document.createElement('line');
        // line1.setAttribute('x1', '10');
        // line1.setAttribute('y1', '11');
        // line1.setAttribute('x2', '10');
        // line1.setAttribute('y2', '17');
        // svg.appendChild(line1);

        // const line2 = document.createElement('line');
        // line2.setAttribute('x1', '14');
        // line2.setAttribute('y1', '11');
        // line2.setAttribute('x2', '14');
        // line2.setAttribute('y2', '17');
        // svg.appendChild(line2);

        // ruleElement.appendChild(svg);

        elements.rulesContainer.appendChild(ruleElement);
      });
    }

    function editRule(ruleId) {
      showRuleEdit(ruleId);
    }

    function deleteRule(ruleId) {
      rules = rules.filter(r => r.id !== ruleId);

      vscode.postMessage({
        command: 'saveRules',
        rules: JSON.stringify(rules)
      });

      loadRules();
      updateRulesSelector();
    }

    function updateRulesSelector() {
      if (!elements.rulesCheckboxContainer) return;
      
      elements.rulesCheckboxContainer.innerHTML = '';

      rules.forEach(rule => {
        const checkboxContainer = document.createElement('div');
        checkboxContainer.className = 'nowrap rule-checkbox';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = rule.id;
        checkbox.checked = rule.selected;
        checkbox.onchange = () => toggleRule(rule.id);

        const label = document.createElement('label');
        label.htmlFor = rule.id;
        label.textContent = rule.name;

        checkboxContainer.appendChild(checkbox);
        checkboxContainer.appendChild(label);
        elements.rulesCheckboxContainer.appendChild(checkboxContainer);
      });
    }

    function toggleRule(ruleId) {
      rules.forEach(rule => {
        if (rule.id === ruleId) {
          rule.selected = !rule.selected;
        }
      });

      vscode.postMessage({
        command: 'saveRules',
        rules: JSON.stringify(rules)
      });
    }

    // Добавляем обработчик сообщений от VS Code
    window.addEventListener('message', ({ data: { command, text, selectedModel } }) => {
      switch (command) {
        case 'ollamaModels':
          updateModels(text, selectedModel);
          break;

        case 'setSeanses':
          addSeanses(JSON.parse(text));
          break;

        case 'setSeanse':
          updateOutput(JSON.parse(text));
          break;

        case 'setSettings':
          setSettings(JSON.parse(text));
          break;

        case 'loading':
          showLoadingIndicator();
          break;

        case 'startStreaming':
          hideLoadingIndicator();
          showTypingIndicator();
          break;

        case 'finishStreaming':
          hideTypingIndicator();
          break;

        case 'setRules':
          rules = JSON.parse(text) || [];
          loadRules();
          updateRulesSelector();
          break;
      }
    });

    // Экспортируем функции для использования в HTML
    window.showSettings = showSettings;
    window.hideSettings = hideSettings;
    window.saveSettings = saveSettings;
    window.onUpdateOutput = updateOutput;
    window.onClearOutput = clearOutput;
    window.onClearInput = clearInput;
    window.onRunStreaming = runStreaming;
    window.onStopStreaming = stopStreaming;
    window.onCheckModels = checkModels;
    window.onChangeModel = changeModel;
    window.showLoadingIndicator = showLoadingIndicator;
    window.hideLoadingIndicator = hideLoadingIndicator;
    window.showTypingIndicator = showTypingIndicator;
    window.hideTypingIndicator = hideTypingIndicator;
    window.showRules = showRules;
    window.hideRules = hideRules;
    window.showRuleEdit = showRuleEdit;
    window.hideRuleEdit = hideRuleEdit;
    window.addNewRule = addNewRule;
    window.saveRule = saveRule;
    window.editRule = editRule;
    window.deleteRule = deleteRule;
    window.toggleRule = toggleRule;

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
        command: 'getSettings',
      });

      vscode.postMessage({
        command: 'getModels',
      });

      vscode.postMessage({
        command: 'getSeanses',
      });

      vscode.postMessage({
        command: 'getRules',
      });
    } catch (e) {
      console.error('Post message error:', e);
    }
  });
`;
