<template>
  <div>
    <div>
      <input
        type="file"
        name="file"
        id="file"
        ref="refUpload"
        @change="handleFileChange"
      />
      <button class="btn btn-primary" @click="handleFileUpload">
        Upload files
      </button>
    </div>

    <div class="card">
      <div class="card-header">
        Upload
      </div>
      <ul class="list-group list-group-flush">
        <li
          class="list-group-item"
          v-for="(file, index) in data.fileList"
          :key="`a-${index}`"
        >
          <span>{{ file.percentage == 100 ? "success" : "primary" }}</span
          ><br />
          <span>{{ file.name }}</span
          ><br />
          &nbsp;
          <strong>({{ formatNumber(file.size / 1024) }} KB)</strong>
          <b-progress
            show-progress
            :animated="file.percentage == 100 ? false : true"
            :value="file.percentage"
            :max="100"
            :variant="file.percentage === 100 ? 'success' : 'primary'"
          ></b-progress>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
} from "@vue/composition-api";
import axios from "axios";

interface FileForUploadInterface {
  name: string;
  size: number;
  percentage: number;
  ref: File;
}

export default defineComponent({
  name: "Upload",
  setup(props, context) {
    const refUpload = ref<HTMLInputElement>();

    const data = reactive({
      fileList: [] as FileForUploadInterface[],
      connection: null,
    });

    const handleFileChange = () => {
      //const target = event.target as HTMLInputElement;
      //const files = target.files;

      // initialize file list
      data.fileList = [];

      // null checks
      if (!refUpload || !refUpload.value) return [];

      // store selected files
      const selectedFiles = refUpload.value.files;

      // null checks
      if (!selectedFiles) return selectedFiles;

      for (let i = 0; i < selectedFiles.length; i++) {
        const file = {
          name: selectedFiles[i].name,
          size: selectedFiles[i].size,
          percentage: 0,
          ref: selectedFiles[i],
        };

        data.fileList.push(file);
      }
    };

    const handleFileUpload = () => {
      const formData = new FormData();

      // null checks
      if (!refUpload || !refUpload.value) return [];

      // store selected files
      const selectedFiles = refUpload.value.files;

      // build form data
      data.fileList.forEach((file, index) => {
        formData.append("files[" + index + "]", file.ref);
      });

      console.log("formData", formData);

      axios
        .post("http://localhost:25108/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          console.log("SUCCESS!!");

          context.root.$bvToast.toast("Successfully uploaded", {
            variant: "success",
          });
        })
        .catch((ajaxError) => {
          console.log("FAILURE!!");

          console.log(ajaxError.response.data);

          let message = "";
          if (ajaxError.response && ajaxError.response.data) {
            message = ajaxError.response.data.error.message;
          }

          context.root.$bvToast.toast("Upload failed. " + message, {
            variant: "danger",
          });
        });
    };

    const pickFiles = () => {
      if (!refUpload.value) return;
      const fileUpload: HTMLInputElement = refUpload.value;
      fileUpload.click();
    };

    const round = (value: number) => {
      if (!value) return "";
      try {
        return Math.round(10 * value) / 10;
      } catch (e) {
        return "0.0";
      }
    };

    function formatNumber(value: number, decimals = 2) {
      let decimalPart;

      const array = Math.floor(value)
        .toString()
        .split("");
      let index = -3;
      while (array.length + index > 0) {
        array.splice(index, 0, ".");
        index -= 4;
      }

      if (decimals > 0) {
        decimalPart = value.toFixed(decimals).split(".")[1];
        return array.join("") + "," + decimalPart;
      }
      return array.join("");
    }

    onMounted(() => {
      const connection = new HubConnectionBuilder()
        .withUrl("http://localhost:25108/broadcast")
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Information)
        .build();

      connection.on(
        "UploadProgressFeedback",
        (
          fileName: string,
          progressBytesRead: number,
          progressPercentage: number
        ) => {
          console.log(`${fileName}: ${progressPercentage}`);

          const file = data.fileList.find((a) => {
            return a.name == fileName;
          });

          if (!file) {
            console.log("not found: " + fileName);
            return;
          }

          file.percentage = progressPercentage;
        }
      );

      connection
        .start()
        .then(() => {
          console.log("connected to hub");
        })
        .catch((connectionError) => {
          return console.error(connectionError.toString());
        });
    });

    return {
      refUpload,
      data,
      handleFileChange,
      handleFileUpload,
      round,
      formatNumber,
    };
  },
});
</script>

<style></style>
