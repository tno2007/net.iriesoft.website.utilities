import Vue from "vue";

declare module "vue/types/vue" {
  interface Vue {
    $formulate: any;
    $bvToast: any;
  }
}
