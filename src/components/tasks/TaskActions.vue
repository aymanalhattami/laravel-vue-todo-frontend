<script setup>

import PencilIcon from "@/components/icons/PencilIcon.vue";
import TrashIcon from "@/components/icons/TrashIcon.vue";

const emit = defineEmits(['edit', 'remove']);
</script>

<template>
    <div class="task-actions">
        <button class="btn btn-sm btn-circle btn-outline-secondary me-1" @click="emit('edit')">
            <PencilIcon />
        </button>
        <button class="btn btn-sm btn-circle btn-outline-danger" @click="emit('remove')">
            <TrashIcon />
        </button>
    </div>
</template>

<style scoped>

</style>