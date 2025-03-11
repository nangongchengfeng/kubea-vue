<template>
    <RouterView></RouterView>
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
