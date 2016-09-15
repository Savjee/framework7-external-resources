/**
 * This class fetches external resources and inlines them into the index.html file.
 *
 * Examples:
 *    <div class="view" data-externalResource="pathToYourFile.html"></div>
 *    <script type="text/template7" id="myTemplate" data-externalResource="templates/myTemplate.html"></script>
 *
 * When initialized, ExternalResources will fetch the source code of that page and
 * insert it into the index.html file.
 *
 * When all external resources were inlined, it runs the callback function.
 * This should be used to initalize Framework7.
 *
 * @author Xavier Decuyper <hi@savjee.be>
 */
var ExternalResources = (function () {
    function ExternalResources() {
    }
    ExternalResources.init = function (callback) {
        // Look for all elements that need an external view
        var externalViews = document.querySelectorAll('[data-externalResource]');
        // If there are no externalViews, run the callback directly, otherwise we don't initialize F7
        if (externalViews.length === 0) {
            callback();
        }
        var _loop_1 = function(i) {
            var view = externalViews[i];
            var url = view.getAttribute('data-externalResource');
            // Add the Ajax request to the queue and perform asynchronously
            this_1.ajaxQueue[url] = Dom7.ajax({
                url: url,
                dataType: 'text',
                success: function (data) {
                    view.innerHTML = data;
                    // Delete this request from the queue
                    delete ExternalResources.ajaxQueue[url];
                    // ExternalViews.queue.splice(url, 1);
                    // If the queue is empty, run the callback
                    if (Object.keys(ExternalResources.ajaxQueue).length == 0) {
                        callback();
                    }
                }
            });
        };
        var this_1 = this;
        for (var i = 0; i < externalViews.length; ++i) {
            _loop_1(i);
        }
    };
    ExternalResources.ajaxQueue = {};
    return ExternalResources;
}());
//# sourceMappingURL=ExternalResources.js.map