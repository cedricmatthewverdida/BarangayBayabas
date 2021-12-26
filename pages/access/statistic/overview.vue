<template>
  <v-container class="pa-4">
    <v-row
      class="fill-height"
      align="center"
      justify="center"
    >

        <v-col
          cols="12"
          md="4"
        >
          <v-hover v-slot="{ hover }">
            <v-card
              :elevation="hover ? 12 : 1"
              :class="{ 'on-hover': hover }"
              dark
              color="primary"
              @click="setResident()"
            >
              
                <v-card-title>
                  <v-icon dark class="mr-2">mdi-account-group</v-icon>
                  Resident
                </v-card-title>
                <v-card-subtitle>
                  Total Resident: {{resident.count}}
                </v-card-subtitle>
            </v-card>
          </v-hover>
        </v-col>
      
        <v-col
          cols="12"
          md="4"
        >
          <v-hover v-slot="{ hover }">
            <v-card
              :elevation="hover ? 12 : 1"
              :class="{ 'on-hover': hover }"
              dark
              color="pink"
              @click="setOutofschool()"
            >
              
                <v-card-title>
                  <v-icon dark class="mr-2">mdi-school</v-icon>
                  Out of school youth
                </v-card-title>
                <v-card-subtitle>
                  Total out of school youth: {{outofyouth.count}} out of {{resident.count}}
                </v-card-subtitle>
            </v-card>
          </v-hover>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-hover v-slot="{ hover }">
            <v-card
              :elevation="hover ? 12 : 1"
              :class="{ 'on-hover': hover }"
              dark
              color="teal"
              :loading="!initload"
              @click="setVoter()"
            >
              
                <v-card-title>
                  <v-icon dark class="mr-2">mdi-vote</v-icon>
                  Voters
                </v-card-title>
                <v-card-subtitle v-if="initload">
                  Total Registered Voter: {{voterCount[0].length}} out of {{voterCount[1].length}}
                </v-card-subtitle>
            </v-card>
          </v-hover>
        </v-col>


        <v-col
          cols="12"
          md="4"
        >
          <v-hover v-slot="{ hover }">
            <v-card
              :elevation="hover ? 12 : 1"
              :class="{ 'on-hover': hover }"
              dark
              color="purple"
              :loading="!initload"
              @click="setJob()"
            >
              
                <v-card-title>
                  <v-icon dark class="mr-2">mdi-briefcase-variant</v-icon>
                  Employed
                </v-card-title>
                <v-card-subtitle v-if="initload">
                  Total Employed Resident: {{employedCount[0].length}} out of {{employedCount[1].length}}
                </v-card-subtitle>
            </v-card>
          </v-hover>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-hover v-slot="{ hover }">
            <v-card
              :elevation="hover ? 12 : 1"
              :class="{ 'on-hover': hover }"
              dark
              color="brown"
              :loading="!initload"
              @click="setMaleCount()"
            >
              
                <v-card-title>
                  <v-icon dark class="mr-2">mdi-human-male</v-icon>
                  Male
                </v-card-title>
                <v-card-subtitle v-if="initload">
                  Total Male: {{genderCount[0].length}}
                </v-card-subtitle>
            </v-card>
          </v-hover>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-hover v-slot="{ hover }">
            <v-card
              :elevation="hover ? 12 : 1"
              :class="{ 'on-hover': hover }"
              dark
              color="black"
              :loading="!initload"
              @click="setFemaleCount()"
            >
              
                <v-card-title>
                  <v-icon dark class="mr-2">mdi-human-female</v-icon>
                  Female
                </v-card-title>
                <v-card-subtitle v-if="initload">
                  Total Female: {{genderCount[1].length}}
                </v-card-subtitle>
            </v-card>
          </v-hover>
        </v-col>

    </v-row>


    <ResidentList v-if="loadchart == ''" class="my-3"/>

    <v-row
     v-if="loadchart != ''"
    >
        <v-col>
            <v-card
            tile
            >
                <v-card-title class="caption">
                   Chart Preview&nbsp;<b>{{loadchart}}</b>
                </v-card-title>

                <v-card-text
                  v-if="loadchart == 'Voters'"
                >
                   <VoterChart
                      :samplerecord="samplerecord" :samplelabel="samplelabel"
                    />
                </v-card-text>

                <v-card-text
                  v-if="loadchart == 'Job'"
                >
                   <JobChart
                      :samplerecord="samplerecord" :samplelabel="samplelabel"
                    />
                </v-card-text>

                <v-card-text
                  v-if="loadchart == 'Outofschool'"
                >
                  <OutOfSchool
                    :samplerecord="samplerecord" :samplelabel="samplelabel"
                  />
                </v-card-text>

                <v-card-text
                  v-if="loadchart == 'Female'"
                >
                  <FemaleChart
                    :samplerecord="samplerecord" :samplelabel="samplelabel"
                  />
                </v-card-text>

                <v-card-text
                  v-if="loadchart == 'Male'"
                >
                  <MaleChart
                    :samplerecord="samplerecord" :samplelabel="samplelabel"
                  />
                </v-card-text>

            </v-card>
        </v-col>
        <v-col>
            <v-card
            tile
            >

            <v-card-text>
                <v-list flat>
                <v-subheader>Records</v-subheader>
                <v-list-item-group
                    color="primary"
                >
                    <v-list-item
                    v-for="(item, i) in record"
                    :key="i"
                    >
                    <v-list-item-content>
                        <v-list-item-title>{{item.name}}</v-list-item-title>
                        <v-list-item-subtitle>{{item.voter}}</v-list-item-subtitle>
                    </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
                </v-list>
            </v-card-text>

            </v-card>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MaleChart from '~/components/MaleChart.vue';
