

<template>
  <div>
    <pre>{{ data }}</pre>
    <FormulateForm
      class="order-form"
      name="order"
      @submit="handleSubmit"
      ref="formRef"
      :errors="data.formErrors"
      :hasErrors="data.formHasErrors"
      :isValid="data.isValid"
    >
      <FormulateInput
        ref="inputRef"
        type="text"
        name="streetAddress"
        label="Street Address"
        validation="required"
        error-behavior="submit"
      />
      <FormulateInput type="text" name="city" label="City" />
      <FormulateErrors />
      <FormulateInput type="submit" label="Submit Order" />
    </FormulateForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "@vue/composition-api";
export default defineComponent({
  name: "Formulate2",
  setup(props, context) {
    const formRef = ref(null);
    const inputRef = ref(null);

    const errorHandling = {
      inputErrors: { streetAddress: "This address doesn’t appear valid" },
      formErrors: ["Also, this form isn’t hooked up yet"],
    };
    const handleSubmit = (formData: any) => {
      //console.log("formData", formData);
      console.log("formRef", formRef);
      console.log("inputRef", inputRef);
      //context.root.$formulate.handle(errorHandling, "handleSubmit");
    };

    const data = reactive({
      formErrors: {},
      formHasErrors: false,
      isValid: false,
    });

    const formModel = {};

    const formSchema = {};

    return {
      formRef,
      inputRef,
      data,
      handleSubmit,
      formModel,
      formSchema,
    };
  },
});
</script>