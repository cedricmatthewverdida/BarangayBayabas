<template>
  <div>
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
                  Gender
                </v-card-title>
                <v-card-subtitle v-if="initload">
                  Total Male: {{genderCount[0].length}}
                </v-card-subtitle>
            </v-card>
          </v-hover>
        </v-col>


    </v-row>


    <ResidentList v-if="loadchart == ''" class="my-15"/>

    <v-row
     v-if="loadchart != ''"
    >
        <v-col>
            <v-card
            tile
            height="430"
            >
                <v-card-title class="caption">
                   Chart Preview&nbsp;<b>{{loadchart}}</b>
                </v-card-title>

                <v-card-text
                  class="mt-10"
                  v-if="loadchart == 'Voters'"
                >
                   <VoterChart
                      :samplerecord="samplerecord" :samplelabel="samplelabel"
                    />
                </v-card-text>

                <v-card-text
                  class="mt-10"
                  v-if="loadchart == 'Job'"
                >
                   <JobChart
                      :samplerecord="samplerecord" :samplelabel="samplelabel"
                    />
                </v-card-text>

                <v-card-text
                  class="mt-10"
                  v-if="loadchart == 'Outofschool'"
                >
                  <OutOfSchool
                    :samplerecord="samplerecord" :samplelabel="samplelabel"
                  />
                </v-card-text>

                <v-card-text
                  class="mt-10"
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

            <v-card-text v-if="loadchart == 'Voters'">
                <v-subheader>Registered Voters</v-subheader>
                <v-virtual-scroll
                  bench="0"
                  :items="record[0]"
                  height="150"
                  item-height="64"
                >
                  <template v-slot:default="{ item }">
                    <v-list-item
                    :key="item"
                    >
                      <v-list-item-content>
                        <v-list-item-title>{{item.get('firstname')}} {{item.get('middlename')}} {{item.get('lastname')}}</v-list-item-title>
                        <v-list-item-subtitle>{{item.get('voter')}}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-virtual-scroll>
                <v-divider></v-divider>
                <v-subheader>Unregistered Voters</v-subheader>
                <v-virtual-scroll
                  bench="0"
                  :items="record[1]"
                  height="150"
                  item-height="64"
                >
                  <template v-slot:default="{ item }">
                    <v-list-item
                    :key="item"
                    >
                      <v-list-item-content>
                        <v-list-item-title>{{item.get('firstname')}} {{item.get('middlename')}} {{item.get('lastname')}}</v-list-item-title>
                        <v-list-item-subtitle>{{item.get('voter')}}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-virtual-scroll>
            </v-card-text>

            <v-card-text v-if="loadchart == 'Job'">
                <v-subheader>Employed Residents</v-subheader>
                <v-virtual-scroll
                  bench="0"
                  :items="record[0]"
                  height="150"
                  item-height="64"
                >
                  <template v-slot:default="{ item }">
                    <v-list-item
                    :key="item"
                    >
                      <v-list-item-content>
                        <v-list-item-title>{{item.get('firstname')}} {{item.get('middlename')}} {{item.get('lastname')}}</v-list-item-title>
                        <v-list-item-subtitle>{{item.get('job')}}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-virtual-scroll>
                <v-divider></v-divider>
                <v-subheader>Unemployed Residents</v-subheader>
                <v-virtual-scroll
                  bench="0"
                  :items="record[1]"
                  height="150"
                  item-height="64"
                >
                  <template v-slot:default="{ item }">
                    <v-list-item
                    :key="item"
                    >
                      <v-list-item-content>
                        <v-list-item-title>{{item.get('firstname')}} {{item.get('middlename')}} {{item.get('lastname')}}</v-list-item-title>
                        <v-list-item-subtitle>{{item.get('job')}}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-virtual-scroll>
            </v-card-text>


            <v-card-text v-if="loadchart == 'Female'">
                <v-subheader>Female Residents</v-subheader>
                <v-virtual-scroll
                  bench="0"
                  :items="record[0]"
                  height="150"
                  item-height="64"
                >
                  <template v-slot:default="{ item }">
                    <v-list-item
                    :key="item"
                    >
                      <v-list-item-content>
                        <v-list-item-title>{{item.get('firstname')}} {{item.get('middlename')}} {{item.get('lastname')}}</v-list-item-title>
                        <v-list-item-subtitle>{{item.get('sex')}}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-virtual-scroll>
                <v-divider></v-divider>
                <v-subheader>Male Residents</v-subheader>
                <v-virtual-scroll
                  bench="0"
                  :items="record[1]"
                  height="150"
                  item-height="64"
                >
                  <template v-slot:default="{ item }">
                    <v-list-item
                    :key="item"
                    >
                      <v-list-item-content>
                        <v-list-item-title>{{item.get('firstname')}} {{item.get('middlename')}} {{item.get('lastname')}}</v-list-item-title>
                        <v-list-item-subtitle>{{item.get('sex')}}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-virtual-scroll>
            </v-card-text>

            <v-card-text v-if="loadchart == 'Male'">
                <v-subheader>Male Residents</v-subheader>
                <v-virtual-scroll
                  bench="0"
                  :items="record[0]"
                  height="150"
                  item-height="64"
                >
                  <template v-slot:default="{ item }">
                    <v-list-item
                    :key="item"
                    >
                      <v-list-item-content>
                        <v-list-item-title>{{item.get('firstname')}} {{item.get('middlename')}} {{item.get('lastname')}}</v-list-item-title>
                        <v-list-item-subtitle>{{item.get('sex')}}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-virtual-scroll>
                <v-divider></v-divider>
                <v-subheader>Female Residents</v-subheader>
                <v-virtual-scroll
                  bench="0"
                  :items="record[1]"
                  height="150"
                  item-height="64"
                >
                  <template v-slot:default="{ item }">
                    <v-list-item
                    :key="item"
                    >
                      <v-list-item-content>
                        <v-list-item-title>{{item.get('firstname')}} {{item.get('middlename')}} {{item.get('lastname')}}</v-list-item-title>
                        <v-list-item-subtitle>{{item.get('sex')}}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-virtual-scroll>
            </v-card-text>

            <v-card-text v-if="loadchart == 'Outofschool'">
                <v-subheader>Out of school residents</v-subheader>
                <v-virtual-scroll
                  bench="0"
                  :items="record"
                  height="350"
                  item-height="64"
                >
                  <template v-slot:default="{ item }">
                    <v-list-item
                    :key="item"
                    >
                      <v-list-item-content>
                        <v-list-item-title>{{item.get('resident').get('firstname')}} {{item.get('resident').get('middlename')}} {{item.get('resident').get('lastname')}}</v-list-item-title>
                        <!-- <v-list-item-subtitle>{{item}}</v-list-item-subtitle> -->
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-virtual-scroll>
            </v-card-text>

            </v-card>
        </v-col>
    </v-row>
  </div>
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

      record: [],
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
        this.record.push(this.voterCount[0])
        this.record.push(this.voterCount[1])
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
        this.record = []
        this.loadchart = "Job"
        this.samplerecord = [this.employedCount[0].length,this.employedCount[1].length]
        this.samplelabel = ["Employed","Unemployed"]
        this.record.push(this.employedCount[0])
        this.record.push(this.employedCount[1])
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
        this.record = []
        this.loadchart = "Female"
        this.samplerecord = [this.genderCount[1].length,this.genderCount[0].length]
        this.samplelabel = ["Female","Male"]
        this.record.push(this.genderCount[1])
        this.record.push(this.genderCount[0])
      },

      setMaleCount : function (){
        this.record = []
        this.loadchart = "Male"
        this.samplerecord = [this.genderCount[0].length,this.genderCount[1].length]
        this.samplelabel = ["Male","Female"]
        this.record.push(this.genderCount[0])
        this.record.push(this.genderCount[1])
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
        this.record = []
        this.loadchart = "Outofschool"
        this.samplerecord = [this.outofyouth.count,this.resident.count]
        this.samplelabel = ["Out of school","Resident Records"]
        this.record = this.outofyouth.results;
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

<style lang="scss" scoped>
.card {
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    background-color: rgba(255, 255, 255, 0.75);
    border-radius: 12px;
    border: 1px solid rgba(209, 213, 219, 0.3);
}
</style>