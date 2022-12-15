new Vue({
    el: '#app',
    data: {
        books: [
            {
                isbn: '978-4-7981-5757-3',
                title: 'JavaScript逆引きレシピ',
                price: 2800
            },
            {
                isbn: '978-4-7981-5757-2',
                title: 'JavaScript逆引きレシピ2',
                price: 2000
            },
        ]
    },
    computed: {
        expensiveBooks: function() {
            return this.books.filter(function(b) {
                return b.price >= 2500;
            })
        }
    }
});