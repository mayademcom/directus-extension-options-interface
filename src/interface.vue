<template>
  <div class="interface-wrapper">
    <div class="quiz-repeater">
      <div class="quiz-repeater-header">
        <v-button
            v-if="canAddMore"
            @click="addItem"
            small
            secondary
            v-tooltip="'Add Option'"
            class="add-button"
        >
          <v-icon name="add" small/>
          <span>Add</span>
        </v-button>
      </div>

      <div v-if="items.length === 0" class="empty-state">
        <v-icon name="help" large/>
        <p>No options added yet</p>
        <v-button @click="addItem" secondary class="add-first-button">
          <v-icon name="add" small/>
          <span>Add First Option</span>
        </v-button>
      </div>

      <draggable
          v-else
          v-model="items"
          @end="emitUpdate"
          item-key="_id"
          handle=".drag-handle"
          class="repeater-items"
          :animation="200"
          ghost-class="ghost-item"
          chosen-class="chosen-item"
          drag-class="dragging-item"
      >
        <template #item="{ element: item, index }">
          <div
              class="repeater-item"
              :class="{ 'is-correct': item.is_correct }"
          >
            <div class="item-header">
              <div class="item-left">
                <div
                    class="drag-handle"
                    v-tooltip="'Drag to reorder'"
                >
                  <v-icon name="drag_indicator"/>
                </div>
                <div class="item-label">
                  {{ getItemLabel(index + 1) }}
                </div>
              </div>
              <div class="item-actions">
                <v-button
                    @click="removeItem(index)"
                    small
                    secondary
                    v-tooltip="'Remove Option'"
                >
                  <v-icon name="delete" small/>
                </v-button>
              </div>
            </div>

            <div class="item-fields">
              <div v-if="has_correct_answer" class="field-group">
                <label class="field-label">Correct Answer</label>
                <v-checkbox
                    :model-value="item.is_correct"
                    @update:model-value="setCorrectAnswer(index, $event)"
                />
              </div>

              <div class="field-group">
                <label class="field-label">Content</label>
                <div class="block-editor-wrapper">
                  <interface-input-block-editor
                      :value="item.text"
                      @input="updateItemText(index, $event)"
                      :placeholder="'Enter option content...'"
                      :tools="content_tools"
                      :bordered="true"
                      :disabled="disabled"
                      :key="`block-editor-${item._id}`"
                  />
                </div>
              </div>
            </div>
          </div>
        </template>
      </draggable>

      <div v-if="validationError" class="validation-error">
        <v-notice type="warning">
          {{ validationError }}
        </v-notice>
      </div>
    </div>
  </div>
</template>

<script>
import {computed, ref, watch} from 'vue';
import draggable from 'vuedraggable';

export default {
  name: 'MultipleChoiceOptionsInterface',
  components: {
    draggable,
  },
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 5,
    },
    template: {
      type: String,
      default: 'Option {{ index }}',
    },
    has_correct_answer: {
      type: Boolean,
      default: true,
    },
    min_correct_answers: {
      type: Number,
      default: 1,
    },
    max_correct_answers: {
      type: Number,
      default: 1,
    },
    content_tools: {
      type: Array,
      default: () => ['header', 'paragraph', 'nestedlist', 'quote'],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['input'],
  setup(props, {emit}) {
    const items = ref([]);

    // Initialize items from value prop
    watch(
        () => props.value,
        (newValue) => {
          if (Array.isArray(newValue) && newValue.length > 0) {
            items.value = newValue.map((item, index) => ({
              _id: item._id || `item_${Date.now()}_${index}`,
              is_correct: item.is_correct || false,
              text: item.text || null,
            }));
          } else {
            items.value = [];
          }
        },
        {immediate: true}
    );

    // Computed properties
    const canAddMore = computed(() => {
      return !props.disabled && items.value.length < props.max;
    });

    const canRemove = computed(() => {
      return !props.disabled && items.value.length > props.min;
    });

    const correctAnswersCount = computed(() => {
      return items.value.filter(item => item.is_correct).length;
    });

    const validationError = computed(() => {
      if (items.value.length === 0 || !props.has_correct_answer) return null;

      if (correctAnswersCount.value < props.min_correct_answers) {
        return `Please select at least ${props.min_correct_answers} correct answer${props.min_correct_answers > 1 ? 's' : ''}.`;
      }

      if (correctAnswersCount.value > props.max_correct_answers) {
        return `You can only select up to ${props.max_correct_answers} correct answer${props.max_correct_answers > 1 ? 's' : ''}.`;
      }

      return null;
    });

    // Methods
    const getItemLabel = (index) => {
      return props.template.replace('{{ index }}', index);
    };

    const addItem = () => {
      if (canAddMore.value) {
        const newItem = {
          _id: `item_${Date.now()}`,
          is_correct: false,
          text: null,
        };
        items.value.push(newItem);
        emitUpdate();
      }
    };

    const removeItem = (index) => {
      if (items.value.length > props.min) {
        items.value.splice(index, 1);
        emitUpdate();
      }
    };

    const updateItemText = (index, text) => {
      if (items.value[index]) {
        items.value[index].text = text;
        emitUpdate();
      }
    };

    const setCorrectAnswer = (index, isCorrect) => {
      if (!props.has_correct_answer) return;

      if (isCorrect) {
        // If max correct answers is 1, uncheck all others
        if (props.max_correct_answers === 1) {
          items.value.forEach((item, i) => {
            item.is_correct = i === index;
          });
        } else {
          // Allow multiple selections but check max limit
          const currentCorrectCount = items.value.filter(item => item.is_correct).length;
          if (currentCorrectCount < props.max_correct_answers) {
            items.value[index].is_correct = true;
          }
        }
      } else {
        // Uncheck the selected item
        if (items.value[index]) {
          items.value[index].is_correct = false;
        }
      }
      emitUpdate();
    };

    const emitUpdate = () => {
      const value = items.value.map(item => ({
        _id: item._id,
        is_correct: item.is_correct,
        text: item.text,
      }));
      emit('input', value);
    };

    return {
      items,
      canAddMore,
      canRemove,
      validationError,
      getItemLabel,
      addItem,
      removeItem,
      updateItemText,
      setCorrectAnswer,
    };
  },
};
</script>

