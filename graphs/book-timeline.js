let width = 500, height = 100;
let body = d3.select('body'), books;
let svg = body.append('svg')
    .attr('width', width)
    .attr('height', height);

const addBooks = () => {
    d3.json("books.json", (bs) => {
        books = bs;
        svg.selectAll('circle')
            .data(books)
            .enter()
            .append('circle')
            .classed('circleDays', true)
            .attr('cx', (_, i) => i * 75 + 25)
            .attr('cy', height / 2)
            .attr('r', (d) => d.days);
    });
};