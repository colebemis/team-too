import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/shop",
      component: () => import("./views/Shop.vue"),
    },
    {
      path: "/product/:id",
      component: () => import("./views/Product.vue"),
      props: true,
    },
    {
      path: "/cart",
      component: () => import("./views/Cart.vue"),
    },
    {
      path: "/checkout",
      component: () => import("./views/Checkout.vue"),
    },
    {
      path: "/confirmation/:id",
      component: () => import("./views/Confirmation.vue"),
    },
    {
      path: "/login",
      component: () => import("./views/Login.vue"),
    },
    {
      path: "/admin/orders",
      component: () => import("./views/Orders.vue"),
    },
    {
      path: "/admin/order/:id",
      component: () => import("./views/Order.vue"),
    },
    {
      path: "/admin/inventory",
      component: () => import("./views/Inventory.vue"),
    },
    {
      path: "/admin/product/:id",
      component: () => import("./views/EditProduct.vue"),
    },
    {
      path: "/admin/accounts",
      component: () => import("./views/Accounts.vue"),
    },
    {
      path: "/admin/info",
      component: () => import("./views/EditSiteInfo.vue"),
    },
  ],
});
