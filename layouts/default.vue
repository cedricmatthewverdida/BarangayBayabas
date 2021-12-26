<template>
  <v-app style="background-color: #F8F5F1;">
    <v-navigation-drawer
      v-model="drawer"
      clipped
      app
    >
                  <v-list shaped>
                    <v-list-group
                        color="#343F56"
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
      color="#387C6D"
      flat
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      
      <v-toolbar-title v-text="title" />
      

      <v-spacer></v-spacer>

      
        <v-menu
          content-class="elevation-1"
          v-if="user.length != 0"
          offset-x>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
            >
                <v-badge
                v-if="notification.count != 0"
                color="#F05454"
                :content="notification.count"
                overlap
                left
                bordered

                >
                  <v-icon
                  >
                    mdi-bell-ring
                  </v-icon>
                </v-badge>

                <v-icon
                v-if="notification.count == 0"
                >
                  mdi-bell
                </v-icon>
            </v-btn>
          </template>
          <v-list>

            <v-list-item
              v-for="(notif,key) in notification.results"
              :key="key"
            >
                <v-list-item-icon>
                <v-avatar
                size="30"
                >
                  <img
                  :lazy-src="notif.get('notifiedby').get('profilepic')._url"
                  :src="notif.get('notifiedby').get('profilepic')._url"
                  >
                </v-avatar>
              </v-list-item-icon>
              <v-list-item-content>
              <v-list-item-title>{{notif.get('content')}}</v-list-item-title>
              <v-list-item-subtitle>{{notif.get('notifiedby').get('firstname')}}&nbsp;{{notif.get('notifiedby').get('lastname')}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

          </v-list>
        </v-menu>

        
      

      <v-menu
      content-class="elevation-1"
      v-if="user.length != 0"
      offset-x>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          depressed
          text
          rounded
          v-bind="attrs"
          v-on="on"
          style="text-transform:none;"
        >
          <v-avatar
          size="30"
          >
            <img
            :lazy-src="user.attributes.profilepic._url"
            :src="user.attributes.profilepic._url"
            >
          </v-avatar>
        </v-btn>
      </template>
      <v-list>

        <v-list-item>
          <v-list-item-title>{{user.attributes.firstname}}</v-list-item-title>
        </v-list-item>

        <v-list-item @click="logout()">
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
      color="white"
    >
      <v-avatar
      size="30"
      class="mr-2"
      >
      <v-img
      lazy-src="https://www.vhv.rs/dpng/d/573-5731936_coc-college-logo-vector-phinma-cagayan-de-oro.png"
      src="https://www.vhv.rs/dpng/d/573-5731936_coc-college-logo-vector-phinma-cagayan-de-oro.png"
      >

      </v-img>
      </v-avatar>
      <span class="overline">Cagayan de Oro College </span>
    </v-footer>

    <TheSnackbar/>
  </v-app>
</template>


<script>
import { mapActions,mapState } from 'vuex'
import TheSnackbar from '@/components/TheSnackbar.vue';
import Moralis from 'moralis'
export default {
  components:{
    TheSnackbar
  },
  middleware: 'loggedin' ,
  data () {
    return {
      drawer: false,
      notification: [],
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

              { 
                action: 'mdi-account',
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
                title: 'Accounts',
              },

      ],
      title: 'Barangay Carmen'
    }
  },

  computed:{
    ...mapState(
        [
          'user'
        ]
      ),
  },
  
  methods:{

    ...mapActions(['loggedin']),


    async getNotif (){
        const response = await Moralis.Cloud.run("getNotification");
        this.notification = response;
        console.log(response)
    },

    async logout() {
      await Moralis.User.logOut();
      this.authorize_loggin([]);
      this.$router.push('/login')
    }
  },

  mounted(){
      this.getNotif();
  },
}
</script>
