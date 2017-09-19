let body = d3.select('body'), books;

const addBooks = () => {
    d3.json("books.json", (bs) => {
        books = bs;
        body.selectAll('div')
            .data(books)
            .enter()
            .append('div')
            .attr('class', "bar")
            .style('width', d => d.days * 5 + 'px');
    });
};