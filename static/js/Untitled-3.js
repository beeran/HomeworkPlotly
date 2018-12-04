// Array of names
const names = ["Jane", "John", "Jimbo", "Jedediah"];

// Slices first two names
const left = names.slice(0, 2);
console.log(left);

// Slices last two names and return
const right = names.slice(2, 4);
console.log(right);

//////////////////////////////////////////////////////////////////////////
// Sort the data array using the greekSearchResults value
data.sort(function(a, b) {
  return parseFloat(b.greekSearchResults) - parseFloat(a.greekSearchResults);
});

// Slice the first 10 objects for plotting
data = data.slice(0, 10);

// Reverse the array due to Plotly's defaults
data = data.reverse();

// Trace1 for the Greek Data
var trace1 = {
  x: data.map(row => row.greekSearchResults),
  y: data.map(row => row.greekName),
  text: data.map(row => row.greekName),
  name: "Greek",
  type: "bar",
  orientation: "h"
};

// data
var data = [trace1];

// Apply the group bar mode to the layout
var layout = {
  title: "Greek gods search results",
  margin: {
    l: 100,
    r: 100,
    t: 100,
    b: 100
  }
};

// Render the plot to the div tag with id "plot"
Plotly.newPlot("plot", data, layout);
//////////////////////////////////////////////////////////////
<body>
    <h2>Streaming Music By Country</h2>
    <select id="selDataset" onchange="getData(this.value)">
        <option value="dataset1">United States</option>
        <option value="dataset2">UK</option>
        <option value="dataset3">Canada</option>
    </select>

    <div id="pie"></div>

    <script src="plots.js"></script>
</body>
</html>


function updatePlotly(newdata) {
  var PIE = document.getElementById("pie");
  Plotly.restyle(PIE, "values", [newdata]);
}

////////////////////////////////////////////////////////////////
d3.select("tbody")
  .selectAll("tr")
  .data(austinWeather)
  .enter()
  .append("tr")
  .html(function(d) {
    return `<td>${d.date}</td><td>${d.low}</td><td>${d.high}</td>`;
  });
