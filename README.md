# angular-linkedin-connect
angular-linkedin-connect : 
a really simple angular module which handles the login with linkedin

### Usage

* 1) Add index.html

1.1) Specify a scope in your call
exemple : scopes:"r_fullprofile r_emailaddress"

```
var app = angular.module("app", ['thelinkedin']);
    app.config(['TheLinkedinProvider', function(TheLinkedinProvider) {
      TheLinkedinProvider.init({
          scopes:"SCOPE1 SCOPE2 SCOPE3"
       });
    }]);
    app.controller("HelloCtrl", function($scope,TheLinkedin) {
      $scope.login = function () {
        TheLinkedin.login();
      };
});
```

* 2) Add angular-the-linekdin.js

2.1) Change the api_key

```
// Initialization of module
.run([function(TheLinkedin) {
    var a = document.createElement("script");
    a.type = "text/javascript", a.async = false, a.src = "http://platform.linkedin.com/in.js?async=true";
    a.onload = function(){
      IN.init({api_key: 'YOUR_API_KEY', authorize: true});
    };
    var b = document.getElementsByTagName("script")[0];
    b.parentNode.insertBefore(a, b)
}]);

```

* 3) Enjoy your Linkedin API
