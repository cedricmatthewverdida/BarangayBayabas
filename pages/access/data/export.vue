<template>
    <div>
        <v-card
        :loading="initquery"
        >
            <v-card-title>
                <v-select
                v-model="selectedtable"
                :items="tables"
                label="Select Table"
                filled
                rounded
                hide-details
                />
            </v-card-title>

            <v-card-subtitle>
    
                <v-btn
                style="text-transform:none;"
                color="green"
                class="mt-2 white--text"
                depressed
                rounded
                large
                :disabled="temp.length == 0"
                @click="export_csv('exported.csv', temp)"
                >
                    <v-icon color="mr-2">mdi-export</v-icon>
                    Export Excell / CSV
                </v-btn>
            </v-card-subtitle>

            <v-card-text>
                <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
                filled
                rounded
                ></v-text-field>
                <v-data-table
                :headers="headers"
                :items="activetable"
                :search="search"
                ></v-data-table>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
    import Moralis from 'moralis'
    import _ from 'lodash'

    import { WidthType, BorderStyle, Document, Paragraph, Packer, TextRun } from "docx";
    import { saveAs } from 'file-saver';
    export default {
        components: {
            Document, Paragraph, Packer, TextRun, saveAs, BorderStyle, WidthType
        },
        data() {
            return {
                selectedtable: '',
                activetable: [],
                temp:[],
                headers:[],
                search:'',
                initquery:false,
                tables: [
                    'Resident',
                    'HouseHold',
                    'Outofschool',
                    'Vaccination',
                    'Zone',
                    'Summon',
                    'Blotter',
                    'Incident'
                ]
            }
        },

        watch:{
            selectedtable : function (){
                this.initTable();
            }
        },

        methods: {


            export_csv : function (filename,arrayOfJson){

                    console.log(arrayOfJson)
                    const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
                    const header = Object.keys(arrayOfJson[0])
                    let csv = arrayOfJson.map(row => header.map(fieldName => 
                    JSON.stringify(row[fieldName], replacer)).join(','))
                    csv.unshift(header.join(','))
                    csv = csv.join('\r\n')

                    // Create link and download
                    var link = document.createElement('a');
                    link.setAttribute('href', 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURIComponent(csv));
                    link.setAttribute('download', filename);
                    link.style.visibility = 'hidden';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
            },

            initTable: _.debounce(async function(){

                this.initquery = true;

            
                const Table = Moralis.Object.extend(this.selectedtable);
                const query = new Moralis.Query(Table);
                const results = await query.find();
                this.activetable =  results.reverse();

                this.manipulateHeader();

                this.initquery = false;

            },1000),

            manipulateHeader: function (){
                switch(this.selectedtable){
                    
                    case 'Resident':
                        this.residentHeader();
                        break;

                    case 'Vaccination':
                        this.vaccineHeader();
                        break;

                    case 'HouseHold':
                        this.householdHeader();
                        break;

                    case 'Outofschool':
                        this.outofschoolHeader();
                        break;

                    case 'Zone':
                        this.zoneHeader();
                        break;

                    case 'Summon':
                        this.summonHeader();
                        break;

                    case 'Blotter':
                        this.blotterHeader();
                        break;

                    case 'Incident':
                        this.incidentHeader();
                        break;
                }
            },

            incidentHeader : function (){
                this.headers = [
                    { text: 'Incident Detail', value: 'attributes.detail' },
                    { text: 'Date', value: 'createdAt' },
                ]

                this.activetable.forEach(element => {
                    this.temp.push({
                        IncidentDetail: element.attributes.detail,
                        Date: element.createdAt
                    })
                });
                
            },

            blotterHeader : function (){
                this.headers = [
                    { text: 'FirstName', value: 'attributes.complainant.attributes.firstname' },
                    { text: 'MiddleName', value: 'attributes.complainant.attributes.middlename' },
                    { text: 'LastName', value: 'attributes.complainant.attributes.lastname' },
                    { text: 'Detail', value: 'attributes.details' },
                    { text: 'Date of filing', value: 'createdAt' },
                ]

                this.activetable.forEach(element => {
                    this.temp.push({
                        Firstname: element.attributes.complainant.attributes.firstname,
                        Middlename: element.attributes.complainant.attributes.middlename,
                        Lastname: element.attributes.complainant.attributes.lastname,
                        Detail: element.attributes.details,
                        Dateoffilling: element.createdAt
                    })
                });
            },

            summonHeader : function (){
                this.headers = [
                    { text: 'FirstName', value: 'attributes.complainant.attributes.firstname' },
                    { text: 'MiddleName', value: 'attributes.complainant.attributes.middlename' },
                    { text: 'LastName', value: 'attributes.complainant.attributes.lastname' },
                    { text: 'Complain', value: 'attributes.complain' },
                    { text: 'Date', value: 'createdAt' },
                    { text: 'Status', value: 'attributes.status' },
                ]

                this.activetable.forEach(element => {
                    this.temp.push({
                        Firstname: element.attributes.complainant.attributes.firstname,
                        Middlename: element.attributes.complainant.attributes.middlename,
                        Lastname: element.attributes.complainant.attributes.lastname,
                        Complain: element.attributes.complain,
                        Date: element.createdAt,
                        Status: element.attributes.status
                    })
                });
            },

            vaccineHeader : function (){
                this.headers = [
                    { text: 'FirstName', value: 'attributes.resident.attributes.firstname' },
                    { text: 'MiddleName', value: 'attributes.resident.attributes.middlename' },
                    { text: 'LastName', value: 'attributes.resident.attributes.lastname' },
                    { text: 'Vaccine', value: 'attributes.vaccine' },
                ]

                this.activetable.forEach(element => {
                    this.temp.push({
                        Firstname: element.attributes.resident.attributes.firstname,
                        Middlename: element.attributes.resident.attributes.middlename,
                        Lastname: element.attributes.resident.attributes.lastname,
                        Vaccine: element.attributes.vaccine,
                    })
                });
            },

            zoneHeader : function (){
                this.headers = [
                    { text: 'FirstName', value: 'attributes.resident.attributes.firstname' },
                    { text: 'MiddleName', value: 'attributes.resident.attributes.middlename' },
                    { text: 'LastName', value: 'attributes.resident.attributes.lastname' },
                    { text: 'Zone', value: 'attributes.zone' },
                ]

                this.activetable.forEach(element => {
                    this.temp.push({
                        Firstname: element.attributes.resident.attributes.firstname,
                        Middlename: element.attributes.resident.attributes.middlename,
                        Lastname: element.attributes.resident.attributes.lastname,
                        Zone: element.attributes.zone,
                    })
                });
            },

            residentHeader : function (){
                this.headers = [
                    { text: 'FirstName', value: 'attributes.firstname' },
                    { text: 'MiddleName', value: 'attributes.middlename' },
                    { text: 'LastName', value: 'attributes.lastname' },
                    { text: 'Age', value: 'attributes.age' },
                    { text: 'Sex', value: 'attributes.sex' },
                    { text: 'Suffix', value: 'attributes.suffix' },
                    { text: 'Job', value: 'attributes.job' },
                    { text: 'Voter', value: 'attributes.voter' },
                    { text: 'Mortality', value: 'attributes.mortality' }
                ]

                this.activetable.forEach(element => {
                    this.temp.push({
                        Firstname: element.attributes.firstname,
                        Middlename: element.attributes.middlename,
                        Lastname: element.attributes.lastname,
                        Age: element.attributes.age,
                        Sex: element.attributes.sex,
                        Suffix: element.attributes.suffix,
                        Job: element.attributes.job,
                        Voter: element.attributes.voter,
                        Mortality: element.attributes.mortality,
                    })
                });
            },

            householdHeader : function (){
                this.headers = [
                    { text: 'FirstName', value: 'attributes.resident.attributes.firstname' },
                    { text: 'MiddleName', value: 'attributes.resident.attributes.middlename' },
                    { text: 'LastName', value: 'attributes.resident.attributes.lastname' },
                    { text: 'House Address', value: 'attributes.address' }
                ]

                this.activetable.forEach(element => {
                    this.temp.push({
                        Firstname: element.attributes.resident.attributes.firstname,
                        Middlename: element.attributes.resident.attributes.middlename,
                        Lastname: element.attributes.resident.attributes.lastname,
                        HouseAddress: element.attributes.address,
                    })
                });
            },

            outofschoolHeader : function (){
                this.headers = [
                    { text: 'FirstName', value: 'attributes.resident.attributes.firstname' },
                    { text: 'MiddleName', value: 'attributes.resident.attributes.middlename' },
                    { text: 'LastName', value: 'attributes.resident.attributes.lastname' }
                ]

                this.activetable.forEach(element => {
                    this.temp.push({
                        Firstname: element.attributes.resident.attributes.firstname,
                        Middlename: element.attributes.resident.attributes.middlename,
                        Lastname: element.attributes.resident.attributes.lastname
                    })
                });
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>