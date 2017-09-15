<template>
  <div class="row">
    <div class="col-4 sidebar toggled">
      <slot name="formulary"></slot>
    </div>

    <div class="col-12 graphic">
      <slot name="graphic"></slot>
    </div>
  </div>
</template>

<style scoped>

.sidebar.toggled {
  display: none;
}

.sidebar {
  background: #131313;
  padding: 20px;
}

.graphic {
  padding-top: 10px;
}
</style>
