export const strict = false;

import Moralis from 'moralis';
import _ from 'lodash';

export const state = () => ({

    user:[],




})


export const mutations = {
   

    authorize_loggin(state,user){
        return state.user = user;
    },

}

export const actions = {

    loggedin({commit}){
        const currentUser =  Moralis.User.current();
        if (currentUser) {
           commit('authorize_loggin', currentUser)
        }
    },

    nuxtClientInit  ({ commit,dispatch }, { req }) {


        Moralis.start({ 
            serverUrl: "https://o5sg2brbqqqx.usemoralis.com:2053/server", 
            appId: "PBPrHvDlkwtsXThmxp42YtYstUOr4Hi0m95XXh1o" 
        });

        dispatch('loggedin')

        
    }

}
