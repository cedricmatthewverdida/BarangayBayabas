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
           covid : Array
        },
        data (){
            return {

                barChartData: {
                labels: [
                    'Currently Diagnosed',
                    'Not Exposed',
                    'Recovered',
                    
                    ],
                    datasets: [
                    {
                        label: 'Length',
                        data: this.covid,
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
            if(this.covid.length != 0){
                this.barChartData.datasets[0].data = this.covid;
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>