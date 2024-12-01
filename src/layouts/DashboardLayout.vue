<template>
    <div>
        <header>Dashboard Layout Header</header>
        <main>
            <slot></slot>
        </main>
        <footer>Dashboard Layout Footer</footer>
    </div>
</template>

<script>
export default {
    name: 'DashboardLayout',
};
</script>