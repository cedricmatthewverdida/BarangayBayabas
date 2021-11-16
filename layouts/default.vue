<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      clipped
      app
    >
                  <v-list shaped>
                    <v-list-group
                        v-for="item in items"
                        :key="item.title"
                        v-model="item.active"
                        :prepend-icon="item.action"
                        no-action
                    >
                        <template v-slot:activator>
                        <v-list-item-content>
                            <v-list-item-title v-text="item.title"></v-list-item-title>
                        </v-list-item-content>
                        </template>

                        <v-list-item
                            class="mt-1"
                            v-for="child in item.items"
                            :key="child.title"
                            :to="child.link"
                        >
                        <v-list-item-content>
                            <v-list-item-title v-text="child.title"></v-list-item-title>
                        </v-list-item-content>
                        </v-list-item>
                    </v-list-group>
                </v-list>






    </v-navigation-drawer>

    
    <v-app-bar
      clipped-left
      app
      color="white"
      rounded
      flat
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      
      <v-toolbar-title v-text="title" />

      <v-spacer></v-spacer>

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
          mdi-account
        </v-icon>
        <span class="ml-1">User#431</span>
        </v-btn>
      </template>
      <v-list>

        <v-list-item>
          <v-list-item-title>Profile</v-list-item-title>
        </v-list-item>

        <v-list-item to="/">
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    </v-app-bar>


    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>



    <v-footer
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>


<script>
export default {
  data () {
    return {
      drawer: false,
      items: [
              { 
                action: 'mdi-chart-bar',
                items: [
                    { 
                      title: 'Overview',
                      link: '/access/statistic/overview'
                    },
                    { 
                      title: 'Resident',
                      link: '/access/statistic/resident'
                    },
                    { 
                      title: 'House Hold',
                      link: '/access/statistic/household'
                    },
                    { 
                      title: 'Out of School Youth',
                      link: '/access/statistic/outofschool'
                    },
                    { 
                      title: 'Vaccine',
                      link: '/access/statistic/vaccine'
                    },
                    { 
                      title: 'Resident / in the zone',
                      link: '/access/statistic/zone'
                    },
                ],
                title: 'Statistical',
              },

              { 
                action: 'mdi-emoticon-angry-outline',
                items: [
                    { 
                      title: 'Summon',
                      link: '/access/complain/summon'
                    },
                    { 
                      title: 'Blotter',
                      link: '/access/blotter'
                    },
                    { 
                      title: 'Lupon',
                      link: '/access/lupon'
                    },
                    { 
                      title: 'Incident',
                      link: '/access/incident'
                    },
                ],
                title: 'Complain',
              },


              { 
                action: 'mdi-database',
                items: [
                    { 
                      title: 'List',
                      link: '/access/inventory'
                    }
                ],
                title: 'Inventory',
              },

              { 
                action: 'mdi-swap-vertical-bold',
                items: [
                    { 
                      title: 'Import',
                      link: '/access/import'
                    },
                    { 
                      title: 'Export',
                      link: '/access/import'
                    }
                ],
                title: 'Import or Export Data',
              },

      ],
      title: 'Barangay Carmen'
    }
  }
}
</script>
