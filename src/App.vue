<template>
    <h1>App</h1>
    <router-view></router-view>
</template>

<script>
export default {
    name: "App",
};
</script>

<style>
html,
body {
    width: 100vw;
    height: 100vh;
    min-width: 1425px;
}

#nprogress .bar {
    background: #2186c0 !important;
}
</style>
