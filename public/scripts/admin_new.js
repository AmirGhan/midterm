$(function() {

  $("i").on("click", function() {
    let $option = $(".options-template").clone();
    let $p = $("<p>").text('Option: ');
    $option.removeAttr("hidden").removeClass("options-template");
    $option.attr('name', 'option');
    $(".options-section").append($p);
    $(".options-section").append($option);
  });

  $('.submit').on("click", function(event) {
    $('.submitted').removeAttr('hidden');
  });
});
