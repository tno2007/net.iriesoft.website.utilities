<template>
  <div>
    <FormulateForm
      name="form"
      ref="formRef"
      v-model="data.formModel"
      :schema="data.formSchema"
      @submit="handleSubmit"
    />
    <pre>{{ data }}</pre>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
} from "@vue/composition-api";
export default defineComponent({
  name: "Dependants",
  setup(props, context) {
    const formRef = ref(null);

    const formSchemas = [
      [
        {
          component: "h3",
          children: "Dependants",
        },
        {
          type: "text",
          name: "firstNmae",
          label: "First name",
          validation: "required|not:kelly",
          errorBehavior: "submit",
          "error-behaviorX": "submit",
        },
        {
          type: "text",
          name: "lastName",
          label: "Last Name",
        },
        {
          type: "submit",
          label: "Next",
        },
      ],
      [
        {
          component: "h3",
          children: "Dependants",
        },
        {
          type: "text",
          name: "age",
          label: "Age",
          validation: "required|not:kelly",
          errorBehavior: "submit",
        },
        {
          type: "text",
          name: "dateOfBirth",
          label: "Date of birth",
        },
        {
          type: "submit",
          label: "Get in touch",
        },
      ],
    ] as any[];

    const data = reactive({
      toastCounter: 0,
      currentFormIndex: 0,
      formModel: {},
      formSchema: [],
    });

    const errorHandling = {
      inputErrors: { streetAddress: "This address doesn’t appear valid" },
      formErrors: ["Also, this form isn’t hooked up yet"],
    };

    const toast = (toastPosition = "b-toaster-top-right", append = true) => {
      data.toastCounter++;
      context.root.$bvToast.toast(`Toast ${data.toastCounter} body content`, {
        title: `Toaster ${toastPosition}`,
        toaster: toastPosition,
        solid: true,
        appendToast: append,
      });
    };

    const handleSubmit = (formSubmitData: any) => {
      //console.log("formSubmitData", formSubmitData);
      //console.log("formRef.value", formRef.value);
      //context.root.$formulate.handle(errorHandling, "handleSubmit");

      // if validation passes, the following is run....

      if (data.currentFormIndex === 0) {
        ++data.currentFormIndex;
        data.formSchema = formSchemas[data.currentFormIndex];
      } else {
        console.log("form submitted");
        toast();
      }
    };

    onMounted(() => {
      data.formSchema = formSchemas[data.currentFormIndex];
    });

    return {
      formRef,
      data,
      handleSubmit,
    };
  },
});
</script>

<style>
</style>