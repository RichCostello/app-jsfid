var FiddleCatcher = function() {
    return {
        getFiddles: function(userName, callback) {
            $.ajax({
                type: 'GET',
                headers: {"X-My-Custom-Header": "some value"},
                url: 'https://jsfiddle.net/api/user/' + userName + '/demo/list.json?&start=0&sort=date&start=0&limit=99999&order=desc'
            }).done(function(data) {
                var json = jQuery.parseJSON(data);
                //console.log(json);
                callback(json);
            });
        }
    }
}

var fiddleCatcher = new FiddleCatcher();

$('.get-fiddles').on('click', function() {
    var username = $('.jsfiddle-username').val() || 'MadLittleMods';
    //console.log(username);
    
    if(username.length > 0)
    {
        // Add a spinner
        $('.fiddle-list-info').html('<i class="loading-spinner"></i>');
        
        fiddleCatcher.getFiddles(username, function(fiddleList) {
            //console.log(fiddleList);
            
            $('.fiddle-list-info').html(username + ' has made ' + fiddleList.length + ' fiddles:');
            
            var source = $('.hbs-fiddle-list-entry').html();
            var template = Handlebars.compile(source);
            
            // Clear out the list
            $('.fiddle-list').html('');
            // And then repolulate it
            for(var i = 0; i < fiddleList.length; i++)
            {
                $('.fiddle-list').append(template(fiddleList[i]));
            }
        });
    }
});