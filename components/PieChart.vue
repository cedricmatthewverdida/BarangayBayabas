<template>
    <div>
        <v-container>
            <pie-chart :data="barChartData" :options="barChartOptions" :height="200" />
        </v-container>
    </div>
</template>

<script>
    export default {
        props:{
           samplerecord : Array
        },
        data (){
            return {

                barChartData: {
                labels: [
                    'Registered',
                    'Unregistered',
                    
                    ],
                    datasets: [
                    {
                        label: 'Length',
                        data: this.samplerecord,
                        backgroundColor: ['#3D5B59','#B5E5CF','#FCB5AC']
                    }
                    ]
                },
                barChartOptions: {
                   responsive: true,
                    plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Chart.js Pie Chart'
                    }
                    }
                }
            }
        },
        mounted (){
            if(this.samplerecord.length != 0){
                this.barChartData.datasets[0].data = this.samplerecord;
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>