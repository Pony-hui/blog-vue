<template>
  <div class="dashboard-container">
    <!-- <h1>title</h1> -->
    <!-- <article-component v-for="article in articleList" :key="article.title" :article="article"></article-component> -->
  </div>
</template>
<script> 
  import ArticleComponent from "@/components/ArticleComponent";
  export default {
    components: { ArticleComponent },
    name: 'dashboard',
    data() {
      return {
          articleList: [
          {
            title: '首发！',
            time: '2020-02-02 14:40:00',
            content:
              ''
          },
          {
            title: '',
            time: '2020-02-01 18:51:00',
            content:
              ''
          }
        ]
      }
    },
    methods : {

    }
  }
</script>
<style scoped>

</style>
