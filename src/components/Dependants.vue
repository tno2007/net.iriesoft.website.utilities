<template>
  <div>
    <FormulateForm
      name="form"
      ref="formRef"
      v-model="data.formModel"
      :schema="data.formSchema"
      @submit="handleSubmit"
    />
    <div class="w-320">
      <div class="row justify-content-end">
        <div class="col">
          <button class="btn btn-block btn-primary">Back</button>
        </div>
        <div class="col">
          <button class="btn btn-block btn-primary" @click="next">
            Next
          </button>
        </div>
      </div>
    </div>

    <pre>{{ data }}</pre>
  </div>
</template>

<script lang="ts">
interface VueFormulateInput {
  component: string;
  type: string;
  name: string;
  label: string;
  options: string[];
  validation: string;
  errorBehavior: string;
}

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
          type: "autocomplete",
          name: "firstX",
          label: "First Xyz",
          options: ["alice", "wonderland"],
        },
        {
          type: "text",
          name: "firstName",
          label: "First name",
          validation: "required|not:kelly",
          errorBehavior: "submit",
        },
        {
          type: "text",
          name: "lastName",
          label: "Last Name",
        },
      ],
      [
        {
          component: "h3",
          children: "Dependants ",
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
          component: "div",
          class: "two-buttons d-none",
          children: [
            {
              type: "submit",
              label: "Get in touch",
            },
            {
              type: "submit",
              label: "Get in touch",
            },
          ],
        },
      ],
    ] as any[];

    const data = reactive({
      toastCounter: 0,
      currentFormIndex: 0,
      formModel: {
        firstName: "xxxxxzxz",
      },
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

    const handleSubmit = (formSubmitData: any = null) => {
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

    const next = () => {
      console.log("abc");
      context.root.$formulate.submit("form");
      //handleSubmit();
    };

    onMounted(() => {
      data.formSchema = formSchemas[data.currentFormIndex];
    });

    return {
      formRef,
      data,
      next,
      handleSubmit,
    };
  },
});
</script>

<style lang="scss">
.two-buttons {
  //margin: 10px auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  max-width: 320px;
}
.w-320 {
  margin-top: 1.5em;
  max-width: 320px;
  margin-bottom: 1.5em;
}
</style>
