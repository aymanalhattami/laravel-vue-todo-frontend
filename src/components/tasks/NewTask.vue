<script setup>
import {reactive} from "vue";
import { useTaskStore } from '@/stores/task.js';

const newTask = reactive({
    name: "",
    is_completed: false
})

const store = useTaskStore();
const { handleAddedTask } = store;

const emit = defineEmits(['added']);

const addNewTask = async (event) => {
    if(event.target.value.trim()){
        newTask.name = event.target.value;
        event.target.value = '';
        await handleAddedTask(newTask);
    }
};
</script>

<template>
    <div class="relative">
        <input type="text" class="form-control form-control-lg padding-right-lg"
               placeholder="+ Add new task. Press enter to save." @keydown.enter="addNewTask"/>
    </div>
</template>

<style scoped>

</style>