let app = new Vue({
    el: '#app',
    data: {
        author: {
            name: '山田'
        }
    },
    created: function() {
        let that = this;
        this.timer = setTimeout(function() {
            //that.author.company = 'WINGSプロジェクト';
            Vue.set(that.author, 'company', 'WINGSプロジェクト'); //入れ子のみ
            //Vue.remove(that.author, 'name');
        }, 3000);
    },
    beforeDestroy: function() {
        clearInterval(this.timer)
    }       
});