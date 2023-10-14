<script setup>
import Task from "@/components/tasks/Task.vue";
defineProps({
    tasks: Array,
    show: {
        type: Boolean,
        default: true
    }
})
</script>

<template>
    <div class="card mt-2" v-show="tasks.length > 0 && show">
        <ul class="list-group list-group-flush">
            <Task
                v-for="task in tasks"
                :task="task"
                :key="task.id"
                @updated="event => $emit('updated', event)"
                @complete="event => $emit('complete', event)"
                @removed="event => $emit('removed', event)"
            />
        </ul>
    </div>
</template>

<style scoped>

</style>