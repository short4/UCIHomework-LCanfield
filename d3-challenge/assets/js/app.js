// Set chart parameters
var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top: 20,
    right: 40, 
    bottom: 60, 
    left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create SVG container
var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .attr("class", "chart");

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

//Import data
d3.csv("assets/data/data.csv").then(function(healthData){
    console.log(healthData);

    healthData.forEach(function(data){
        data.state = data.state;
        data.abbr = data.abbr;
        data.poverty = +data.poverty;
        data.povertyMoe = +data.povertyMoe;
        data.age = +data.age;
        data.ageMoe = +data.ageMoe;
        data.incomeMoe = +data.incomeMoe;
        data.healthcare = +data.healthcare;
        data.healthcareLow = +data.healthcareLow;
        data.healthcareHigh = +data.healthcareHigh;
        data.obesity = +data.obesity;
        data.obesityLow = +data.obesityLow;
        data.obesityHigh = +data.obesityHigh;
        data.smokes = +data.smokes;
        data.smokesLow = +data.smokesLow;
        data.smokesHigh = +data.smokesHigh;
    });
    
    //create scales
    var xLinearScale = d3.scaleLinear()
        .domain([5, d3.max(healthData, d => d.smokes + 5)])
        .range([0, width]);
    
    var yLinearScale = d3.scaleLinear()
        .domain([5, d3.max(healthData, d => d.poverty + 5)])
        .range([height, 0]);

    //create axis
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    //Append to chartGroup
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);
    
    chartGroup.append("g")
        .call(leftAxis);

    //create circles for scatter plot
    var circlesGroup = chartGroup.selectAll("circle")
    .data(healthData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.smokes))
    .attr("cy", d => yLinearScale(d.poverty))
    .attr("r", "10")
    .attr("fill", "blue")
    .attr("opacity", ".5");

    // //abbr in circles
    // var stateAbbr = chartGroup.append('g')
    //     .selectAll("text")
    //     .data(healthData)
    //     .enter().append("text")
    //     .attr('font-size', 6)
    //     .attr("class", stateCircle)
    //     .attr("dx", 5)
    //     .attr("dy", 5)
    //     .text(function(d){
    //         return(`${d.abbr}`)
    //     });

    //tooltip
    var toolTip = d3.tip()
        .attr("class", "d3-tip")
        .attr("class", "stateCircle")
        .offset([0, 0])
        .html(function(d){
            return (`${d.abbr}`);
        });
    
    chartGroup.call(toolTip);

    // circlesGroup.on("mouseover", function(data){
    //     toolTip.show(data, this);
    // })
    // //mouseout
    // .on("mouseout", function(data){
    //     toolTip.hide(data);
    // });

    //axis labels
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 40)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("class", "aText")
        .text("Poverty Rate");

    chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        .attr("class", "aText")
        .text("Number of Smokers");
}).catch(function(error){
    console.log(error);
});
