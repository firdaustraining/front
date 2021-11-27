<template>
  <div class="container mt-5 mb-5">
    <div class="row">
      <div class="col-md-4">
        <div class="card border-0 rounded shadow">
          <div class="card-body p-2">
            <img :src="product.image" class="w-100 border " />
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <label class="font-weight-bold" style="font-size: 20px;"> {{ product.title }} </label>
            <hr />
            <div class="price-product" id="price-product" style="font-size: 1.35rem">
              <span class="font-weight-bold mr-4" style="color: green">Rp. {{ calculateDiscount(product) }}</span>
              <s class="font-weight-bold" v-if="product.discount > 0" style="text-decoration-color:red">Rp. {{ product.price }}</s>
            </div>
            <table class="table table-borderless mt-3">
              <tbody>
                <tr>
                  <td class="font-weight-bold" v-if="product.discount > 0">DISKON</td>
                  <td>:</td>
                  <td>
                    <button class="btn btn-sm" v-if="product.discount > 0" style="color: #ff2f00;border-color: #ff2f00;">DISKON {{ product.discount }} %</button>
                  </td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Stok</td>
                  <td>:</td>
                  <td>
                    <span class="badge badge-pill badge-success" style="font-size: 14px;border-radius: .3rem;padding: .25em .5em .2em;"> {{ product.stock }}</span>
                  </td>
                </tr>

                <tr>
                  <td class="font-weight-bold">BERAT</td>
                  <td>:</td>
                  <td>
                    <span class="badge badge-pill badge-success" style="font-size: 14px;border-radius: .3rem;padding: .25em .5em .2em;"> {{ product.weight }} gram</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <button v-if="product.stock > 0" @click.prevent="addToCart(product.id, calculateDiscount(product), product.weight)" class="btn btn-primary btn-lg btn-block">
              <i class="fa fa-shopping-cart"> </i>
              TAMBAH KE KERANJANG
            </button>

            <button v-else class="btn btn-danger btn-lg btn-block">
              <i class="fa fa-shopping-cart"> </i>
              STOCK HABIS
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <label class="font-weight-bold" style="font-size: 20px;">KETERANGAN</label>
            <hr />
            <div v-html="product.content"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "vue"; // computed dan onMounted
import { useStore } from "vuex"; // store Vuex
import { useRoute, useRouter } from "vue-router"; // vue router
import Swal from "sweetalert2";

export default {
  setup() {
    //vue route
    const route = useRoute();

    //vue router
    const router = useRouter();

    //store vuex
    const store = useStore();

    //onMounted akan menjalankan action "getDetailProduct" di module "product" Vuex
    onMounted(() => {
      store.dispatch("product/getDetailProduct", route.params.slug);
    });

    //computed properti digunakan untuk mendapatkan data detail product dari state "product" di module "product" Vuex
    const product = computed(() => {
      return store.state.product.product;
    });

    const carts = computed(() => {
      return store.getters["cart/getCart"];
    });

    /**
     * function addToCart
     */
    function addToCart(product_id, price, weight) {
      //check token terlebih dahulu
      const token = store.state.auth.token;

      if (!token) {
        return router.push({ name: "login" });
      }

      //panggil action addToCart di module cart
      store.dispatch(
        "cart/addToCart",
        {
          product_id: product_id,
          price: price,
          weight: weight,
          quantity: 1,
        },

        Swal.fire({
          toast: true,
          icon: "success",
          position: "top-end",
          title: "Informasi",
          text: "Barang Telah Ditambahkan",
          background: "#fffff",
          showConfirmButton: true,
          confirmButtonColor: "#6A9722",
          timer: 3000,
        })
      );
    }

    return {
      route,
      router,
      store,
      product,
      carts,
      addToCart,
    };
  },
};
</script>
