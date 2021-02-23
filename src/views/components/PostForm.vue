<template>
  <div class="post__wrap">
    <UpdatePostForm
      v-if="edit"
      :post="post"
      @toggle="$emit('toggle')"
      @save="$emit('save')"
    />
    <NewPostForm v-else />
  </div>
</template>

<script>
import UpdatePostForm from './UpdatePostForm'
import NewPostForm from './NewPostForm'

export default {
  name: 'post-form',
  props: ['post', 'edit'],
  components: {
    UpdatePostForm,
    NewPostForm
  }
}
</script>
