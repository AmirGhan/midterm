$(() => {

$("i").on("click", function () {

  let $option = $(".options-template").clone();
  let $p = $("<p>").text('Option: ')

  $option.removeAttr("hidden").removeClass("options-template")

  $(".options-section").append($p)
  $(".options-section").append($option)
})

$('.submit').on("click", function (event) {
    event.preventDefault();
  $('.submitted').removeAttr('hidden');
})

});
