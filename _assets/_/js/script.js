$(function () {

    var html = {
        partial: function (url) {
            $('router-view').load(url);
        }
    };

    $('a[route]').on('click', function() {
        var self = $(this);
        var route = self.attr('route');

        $('a[route]').removeClass('active');
        self.addClass('active');

        html.partial(route);
    });

    $('a[route].active').click();

});