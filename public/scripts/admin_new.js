$(() => {

  $("i").on("click", () => {
    let $option = $(".options-template").clone();
    let $p = $("<p>").text('Option: ');
    $option.removeAttr("hidden").removeClass("options-template");
    $option.attr('name', 'option');
    $(".options-section").append($p);
    $(".options-section").append($option);
  });

  $('.submit').on("click", (event) => {
    $('.submitted').removeAttr('hidden');
  });
});
