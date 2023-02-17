<template>
    <div class="article">
        <div class="article-cover"></div>
        <div class="article-info">
            <div class="article-title">{{article.title}}</div>
            <div class="article-content">{{article.content}}</div>
            <div class="article-author"></div>
            <div class="article-time">{{article.time}}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Article',
    //接收父组件传的对象
    props: {
        article: Object,
    },

}
</script>
<style lang="scss" scoped>
.article{
    width: 400px;
    display: flex;
    padding: 10px 0;
    border-bottom: 1px solid #dbdbdb;   
}
.article-title{
    font-size: 16px;
    font-weight: 500;
    color: #42b983;
    text-align: justify;
}
.article-content .article-time .article-author{
    font-size: 14px;
}
</style>