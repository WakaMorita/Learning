new Vue({
    el: '#app',
    data: {
        name: "匿名"
    },
    methods: {
        help: function() {
            window.alert('氏名を入力してください')
        }
    }
});