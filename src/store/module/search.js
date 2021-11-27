//import global API
import Api from "../../api/Api";

const search = {
  //set namespace true
  namespaced: true,

  //state
  state: {
    //index search
    searchproducts: [],
  },

  //mutations
  mutations: {
    //set state searchs dengan data dari response
    GET_SEARCH_PRODUCTS(state, product) {
      state.searchproducts = product;
    },
  },

  //actions
  actions: {
    getSearchProduct({ commit }, product) {
      // get data sliders ke server
      Api.get(`/search?q=${product}`)
        .then((response) => {
          // commit ke mutation GET_PRODUCTS dengan response data
          commit("GET_PRODUCTS", response.data.product);
        })
        .catch((error) => {
          // show error log dari response
          console.log(error);
        });
    },
  },

  //getters
  getters: {
    getProducts(state) {
      return state.searchproducts;
    },
  },
};

export default search;
