$(document).ready(function () {

  addPlanToSlug();
});


function addPlanToSlug(checkbox) {

  $('.box-list input:checkbox').change(function () {
    var slugs = $('.box-list input:checkbox:checked').map(function () {
      return this.value;
    }).get().join(',');
    $('.compare-link').attr('href', '/compare/?slugs=' + slugs);
  });
}
