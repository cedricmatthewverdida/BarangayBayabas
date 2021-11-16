<template>
    <div class="d-flex justify-center mt-15">
        <v-card
        height="350"
        width="500"
        class="card"
        >
            <v-card-title>
                Login
            </v-card-title>

            <v-card-text class="container mt-5">
                <v-text-field
                filled
                rounded
                label="username"
                type="text"
                />
                <v-text-field
                filled
                rounded
                label="password"
                type="password"
                />
                <v-btn
                block
                x-large
                rounded
                depressed
                to="/access/statistic/overview"
                >
                    Login
                </v-btn>
            </v-card-text>
            
        </v-card>
    </div>
</template>

<script>
    export default {
        layout: 'create'
    }
</script>

<style lang="scss" scoped>
.card {
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    border-radius: 12px;
    border: 1px solid rgba(209, 213, 219, 0.3);
}
</style>
