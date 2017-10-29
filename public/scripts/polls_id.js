$(() => {

  //Sort options
  $("#options").sortable();

  //Adding data attributes on submit
  $('.button').on('click', function(event) {
    event.preventDefault();
    let $url = $("#options").attr("name");
    // let $pollName = $(".poll-name").text();
    $('.completed').removeAttr('hidden');

    var options = $('#options').find('aside');

    optionNum = 0;
    for (var i = options.length; i > 0; i--) {
      options.eq(optionNum).attr('data-rank', i);
      optionNum++;
    }

    let votes = []

    for (var i = 0; i < options.length; i++) {
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

    console.log(pollObj)

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

  function createPoll(pollData) {
    var $poll = $('#poll-template').clone();
    $poll.removeAttr(hidden);
    $poll.find('.poll-name').text(pollData['poll']['name'])
    appendOptions(pollData)
  }

  function appendOptions(optionsArr) {
    optionsArr.forEach(function(option) {
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
