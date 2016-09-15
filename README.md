# ExternalResources for Framework7
ExternalResources is a small utility written in TypeScript that inlines external resources in your web application. It was created to be used with Framework7 and to put all my templates into seperate files.

Inlining happens asynchronously. When ExternalResources is finished it calls your callback function where you can start initializing Framework7. 

## Usage
Start by including it in your project:
```html
<script type="text/javascript" src="js/ExternalResources.js"></script>
```

Initialize the external resources and Framework7 like this:

```js
var $$ = Dom7;

// Load the external views first
ExternalResources.init(function () {

    // When the external views are inlined, initialize F7
    const myApp = new Framework7();

    //
    // All your other app initalization logic goes here...
    // (adding views, callbacks, ...)
    //
});
```

Now you can load anything from external files. I mostly use it to put all my templates into seperate files and load them into my ``index.html`` page.

```html
<!-- Templates -->
<script type="text/template7" id="tplOverview" data-externalResource="templates/overview.html"></script>
<script type="text/template7" id="tplCard" data-externalResource="templates/card.html"></script>
<script type="text/template7" id="tplUserProfile" data-externalResource="templates/userProfile.html"></script>
```

## License
MIT License, see ``LICENSE.md``.

## Contributing & issue's
Feel free to improve this little project by forking it, submitting pull requests or opening issue's.