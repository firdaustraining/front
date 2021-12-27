<template>
  <header class="section-header">
    <section class="header-main border-bottom">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <h5 class="navbar-brand" href="#">
          <router-link :to="{ name: 'home' }" class="text-decoration-none" data-abc="true">
            <span class="logo"> Solo Budaya </span>
          </router-link>
        </h5>

        <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item">
              <h5><router-link to="/" class="nav-item nav-link">Home</router-link></h5>
            </li>
            <li class="nav-item">
              <h5><router-link to="/categories" class="nav-item nav-link">Category</router-link></h5>
            </li>

            <li class="nav-item">
              <router-link :to="{ name: 'cart' }" class="btn search-button btn-md d-block" style="color: #ffffff;background-color: #6677ef;border-color: #ffffff;"
                ><i class="fa fa-shopping-cart"></i> {{ cartCount }} | Rp. {{ moneyFormat(cartTotal) }}
              </router-link>
            </li>
          </ul>
          <div class="account">
            <router-link :to="{ name: 'login' }" v-if="!isLoggedIn" class="btn search-button btn-md d-block d-md-block ml-4"><i class="fa fa-user-circle"></i> ACCOUNT</router-link>
            <router-link :to="{ name: 'dashboard' }" v-else class="btn search-button btn-md d-block d-md-block ml-4"><i class="fa fa-tachometer-alt"></i> DASHBOARD </router-link>
          </div>
          <div class="form-inline my-2 my-lg-0">
            <div class="input-group w-100">
              <input type="text" v-model="q" class="form-control search-form" style="width:55%;border: 1px solid #ffffff" placeholder="mau beli apa hari ini ?" />
              <div class="input-group-append">
                <button @click="search" class="btn search-button" type="submit"><i class="fa fa-search"></i></button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </section>
  </header>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup() {
    //store vuex
    const store = useStore();

    const q = ref("");

    const router = useRouter();

    //computed
    const isLoggedIn = computed(() => {
      //get getters isLoggedIn dari module auth
      return store.getters["auth/isLoggedIn"];
    });

    //cart count
    const cartCount = computed(() => {
      //get getter "cartCount" dari module "auth"
      return store.getters["cart/cartCount"];
    });

    //cart total
    const cartTotal = computed(() => {
      //get getter "cartTotal" dari module "auth"
      return store.getters["cart/cartTotal"];
    });

    // const products = computed(() => {
    //     return store.state.search.products
    // })

    //mounted
    onMounted(() => {
      //check state token
      const token = store.state.auth.token;

      if (!token) {
        return;
      }

      //saat mounted, akan memanggil action "cartCount" di module "cart"
      store.dispatch("cart/cartCount");

      //saat mounted, akan memanggil action "cartTotal" di module "cart"
      store.dispatch("cart/cartTotal");
    });

    function search() {
      store.dispatch("product/getSearchProduct", q.value);
      router.push("/");
    }

    return {
      store,
      isLoggedIn,
      cartTotal,
      cartCount,
      q,
      search,
    };
  },
};
</script>
