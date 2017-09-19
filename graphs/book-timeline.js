let width = 500, height = 200;
let barWidth = 40;
let body = d3.select('body'), books;
let svg = body.append('svg')
    .attr('width', width)
    .attr('height', height);

const addBooks = () => {
    d3.json("books.json", (bs) => {
        books = bs;
        svg.selectAll('rect')
            .data(books)
            .enter()
            .append('rect')
            .classed('bar', true)
            .attr('x', (_, i) => i * barWidth)
            .attr('y', (b) => height - b.days)
            .attr('height', (b) => b.days)
            .attr('fill', (b) => `rgb(0, 0, ${b.days * 3})`);

        svg.selectAll('text')
            .data(books)
            .enter()
            .append('text')
            .text(b => b.days)
            .attr('x', (_, i) => i * barWidth)
            .attr('y', (b) => height - b.days)
    });
};