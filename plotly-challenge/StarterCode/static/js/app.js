var select_id = d3.select("#selDataset");

d3.json("samples.json").then((importedData) => {
  var subject_ids = importedData.names;

  console.log("Subject_ids")
  console.log(subject_ids)

  subject_ids.forEach((id) => {
    select_id
      .append("option")
      .property("value", id)
      .text(id);
  });

  optionChanged(subject_ids[0]);
});


// function when id# is changed
function optionChanged(selected_id) {
  console.log("selected_id=", selected_id);

  d3.json("samples.json").then((data) => {
  
    var samples = data.samples;
    var results = samples.filter(sampleObj => sampleObj.id == selected_id);

    console.log(samples);

    var result = results[0];

    console.log(result);

    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;

    var y_label = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();

    console.log(sample_values.slice(0, 10).reverse());

    //Create the trace
    var trace1 = {
      y: y_label,
      x: sample_values.slice(0, 10).reverse(),
      text: otu_labels.slice(0, 10).reverse(),
      type: "bar",
      orientation: "h",
    };

    var data = [trace1];

    var layout = {
      title: "Top 10 OTUs"
    };

    //Create bar chart
    Plotly.newPlot("bar", data, layout);

    
    var results = samples.filter(sampleObj => sampleObj.id == selected_id);
    var result = results[0];

    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;

    //Create the trace
    var trace2 = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: "markers",
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: "Jet"
      }
    };

    var data = [trace2];

    var bubble_layout = {
      hovermode: "closest",
      xaxis: { title: "OTU ID" }
    };

    //Create bubble chart
    Plotly.newPlot("bubble", data, bubble_layout);
  });
  
  //Metadata
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;

    console.log(metadata);

    var results = metadata.filter(metadataObj => metadataObj.id == selected_id);
    var result = results[0];

    console.log(result)

    var fig = d3.select("#sample-metadata");

    fig.html("");

    Object.entries(results[0]).forEach(([key, value]) => {
      fig.append("h5").text(`${key}: ${value}`);
    });

  });
}




