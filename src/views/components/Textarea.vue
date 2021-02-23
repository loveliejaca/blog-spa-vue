<template>
  <textarea
    class="textarea"
    :class="modifier"
    :id="name"
    :name="name"
    v-bind:value="value"
    v-on:input="$emit('input', $event.target.value)"
  ></textarea>
</template>

<script>
export default {
  name: 'form-textarea',
  props: ['modifier', 'name', 'value']
}
</script>

<style lang="scss" scoped>
.textarea {
  display: block;
  width: 100%;
  font-family: $montserrat;
  font-weight: 300;
  font-size: 18px;
  letter-spacing: 0.1em;
  cursor: pointer;
  box-sizing: border-box;
  border-radius: 0;
  border: 1px solid $color-black;
  padding: 5px 10px;
  height: 60px;
  outline: none;
  margin-bottom: 5px;
  resize: none;
}
//MODIFIER
.textarea--dirty {
  border-color: $color-black;
  color: $color-black;
}
.textarea--error {
  border-color: $color-red;
  color: $color-red;
}
.textarea--comment-form {
  font-size: 19px;
  font-weight: 300;
  line-height: 1.65;
  letter-spacing: 0.1em;
  min-height: 200px;
  padding: 40px;
  color: $color-black;

  &::placeholder {
    font-size: 18px;
    font-style: italic;
    color: transparentize($color-black, 0.5);
  }
}
.textarea--post-form {
  font-size: 40px;
  font-weight: 700;
  line-height: 1.65;
  letter-spacing: 0.1em;
  min-height: 394px;
}
.textarea--title {
  font-size: 40px;
  font-weight: 600;
  min-height: 150px;
  padding: 12px 20px;
  line-height: 1.6;

  &::placeholder {
    font-size: 40px;
    font-weight: 600;
    color: transparentize($color-black, 0.5);
  }
}
.textarea--new-form {
  min-height: 394px;
  padding: 18px 20px;

  &::placeholder {
    font-size: 18px;
    font-weight: 300;
    color: $color-black;
  }
}
</style>
