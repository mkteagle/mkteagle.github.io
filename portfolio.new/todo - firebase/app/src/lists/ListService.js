
(function () {
    'use strict';

    angular.module('listService', ['ngMaterial', 'navController', 'ngStorage', 'firebase'])
        .service('ListService', ListService);

    ListService.$inject = ['$localStorage', '$firebaseArray'];

    function ListService($localStorage, $firebaseArray) {
        var self = this;
        var url = "https://glaring-inferno-7989.firebaseio.com/todoapp";
        var listref = new Firebase(url + '/lists');
        var todosref = new Firebase(url + '/todos');
        self.lists = $firebaseArray(listref);
        self.todos = $firebaseArray(todosref);
        self.deleteList = deleteList;
        self.addList = addList;
        self.addItem = addItem;
        self.deleteItem = deleteItem;
        self.archiveItem = archiveItem;
        self.archiveList = archiveList;
        self.unArchiveItems = unArchiveItems;
        self.storage = storage;
        self.changeList = changeList;

        function storage () {
            $localStorage.lists = self.lists;
        }

        function unArchiveItems() {
            angular.forEach(self.lists, function(item) {
                angular.forEach(item.items, function(todo) {
                    if (todo.done) {
                        todo.archived = false;
                        todo.done = false;
                    }
                })
            });
            storage();
        }

        function addList(name, svgArr, svgindex) {
            self.lists.$add({name: name, avatar: svgArr[svgindex], items: [], archived: false
            });
            //storage();
        }
        function deleteList(list) {
            self.lists.$remove(list);

            for (var i = 0; i < self.todos.length; i++) {
                if (self.todos[i].list == list) {
                    self.todos.$remove(i);
                }
                else if (self.todos[i].list > list) {
                    self.todos[i].list = self.todos[i].list-1;
                    self.todos.$save(i);
                }
            }
        }
        function addItem(index, item) {
            self.todos.$add({list: index, text: item, done: false, archived: false});
            //storage();
        }
        function deleteItem(index, item) {
            self.lists[index].items.splice(self.lists[index].items.indexOf(item), 1);
            storage();
        }
        function archiveItem(item) {
            angular.forEach(item, function (todo) {
                if (todo.done) {
                    todo.archived = true;
                }
            });
            storage();
        }
        function archiveList(item) {
           angular.forEach(item, function (todo) {
                todo.done = true;
                todo.archived = true;
            });
            storage();
        }
        function changeList(cur) {
            self.curList = cur;
        }
    }

})();
