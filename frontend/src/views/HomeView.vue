<script setup>
import ProductCard from '@/components/ProductCard.vue';
import { onMounted } from 'vue'
import axios from 'axios'


import { useProductsStore } from '@/stores/productsStore';
const productsStore = useProductsStore();

import { ref } from 'vue'
let productsJSON = ref([])

onMounted(async () => {
  const products = await axios.get("http://localhost:3000/products")
  productsStore.products = products.data
  productsJSON.value = productsStore.products
})

const productName = ref('')
const productStars = ref(0)
const productReviews = ref(0)
const productSale = ref(0)
const productPrice = ref(0)

import { v4 as uuidv4 } from 'uuid';

async function submitForm() {
  productsStore.addProduct(uuidv4(), productName.value, productStars.value, productReviews.value, productSale.value, productPrice.value)
  productName.value = ''
  productPrice.value = 0
  productStars.value = 0
  productReviews.value = 0
  productSale.value = 0
}

function deleteProduct(productId) {
  productsStore.deleteProduct(productId)
}

</script>
<template>
  <div class="p-10 flex flex-col items-center justify-center">
    <h1 class="text-3xl font-bold mb-5">Add a new product</h1>
    <form @submit.prevent="submitForm" class="mx-5 w-96 grid grid-cols-2 gap-4">
      <div>
        <label for="productName">Product Name:</label>
        <input type="text" id="productName" class="border" v-model="productName">
      </div>
      <div>
        <label for="productStars">Product Stars:</label>
        <input type="number" id="productStars" class="border" v-model="productStars">
      </div>
      <div>
        <label for="productReviews">Product Reviews:</label>
        <input type="number" id="productReviews" class="border" v-model="productReviews">
      </div>
      <div>
        <label for="productSale">Product Sale:</label>
        <input type="number" id="productSale" class="border" v-model="productSale">
      </div>
      <div>
        <label for="productPrice">Product Price:</label>
        <input type="text" id="productPrice" class="border" v-model="productPrice">
      </div>
      <div class="col-span-2 flex justify-center">
        <button type="submit"
          class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-1.5 text-center mt-2">
          Submit Form
        </button>
      </div>
    </form>
  </div>

  <div>
    <p class="m-5">Products in Database:</p>
    <div v-if="productsJSON.length > 0" class="grid grid-cols-4 gap-5">
      <ProductCard v-for="product in productsJSON" :key="product.id" :product="product"
        @deleteProduct="deleteProduct" />
    </div>
    <div v-else>
      <p class="m-5">No products in database</p>
    </div>
  </div>
</template>
<style scoped></style>