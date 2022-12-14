new Vue({
    el: '#app',
    data: {
        path: './images/wings.jpg'
    },
    methods: {
        onerror: function() {
            this.path = './images/noimage.jpg'; // ./はカレントディレクトリを明示したもの省略してimages/noimage.jpgでも同じ
        }
    }
});