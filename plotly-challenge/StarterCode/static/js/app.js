var select_tag = d3.select("#selDataset");

d3.json("samples.json").then((data) => {
  var subject_ids =data.names;

  console.log("Subject_ids")
  console.log(subject_ids)
  subject_ids.forEach((id) => {
    select_tag
      .append("option")
      .property("value", id)
      .text(id);
  });
});
// function init(){
//     data = [{
//         x:
//         y:
//     }]


//     var barCHART = d3.selectAll("#bar").node();

//     Plotly.newPlot(barCHART, data);
// }

// d3.selectAll("selDataset").on("change", updatePlotly);

// function updatePlotly(){

//     var dropdownMenu = d3.select("#selDataset");
//     var dataset = dropdownMenu.node().value;
// }
// //  Create the Traces
//     var trace1 = {
//       x: data.id,
//       y: data.otu_ids, 
//       type: "bar",
//       orientation: "h"
//     };

//     // Create the data array for the plot
//     var data = [trace1];

//     // Define the plot layout
//     var layout = {
//       title: "OTU's",
//       xaxis: { title: "OTU ID's" },
//       yaxis: { title: "Number of OTU" }
//     };

//     // Plot the chart to a div tag with id "plot"
//     Plotly.newPlot("bar", data, layout);


//     var trace2 = {
//         x: data.otu_ids,
//         y: data.sample_values,
//         mode: 'markers',
//         marker: {
//           color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)']
//         }
//       };
    
//       var data = [trace2];
    
//       var layout = {
//         title: "OTU's"
//         showlegend: true,
//         height: 600,
//         width: 600
//       };
    
//       Plotly.newPlot('bubble', data, layout);