<style scoped>
.interface-wrapper {
  --v-field-border-color: var(--border-normal);
}

.quiz-repeater {
  border: var(--theme--border-width) solid var(--v-input-border-color, var(--theme--form--field--input--border-color));
  border-radius: var(--v-input-border-radius, var(--theme--border-radius));
  background: var(--background-page);
  padding: 0;
}

.quiz-repeater-header {
  padding: 12px 16px;
  border-bottom: var(--border-width) solid var(--border-subdued);
  display: flex;
  justify-content: flex-end;
}

.empty-state {
  padding: 48px 24px;
  text-align: center;
  color: var(--foreground-subdued);
}

.empty-state .v-icon {
  margin-bottom: 16px;
  color: var(--foreground-subdued);
}

.empty-state p {
  margin-bottom: 16px;
}

.repeater-items {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 100px;
  overflow: visible;
}

.repeater-item {
  border: var(--border-width) solid var(--border-normal);
  border-radius: var(--border-radius);
  background: var(--background-normal);
  transition: all 0.2s ease;
  position: relative;
  will-change: transform;
  z-index: 1;
  overflow: visible;
}

.repeater-item.is-correct {
  border-color: var(--primary);
  box-shadow: 0 0 0 2px var(--primary-25);
}

.item-header {
  padding: 12px 16px;
  border-bottom: var(--border-width) solid var(--border-subdued);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--background-subdued);
}

.item-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.drag-handle {
  cursor: grab;
  color: var(--foreground-subdued);
  transition: all 0.2s ease;
  padding: 6px;
  border-radius: var(--border-radius);
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  user-select: none;
}

.drag-handle:hover {
  color: var(--primary);
  background: var(--primary-10);
  transform: scale(1.1);
}

.drag-handle:active {
  cursor: grabbing;
  transform: scale(0.95);
}

.item-label {
  font-weight: 600;
  color: var(--foreground);
  font-size: 14px;
}

.item-actions {
  display: flex;
  gap: 8px;
}

.item-fields {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow: visible;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--foreground-subdued);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.validation-error {
  padding: 16px;
  border-top: var(--border-width) solid var(--border-subdued);
}

/* Drag & Drop States */
.chosen-item {
  cursor: grabbing !important;
  transform: scale(1.02) !important;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2) !important;
  border: 2px solid var(--primary) !important;
  background: var(--primary-10) !important;
  z-index: 1000 !important;
  opacity: 0.9 !important;
}

.dragging-item {
  transform: rotate(3deg) scale(1.05) !important;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3) !important;
  z-index: 1001 !important;
  opacity: 0.8 !important;
  border: 2px solid var(--warning) !important;
  background: var(--warning-25) !important;
}

.ghost-item {
  opacity: 0.4 !important;
  background: var(--success-10) !important;
  border: 2px dashed var(--success) !important;
  transform: scale(0.98) !important;
}

/* Button alignment fixes */
.add-button,
.add-first-button {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 6px !important;
}

.add-button span,
.add-first-button span {
  line-height: 1 !important;
  margin: 0 !important;
}

/* Block Editor Wrapper */
.block-editor-wrapper {
  position: relative;
  z-index: 10;
}

.repeater-item .block-editor-wrapper {
  z-index: 20;
  position: relative;
}

/* Block Editor z-index fix */
.repeater-item .interface-input-block-editor {
  z-index: 21;
  position: relative;
}

/* Block editor toolbar and dropdowns */
.repeater-item .interface-input-block-editor .codex-editor,
.repeater-item .interface-input-block-editor .ce-toolbar,
.repeater-item .interface-input-block-editor .ce-popover,
.repeater-item .interface-input-block-editor .ce-block-tunes-menu {
  z-index: 1000 !important;
}
</style>
