<template>
  <div class="time-converter">
    <div class="px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
      <h1 class="display-4">Formulate</h1>
      <p class="lead">JSON form test</p>
    </div>

    <FormulateForm
      ref="refForm1"
      name="login"
      class="login-form"
      v-model="data.formValues"
      @submit="submitHandler"
    >
      <h2 class="form-title">Register</h2>
      <p>
        You can place any elements you want inside a form. The inputs themselves
        can even be deeply nested.
      </p>
      <FormulateInput
        name="name"
        type="text"
        label="Your name"
        placeholder="Your name"
        validation="required"
        error-behavior="submit"
      />
      <FormulateInput
        name="email"
        type="email"
        label="Email address"
        placeholder="Email address"
        validation="required|email"
        error-behavior="submit"
      />
      <div class="double-wide">
        <FormulateInput
          name="password"
          type="password"
          label="Password"
          placeholder="Your password"
          validation="required"
          error-behavior="submit"
        />
        <FormulateInput
          name="password_confirm"
          type="password"
          label="Confirm your password"
          placeholder="Confirm password"
          validation="required|confirm"
          validation-name="Confirmation"
        />
      </div>
      <FormulateInput type="submit" label="Register" />
      <pre class="code" v-text="data.formValues" />
    </FormulateForm>
    <button @click="clicky">Clicky</button>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  inject,
  reactive,
  ref,
} from "@vue/composition-api";

export default defineComponent({
  name: "Formulate1",
  //inject: ["formulate"],
  setup(props, context) {
    const refForm1 = ref(null);

    const root = getCurrentInstance(); // same as ctx.root in component

    //const f: any = inject("vueFormulate");

    //console.log("f", f.handle());

    const data = reactive({
      formValues: {},
    });

    const clicky = () => {
      //console.log("context", context);
      //console.log("refForm1", refForm1);
      //f.submit();
      //formulate.
    };

    const submitHandler = () => {
      console.log("context", context);

      const err = {
        inputErrors: { name: "This address doesn’t appear valid" },
        formErrors: ["Also, this form isn’t hooked up yet"],
      };

      //f.handle(err, "login");
    };

    return {
      refForm1,
      data,
      clicky,
      submitHandler,
    };
  },
});
</script>

<style lang="scss">
@import "../../node_modules/@braid/vue-formulate/themes/snow/snow.scss";
</style>