(function () {

    angular
        .module('listController', [])
        .controller('ListController', [
            'ListService', '$mdSidenav', '$mdBottomSheet', '$log',
            ListController
        ])

    function ListController(ListService, $mdSidenav, $mdBottomSheet) {
        var self = this;
        var svgindex = 2;
        var svgArr = ['svg-1', 'svg-2', 'svg-3', 'svg-4', 'svg-5'];
        self.lists = ListService.lists;
        self.todos = ListService.todos;
        self.currentList = 0;
        self.addList = addList;
        self.toggleList = toggleList;
        self.unArchiveItems = unArchiveItems;

        self.selected = null;
        self.selectList = selectList;
        self.firstList = firstList;
        self.changeList = changeList;

        function toggleList() {
            var pending = $mdBottomSheet.hide() || $q.when(true);
            pending.then(function () {
                $mdSidenav('left').toggle();
            });
        }
        function firstList() {
            self.selected = ListService.lists[0];
        }


        // *********************************
        // Internal methods
        // *********************************
        /**
         * Select the current avatars
         * @param menuId
         */
        function unArchiveItems() {
            ListService.unArchiveItems();
        }
        function selectList(list) {
            self.selected = angular.isNumber(list) ? $scope.lists[list] : list;
        }
        function addList() {
            ListService.addList(self.todoList, svgArr, svgindex);
            self.todoList = '';
            self.selected = ListService.lists[ListService.lists.length - 1];
            if (svgindex == (svgArr.length - 1)) {
                svgindex = 0;
            }
            else {
                svgindex++;
            }

        }
        function changeList(i) {
            self.currentList = i;
            ListService.changeList(i);
        }

        self.addItem = function (list) {
            var listNum = self.lists.indexOf(list);
            ListService.addItem(listNum, self.todo);
            self.todo = '';
        };
        self.deleteItem = function (list, item) {
            var listnum = self.lists.indexOf(list);
            ListService.deleteItem(listnum, item);
        };
        self.archiveItem = function (list) {
            var listnum = self.lists.indexOf(list);
            var oldTodos = self.lists[listnum].items;
            ListService.archiveItem(oldTodos);
        };
        self.deleteList = function (list) {
            ListService.deleteList(list);
            self.selected = ListService.lists[ListService.lists.length - 1];
        };
        self.archiveList = function (list) {
            var listnum = self.lists.indexOf(list);
            var oldTodos = self.lists[listnum].items;
            ListService.archiveList(listnum, oldTodos);
        };
    }

})();
