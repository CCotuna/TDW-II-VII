<script setup>
defineProps({
    product: Object
})

defineEmits(["deleteProduct"])
</script>
<template>

    <div class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
        <div class="flex justify-between">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">{{ product.name }}</h5>
            <!-- delete Icon -->
            <button @click="$emit('deleteProduct', product.id)" class="cursor-pointer"><span
                    class="text-gray-400 text-md">&#10006;</span></button>
        </div>
        <p class="font-normal text-gray-700">{{ product.stars }} stars</p>
        <p class="font-normal text-gray-700">{{ product.reviews }} reviews</p>
        <p class="font-normal text-gray-700"><span class="line-through">${{ product.sale }}</span> + ${{ product.price
            }}</p>
    </div>

</template>
<style scoped></style>