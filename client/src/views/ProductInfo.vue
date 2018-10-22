<template>
    <p> Your product is called {{productName}} and its price is {{productPrice}} </p>
</template>







<script>
export default {
  name: 'productInfo',
  props: ['productName', 'productPrice']
}
</script>
