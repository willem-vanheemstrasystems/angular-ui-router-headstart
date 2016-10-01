##ANG_UI_ROUT001

#Angular UI-Router 001

Based on 'How to Write Modular Code with Angular UI-Router & Named Views' at https://www.sitepoint.com/write-modular-code-angular-ui-router-named-views/

##How to Write Modular Code with Angular UI-Router & Named Views

By Thomas Greco 

September 07, 2015

One of the most important concepts in web development is writing clean, modular code. This is especially relevant when working as part of a team on highly complex applications. The Angular framework was built to create high-level applications, which can become very complex very fast, which in turn makes writing modular code all the more vital. One of the tools that can aid you greatly in this quest is the [Angular UI Router](http://angular-ui.github.io/ui-router/site/#/api/ui.router), which was built to help manage different states of your web app. In contrast to the native AngularJS routing implementation, it gives you complete control over each of its views.

If you have used ui-router before, you may be aware of how the [dot-notation is used to define child states inside of a parent state](https://github.com/angular-ui/ui-router/wiki/Nested-States-&-Nested-Views#dot-notation). You may not, however, be aware of how the ui-router library deals with named views nested inside of a parent state. And this is what I am going to explain today.

I am going to show you how ui-router uses absolute names to give you complete control over where specific pieces of a web app are displayed. This allows you to easily add and remove different pieces of the interface in order to make a modular application, built up of different components. Specifically, I am going to show you how to map a navigation bar, some body content, and a footer, to a specific state. As ever, [the code for this tutorial can be found on GitHub](https://github.com/sitepoint-editors/sp-ui-router) and you can also find a [demo at the end of the article](https://www.sitepoint.com/write-modular-code-angular-ui-router-named-views/#demo).

##Getting Started

Take a minute to navigate through the files that make up this demo (available at the GitHub link above). You can see we have an ```index.html``` file where we include AngularJS, as well as the library for the ui-router. In this file we also have two ```ui-view``` directives into which we will insert our content. Next we have an ```app.js``` file, which will contain the code for our Angular app, and a ```templates``` directory. This directory will be used to house all of our different views. Although this folder is not necessary, it is definitely in your best interest to use some sort of structure when building applications with Angular. As you can see, I have included an ```assets``` folder inside of the ```templates``` folder. This is where I like to keep my reusable components: headers, navbars, footers, etc. I figured you may find this convention helpful as it keeps your code extremely modular. 

##UI-Router

###Add a Dependency to ui-router

Let’s begin configuring our application. Inside of our ```app.js``` file, we need to add a dependency on the ui-router to our main angular module.

```javascript
angular.module('app', ['ui.router'])
```

##Configuring Our Routes

Once that is done, we can move on to our application’s ```config``` object. Here, we will be dealing with [$stateProvider](http://angular-ui.github.io/ui-router/site/#/api/ui.router.state.$stateProvider) and [$urlRouterProvider](http://angular-ui.github.io/ui-router/site/#/api/ui.router.router.$urlRouterProvider), so we need to inject them into our config object in order to have them available.

Next we want to pass the URL of our home state into ```$urlRouterProvider.otherwise()```, so it maps our application to this state by default. We will then need to use ```$stateProvider```, which is what we will be dealing with for the rest of the tutorial. ```$stateProvider``` is what ui-router gives developers to use when routing applications. A state corresponds to a “place” in the application in terms of the overall UI and navigation. A state describes what the UI looks like and what it does at that place. It works in the same way that ```ngRoute``` uses ```routeProvider```. 

Below is a how the ```app.js``` file should look at this moment. Once we have configured the ```urlRouterProvider```, we utilize ```$stateProvider``` to define the different states of the application. In this instance, we are defining a state named home, and only the URL is configured.

```javascript
angular.module('app', ['ui.router'])
  .config(['$stateProvider', '$urlRouterProvider', 
    function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/');
      $stateProvider
      .state('home', {
        url: '/'
      });
    }
  ]);
```

##The Views Object

Now that you have the bare-bones set up, you need to define a ```views``` object inside of ```$stateProvider```. It should be placed immediately following the home state’s URL. Inside this object is where we are going to define the names of our views, as well as the paths of their templates. Here you can also define things such as controllers; however, I have passed over that for the sake of brevity in this tutorial. 

Moving on, we must first create and define an unnamed view that will target the parent state — which in this case is home. The ```templateUrl``` of this unnamed view will essentially tie the two together. This is known as relative naming and tells angular to insert this unnamed view in the ```<div ui-view>``` inside our ```index.html``` file. Your code should now replicate the ```app.js``` below. 

```javascript
angular.module('app', ['ui.router'])
  .config(['$stateProvider', '$urlRouterProvider', 
    function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/');
      $stateProvider
        .state('home', {
          url: '/',
          views: {
            '': { 
              templateUrl: './templates/main.html' 
            },
          }
        });
     }
   ]);
```

As you can see, the unnamed view resolves to ```main.html```, which should resemble the code below.

```javascript
<div ui-view="nav"></div>
<h1 class="text-center">This content is in main.html</h1>
<div ui-view="body"></div>
<div ui-view="footer"></div>
```

The file ```main.html``` includes three named views – nav, body, and footer. In order for these components to appear under the home state, we must define them using absolute naming. Specifically, we must use the @ syntax to tell AngularJS that these components of our application should be mapped to a specific state. This follows the ```viewName@stateName``` syntax and tells our application to utilize named views from an absolute, or specific state. You can [read more about relative vs. absolute names here](https://github.com/angular-ui/ui-router/wiki/Multiple-Named-Views#view-names---relative-vs-absolute-names).

You will see ```@home``` used throughout our config object, to ensure that Angular knows our named views target our home state. If these absolute names are not present, the application will not know where to find these named views. That said, take a look below and see how the application should be routed. 

```javascript
angular.module('app', ['ui.router'])
  .config(['$stateProvider', '$urlRouterProvider', 
    function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/');
      $stateProvider
        .state('home', {
          url: '/',
          views: {
            '': { templateUrl: './templates/main.html'},
            'nav@home': { templateUrl: './templates/assets/nav.html' },
            'body@home': { templateUrl: './templates/body.html'},
            'footer@home': { templateUrl: './templates/assets/footer.html' }
         }
      });
    }
  ]);
```

And this is what we end up with:

See [demo on CodePen](http://codepen.io/SitePoint/pen/JYdXVa)

##Why This Is Great

As I said earlier, absolute naming makes your code extremely modular. In this tutorial, I placed all of our views inside of a templates folder. However, you can take this a step further and create folders for the different views of your applications. This allows you to reuse templates throughout your application, as well as in future projects! The ui-router library makes it extremely easy to use different components of a web application, such as header and footers for specific views. This will make it easier to reuse code throughout different projects, and can definitely save you time. 


##Conclusion

There is much more complex, high-level nesting you can do with absolute names — this was only one example! Nonetheless, I hope you gained a deeper perspective of some of the things that ui-router makes possible. In [this article written by Antonio Morales](http://www.webcodegeeks.com/javascript/angular-js/angularjs-ui-router-components/), he does an extremely good job of explaining the differences between absolute and relative naming, child states, and other aspects of Angular’s ui-router library. As always, let me know if you have any questions regarding this tutorial. I would be happy to answer them. 