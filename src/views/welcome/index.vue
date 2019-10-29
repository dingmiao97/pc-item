<template>
  <div class="containe">
    <img class="imgs" src="../../assets/welcome.jpg" alt />
  </div>
</template>

<script>
export default {
  created () {
    this.$axios
      .get('articles')
      .then(res => {
        console.log(res.data)
      })
      .catch(() => {
        console.log(new Error('err'))
      })
  }
}
</script>

<style>
.imgs {
  margin: 0 auto;
  display: block;
}
</style>
