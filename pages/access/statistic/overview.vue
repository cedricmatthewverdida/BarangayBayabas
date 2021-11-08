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
              :elevation="hover ? 12 : 2"
              :class="{ 'on-hover': hover }"
            >
              
                <v-card-title class="text-h6 white--text">
                  <v-row
                    class="fill-height flex-column"
                    justify="space-between"
                  >
                    <p class="mt-4 subheading text-left" style="background: rgba(0, 0, 0, 0.5);">
                      {{ item.title }}
                    </p>

                    <div>
                      <p class="ma-0 text-body-1 font-weight-bold font-italic text-left" style="background: rgba(0, 0, 0, 0.5);">>
                        {{ item.text }}
                      </p>
                      <p class="text-caption font-weight-medium font-italic text-left" style="background: rgba(0, 0, 0, 0.5);">>
                        {{ item.subtext }}
                      </p>
                    </div>

                    <div class="align-self-center">
                      <v-btn
                        v-for="(icon, index) in icons"
                        :key="index"
                        :class="{ 'show-btns': hover }"
                        :color="transparent"
                        icon
                      >
                        <v-icon
                          :class="{ 'show-btns': hover }"
                          :color="transparent"
                        >
                          {{ icon }}
                        </v-icon>
                      </v-btn>
                    </div>
                  </v-row>
                </v-card-title>
            </v-card>
          </v-hover>
        </v-col>
      </template>
    </v-row>

    <v-row>
        <v-col>
            <v-card
            outlined
            >
                <v-card-title>
                    Pie Chart
                </v-card-title>
                <v-card-text>
                    <PieChart :covid="covid"/>
                </v-card-text>
            </v-card>
        </v-col>
        <v-col>
            <v-card
            outlined
            >

            <v-card-text>
                <v-list flat>
                <v-subheader>Records</v-subheader>
                <v-list-item-group
                    v-model="selectedItem"
                    color="primary"
                >
                    <v-list-item
                    v-for="(item, i) in covidrecord"
                    :key="i"
                    >
                    <v-list-item-content>
                        <v-list-item-title>{{item.name}}</v-list-item-title>
                        <v-list-item-subtitle>{{item.covid}}</v-list-item-subtitle>
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
          title: 'Covid',
          text: `Total Case`,
          subtext: '50',
          img: 'https://images.unsplash.com/photo-1583324113626-70df0f4deaab?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dmlydXN8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
        },
        {
          title: 'Vaccination',
          text: 'Total Vaccinated',
          subtext: '10',
          img: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
        },
        {
          title: 'Voters',
          text: 'Total Registered Voters',
          subtext: '35',
          img: 'https://images.unsplash.com/photo-1542320868-f4d80389e1c4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3750&q=80',
        },
      ],
      covid: [
        2,1,1
      ],
      covidrecord: [
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

