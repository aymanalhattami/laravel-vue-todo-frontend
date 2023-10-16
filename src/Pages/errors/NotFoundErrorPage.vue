<script setup>

</script>

<template>
    <main class="container p-4">
        <h1>404</h1>
        <p>Page you are
            <code>{{ $route.fullPath }}</code>
            looking for not found</p>
        <router-link :to="{ name: 'tasks' }">Go to tasks page</router-link>
    </main>
</template>

<style scoped>

</style>