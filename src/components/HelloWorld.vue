<template>
  <div class="">
    <h3>{{ msg }}</h3>
    <p></p>
    <p>To do:</p>
    <ul>
      <li>- add back and forward buttons to form</li>
      <li>
        - choose which will be bestm a custom nav component or nav buttons part
        of the form
      </li>
      <li>- add the dependant children repeatable to the form</li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "HelloWorld",
  props: {
    msg: String,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
