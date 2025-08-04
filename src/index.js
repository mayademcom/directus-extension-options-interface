import {defineInterface} from '@directus/extensions-sdk'
import InterfaceComponent from './interface.vue';

export default defineInterface({
    id: 'multiple-choice-questions',
    name: 'Multiple Choice Questions',
    description: 'Repeater field for multiple choice questions with configurable correct answers',
    icon: 'quiz',
    component: InterfaceComponent,
    options: [
        {
            field: 'min',
            name: 'Minimum Items',
            type: 'integer',
            meta: {
                interface: 'input',
                width: 'half',
            },
            schema: {
                default_value: 0,
            },
        },
        {
            field: 'max',
            name: 'Maximum Items',
            type: 'integer',
            meta: {
                interface: 'input',
                width: 'half',
            },
            schema: {
                default_value: 5,
            },
        },
        {
            field: 'template',
            name: 'Item Template',
            type: 'string',
            meta: {
                interface: 'input',
                width: 'full',
                options: {
                    placeholder: 'Option {{ index }}'
                }
            },
            schema: {
                default_value: 'Option {{ index }}',
            },
        },
        {
            field: 'has_correct_answer',
            name: 'Has Correct Answer',
            type: 'boolean',
            meta: {
                interface: 'boolean',
                width: 'full',
                options: {
                    label: 'Enable correct answer validation'
                }
            },
            schema: {
                default_value: true,
            },
        },
        {
            field: 'min_correct_answers',
            name: 'Minimum Correct Answers',
            type: 'integer',
            meta: {
                interface: 'input',
                width: 'half',
                options: {
                    placeholder: '1'
                },
                conditions: [
                    {
                        name: 'has_correct_answer',
                        rule: {
                            _eq: true,
                        },
                    },
                ],
            },
            schema: {
                default_value: 1,
            },
        },
        {
            field: 'max_correct_answers',
            name: 'Maximum Correct Answers',
            type: 'integer',
            meta: {
                interface: 'input',
                width: 'half',
                options: {
                    placeholder: '1'
                },
                conditions: [
                    {
                        name: 'has_correct_answer',
                        rule: {
                            _eq: true,
                        },
                    },
                ],
            },
            schema: {
                default_value: 1,
            },
        },
        {
            field: 'enable_images',
            name: 'Enable Images',
            type: 'boolean',
            meta: {
                interface: 'boolean',
                width: 'full',
                options: {
                    label: 'Allow image uploads for options'
                }
            },
            schema: {
                default_value: false,
            },
        },
        {
            field: 'image_folder',
            name: 'Image Folder',
            type: 'string',
            meta: {
                interface: 'input',
                width: 'full',
                conditions: [
                    {
                        name: 'enable_images',
                        rule: {
                            _eq: true,
                        },
                    },
                ],
            }
        },
        {
            field: 'content_tools',
            name: 'Available Content Tools',
            type: 'json',
            schema: {
                default_value: ['header', 'paragraph', 'image', 'nestedlist'],
            },
            meta: {
                width: 'full',
                interface: 'select-multiple-dropdown',
                options: {
                    choices: [
                        {
                            value: 'header',
                            text: 'Header',
                        },
                        {
                            value: 'paragraph',
                            text: 'Paragraph',
                        },
                        {
                            value: 'nestedlist',
                            text: 'List',
                        },
                        {
                            value: 'quote',
                            text: 'Quote',
                        },
                        {
                            value: 'code',
                            text: 'Code',
                        },
                        {
                            value: 'image',
                            text: 'Image',
                        },
                        {
                            value: 'table',
                            text: 'Table',
                        },
                        {
                            value: 'checklist',
                            text: 'Checklist',
                        },
                        {
                            value: 'underline',
                            text: 'Underline',
                        },
                        {
                            value: 'inlinecode',
                            text: 'Inline Code',
                        },
                        {
                            value: 'delimiter',
                            text: 'Delimiter',
                        },
                        {
                            value: 'embed',
                            text: 'Embed',
                        },
                    ],
                },
            },
        },
    ],
    types: ['json'],
});