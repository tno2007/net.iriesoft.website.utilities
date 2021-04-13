<template>
  <transition-group
    name="expand"
    @enter="enter"
    @after-enter="afterEnter"
    @leave="leave"
  >
    <slot />
  </transition-group>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "TransitionGroupExpand",
  setup: () => {
    const enter = (element: HTMLElement) => {
      const width = getComputedStyle(element).width;

      element.style.width = width;
      element.style.position = "absolute";
      element.style.visibility = "hidden";
      element.style.height = "auto";

      const height = getComputedStyle(element).height;

      element.style.width = "";
      element.style.position = "";
      element.style.visibility = "";
      element.style.height = "0";

      // Force repaint to make sure the
      // animation is triggered correctly.
      getComputedStyle(element).height;

      // Trigger the animation.
      // We use `requestAnimationFrame` because we need
      // to make sure the browser has finished
      // painting after setting the `height`
      // to `0` in the line above.
      requestAnimationFrame(() => {
        element.style.height = height;
      });
    };

    const afterEnter = (element: HTMLElement) => {
      // eslint-disable-next-line no-param-reassign
      element.style.height = `auto`;
    };

    const leave = (element: HTMLElement) => {
      const { height } = getComputedStyle(element);
      // eslint-disable-next-line no-param-reassign
      element.style.height = height;
      // Force repaint to make sure the
      // animation is triggered correctly.
      // eslint-disable-next-line no-unused-expressions
      getComputedStyle(element).height;
      requestAnimationFrame(() => {
        // eslint-disable-next-line no-param-reassign
        element.style.height = "0";
      });
    };

    return {
      enter,
      afterEnter,
      leave
    };
  }
});
</script>

<style lang="scss" scoped>
* {
  will-change: height;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}
.expand-enter-active,
.expand-leave-active {
  transition: height 0.4s ease-in-out;
  overflow: hidden;
}

.expand-enter,
.expand-leave-to {
  height: 0;
}
</style>