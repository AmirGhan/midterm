google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

  var data = google.visualization.arrayToDataTable([
    ['Option', 'Rank'],
    ['Option-Name', 'Rank-Points-Sum'],
    ['Option-Name', 'Rank-Points-Sum'],
    ['Option-Name', 'Rank-Points-Sum']
  ]);

  var options = {
    title: 'POLL NAME'
  };

  var chart = new google.visualization.PieChart(document.getElementById('piechart'));

  chart.draw(data, options);
}

$(function(){
  console.log('connected');
  $('.poll-button').on('click', function() {
    $('#piechart').slideToggle();
  })
})

// option name, all the ranks and correspoding opt ids, pollname
// poll.forEach(function(option) {
//   let arr = [];
//   let point = data-rank;
//   let sum = sum(Point);
//   let choiceName = data-optionName/optionName;
//   arr.push('choiceName');
//   arr.push(sum);
//   return arr;
// }
