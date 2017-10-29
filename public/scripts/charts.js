$(function(){
  $('#chart-button').on('click', function(event) {
    event.preventDefault();
    let $url = $(this).closest('#url').attr('name')
    $('#piechart').slideToggle();
      $.ajax({
      url: $url,
      method: 'GET',
      dataType: 'json',
      success: function(response) {
        for (let key in response) {
          console.log(key, response[key]);
          google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

  var data = google.visualization.arrayToDataTable([
    ['Option', 'Rank'],
    [key, response[key]]
  ]);

  var options = {
    title: 'POLL NAME'
  };

  var chart = new google.visualization.PieChart(document.getElementById('piechart'));

  chart.draw(data, options);
}
        }
      }
    })
  })
})
