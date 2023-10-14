<script setup>
import {computed, ref} from "vue";
import TaskActions from "@/components/tasks/TaskActions.vue";

const props =defineProps({
    task: Object
})

const completedClass = computed(() => {
    return props.task.is_completed ? 'completed' : '';
})

const isEdit = ref(false);
const vFocus = {
    mounted: (el) => el.focus()
}
const emit = defineEmits(['updated', 'complete', 'removed']);
const updateTask = (event) => {
    const updatedTask = { ...props.task, name: event.target.value };
    isEdit.value = false;
    emit('updated', updatedTask);
};

const markTaskAsComplete = (event) => {
    const updatedTask = { ...props.task, is_completed: !props.task.is_completed };
    emit('complete', updatedTask);
};

const editingTask = ref(props.task.name);

const undo = () => {
    isEdit.value = false;
    editingTask.value = props.task.name;
}

const removeTask = () => {
    if(confirm('Are you sure ?')){
        emit('removed', props.task);
    }
};
</script>

<template>
    <li class="list-group-item py-3">
        <div class="d-flex justify-content-start align-items-center">
            <input class="form-check-input mt-0"
                   :class="completedClass"
                   type="checkbox"
                   :checked="task.is_completed"
                   @change="markTaskAsComplete"
            />
            <div class="ms-2 flex-grow-1" title="Double click the text to edit or remove" :class="completedClass" @dblclick="isEdit = true">
                <div class="relative" v-if="isEdit">
                    <input class="editable-task"
                           type="text"
                           v-focus
                           v-model="editingTask"
                           @keyup.esc="undo"
                           @keyup.enter="updateTask"
                    />
                </div>
                <span v-else>{{ task.id }} - {{ task.name }}</span>
            </div>
            <div class="task-date">24 Feb 12:00</div>
        </div>
        <TaskActions
            @edit="isEdit = true" v-show="!isEdit"
            @remove="removeTask"
        />
    </li>
</template>

<style scoped>

</style>