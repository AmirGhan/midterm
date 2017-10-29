$(function() {
  $('#chart-button').on('click', function(event) {
    event.preventDefault();
    let $url = $(this).closest('#url').attr('name');
    $('#piechart').slideToggle().removeAttr('hidden');
    $.ajax({
      url: $url,
      method: 'GET',
      dataType: 'json',
      success: function(response) {
        let arr = [
          ['Option', 'Rank']
        ];
        for (let key in response) {
          arr.push([key, response[key]]);
        }
        console.log(arr);
        google.charts.load('current', {'packages': ['corechart']});
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {

          var data = google.visualization.arrayToDataTable(arr);

          var chart = new google.visualization.PieChart(document.getElementById('piechart'));

          chart.draw(data, arr);
        }
      }
    })
  })
})
