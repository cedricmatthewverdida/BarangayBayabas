<template>
    <v-card
    class="mt-15"
    shaped
    >
        <v-card-text
        class="container">
          <v-data-table
            :headers="headers"
            :items="resident"
            sort-by="name"
            :search="search"
          >
            <template v-slot:item.created="{ item }">
              {{ item.created | format_time }}
            </template>

            <template v-slot:item.updated="{ item }">
              {{ item.updated | format_time }}
            </template>

            <template v-slot:top>
              <v-toolbar
                flat
              >
                <v-toolbar-title>
                  <v-text-field
                  filled
                  rounded
                  prepend-inner-icon="mdi-magnify"
                  label="Search"
                  class="mt-5"
                  v-model="search"
                  />
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-dialog
                  v-model="dialog"
                  max-width="500px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      dark
                      class="mb-2"
                      v-bind="attrs"
                      v-on="on"
                      depressed
                      rounded
                    >
                      New Data
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>

                        <v-select
                        v-model="editedItem.name"
                        filled
                        rounded
                        :items="users"
                        label="Name"
                        >
                        </v-select>

                        <v-select
                        v-model="editedItem.adolescent"
                        filled
                        rounded
                        :items="adolescent_status"
                        label="Vaccine Status"
                        >
                        </v-select>

                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="close"
                      >
                        Cancel
                      </v-btn>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="save"
                      >
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="500px">
                  <v-card>
                    <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                      <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon
                small
                class="mr-2"
                @click="editItem(item)"
              >
                mdi-pencil
              </v-icon>
              <v-icon
                small
                @click="deleteItem(item)"
              >
                mdi-delete
              </v-icon>
            </template>
            <template v-slot:no-data>
              <v-btn
                color="primary"
                @click="initialize"
              >
                Reset
              </v-btn>
            </template>
          </v-data-table>
        </v-card-text>
    </v-card>
</template>
<script>
  import moment from 'moment'
  export default {
    data: () => ({

      dialog: false,
      dialogDelete: false,

      search: '',

      users:[
        'Ana Rosani O. Kagatan',
        'Merson O. La Vactoria',
        'Hazel L. Cagadas',
        'Medeliza S. Bagyuro',
        'James Yap'
      ],

      adolescent_status:[
        'Teen',
        'Young Adult',
        'Adult',
        'Child'
      ],

      headers: [
        {
          text: 'ID #',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        { text: 'Name', value: 'name' },
        { text: 'Adolescent', value: 'adolescent' },
        { text: 'Updated', value: 'updated' },
        { text: 'Created', value: 'created' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      resident: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        adolescent: ''
      },
      defaultItem: {
        name: '',
        adolescent: ''
      },
    }),

    computed: {

      formTitle () {
        return this.editedIndex === -1 ? 'New Data' : 'Edit Data'
      },
      

    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {

        this.resident = [
            {
                id: 'XACeq',
                name : "Ana Rosani O. Kagatan",
                adolescent: "Teen",
                updated : 'Thu Oct 30 2021 21:56:38 GMT+0800 (Philippine Standard Time)',
                created: 'Thu Oct 28 2021 21:56:38 GMT+0800 (Philippine Standard Time)'
            },
            {
                id: 'QWEFA',
                name : "Merson O. La Vactoria",
                adolescent: "Young Adult",
                updated : 'Thu Nov 1 2021 21:56:38 GMT+0800 (Philippine Standard Time)',
                created: 'Thu Oct 28 2021 21:56:38 GMT+0800 (Philippine Standard Time)'
            },
            {
                id: 'ZXCAW',
                name : "Hazel L. Cagadas",
                adolescent: "Child",
                updated : 'Thu Nov 2 2021 21:56:38 GMT+0800 (Philippine Standard Time)',
                created: 'Thu Oct 28 2021 21:56:38 GMT+0800 (Philippine Standard Time)'
            },
            {
                id: 'EQTEQ',
                name : "Medeliza S. Bagyuro",
                adolescent: "Adult",
                updated : 'Thu Oct 28 2021 21:56:38 GMT+0800 (Philippine Standard Time)',
                created: 'Thu Oct 28 2021 21:56:38 GMT+0800 (Philippine Standard Time)'
            },
            {
                id: 'tEQWQ',
                name : "James Yap",
                adolescent: "Teen",
                updated : 'Thu Oct 28 2021 21:56:38 GMT+0800 (Philippine Standard Time)',
                created: 'Thu Oct 28 2021 21:56:38 GMT+0800 (Philippine Standard Time)'
            }
        ]
      },

      editItem (item) {
        this.editedIndex = this.resident.indexOf(item)
        this.editedItem = Object.assign({}, item)
        console.log(this.editedItem)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.resident.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.resident.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.resident[this.editedIndex], this.editedItem)
        } else {
          this.resident.push(this.editedItem)
        }
        this.close()
      },
    },

    filters:{
      format_time : function (time) {
        return moment(time).fromNow(); 
      }
    }
  }
</script>


<style>
  .card {
      backdrop-filter: blur(16px) saturate(180%);
      -webkit-backdrop-filter: blur(16px) saturate(180%);
      border-radius: 12px;
      border: 1px solid rgba(209, 213, 219, 0.3);
  }
</style>