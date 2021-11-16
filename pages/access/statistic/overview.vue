<template>
  <v-container class="pa-4">
    <v-row
      class="fill-height"
      align="center"
      justify="center"
    >
      <template v-for="(item, i) in items">
        <v-col
          :key="i"
          cols="12"
          md="4"
        >
          <v-hover v-slot="{ hover }">
            <v-card
              :elevation="hover ? 12 : 1"
              :class="{ 'on-hover': hover }"
              dark
              :color="item.color"
            >
              
                <v-card-title>
                  {{item.title}}
                </v-card-title>
                <v-card-subtitle>
                  {{item.text}}: <b>{{item.subtext}}</b>
                </v-card-subtitle>
            </v-card>
          </v-hover>
        </v-col>
      </template>
    </v-row>

    <v-row>
        <v-col>
            <v-card
            tile
            >
                <v-card-title>
                    <v-menu offset-y>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          depressed
                          text
                          rounded
                          v-bind="attrs"
                          v-on="on"
                        >
                          <v-icon>
                          mdi-chart-bar-stacked
                        </v-icon>
                        <span class="ml-1">SELECT CHART STYLE</span>
                        </v-btn>
                      </template>
                      <v-list>

                        <v-list-item>
                          <v-list-item-title>Pie Chart</v-list-item-title>
                        </v-list-item>

                        <v-list-item to="/">
                          <v-list-item-title>Bar Chart</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                </v-card-title>
                <v-card-text>
                    <PieChart :samplerecord="samplerecord"/>
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
                    v-model="selectedItem"
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
import PieChart from '~/components/PieChart.vue';
  export default {
    components :{
        PieChart
    },
    data: () => ({
      icons: ['mdi-rewind', 'mdi-play', 'mdi-fast-forward'],
      items: [
        {
          title: 'Out of School Youth',
          text: `Total Out of School Youth`,
          subtext: '1 out of 10',
          color: 'primary'
        },
        {
          title: 'Vaccination',
          text: 'Total Vaccinated',
          subtext: '10 out of 10',
          color: 'pink'
        },
        {
          title: 'Voters',
          text: 'Total Registered Voters',
          subtext: '5 out of 10',
          color: 'purple'
        },
        {
          title: 'Employed',
          text: `Total Employed`,
          subtext: '3 out of 10',
          color: 'dark'
        },
        {
          title: 'Male',
          text: `Total Male`,
          subtext: '5',
          color: 'teal'
        },
        {
          title: 'Female',
          text: `Total Female`,
          subtext: '5',
          color: 'black'
        },
      ],
      samplerecord: [
        3,1
      ],
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
  }
</script>

