# Ollama Code Assistant for VS Code

A powerful AI code assistant for VS Code that integrates with [Ollama](https://ollama.ai/) to provide intelligent code assistance and natural language processing capabilities directly within your editor.

## Features

*   **AI-Powered Code Assistance**: Get intelligent code suggestions, explanations, and help with debugging or generating code based on natural language descriptions.
*   **Natural Language Processing**: Ask questions about programming concepts, get explanations of complex topics, and receive detailed answers to technical questions.
*   **Multiple Model Support**: Easily select and switch between various AI models available through your local Ollama instance, including Llama 2, Mistral, Code Llama, and more.
*   **Seamless VS Code Integration**: Access AI features via a dedicated sidebar view, the command palette (`Ctrl+Shift+P` or `Cmd+Shift+P`), or the context menu in supported files (currently TypeScript files).
*   **Configurable Base URL and Rules**: Customize the Ollama base URL and define specific rules or instructions to guide the AI's responses.
*   **Code Highlighting**: Beautiful syntax highlighting for code blocks within AI responses for improved readability.
*   **Markdown Support**: Rich text formatting using Markdown in AI responses for clear and structured information.
*   **Session History**: The extension keeps track of your conversation sessions.

## Usage

1.  Open VS Code.
2.  Access the Ollama Code Assistant:
    -   Click the Ollama Code Assistant icon in the VS Code sidebar.
    -   Open the command palette (`Ctrl+Shift+P` or `Cmd+Shift+P`) and search for "Ollama Code Assistant".
    -   Right-click in a supported editor (e.g., TypeScript files) and select "Ask AI". If text is selected, it will be included in the prompt.
3.  Select your preferred AI model from the dropdown in the sidebar.
4.  Optionally, configure the Ollama Base URL and define custom rules via the settings menu (gear icon) in the sidebar header.
5.  Enter your prompt in the input field.
6.  Press `Run` or use `Ctrl+Enter`/`Cmd+Enter` to submit your request.

## Requirements

*   VS Code 1.99.0 or higher.
*   Node.js 20.x or higher.
*   [Ollama](https://ollama.ai/) installed and running locally on your system.
*   At least one AI model pulled using Ollama (e.g., `ollama pull llama2`, `ollama pull mistral`, `ollama pull codellama`).

## Configuration

### Ollama Base URL

By default, the extension attempts to connect to Ollama at `http://localhost:11434`. If your Ollama instance is running on a different address, you can configure the Base URL through the extension's settings menu in the sidebar.

### Rules

You can define custom rules to be included with your prompts. These rules can help guide the AI's behavior and responses. Access the Rules configuration through the settings menu in the sidebar.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have suggestions, please open an issue in the GitHub repository.
