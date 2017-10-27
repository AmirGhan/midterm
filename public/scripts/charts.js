google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

  var data = google.visualization.arrayToDataTable([
    ['Option', 'Rank/Point'],
    ['Lion King',     5],
    ['Beauty and the Beast',      5],
    ['Aladdin',  2]
  ]);

  var options = {
    title: 'Which Movie?'
  };

  var chart = new google.visualization.PieChart(document.getElementById('piechart'));

  chart.draw(data, options);
}