import FemaleChart from '~/components/FemaleChart.vue';
import VoterChart from '~/components/VoterChart.vue';
import JobChart from '~/components/JobChart.vue';
import OutOfSchool from '~/components/OutofschoolChart.vue';
import ResidentList from '~/components/Resident.vue';
import Moralis from 'moralis';
  export default {
    components :{
        VoterChart,
        JobChart,
        OutOfSchool,
        FemaleChart,
        MaleChart,
        ResidentList
    },
    data: () => ({
      initload: false,
      resident:[],
      outofyouth:[],


      voterCount: [],
      employedCount:[],
      genderCount: [],

      samplerecord: [],
      samplelabel: [],

      loadchart: "",

      record: [
            {
                id: 'XACeq',
                name : "Ana Rosani O. Kagatan",
                vaccine: "Vaccinated",
                voter: "Registered",
                covid: "Currently Diagnosed",
                updated : 'Thu Oct 30 2021 21:56:38 GMT+0800 (Philippine Standard Time)',
                created: 'Thu Oct 28 2021 21:56:38 GMT+0800 (Philippine Standard Time)'
            },
            {
                id: 'QWEFA',
                name : "Merson O. La Vactoria",
                vaccine: "Unvaccinated",
                voter: "Registered",
                covid: "Currently Diagnosed",
                updated : 'Thu Nov 1 2021 21:56:38 GMT+0800 (Philippine Standard Time)',
                created: 'Thu Oct 28 2021 21:56:38 GMT+0800 (Philippine Standard Time)'
            },
            {
                id: 'ZXCAW',
                name : "Hazel L. Cagadas",
                vaccine: "Vaccinated",
                voter: "Registered",
                covid: "Not Exposed",
                updated : 'Thu Nov 2 2021 21:56:38 GMT+0800 (Philippine Standard Time)',
                created: 'Thu Oct 28 2021 21:56:38 GMT+0800 (Philippine Standard Time)'
            },
            {
                id: 'EQTEQ',
                name : "Medeliza S. Bagyuro",
                vaccine: "Vaccinated",
                voter: "Unregistered",
                covid: "Recovered",
                updated : 'Thu Oct 28 2021 21:56:38 GMT+0800 (Philippine Standard Time)',
                created: 'Thu Oct 28 2021 21:56:38 GMT+0800 (Philippine Standard Time)'
            }
      ],
      transparent: 'rgba(255, 255, 255, 0)',
    }),

    methods:{

      setResident : function (){
        this.loadchart = "";
      },

      setVoter : function (){
        this.loadchart = "Voters"
        this.samplerecord = [this.voterCount[0].length,this.voterCount[1].length]
        this.samplelabel = ["Registered","Unregistered"]
      },

      loadVoterCount : function (obj){
        let result = [];
        let registered = obj.results.filter(item => item.attributes.voter == "Registered");
        let unregistered = obj.results.filter(item => item.attributes.voter == "Unregistered");
        result[0] = registered;
        result[1] = unregistered;
        return result
      },

      setJob : function (){
        this.loadchart = "Job"
        this.samplerecord = [this.employedCount[0].length,this.employedCount[1].length]
        this.samplelabel = ["Employed","Unemployed"]
      },

      loadEmployedCount : function (obj){
        let result = [];
        let employed = obj.results.filter(item => item.attributes.job == "Employed");
        let unemployed = obj.results.filter(item => item.attributes.job == "Unemployed");
        result[0] = employed;
        result[1] = unemployed;
        return result
      },

      setFemaleCount : function (){
        this.loadchart = "Female"
        this.samplerecord = [this.genderCount[1].length,this.genderCount[0].length]
        this.samplelabel = ["Female","Male"]
      },

      setMaleCount : function (){
        this.loadchart = "Male"
        this.samplerecord = [this.genderCount[0].length,this.genderCount[1].length]
        this.samplelabel = ["Male","Female"]
      },

      loadGenderCount : function (obj){
        let result = [];
        let male = obj.results.filter(item => item.attributes.sex == "Male");
        let female = obj.results.filter(item => item.attributes.sex == "Female");
        result[0] = male;
        result[1] = female;
        return result
      },

      async initResident (){
        const Resident = Moralis.Object.extend("Resident");
        const query = new Moralis.Query(Resident);
        query.withCount()
        const results = await query.find();
        this.resident =  results
        this.initload = true;
        this.voterCount = this.loadVoterCount(this.resident);
        this.employedCount = this.loadEmployedCount(this.resident);
        this.genderCount = this.loadGenderCount(this.resident);
      },

      setOutofschool : function (){
        this.loadchart = "Outofschool"
        this.samplerecord = [this.outofyouth.count,this.resident.count]
        this.samplelabel = ["Out of school","Resident Records"]
      },

      async initOutOfSchoolYouth (){
        const Outofschool = Moralis.Object.extend("Outofschool");
        const query = new Moralis.Query(Outofschool);
        query.withCount()
        const results = await query.find();
        this.outofyouth =  results
      },
    },

    mounted(){
      this.initResident();
      this.initOutOfSchoolYouth()
      
    }
  }
</script>

