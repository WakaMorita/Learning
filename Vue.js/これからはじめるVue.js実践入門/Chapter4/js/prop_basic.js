Vue.component('my-hello',{
    // プロパティを定義
    props: ['yourName'],
    template: '<div>こんにちは、{{ yourName }}さん！</div>'
})

new Vue({
    el: '#app'
});