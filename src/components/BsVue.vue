<template>
  <div>
    <b-button class="mb-2" variant="primary" @click="pop">
      Show toast
    </b-button>
    <b-toast id="example-toast" title="BootstrapVue" static no-auto-hide>
      Hello, world! This is a toast message.
    </b-toast>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  inject,
  getCurrentInstance,
} from "@vue/composition-api";
export default defineComponent({
  name: "BsVue",
  setup(props, context) {
    const pop = () => {
      context.root.$bvToast.show("example-toast");
      //b.$bvToast.show("example-toast");
      //t.show("example-toast");
      //console.log("f", getCurrentInstance());
      //console.log("bsv", bsv);
      //console.log("bsvToast", bsvToast);
    };

    return {
      pop,
    };
  },
});
</script>

<style>
</style>