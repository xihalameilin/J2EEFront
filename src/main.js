// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import axios from 'axios'
import '../static/css/style.css'

Vue.use(iView);

Vue.config.productionTip = false

Vue.prototype.$http=axios

Vue.prototype.$setCookie=function setCookie(cname,cvalue,exmins){
  var d = new Date();
  d.setTime(d.getTime()+(exmins*60*1000));
  var expires = "expires="+d.toGMTString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}

Vue.prototype.$getCookie=function getCookie(cname){
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) {
    var c = ca[i].trim();
    if (c.indexOf(name)==0) {
      return c.substring(name.length,c.length);
    }
  }
  return "";
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
