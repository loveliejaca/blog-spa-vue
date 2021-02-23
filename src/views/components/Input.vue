<template>
  <label
    class="input"
    :class="modifier"
    :for="label"
  >
    <span v-if="getLabel !== ''" class="input__label">{{ label | capitalize }}</span>
    <input
      class="input__tag"
      :type="type"
      :id="name"
      :name="name"
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
    >
  </label>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'form-input',
  props: ['modifier', 'type', 'label', 'name', 'value'],
  computed: {
    getLabel () {
      if (_.isNull(this.label) || _.isUndefined(this.label)) {
        return ''
      }
      return this.label
    }
  }
}
</script>

<style lang="scss" scoped>
.input {
  display: block;
  width: 100%;
}
.input__label {
  display: inline-block;
  font-family: $montserrat;
  font-weight: 300;
  font-size: 18px;
  letter-spacing: 0.1em;
  margin-bottom: 5px;
  cursor: pointer;
}
.input__tag {
  display: block;
  width: 100%;
  box-sizing: border-box;
  border-radius: 0;
  border: 1px solid $color-black;
  padding: 5px 10px;
  height: 60px;
  outline: none;
}
//MODIFIER
.input--error {
  span {
    color: $color-red;
  }
  .input__tag {
    border-color: $color-red;
    color: $color-red;
  }
}
.input--post-form {
  .input__tag {
    font-size: 40px;
    font-weight: 700;
    line-height: 1.65;
    letter-spacing: 0.1em;
  }
}
</style>
