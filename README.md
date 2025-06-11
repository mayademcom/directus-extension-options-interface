# Directus Multiple Choice Questions Interface

> A sophisticated repeater interface for Directus CMS that enables creation of multiple choice questions with drag &
> drop reordering, rich content editing, and flexible validation rules. Perfect for quizzes, surveys, and educational
> content management.

[![npm version](https://img.shields.io/npm/v/@mayademcom/directus-extension-multiple-choice-questions-interface.svg?style=flat-square)](https://www.npmjs.com/package/mayademcom_directus-extension-multiple-choice-questions-interface)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=mayademcom_directus-extension-multiple-choice-questions-interface&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=mayademcom_directus-extension-multiple-choice-questions-interface)
[![TypeScript](https://img.shields.io/badge/Vue.js-42b883?style=flat-square&logo=vue.js&logoColor=white)](https://www.vuejs.org/)
[![Directus](https://img.shields.io/badge/Directus-263238?style=flat-square&logo=directus&logoColor=white)](https://directus.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

## 🚀 Features

✅ **Drag & Drop Reordering** - Easily rearrange options with intuitive drag handles  
✅ **Block Editor Content** - Rich content editing with configurable tools (headers, lists, quotes, code, etc.)  
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
npm i @mayademcom/directus-extension-multiple-choice-questions-interface

# Start Directus
npx directus start
```

### Method 2: Manual Installation

```bash
# Clone or download the extension
git clone https://github.com/mayademcom/directus-extension-multiple-choice-questions-interface.git

# Navigate to your Directus project
cd your-directus-project

# Copy extension to Directus extensions directory
cp -r directus-extension-multiple-choice-questions-interface extensions/

# Install dependencies
cd extensions/directus-extension-multiple-choice-questions-interface
npm install

# Build the extension
npm run build

# Return to project root and start Directus
cd ../../../
npx directus start
```
