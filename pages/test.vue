<template>
    <div>
        {{loop_over_appereance}}
    </div>
</template>


<script>
    export default {

        data() {
            return {
                name: "Merson",
                age: 21,
                male: true,
                appearance: [
                    "Handsome",
                    "Tall",
                    "Cute",
                ]
            }
        },


        methods: {

            reveal_gender : function (){
                return this.male ? "Lalake ako" : "Aye yoya";
            }

        },

        computed: {
            loop_over_appereance : function (){

                for(let mersone = 0 ; mersone <= this.appearance.length; mersone++){
                    console.log(this.appearance[mersone])
                }

            }
        },

        filters:{

        },

        watch: {

        },

        mounted (){
        
        
        }
    }
</script>


