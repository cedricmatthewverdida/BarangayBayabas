<template>
    <v-app class="wallpaper">
        <v-main>
            <Nuxt />
        </v-main>
        <TheSnackbar />
    </v-app>
</template>

<script>
    import TheSnackbar from '@/components/TheSnackbar.vue';
    export default {
        components:{
            TheSnackbar
        }
    }
</script>

<style lang="scss" scoped>
.wallpaper {
    background-image: url('https://images.unsplash.com/photo-1444723121867-7a241cacace9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80');
    background-repeat:no-repeat;
    background-position: center;
    background-size: cover;
}
</style>