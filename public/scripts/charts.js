$(() => {
  $('.poll-button').on('click', (event) => {
    event.preventDefault();
    let $url = $(this).closest('#url').attr('name');
    $('#piechartActive').toggleClass();
    let name = $(this).text();
    $.ajax({
      url: $url,
      method: 'GET',
      dataType: 'json',
      success: (response) => {
        let arr = [
          ['Option', 'Rank']
        ];
        for (let key in response) {
          arr.push([key, response[key]]);
        }
        google.charts.load('current', {'packages': ['corechart']});
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {

          let data = google.visualization.arrayToDataTable(arr);

          let options = {'title': name, 'width':550, 'height':400};

          let chart = new google.visualization.PieChart(document.getElementById('piechartActive'));

          chart.draw(data, options, arr);
        }
      }
    });
  });
});

$(() => {
  $('.poll-button-closed').on('click', (event) => {
    event.preventDefault();
    let $url = $(this).closest('#urlClosed').attr('name');
    $('#piechartClosed').toggleClass();
    let name = $(this).text();
    $.ajax({
      url: $url,
      method: 'GET',
      dataType: 'json',
      success: (response) => {
        let arr = [
          ['Option', 'Rank']
        ];
        for (let key in response) {
          arr.push([key, response[key]]);
        }
        google.charts.load('current', {'packages': ['corechart']});
        google.charts.setOnLoadCallback(drawChart);

         drawChart() => {

          let data = google.visualization.arrayToDataTable(arr);

          let options = {'title': name, 'width':550, 'height':400};

          let chart = new google.visualization.PieChart(document.getElementById('piechartClosed'));

          chart.draw(data, options, arr);
        }
      }
    });
  });
});
