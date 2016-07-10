var cities = [
  {
      place : '$5/day',
      desc: 'Driveway spot',
      lat : 40.019277,
      long : -105.278820
  },
  {
      place : '$8/day',
      desc: 'Parking lot',
      lat : 40.014597,
      long : -105.283117
  },
];

//Angular App Module and Controller
var mapApp = angular.module('mapApp', []);
mapApp.controller('MapController', function ($scope) {

    var mapOptions = {
        zoom: 13,
        center: new google.maps.LatLng(40.017900, -105.279991),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    $scope.markers = [];

    var infoWindow = new google.maps.InfoWindow();

    var createMarker = function (info){

        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info.lat, info.long),
            title: info.place
        });
        marker.content = '<div class="infoWindowContent">' + info.desc + '<br />' + info.lat + ' E,' + info.long +  ' N, </div>';

        google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent('<h2>' + marker.title + '</h2>' +
              marker.content);
            infoWindow.open($scope.map, marker);
        });

        $scope.markers.push(marker);

    }

    for (i = 0; i < cities.length; i++){
        createMarker(cities[i]);
    }

    $scope.openInfoWindow = function(e, selectedMarker){
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
    }

});
