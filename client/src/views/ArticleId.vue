<template>
  <div id="articleId">
    <article>
      <div id="article-main"></div>
    </article>
  </div>
</template>

<script>
export default {
  name: "ArticleId",
  async mounted() {
    let { data } = await this.$axios({
      method: "post",
      url: "/art/address",
      data: {
        _id: this.$route.params.id,
      },
    });
    if (data.code) {
      return this.$message.error("文章id错误，查询失败");
    }
    this.$nextTick(() => {
      this.clearContent();
      $.get(this.baseURL + data.data, (md) => {
        editormd.markdownToHTML("article-main", {
          markdown: md,
        });
      });
    });
  },
  methods: {
    clearContent() {
      const content = document.querySelector("#article-main");
      content.innerHTML = "";
    },
  },
};
</script>

<style lang="less" scoped>
</style>