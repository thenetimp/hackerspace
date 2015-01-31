(function($){
 
  /**
   * Initialize the hsHackerspace AngularJS application.
   */
  app = angular.module('hsMain', ['ngRoute','hsModel']);
  
  /**
   * Register routes the application will be using.
   */
  app.config( ['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/register', {
        templateUrl: 'templates/account/registration.html'
      })
      .when('/', {
        templateUrl: 'templates/homepage/main.html'
      })
      .otherwise({
        redirectTo: '/'
      });  
  }] );
 
 
  app.controller('HeaderController', ['hsConfig','hsUser', function( hsConfig, hsUser)
  {
    this.config = hsConfig.get();
    this.user = hsUser.get();
  }]);

  app.controller('AuthController', ['hsUser', function( hsUser)
  {
    this.user = hsUser.get();
    
    this.authUser = {
      emailAddress: "testinguser",
      password: "testinguser",
      remember: false,
    }
    
    this.authenticate = function()
    {
      hsUser.authenticate(this.authUser.emailAddress, this.authUser.password);
    }

    this.deauthenticate = function()
    {
      this.user = hsUser.deauthenticate();
      console.log('Deauthenticated')
    }

  }]);

  app.controller('RegisterController', ['hsUser', function(hsUser)
  {
    this.registration = {
      first_name: "",
      last_name: "",
      alias: "",
      email_address: "",
      password: "",
      password_confirm: "",
      agree_tos: false,
      subscribe_newsletter: false
    };
    
    this.registerUser = function()
    {
      response = hsUser.doRegister(this.registration)
      if(!response.success)
      {
        console.log(response.message)
      }
    }
  }]);

  app.directive('hsHeader', [function(){
    return {
      templateUrl: 'templates/common/header.html',
      restrict: 'A',
      replace: true
    }
  }]);

 
 

})(jQuery);