// MyHelloコンポーネントの本体
let MyHello = {
    template: '<div>こんにちは、Vue.js！</div>'
};

new Vue({
    el: '#app',
    // コンポーネントをローカル登録
    components: {
        'my-hello': MyHello
    }
  });