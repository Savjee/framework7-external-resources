/**
 * This class fetches external resources and inlines them into the index.html file.
 *
 * Examples:
 *    <div class="view" data-externalView="pathToYourFile.html"></div>
 *    <script type="text/template7" id="myTemplate" data-externalView="templates/myTemplate.html"></script>
 * 
 * When initialized, ExternalResources will fetch the source code of that page and
 * insert it into the index.html file.
 *
 * When all external resources were inlined, it runs the callback function.
 * This should be used to initalize Framework7.
 *
 * @author Xavier Decuyper <hi@savjee.be>
 */
class ExternalResources {

    static ajaxQueue = {};

    static init(callback: Function) : void{
        // Look for all elements that need an external view
        let externalViews = document.querySelectorAll('[data-externalView]');

        // If there are no externalViews, run the callback directly, otherwise we don't initialize F7
        if(externalViews.length === 0){
            callback();
        }

        for (let i = 0; i < externalViews.length; ++i) {
            let view = externalViews[i];
            let url = view.getAttribute('data-externalView');

            // Add the Ajax request to the queue and perform asynchronously
            this.ajaxQueue[url] = Dom7.ajax(
                {
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
                }
            );
        }
    }
}