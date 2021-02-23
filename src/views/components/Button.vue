<template>
  <button class="btn" :class="modifier" :type="setType(type)">
    <span class="btn__icon"></span>
    <span class="btn__text">{{ text }}</span>
  </button>
</template>

<script>
export default {
  name: 'app-button',
  props: ['modifier', 'text', 'type', 'state'],
  methods: {
    setType (type) {
      if (typeof type === 'undefined' || type === '') return 'button'
      return type
    }
  }
}
</script>

<style lang="scss" scoped>
.btn {
  position: relative;
  display: inline-block;
  cursor: pointer;
  min-width: 340px;
  background-color: $color-black;
  outline: none;
  border: 0;
  padding: 23px 0;
  transition: background $duration $easing;
  box-sizing: border-box;
  color: $color-black;

  &:hover {
    background-color: $color-black-hover;
  }
}
.btn__text {
  display: inline-block;
  text-align: center;
  font-family: $montserrat;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: $color-white;
}
.btn__icon {
  display: inline-block;
}
.btn--fluid {
  width: 100%;
}
.btn--basic {
  display: inline-block;
  background-color: transparent;
  border: 0;
  .btn__text {
    font-family: $montserrat;
    font-size: 18px;
    color: $color-black;
  }
}
.btn--comment-submit {
  min-width: 210px;
}

$states: ('loading', transparentize($color-black, 0.2)),
  ('warning', $color-orange),
  ('info', $color-teal),
  ('error', $color-red),
  ('success', $color-green);

@each $state, $value in $states {
  .btn--#{$state} {
    background-color: $value;

    &:hover {
      background-color: transparentize($value, 0.2)
    }
  }
  .btn--disabled {
    background-color: transparentize($color-black, 0.2);
    cursor: none;
    pointer-events: none;

    .btn__text {
      color: transparentize($color-white, 0.2);
    }
  }

  .btn--#{$state}.btn--inverse {
    background-color: transparent;
    border: 1px solid $value;
    transition: border $duration $easing, background $duration $easing;

    .btn__text {
      color: $value;
      transition: color $duration $easing;
    }

    &:hover {
      border-color: transparentize($value, 0.2);
      .btn__text {
        color: transparentize($value, 0.2);
      }
    }
  }
  .btn--#{$state}.btn--inverse.btn--disabled {
    border-color: transparentize($value, 0.2);
    cursor: none;
    pointer-events: none;

    .btn__text {
      color: transparentize($value, 0.2);
    }
  }
}
</style>
