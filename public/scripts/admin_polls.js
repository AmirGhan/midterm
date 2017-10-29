// $(document).ready(function(){
//   alert('connected');
//
//
//   };
// }) ;


// <!-- <% removeElem('.inactive') %> -->
$(() => {
if ($('#adm-poll-template completed')) {
  $('.inactive').remove();
}
else if ($('#adm-poll-template active')) {
  $('.complete').remove();
}













  $('#end-poll').on('click', function(event) {
    event.preventDefault();
    let $url = $(this).closest('.endPoll-url').attr('name');

      $.ajax({
      url: $url,
      method: 'PUT',
      dataType: 'json',
      success: function(response) {
        console.log("hi");
      }
    })
  })



});
