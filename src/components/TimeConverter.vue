<template>
  <div class="time-converter">
    <div class="px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
      <h1 class="display-4">Time converter</h1>
      <p class="lead">Convert HH:MM:SS time to seconds</p>
    </div>

    <pre
      >{{ data }}
    </pre>

    <div class="form">
      <div class="form-group">
        <label for="exampleInputEmail1">HH:mm:ss:</label>
        <input
          type="text"
          class="form-control"
          v-mask="'##:##:##'"
          v-model="data.time"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Seconds:</label>
        <input type="text" class="form-control" readonly v-model="seconds" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from "@vue/composition-api";

export default defineComponent({
  components: {},
  setup(props, context) {
    const data = reactive({
      time: "00:00:00",
      //seconds: computed(() => parse(data.time, "HH:mm:ss", new Date())),
    });

    const seconds = computed(() => {
      const hours = parseInt(data.time.substr(0, 2));
      const minutes = parseInt(data.time.substr(3, 2));
      const seconds = parseInt(data.time.substr(6, 2));

      if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
        return "";
      }

      const hoursAsSeconds = hours * 60 * 60;
      const minutesAsSeconds = minutes * 60;

      return hoursAsSeconds + minutesAsSeconds + seconds;
    });

    return {
      data,
      seconds,
    };
  },
});
</script>

<style>
</style>