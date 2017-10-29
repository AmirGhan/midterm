$(function() {
  $('.poll-button').on('click', function(event) {
    event.preventDefault();
    let $url = $(this).closest('#url').attr('name');
    // let $trial = $(this).closest()
    $('#piechartActive').toggleClass();
    let name = $(this).text();
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
        google.charts.load('current', {'packages': ['corechart']});
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {

          var data = google.visualization.arrayToDataTable(arr);

          var options = {'title': name, 'width':550, 'height':400};

          var chart = new google.visualization.PieChart(document.getElementById('piechartActive'));

          chart.draw(data, options, arr);
        }
      }
    })
  })
})

$(function() {
  $('.poll-button-closed').on('click', function(event) {
    event.preventDefault();
    let $url = $(this).closest('#urlClosed').attr('name');
    // $('#piechartClosed').toggle().removeAttr('hidden');
    $('#piechartClosed').toggleClass();
    let name = $(this).text();
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
        google.charts.load('current', {'packages': ['corechart']});
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {

          var data = google.visualization.arrayToDataTable(arr);

          var options = {'title': name, 'width':550, 'height':400};

          var chart = new google.visualization.PieChart(document.getElementById('piechartClosed'));

          chart.draw(data, options, arr);
        }
      }
    })
  })
})
