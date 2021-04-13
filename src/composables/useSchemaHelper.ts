import { onMounted, reactive, onActivated } from "@vue/composition-api";

export default function useUserRepositories() {
  const data = reactive({
    var1: false,
  });

  //const func1 = (event: any) => {};

  //onActivated(() => {});

  //onMounted(() => {});

  return {
    data,
    //func1,
  };
}
