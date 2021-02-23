<template>
  <div class="modal">
    <div class="modal__overlay">
      <div class="modal__inner container">
        <slot name="form" @close="$emit('close')" @login="$emit('login')" @register="$emit('register')"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modal'
}
</script>

<style lang="scss" scoped>
.modal {
  display: table;
  vertical-align: middle;
  position: fixed;
  top: 104px;
  left: 0;
  width: 100%;
  height: 100%;
  bottom: 0;
  background-color: $color-white;
  z-index: $z-max + 2;
}
.modal__overlay {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
.modal__inner {
  display: block;
  margin: -208px auto 0;
  text-align: left;
}
</style>
