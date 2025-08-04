# Directus Options Interface

> A sophisticated repeater interface for Directus CMS that enables creation of multiple choice questions with drag &
> drop reordering, rich content editing, image support, and flexible validation rules. Perfect for quizzes, surveys, and educational
> content management.

[![npm version](https://img.shields.io/npm/v/@mayademcom/directus-extension-options-interface.svg?style=flat-square)](https://www.npmjs.com/package/@mayademcom/directus-extension-options-interface)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=mayademcom_directus-extension-options-interface&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=mayademcom_directus-extension-options-interface)
[![TypeScript](https://img.shields.io/badge/Vue.js-42b883?style=flat-square&logo=vue.js&logoColor=white)](https://www.vuejs.org/)
[![Directus](https://img.shields.io/badge/Directus-263238?style=flat-square&logo=directus&logoColor=white)](https://directus.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

## 🚀 Features

✅ **Drag & Drop Reordering** - Easily rearrange options with intuitive drag handles  
✅ **Block Editor Content** - Rich content editing with configurable tools (headers, lists, quotes, code, etc.)  
✅ **Image Support** - Add images to options with upload from library, URL, or user files  
✅ **Flexible Validation** - Support for single or multiple correct answers with min/max limits  
✅ **Smart Correct Answer Logic** - Automatically handles single-select vs multi-select behavior  
✅ **Configurable Tools** - Choose which block editor tools are available (paragraph, heading, lists, etc.)  
✅ **Custom Templates** - Customizable option labels with index placeholders  
✅ **Optional Validation** - Toggle correct answer validation on/off for surveys vs quizzes  
✅ **Visual Feedback** - Clear indicators for correct answers and drag states  
✅ **Production Ready** - Clean code with proper error handling and Vue 3 Composition API

## 📋 Requirements

✅ **Directus** v10+  
✅ **Node.js** v18+  
✅ **Vue 3** Composition API support  
✅ **Modern Browser** with ES6+ support

## 🔧 Installation

### Method 1: NPM Installation (Recommended)

```bash
# Navigate to your Directus project root
cd your-directus-project

# Install the extension via npm
npm i @mayademcom/directus-extension-options-interface

# Start Directus
npx directus start
```

### Method 2: Manual Installation

```bash
# Clone or download the extension
git clone https://github.com/mayademcom/directus-extension-options-interface.git

# Navigate to your Directus project
cd your-directus-project

# Copy extension to Directus extensions directory
cp -r directus-extension-options-interface extensions/

# Install dependencies
cd extensions/directus-extension-options-interface
npm install

# Build the extension
npm run build

# Return to project root and start Directus
cd ../../../
npx directus start
```

## ⚙️ Configuration Options

The interface provides several configuration options to customize its behavior:

### Basic Settings
- **Minimum Items** - Set the minimum number of options required (default: 0)
- **Maximum Items** - Set the maximum number of options allowed (default: 5)
- **Item Template** - Customize option labels with `{{ index }}` placeholder (default: "Option {{ index }}")

### Image Settings
- **Enable Images** - Toggle image support for options (default: false)
- **Image Folder** - Specify the folder for uploaded images (default: system folder)

### Answer Validation
- **Has Correct Answer** - Enable/disable correct answer validation (default: true)
- **Minimum Correct Answers** - Set minimum required correct answers (default: 1)
- **Maximum Correct Answers** - Set maximum allowed correct answers (default: 1)

### Content Tools
Choose which block editor tools are available:
- Header
- Paragraph
- List (nested)
- Quote
- Code
- Image
- Table
- Checklist
- Underline
- Inline Code
- Delimiter
- Embed

## 🎯 Use Cases

### Quiz Questions
Perfect for creating multiple choice quiz questions with:
- Single or multiple correct answers
- Rich text formatting in options
- Images for visual questions
- Drag & drop reordering

### Survey Options
Ideal for survey forms with:
- Text-based options
- Image-based choices
- No correct answer validation
- Flexible option management

### Educational Content
Great for educational platforms with:
- Interactive learning materials
- Visual learning aids
- Structured content organization
- Assessment tools

## 📊 Data Structure

The interface saves data in the following JSON format:

```json
[
  {
    "_id": "item_1234567890_abc123",
    "is_correct": true,
    "text": {
      "time": 1640995200000,
      "blocks": [
        {
          "type": "paragraph",
          "data": {
            "text": "This is option 1 content"
          }
        }
      ],
      "version": "2.22.2"
    },
    "image": "f6be9cef-b3f5-41da-9d86-6b4d3da6a4b4"
  },
  {
    "_id": "item_1234567891_def456",
    "is_correct": false,
    "text": {
      "time": 1640995300000,
      "blocks": [
        {
          "type": "paragraph",
          "data": {
            "text": "This is option 2 content"
          }
        }
      ],
      "version": "2.22.2"
    },
    "image": null
  }
]
```

## 🎨 Styling

The interface uses Directus design tokens and CSS custom properties for consistent theming. All visual elements automatically adapt to your Directus theme (light/dark mode).

Key style features:
- Responsive design
- Smooth drag & drop animations
- Visual feedback for correct answers
- Hover effects for better UX
- Clean image preview with overlay controls

## 🔍 Technical Details

- **Framework**: Vue 3 with Composition API
- **Drag & Drop**: Vue Draggable Next
- **Rich Text**: Directus Block Editor
- **File Handling**: Directus File System
- **Validation**: Real-time validation with user feedback
- **Performance**: Optimized rendering with proper key handling

## 🐛 Troubleshooting

### Images not displaying
- Check if the image folder exists and is accessible
- Verify image UUIDs are valid
- Ensure proper file permissions

### Drag & drop not working
- Check if the interface is not disabled
- Verify minimum/maximum limits
- Ensure proper event handling

### Validation errors
- Check correct answer constraints
- Verify min/max answer settings
- Ensure proper boolean conversion

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues and questions, please use the [GitHub Issues](https://github.com/mayademcom/directus-extension-options-interface/issues) page.