$(() => {



//Sort options
$( "#options" ).sortable();



//Adding data attributes on submit
$('.button').on('click', function(event){
  event.preventDefault();

  let $url = $("#poll-template").attr("name");

  $('.completed').removeAttr('hidden');
  var options = $('#options').children();
  for (var i = 1; i < options.length; i++) {
    options.eq(i).attr('data-rank', i);
  }
  let $rank = $(".option").attr("data-rank");
  let $pollName = $(".poll-name").text();
  let data = {
    rank: $rank,
    pollName: $pollName
  }
  $.ajax({
    url: $url,
    method: 'POST',
    dataType: 'json',
    data: data,
    success: function(response) {
    console.log("yeepy!")
      
    }
    
  })
})
// var children = $('#animDummy1').children();
// for(var i = 0;i < children.length;i++){
//     children.eq(i).css('left', (i*120+'px') );
// }

function createPoll(pollData) {
  var $poll = $('#poll-template').clone();
  $poll.removeAttr(hidden);
  $poll.find('.poll-name').text(pollData['poll']['name'])
  //How do you check for optional pollData? Does an if work?
  // if (pollData['poll']['description']) {
  //   $poll.find('.poll-desc).text(pollData['poll']['description']);
  // }
  appendOptions(pollData)
}

function appendOptions(optionsArr) {
  optionsArr.forEach(function(option){
    //Also need to take optional poll fields into consideration
    var newOption = createOptions(option);
    $('#poll-template').append(newOption);
  })
}
function createOptions(options) {
  var $option = $('#poll-template .options').clone()
  $option.removeAttr(hidden);
  $option.find('.option-name').text(options['option']['name'])
  //Also need to take optional poll fields into consideration
  return $option;
}







});
