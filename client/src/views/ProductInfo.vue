<template>
  <div>
    <ApolloQuery
      :query="require('../graphql/productInfo.gql')"
      :variables = "{ id }"
    >
      <template slot-scope="{ result: { loading, error, data } }">
        <!-- Result -->
      <el-row :gutter="20">
        <el-col :span="14">
          <div class="grid-content bg-purple">
            <img v-bind:src="data.product.imageURL" alt="yolo" class="infoImg">
          </div>
        </el-col>
        <el-col :span="10"><div class="grid-content bg-purple"></div></el-col>

      </el-row>
      <p>{{data.product.imageURL}}</p>
        <p> {{data.product.title}} </p>
        <p>{{data.product.description}}</p>
        <p>{{data.product.price}}</p>
        <p>In Stock: {{data.product.stock}}</p>
      </template>
    </ApolloQuery>

    <p> Your product has an ID of {{productId}} </p>
  </div>
</template>

<style>
  div img.infoImg {
    margin: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .el-row {
    margin-bottom: 20px;
    padding: 0px 30px;
    height: 500px;
  }
  .el-col {
    border-radius: 4px;
    height: 100%;

  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    height:100%;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

</style>


<script>

export default {
  name: 'productInfo',
  props: ['productId'],
  data: function() {
    return {
    id: {id: this.productId}
    }

  }
 

}
</script>
