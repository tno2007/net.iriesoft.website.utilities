
<template>
  <div>
    <button @click="changeFunction">Change</button>

    <br />
    <br />

    <!--

    <span>data.formSchema</span>
    <hr />
    <pre>{{ data.formSchema }}</pre>

    <span>computedFormSchema</span>
    <hr />
    <pre>{{ computedFormSchema }}</pre>

    -->

    <!--    -->

    <p>Schema form:</p>
    <hr />

    <FormulateForm
      name="form"
      ref="formRef"
      v-model="data.formModel"
      @submit="handleSubmit"
      @input="handleInput"
      :schema="computedFormSchema"
    >
    </FormulateForm>

    <!-- //FormulateInput 

    <p>FormulateInput form:</p>
    <hr />

    <FormulateForm
      name="form"
      ref="formRef"
      v-model="data.formModel"
      @submit="handleSubmit"
      @input="handleInput"
    >
      <FormulateInput
        v-for="item in computedFormSchema"
        :key="item.name"
        v-bind="item"
        :v-if="item.visible == true"
      />
    </FormulateForm>
-->
    <!--
      <FormulateForm
        name="form"
        ref="formRef"
        v-model="data.formModel"
        :schema="computedFormSchema"
        @submit="handleSubmit"
        @input="handleInput"
      />
      -->

    <div class="row">
      <div class="col">
        <button class="btn btn-primary btn-block">Prev</button>
      </div>
      <div class="col">
        <button class="btn btn-primary btn-block" @click="buttonSubmit">
          Next
        </button>
      </div>
    </div>

    <div>
      <p>&nbsp;</p>

      <span>data.formSchema</span>
      <hr />
      <pre>{{ data.formModel }}</pre>
    </div>
  </div>
</template>

<script lang="ts">
/*
* Notes:
- If you want to animate visible and invisible fields, its better to use <FormulateInput v-for> syntax
- if using the json schema prop, its easy to generate h1, h2, h3 etc fields
- show/hide animation
  - https://forum.vuejs.org/t/jquery-slidetoggle-equivalent-in-vue-js-without-adding-another-library/46954/8
  - https://jsfiddle.net/Jayesh_v/ofxh6zv7/
  - https://github.com/danieldiekmeier/vue-slide-up-down
  - https://codepen.io/danieldiekmeier/pen/YapGWq

*/
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
  computed
} from "@vue/composition-api";

import { boolify } from "../composables/useFormHelper";

import { FadeTransition, SlideYUpTransition } from "vue2-transitions";

import TransitionGroupExpand from "./TransitionGroupExpand.vue";

interface FormModel {
  criminalRecord: string | null;
  maritalStatus: string | null;
}

interface VueFormulateField {
  name?: string;
  visible?: boolean | null;
  component?: string;
  children?: any;
  type?: string;
  label?: string;
  validation?: string;
  errorBehavior?: string;
  options?: any;
  value?: any;
}

interface VueFormulatePage {
  name?: string;
  description?: string;
  fields: VueFormulateField[];
}

