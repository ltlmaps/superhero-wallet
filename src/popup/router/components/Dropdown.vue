<template>
  <ae-dropdown direction="left" class="custom-dropdown">
    <div slot="button">
      <slot name="button"></slot>
      <ae-icon name="left-more" />
    </div>
    <slot></slot>
  </ae-dropdown>
</template>

<style scoped>
.ae-dropdown-button {
  width: auto !important;
}
</style>
