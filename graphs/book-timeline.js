// metrics
// svg
const width = 800, height = 600;
// axis
const xPadding = 50, yPadding = 20;


// elements
const body = d3.select('body');
const svg = body.append('svg')
    .attr('width', width)
    .attr('height', height);

// data
let books;
const startDate = '18/09/2017', endDate = '24/09/2017';
const startTime = '00:00:00', endTime = '23:59:59';

// date dateParser
const dateParser = d3.timeParse('%d/%m/%Y');
const hourParser = d3.timeParse('%H:%M:%S');

// axis scale
const xScale = d3.scaleBand()
    .domain(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"])
    .range([xPadding, width - xPadding]);
const yScale = d3.scaleTime()
    .domain([
        hourParser(startTime),
        hourParser(endTime)
    ])
    .range([yPadding, height - yPadding]);
const dateScale = d3.scaleQuantize()
    .domain([
        dateParser(startDate),
        dateParser(endDate)
    ])
    .range(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]);

// formats
const dateFormat = d3.timeFormat("%H:%M");



const showBooks = () => {
    d3.json("books.json", (bs) => {
        books = bs;
        svg.append('g')
            .attr("transform", `translate(0, ${height - yPadding})`)
            .call(d3.axisBottom(xScale));
        svg.append('g')
            .attr("transform", `translate(${xPadding}, 0)`)
            .call(d3.axisLeft(yScale).ticks(24).tickFormat(dateFormat))
    });
};