// from data.js
var tableData = data;
createTable(data);

function createTable(data){
var tableBody = d3.select("#ufo-table tbody");
tableBody.html("");
var tableRows = tableBody.selectAll("tr")
    .data(data)
    .enter()
    .append("tr");

tableRows.selectAll("td")
    .data(function(d){return Object.values(d)})
    .enter()
    .append("td")
    .text(function(d){return d});
};

var button = d3.select(".btn-default");
var form = d3.select("#datetime");

button.on("click", runEnter);
form.on("submit", runEnter);

//Prevent the page from refreshing
function runEnter(){
    d3.event.preventDefault();

    var inputElement = d3.select("#datetime");
    var inputValue = inputElement.property("value");
    console.log(inputValue);
    console.log(tableData);

    var filteredData = tableData.filter(date => date.datetime === inputValue);
    createTable(filteredData);
    console.log(filteredData);

};