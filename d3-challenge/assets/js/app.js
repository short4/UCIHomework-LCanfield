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
        data.obesity = +data.obesity;
        data.obesityLow = +data.obesityLow;
        data.obesityHigh = +data.obesityHigh;
    });
    
    //create scales
    var xLinearScale = d3.scaleLinear()
        .domain([20, d3.max(healthData, d => d.obesity + 2)])
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
    .attr("cx", d => xLinearScale(d.obesity))
    .attr("cy", d => yLinearScale(d.poverty))
    .attr("r", "12")
    .attr("class", "stateCircle");


    //abbr in circles
    var stateAbbr = chartGroup.selectAll(null)
        .data(healthData)
        .enter().append("text");
    
    stateAbbr
        .attr("x", function(d){
            return xLinearScale(d.obesity);
        })
        .attr("y", function(d){
            return yLinearScale(d.poverty)
        })
        .text(function(d){
            return d.abbr;
        })
        .attr("class", "stateText")
        .attr("font-size", "9px");


    //tooltip
    var toolTip = d3.tip()
        .attr("class", "d3-tip")
        .offset([0, 0])
        .html(function(d){
            return (`${d.state}`);
        });
    
    chartGroup.call(toolTip);

    circlesGroup.on("mouseover", function(data){
        toolTip.show(data, this);
    })
    //mouseout
    .on("mouseout", function(data){
        toolTip.hide(data);
    });

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
        .text("Obesity");
}).catch(function(error){
    console.log(error);
});
