import { defineStore } from 'pinia'
import axios from "axios"

export const useProductsStore = defineStore("products", {
    state: () => {
        return  {
            products: [],
        }
    },
    actions: {
        async fetchProducts(productsData) {
            this.products = productsData
        },
        addProduct(id, name, stars, reviews, sale, price) {
            const newProduct = {
                id,
                name,
                stars,
                reviews,
                sale,
                price
            }
           if (name && stars && reviews && sale && price) {
            this.products.push(newProduct)
            axios.post("http://localhost:3000/products", newProduct, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            }
            else {
                alert("Please fill in all fields")
            }
        },
        deleteProduct(productId) {            
            const productIndex = this.products.findIndex(product => product.id === productId);
            this.products.splice(productIndex, 1);

            axios.delete("http://localhost:3000/products", {
                headers: {
                    "Content-Type": "application/json"
                },
                data: {
                    productId
                }
            })
        }
    }
})