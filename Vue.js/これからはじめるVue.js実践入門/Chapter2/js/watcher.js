new Vue({
    el: '#app',
    data: {
        name: '',
        upperName: ''
    },
    created: function() {
        this.delayFunc = _.debounce(this.getUpper, 2000);
    },
    watch: {
        name: function(newValue, oldValue) {
            this.delayFunc();
        }
    },
    methods: {
        getUpper: function() {
            this.upperName = this.name.toUpperCase();
        }
    }
});