/**
 * thelinkedin module
 */
angular.module('thelinkedin', []).

  /**
   * TheLinkedin provider
   */
  provider('TheLinkedin', [function() {

    /**
     * Options object available for module
     * options/services definition.
     * @type {Object}
     */
    var options = {};


    /**
     * apiKey
     * @type {String}
     */
    options.apiKey = null;

    this.setApiKey = function(apiKey) {
      options.apiKey = apiKey;
      return this;
    };

    this.getApiKey = function() {
      return options.apiKey;
    };

    /**
     * Scopes
     * @default 'https://developer.linkedin.com/docs/oauth2#permissions'
     * @type {Boolean}
     */
    options.scopes = '';

    this.setScopes = function(scopes) {
      options.scopes = scopes;
      return this;
    };

    this.getScopes = function() {
      return options.scopes;
    };

    this.init = function(customOptions) {
      angular.extend(options, customOptions);
    };


    /**
     * This defines the The Linkedin Service on run.
     */
    this.$get = ['$q', '$rootScope', '$timeout', function($q, $rootScope, $timeout) {

      /**
       * Define a deferred instance that will implement asynchronous calls
       * @type {Object}
       */
      var deferred;

      /**
       * TheLinkedin Class
       * @type {Class}
       */
      var NgTheLinkedin = function () {};

     NgTheLinkedin.prototype.login = function() {

        var deferred = $q.defer();

        IN.User.authorize(function(){
        });

        console.log("IN.User.isAuthorized()",IN.User.isAuthorized());

        if (!IN.User.isAuthorized()) {
          IN.Event.on(IN, "auth", function() {

            IN.init({
              scope: options.scopes
            });

            IN.API.Profile("me").fields(
              [ "id", "firstName", "lastName", "pictureUrl","publicProfileUrl",
              "emailAddress","positions","educations" ]).result(
              function(result) {
                  deferred.resolve(result.values[0]);
                  console.log('result.values[0]',result.values[0]);
              }).error(function(err) {
                  $scope.$apply(function() {
                      deferred.reject('error');
                  });
            });
          });
        }else{
          IN.API.Profile("me").fields(
                      [ "id", "firstName", "lastName", "pictureUrl",
                              "publicProfileUrl" ]).result(
              function(result) {
                  deferred.resolve(result.values[0]);
                  console.log('result.values[0]',result.values[0]);
              }).error(function(err) {
                  $scope.$apply(function() {
                      deferred.reject('error');
                  });
          });
        };
        return deferred.promise;
      }
      NgTheLinkedin.prototype.onLinkedInLoad = function() {
        IN.Event.on(IN, "auth", function() {
          onLinkedInLogin();
        });
        IN.Event.on(IN, "logout", function() {
          onLinkedInLogout();
        });
      }

      //execute on logout event
      NgTheLinkedin.prototype.onLinkedInLogout = function() {
        location.reload(true);
      }

      return new NgTheLinkedin();
    }];
}])

// Initialization of module
.run([function(TheLinkedin) {
    var a = document.createElement("script");
    a.type = "text/javascript", a.async = false, a.src = "https://platform.linkedin.com/in.js?async=true";
    a.onload = function(){
      IN.init({api_key: '757h9srh7nz5jj', authorize: true});
    };
    var b = document.getElementsByTagName("script")[0];
    b.parentNode.insertBefore(a, b)
}]);