<template>
  <select
    v-bind="$props"
    class="appearance-none w-full p-3 bg-white border border-grey rounded-none"
    @input="handleInput"
  >
    <slot></slot>
  </select>
</template>
<script>
import Vue from "vue";

export default Vue.extend({
  methods: {
    handleInput (event) {
      this.$emit('input', event.target.value)
    }
  }
});
</script>
