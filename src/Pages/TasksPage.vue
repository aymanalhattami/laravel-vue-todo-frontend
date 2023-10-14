<script setup>
import { allTasks, createTask, updateTask, completeTask, removeTask } from "@/http/task-api";
import {computed, onMounted, ref} from "vue";
import Tasks from "@/components/tasks/Tasks.vue";
import NewTask from "@/components/tasks/NewTask.vue";

let tasks = ref([]);

onMounted(async () => {
    const { data } = await allTasks();
    tasks.value = data.data;
});

const completedTasks = computed(() => tasks.value.filter(task => !task.is_completed));
const unCompletedTasks = computed(() => tasks.value.filter(task => task.is_completed));
const showToggleCompletedBtn = computed(() => unCompletedTasks.value.length > 0 && completedTasks.value.length > 0);
const completedTasksIsVisible = computed(() => unCompletedTasks.value.length === 0 || completedTasks.value.length > 0);
const showCompletedTasks = ref(completedTasksIsVisible.value);

const handleAddedTask = async (newTask) => {
    const { data: createdTask } = await createTask(newTask);

    console.log(createdTask.data);

    tasks.value.unshift(createdTask.data);
}

const handleUpdatedTask = async (task) => {
    const { data: updatedTask } = await updateTask(task.id, {
        name: task.name
    });

    const currentTask = tasks.value.find(item => item.id === task.id);
    currentTask.name = updatedTask.data.name;
}

const handleCompleteTask = async (task) => {
    const { data: updatedTask } = await completeTask(task.id, {
        is_completed: task.is_completed
    });

    const currentTask = tasks.value.find(item => item.id === task.id);
    currentTask.is_completed = updatedTask.data.is_completed;
}

const handleRemoveTask = async (task) => {
    await removeTask(task.id);

    tasks.value = tasks.value.filter(item => item.id !== task.id)
}
</script>

<template>
    <main style="min-height: 50vh; margin-top: 2rem;">
        <div class="container">
            <div class="row">
                <div class="col-md-8 offset-md-2">
                    <!-- Add new Task -->
                    <NewTask @added="handleAddedTask"/>
                    <!-- List of completed tasks -->
                    <Tasks
                        :tasks="completedTasks"
                        @updated="handleUpdatedTask"
                        @complete="handleCompleteTask"
                        @removed="handleRemoveTask"
                    />

                    <div class="text-center my-3" v-show="showToggleCompletedBtn">
                        <button class="btn btn-sm btn-secondary" @click="$event => showCompletedTasks = !showCompletedTasks">
                            <span v-if="!showCompletedTasks">Hide Completed</span>
                            <span v-else>Show Completed</span>
                        </button>
                    </div>

                    <!-- List of uncompleted tasks -->
                    <Tasks
                        :tasks="unCompletedTasks"
                        :show="showCompletedTasks"
                        @updated="handleUpdatedTask"
                        @complete="handleCompleteTask"
                        @removed="handleRemoveTask"
                    />
                </div>
            </div>
        </div>
    </main>
</template>