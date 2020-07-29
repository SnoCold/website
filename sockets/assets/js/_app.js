import Vue from "vue";

////////////////////////////////////////////////////////////////////////////////
// FILE MARKER - PROTOTYPES ////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

let conf = process.env.conf; // This comes from webpack.config.js
Vue.prototype.$conf = conf;

////////////////////////////////////////////////////////////////////////////////
// FILE MARKER - COMPONENTS ////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

import VueAppRoot from "/sockets/vue/app.vue";

////////////////////////////////////////////////////////////////////////////////
// FILE MARKER - FILTERS ///////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

import MarkdownIt from "markdown-it";
const markdownIt = new MarkdownIt();
Vue.filter('markdown-it', function(value) {
  return markdownIt.render(value);
});

////////////////////////////////////////////////////////////////////////////////
// FILE MARKER - ROUTER ////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

import VueRouter from "vue-router";
Vue.use(VueRouter);
import router from "/sockets/assets/js/router.js";

////////////////////////////////////////////////////////////////////////////////
// FILE MARKER - VUE APP INITIALIZATION ////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

window.app = new Vue({
  el: "#vue_app_mount",
  components: {
    VueAppRoot
  },
  router: router,
});
