function buildMetadata(sample) {
  var url = "/metadata/" + sample;
  d3.json(url).then(function (response) {
    console.log(response);
    d3.select("#metadata")
      .selectAll("div").remove();
    d3.select("#metadata")
      .selectAll("div")
      .data(Object.entries(response))
      .enter()
      .append("div")
      .text(function (d) {
        return d[0] + ': ' + d[1];
      });
  });
}

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`

    // Use `.html("") to clear any existing metadata

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ); 

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var url = "/samples/" + sample;
  d3.json(url).then(function (response) {
    var data = [];
    for (var i = 0; i < response.otu_ids.length; i++) {
      var obj = {
        otuId: response.otu_ids[i],
        otuLabel: response.otu_labels[i],
        sampleValue: response.sample_values[i]
      };
      data.push(obj);
    }

    data.sort(function(a, b) {
      return b.sampleValue - a.sampleValue;
    });

    // Slice the first 10 objects for plotting
    data = data.slice(0, 10);
    var pieData = {
      values: data.map(row => row.sampleValue),
      labels: data.map(row => row.otuId),
      hoverTexts: data.map(row => row.otuLabel),
      // hoverText : 'text',
      type: 'pie',
      name: 'Top 10 Samples'
    };
    var layoutPie = {
      height: 500,
      width: 700,
      //grid: {rows: 2, columns: 2}
    };
    var PIE = document.getElementById("pie");
    Plotly.newPlot(PIE, [pieData], layoutPie);

    var colors = ['rgb(156, 37, 30)', 'rgb(18, 36, 137)', 'rgb(34, 53, 101)', 'rgb(36, 55, 57)', 'rgb(6, 4, 4)',
    'rgb(177, 127, 38)', 'rgb(205, 152, 36)', 'rgb(253, 79, 37)', 'rgb(129, 180, 179)', 'rgb(200, 103, 37)'];
    var bubbleData = {
      x: data.map(row => row.otuId),
      y: data.map(row => row.sampleValue),
      text: data.map(row => row.otuLabel),
      mode: 'markers',
      marker: {
        size: data.map(row => row.sampleValue),
        color: colors,
      }
    };
    console.log(bubbleData);

    var layoutBubble = {
      height: 500,
      width: 1000,
      //grid: {rows: 2, columns: 2}
    };
    var BUBBLE = document.getElementById("bubble");
    Plotly.newPlot(BUBBLE, [bubbleData], layoutBubble);
    

  });
    // @TODO: Build a Bubble Chart using the sample data

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).

}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    console.log(firstSample);
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  //  // Prevent the page from refreshing
  //  d3.event.preventDefault();S
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
