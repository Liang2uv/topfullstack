<template>
  <div>
    <avue-crud
      v-if="option.column"
      :data="data.data"
      :option="option"
      :page.sync="page"
      @row-save="save"
      @row-update="update"
      @row-del="remove"
      @on-load="changePage"
      @sort-change="sortChange"
      @search-change="searchChange"
    ></avue-crud>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class ResourceCrud extends Vue {
  @Prop(String) resource: string | undefined;
  data = {};
  option: any = {};
  page: any = {
    pageSize: 10,
    pageSizes: [10, 20, 30],
    total: 0,
  };
  query: any = {};
  async changePage({ pageSize = 10, currentPage = 1 }) {
    this.query.page = currentPage;
    this.query.limit = pageSize;
    this.fetch();
  }
  async sortChange({ prop = "", order = "" }) {
    if (!order) {
      this.query.sort = null;
    } else {
      this.query.sort = {
        [prop]: order === "ascending" ? 1 : -1,
      };
    }
    this.fetch();
  }
  async searchChange(where: any, done: () => void) {
    for (const key in where) {
      const field = this.option.column.find(
        (v: { prop: any }) => v.prop === key
      );
      if (field.regex) {
        where[key] = { $regex: where[key] };
      }
    }
    this.query.where = where;
    done();
    this.fetch();
  }
  async fetch() {
    const res = await this.$http.get(`${this.resource}`, {
      params: {
        query: this.query,
      },
    });
    this.page.total = res.data.total;
    this.data = res.data;
  }
  async fetchOption() {
    const res = await this.$http.get(`${this.resource}/option`);
    this.option = res.data;
  }
  created() {
    this.fetch();
    this.fetchOption();
  }
  async save(row: any, done: any) {
    const data = JSON.parse(JSON.stringify(row))
    data.cover = row.cover.length ? row.cover[0].value : null
    await this.$http.post(`${this.resource}`, data);
    this.$message.success("创建成功");
    this.fetch();
    done();
  }
  async update(row: any, index: any, done: any) {
    const data = JSON.parse(JSON.stringify(row));
    delete data.$index;
    await this.$http.put(`${this.resource}/${row._id}`, data);
    this.$message.success("更新成功");
    this.fetch();
    done();
  }
  remove(row: { _id: any }) {
    this.$confirm("是否删除", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(async () => {
        await this.$http.delete(`${this.resource}/${row._id}`);
        this.fetch();
        this.$message.success("删除成功");
      })
      .catch(() => {
        this.$message.info("您已取消操作");
      });
  }
}
</script>

<style></style>
