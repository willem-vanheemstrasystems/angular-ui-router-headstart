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

