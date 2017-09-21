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
const startDate = '18/09/2017', endDate = '24/09/2017';
const startTime = '00:00', endTime = '23:59';

// date dateParser
const dateParser = d3.timeParse('%d/%m/%Y');
const hourParser = d3.timeParse('%H:%M');

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
    svg.append('g')
        .attr("transform", `translate(0, ${height - yPadding})`)
        .call(d3.axisBottom(xScale));
    svg.append('g')
        .attr("transform", `translate(${xPadding}, 0)`)
        .call(d3.axisLeft(yScale).ticks(24).tickFormat(dateFormat));

    d3.json("book-time.json", (bt) => {
        svg.selectAll('rect')
            .data(bt)
            .enter()
            .append('rect')
            .attr('fill', 'green')
            .attr('x', (b) => xScale(dateScale(dateParser(b.date))))
            .attr('y', (b) => yScale(hourParser(b.start)))
            .attr('stroke', 'orange')
            .attr('stroke-width', 2)
            .attr('width', (width - 2 * xPadding) / 7)
            .attr('height', (b) => {
                const start = moment(hourParser(b.start));
                const end = moment(hourParser(b.end));
                const duration = moment.duration(end.diff(start));
                return duration.asMinutes()/(24*60.0) * (height - yPadding);
            })
    });
};