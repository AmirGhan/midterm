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
});
