new Vue({
    el: '#app',
    methods: {
        onsubmit: function(e) {
            if ( !confirm('送信してもいいですか？')) {
                e.preventDefault();
                return;
            }
        }
    }
});