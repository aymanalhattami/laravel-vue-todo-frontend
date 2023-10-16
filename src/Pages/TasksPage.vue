<script setup>
import { allTasks, createTask, updateTask, completeTask, removeTask } from "@/http/task-api";
import {computed, onMounted, ref} from "vue";
import Tasks from "@/components/tasks/Tasks.vue";
import NewTask from "@/components/tasks/NewTask.vue";
import { useTaskStore } from '@/stores/task.js'
import {storeToRefs} from "pinia";

const store = useTaskStore();
const { completedTasks, unCompletedTasks } = storeToRefs(store);
const { fetchAllTasks } = store;

onMounted(async () => {
    await fetchAllTasks();
});

// const completedTasks = computed(() => tasks.value.filter(task => !task.is_completed));
// const unCompletedTasks = computed(() => tasks.value.filter(task => task.is_completed));
const showToggleCompletedBtn = computed(() => unCompletedTasks.value.length > 0 && completedTasks.value.length > 0);
const completedTasksIsVisible = computed(() => unCompletedTasks.value.length === 0 || completedTasks.value.length > 0);
const showCompletedTasks = ref(completedTasksIsVisible.value);

</script>

<template>
    <main style="min-height: 50vh; margin-top: 2rem;">
        <div class="container">
            <div class="row">
                <div class="col-md-8 offset-md-2">
                    <!-- Add new Task -->
                    <NewTask/>
                    <!-- List of completed tasks -->
                    <Tasks :tasks="completedTasks" />

                    <div class="text-center my-3" v-show="showToggleCompletedBtn">
                        <button class="btn btn-sm btn-secondary" @click="$event => showCompletedTasks = !showCompletedTasks">
                            <span v-if="!showCompletedTasks">Hide Completed</span>
                            <span v-else>Show Completed</span>
                        </button>
                    </div>

                    <!-- List of uncompleted tasks -->
                    <Tasks :tasks="unCompletedTasks" :show="showCompletedTasks"/>
                </div>
            </div>
        </div>
    </main>
</template>