export default defineComponent({
  name: "Dependants",
  components: {
    FadeTransition,
    SlideYUpTransition,
    TransitionGroupExpand
  },
  setup(props, context) {
    const formRef = ref(null);

    const data = reactive({
      toastCounter: 0,
      currentFormIndex: 0,
      formModel: {
        criminalRecord: "",
        maritalStatus: ""
      },
      formSchema: [] as VueFormulateField[]
    });

    const formulatePages = reactive<VueFormulatePage[]>([]);

    const enableValidation = false;

    const page1: VueFormulatePage = {
      name: "personalDetails",
      description: "Personal details",
      fields: [
        {
          component: "h3",
          children: "Personal details (Main applicant)",
          name: "dependentsHeading"
        },
        {
          type: "text",
          name: "fullName",
          label: "Full name (as seen in passport):",
          validation: `${enableValidation ? "required" : ""}`,
          errorBehavior: "submit"
        },
        {
          type: "text",
          name: "passportNumber",
          label: "Passport number:",
          validation: `${enableValidation ? "required" : ""}`,
          errorBehavior: "submit"
        },
        {
          type: "date",
          name: "passportExpiryDate",
          label: "Passport expiry date:",
          validation: `${enableValidation ? "required" : ""}`,
          errorBehavior: "submit"
        },
        {
          type: "date",
          name: "dateOfBirth",
          label: "Date of birth:",
          validation: `${enableValidation ? "required" : ""}`,
          errorBehavior: "submit"
        },
        {
          type: "radio",
          name: "gender",
          label: "Gender:",
          validation: `${enableValidation ? "required" : ""}`,
          errorBehavior: "submit",
          options: [
            {
              value: "1",
              label: "Female"
            },
            {
              value: "2",
              label: "Male"
            }
          ]
        },
        {
          type: "radio",
          name: "criminalRecord",
          label: "Do you have a criminal record?",
          options: [
            {
              value: "true",
              label: "Yes"
            },
            {
              value: "false",
              label: "No"
            }
          ],
          value: "false",
          validation: `${enableValidation ? "required" : ""}`,
          errorBehavior: "submit"
        },
        {
          type: "text",
          name: "criminalRecordMoreDetail",
          label: "Please provide more detail:",
          validation: `${enableValidation ? "required" : ""}`,
          errorBehavior: "submit",
          visible: false
        },
        {
          type: "radio",
          name: "maritalStatus",
          label: "Please indicate your marital status:",
          options: [
            {
              value: "1",
              label: "Married"
            },
            {
              value: "2",
              label: "Single"
            },
            {
              value: "3",
              label: "Civil partner"
            },
            {
              value: "4",
              label: "Unmarried partner"
            },
            {
              value: "5",
              label: "Divorced"
            },
            {
              value: "6",
              label: "Divorced"
            }
          ],
          validation: `${enableValidation ? "required" : ""}`,
          errorBehavior: "submit"
        },
        {
          type: "radio",
          name: "inCommunity",
          label: "Are you married in the community of property?",
          options: [
            {
              value: "1",
              label: "Yes"
            },
            {
              value: "2",
              label: "No"
            }
          ]
        },
        {
          type: "radio",
          name: "seperateAssets",
          label: "Are your assets seperated?",
          options: [
            {
              value: "1",
              label: "Yes"
            },
            {
              value: "2",
              label: "No"
            }
          ],
          validation: `${enableValidation ? "required" : ""}`
        },
        {
          type: "radio",
          name: "haveMarriageRegisterCopy",
          label: "Do you hold a copy of your marriage register?",
          options: [
            {
              value: "1",
              label: "Yes"
            },
            {
              value: "2",
              label: "No"
            }
          ],
          validation: `${enableValidation ? "required" : ""}`
        },
        {
          type: "radio",
          name: "marriageForm",
          label: "Please indicate your marriage register form",
          options: [
            {
              value: "1",
              label: "DHA-30"
            },
            {
              value: "2",
              label: "DHA-BI-30"
            },
            {
              value: "3",
              label: "Other"
            }
          ],
          validation: `${enableValidation ? "required" : ""}`
        },
        {
          type: "text",
          name: "howLongHaveYouBeenResidingTogether",
          label:
            "How long have you been residing together (unmarried partner):",
          validation: `${enableValidation ? "required" : ""}`,
          errorBehavior: "submit",
          visible: false
        },
        {
          type: "text",
          name: "taxNumber",
          label: "Tax number:",
          validation: `${enableValidation ? "required" : ""}`,
          errorBehavior: "submit"
        },
        {
          type: "text",
          name: "countryOfBirth",
          label: "Country of birth:",
          validation: `${enableValidation ? "required" : ""}`,
          errorBehavior: "submit"
        },
        {
          type: "text",
          name: "nationality",
          label: "Nationality:",
          validation: `${enableValidation ? "required" : ""}`,
          errorBehavior: "submit"
        },
        {
          type: "radio",
          name: "otherNationalities",
          label: "Do you hold any other nationalities?",
          options: [
            {
              value: "1",
              label: "Yes"
            },
            {
              value: "2",
              label: "No"
            }
          ]
        },
        {
          type: "text",
          name: "otherNationalitiesMoreDetail",
          label: "Please provide more detail:",
          validation: `${enableValidation ? "required" : ""}`,
          errorBehavior: "submit",
          visible: false
        },
        {
          component: "h4",
          children: "Contact details",
          name: "contactDetailsHeading"
        },
        {
          type: "text",
          name: "emailAddress",
          label: "Email Address:",
          validation: `${enableValidation ? "required" : ""}`,
          errorBehavior: "submit"
        },
        {
          type: "text",
          name: "contactNumber",
          label: "Contact number:",
          validation: `${enableValidation ? "required" : ""}`,
          errorBehavior: "submit"
        },
        {
          type: "text",
          name: "currentResidentialAddress",
          label: "Current Residential Address:",
          validation: `${enableValidation ? "required" : ""}`,
          errorBehavior: "submit"
        }
      ]
    };

    formulatePages.push(page1);

    const formSchemasX = reactive([
      [
        {
          component: "h3",
          children: "Your dependants"
          //name: "dependentsHeading"
        },
        {
          type: "radio",
          options: {
            Spouse: "Spouse",
            Partner: "Partner",
            Parent: "Parent"
          },
          name: "typeofdependant",
          label: "Please indicate your dependant:",
          validation: "required|not:kelly",
          errorBehavior: "submit",
          "error-behaviorX": "submit"
        },
        {
          type: "text",
          name: "firstName",
          label: "First name",
          validation: "required|not:kelly",
          errorBehaviour: "submit",
          visible: false,
          key: "aa"
        },
        {
          type: "text",
          name: "lastName",
          label: "Last Name"
        },
        {
          type: "radio",
          options: [
            {
              value: true,
              label: "Yes"
            },
            {
              value: !true,
              label: "No"
            }
          ],
          name: "yesnoq",
          label: "Do you want to show an additional field?",
          validation: "required|not:kelly",
          errorBehavior: "submit"
        },
        {
          type: "text",
          name: "additionalq",
          label: "Additional field",
          visible: false
        }
      ],
      [
        {
          component: "h3",
          children: "Dependants"
        },
        {
          type: "text",
          name: "age",
          label: "Age",
          validation: "required|not:kelly",
          errorBehavior: "submit"
        },
        {
          type: "text",
          name: "dateOfBirth",
          label: "Date of birth"
        }
      ]
    ]);

    const errorHandling = {
      inputErrors: { streetAddress: "This address doesn’t appear valid" },
      formErrors: ["Also, this form isn’t hooked up yet"]
    };

    const toast = (toastPosition = "b-toaster-top-right", append = true) => {
      data.toastCounter++;
      context.root.$bvToast.toast(`Toast ${data.toastCounter} body content`, {
        title: `Toaster ${toastPosition}`,
        toaster: toastPosition,
        solid: true,
        appendToast: append
      });
    };

    const handleSubmit = (formSubmitData: any) => {
      //console.log("formSubmitData", formSubmitData);
      //console.log("formRef.value", formRef.value);
      //context.root.$formulate.handle(errorHandling, "handleSubmit");

      // if validation passes, the following is run....

      if (data.currentFormIndex === 0) {
        ++data.currentFormIndex;
        if (!formulatePages[data.currentFormIndex]) {
          alert("You reached the end of demo");
          return;
        }
        data.formSchema = formulatePages[data.currentFormIndex].fields;
      } else {
        console.log("form submitted");
        toast();
      }
    };

    const handleInput = (formData: any) => {
      // update visibility
      data.formSchema.forEach((schemaField, index) => {
        switch (schemaField.name) {
          case "criminalRecordMoreDetail":
            schemaField.visible = boolify(data.formModel.criminalRecord);
            break;
          case "howLongHaveYouBeenResidingTogether":
            schemaField.visible = data.formModel.maritalStatus === "4";
            break;
          default:
            break;
        }
      });
    };

    const buttonSubmit = () => {
      //console.log("formRef", formRef.value);
      //const a = formRef.value.$el;
      context.root.$formulate.submit("form");
      //console.log("formRef", formRef.value);
      //console.log("context.refs", context.refs);
    };

    const computedFormSchema = computed(() => {
      return data.formSchema.filter(a => a.visible !== false);
    });

    onMounted(() => {
      data.formSchema = formulatePages[data.currentFormIndex].fields;
    });

    const change = reactive({
      state: false
    });

    const objRef = ref({
      start: change.state
    });

    const objReactive = reactive({
      start: change.state,
      fields: [
        {
          id: 1,
          value: false
        },
        {
          id: 2,
          value: change.state
        }
      ]
    });
    const changeFunction = () => {
      change.state = !change.state;
      objReactive.fields[1].value = change.state;
    };

    return {
      formRef,
      data,
      //formSchemas,
      formulatePages,
      computedFormSchema,
      handleSubmit,
      handleInput,
      buttonSubmit,
      objRef,
      objReactive,
      change,
      changeFunction
    };
  }
});
</script>

<style lang="scss">
</style>