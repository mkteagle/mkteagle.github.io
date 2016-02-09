(function(){
  'use strict';
angular.module('starter.services', [])

.service('Chats', function($http) {

  var self = this;
  //self.chats = [];
  self.getData = getData;
  self.get = get;
  function getData() {
    return $http.get('./js/hp.json')
      .then(function (response) {
        self.chats = response.data.characters;
        return self.chats;
      });
  }
  function get(chatId) {
    for (var i = 0; i < self.chats.length; i++) {
      if (self.chats[i].id == chatId) {
        return self.chats[i];
      }
    }
  }



    //return {
    //  all: function () {
    //    return chats;
    //  },
    //  remove: function (chat) {
    //    chats.splice(chats.indexOf(chat), 1);
    //  },
    //  get: function (chatId) {
    //    for (var i = 0; i < chats.length; i++) {
    //      if (chats[i].id === parseInt(chatId)) {
    //        return chats[i];
    //      }
    //    }
    //    return null;
    //  }
    //};

});
}());
