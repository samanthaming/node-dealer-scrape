$(document).ready(function () {

  addPlanToSlug();
});


function addPlanToSlug(checkbox) {
  var routeName = getRouteName() || "";

  if (routeName) {
    routeName = routeName.toString() + "/";
  }
  
  $('.box-list input:checkbox').change(function () {
    var slugs = $('.box-list input:checkbox:checked').map(function () {
      return this.value;
    }).get().join(',');

    $('.compare-link').attr('href', '/' + routeName + 'compare/?slugs=' + slugs);
  });
}

function getRouteName() {
  return $('#route-folder').text();
}