$( document ).ready(function() {
  alert('in .js');
  //Sort options
  $("#options").sortable();

  //Adding data attributes on submit
  $('.button').on('click', function(event) {
    event.preventDefault();
    let $url = $("#options").attr("name");
    $('.completed').removeAttr('hidden');
    let options = $('#options').find('aside');
    optionNum = 0;
    for (let i = options.length; i > 0; i--) {
      options.eq(optionNum).attr('data-rank', i);
      optionNum++;
    }

    let votes = [];

    for (let i = 0; i < options.length; i++) {
      let obj = {};
      let $optionId = $(".option-name").eq([i]).attr("data-optionId");
      let $optionName = $(".option-name").eq([i]).attr("data-name");
      let $optionRank = $(".option").eq([i]).attr("data-rank");
      obj.optionId = $optionId;
      obj.optionName = $optionName;
      obj.rank = $optionRank;
      votes.push(obj);
    }

    let pollObj = {};
    let $pollId = $("button").attr("data-pollId");
    pollObj.id = $pollId;
    pollObj.options = votes;

    $.ajax({
      url: $url,
      method: 'POST',
      dataType: 'json',
      data: pollObj,
      success: (response) => {

      }

    });
  });

  function createPoll(pollData) {
    let $poll = $('#poll-template').clone();
    $poll.removeAttr(hidden);
    $poll.find('.poll-name').text(pollData['poll']['name']);
    appendOptions(pollData);
  }

  function appendOptions(optionsArr) {
    optionsArr.forEach((option) => {
      let newOption = createOptions(option);
      $('#poll-template').append(newOption);
    });
  }
  function createOptions(options) {
    let $option = $('#poll-template .options').clone();
    $option.removeAttr(hidden);
    $option.find('.option-name').text(options['option']['name']);
    return $option;
  }

});
