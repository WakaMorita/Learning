Vue.component('my-hello',{
    // プロパティを定義
    props: ['yourName'],
    template: '<div>こんにちは、<slot>ゲスト</slot>さん！</div>'
})

new Vue({
    el: '#app',
});