$(() => {



//Sort options
$( "#options" ).sortable();



//Adding data attributes on submit
$('.button').on('click', function(event){
  event.preventDefault();

  let $url = $("#options").attr("name");
  console.log($url);
 // let $pollName = $(".poll-name").text();


  $('.completed').removeAttr('hidden');

  var options = $('#options').children();


  for (var i = 1; i < options.length; i++) {
    options.eq(i-1).attr('data-rank', i);
  }
  let votes = []
  for (var i = 0; i < options.length -1; i++) {
    let obj = {}
    let $optionId = $(".option-name").eq([i]).attr("data-optionId");
    let $optionName = $(".option-name").eq([i]).attr("data-name");
    let $optionRank = $(".option").eq([i]).attr("data-rank");
    obj.optionId = $optionId;
    obj.optionName = $optionName;
    obj.rank = $optionRank;
    votes.push(obj);
  }

  let pollObj = {}

  let $pollId = $("button").attr("data-pollId");
  pollObj.id = $pollId;
  pollObj.options = votes;


  $.ajax({
    url: $url,
    method: 'POST',
    dataType: 'json',
    data: pollObj,
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
