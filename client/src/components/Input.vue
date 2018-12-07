<template>
  <input
    v-bind="$props"
    class="w-full p-3 border border-grey"
    @input="handleInput"
  />
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
