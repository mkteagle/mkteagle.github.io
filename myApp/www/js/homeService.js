(function(){
    'use strict';

    angular.module('homeService', [])
        .service('homeService', homeService);

    homeService.$inject = ['$http', 'uiGridConstants'];

    function homeService($http, uiGridConstants) {

        // list everything
        var hs = this;
        //hs.myGrid = { data: undefined };
        hs.myGrid = {
            data: undefined,
            enableFiltering: true,
            enableFullRowSelection: true,
            showColumnFooter: true,
            columnDefsx: [
                { field: 'name' },
                { field: 'company' },
                { field: 'email', name: 'emailAddress',
                    cellTemplate: '<a class="text-input" ng-href="mailto:{{ row.entity.email }}" ng-click="$event.stopPropagation()">'
                        + '{{ row.entity.email }}</a>' },
                { field: 'phone' },
                { field: 'balance', width: 120 },
                { field: 'age', width: 70, aggregationType: uiGridConstants.aggregationTypes.avg },
                { field: 'about', enableSorting: false,
                    cellTooltip: function(row, col) {
                        return row.entity.about;
                    }
                },
                // unused fields from json file
                //{ field: 'id' },
                //{ field: 'guid' },
                //{ field: 'isActive' },
                //{ field: 'registration' },
                //{ field: 'friends' },
                //{ field: 'picture' },
                //{ field: 'gender' },
                //{ field: 'address' },
            ],
            paginationPageSizes: [25, 50, 75],
            paginationPageSize: 25
        };

        getData().then(function(data){
            hs.myGrid.data = data;
        });

        // private function
        function getData() {
            return $http.get('./js/hp.json')
                .then(function (response) {
                    console.log(response.data.characters);
                    //response.data.characters.forEach(function (row) {
                    //    //row.registered = Date.parse(row.registered);
                    //});
                    //console.log(response.data.characters[0]);
                    return response.data.characters;
                });
        }
        // function getData() {
        //    return $http.get('https://swapi.co/api/people/1/?format=wookiee')
        //        .then(function (response) {
        //            console.log(response.data.results);
        //            //response.data.characters.forEach(function (row) {
        //            //    //row.registered = Date.parse(row.registered);
        //            //});
        //            //console.log(response.data.results[0]);
        //            return response.data.results;
        //        });
        //}

    }

}());
