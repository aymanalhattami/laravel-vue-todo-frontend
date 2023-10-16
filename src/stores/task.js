import { defineStore } from 'pinia';
import {allTasks, completeTask, createTask, removeTask, updateTask} from "@/http/task-api";
import { ref, reactive, computed } from "vue";

export const useTaskStore = defineStore('taskStore', () => {
    const tasks = ref([]);

    const completedTasks = computed(() => tasks.value.filter(task => !task.is_completed));
    const unCompletedTasks = computed(() => tasks.value.filter(task => task.is_completed));

    const fetchAllTasks = async () => {
        const { data } = await allTasks();
        tasks.value = data.data;
    }

    const handleAddedTask = async (newTask) => {
        const { data: createdTask } = await createTask(newTask);
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

    return {
        tasks,
        completedTasks,
        unCompletedTasks,
        fetchAllTasks,
        handleAddedTask,
        handleUpdatedTask,
        handleCompleteTask,
        handleRemoveTask
    }
});