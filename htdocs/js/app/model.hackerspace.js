(function($){
  /**
   * Initialize the Parse object with the proper keys.
   */
  Parse.initialize("j9mxecjOA5Q3r50r883u09iMTtmTcvej4oQP8pMI", "6oHJQB50CZ9ghETrDd0GKkdnBLxrotbbbUvuZJij");

  /**
   * Initialize the hsHackerspace AngularJS application.
   */
  app = angular.module('hsModel', []);

  app.factory('hsConfig', ['$http', function($http){
    var dataObject = { };
    
    return {
      get: function()
      {
        $http.get('/data/Config.json')
          .success(function(responseData)
          {
            var keys = Object.keys(responseData);

            keys.forEach(function(value){
              dataObject[value] = responseData[value];
            })

          })
          .error(function(responseData){
            console.log('Model: Unable to get configuration data');
          });
        
        return dataObject;
      }
    }    
  }]);
  
  app.factory('hsUser', ['$http', function($http){
    
    var dataObject = null;

    return {
      get: function()
      {
        var tmpData = Parse.User.current();
        console.log(tmpData);

        if(tmpData && dataObject == null)
        {
          dataObject = {};
          keys = Object.keys(tmpData);
          keys.forEach(function(value)
          {
            dataObject[value] = tmpData[value];
          });
          console.log(dataObject);
        }
        return dataObject;
      },

      authenticate: function(username, password)
      {
        console.log('auth');
        Parse.User.logIn(username, password, {
          success: function(userData) {
            dataObject = {};
            keys = Object.keys(userData);
            keys.forEach(function(value)
            {
              dataObject[value] = userData[value];
            });
          },
          error: function(userData, errorData) {
            console.log(errorData);
          }
        });
      },

      deauthenticate: function()
      {
        Parse.User.logOut();
        var dataObject = Parse.User.current();
      },
      
      doRegister: function(registration)
      {
        console.log(registration);
        return {
          success: true
        }
      }
    }
  }]);

})(jQuery);