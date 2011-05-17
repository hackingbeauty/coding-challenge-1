$(document).ready (function() {

  MonkeyInferno = {
    map: undefined,
    infowindow: undefined,
    service:undefined,
    autocomplete:undefined,
    results:undefined,
    init:function(){
      this.drawMap();
      this.automaticCompletion();
      this.onSubmitPress();
    },
    drawMap: function(){
      var sf = new google.maps.LatLng(37.77493,-122.41942);
      MonkeyInferno.map = new google.maps.Map(document.getElementById('map'), {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: sf,
        zoom: 12
      });
      var request = {
        location: sf,
        radius: '12000', 
        types: ["restaurant", "establishment"]
      };
      MonkeyInferno.infowindow = new google.maps.InfoWindow();
      MonkeyInferno.service = new google.maps.places.PlacesService(MonkeyInferno.map);
      MonkeyInferno.service.search(request, MonkeyInferno.mapCallBack);
    },
    mapCallBack:function(results,status){
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        MonkeyInferno.results = results;
        for (var i = 0; i < results.length; i++) {
          var place = results[i];
          MonkeyInferno.createMarker(place); 
        }
        MonkeyInferno.showResultsList(results);
      }
    },
    createMarker:function(place){
      var placeLoc = place.geometry.location;
      var marker = new google.maps.Marker({
        map: MonkeyInferno.map,
        position: new google.maps.LatLng(placeLoc.lat(), placeLoc.lng())
      });
      google.maps.event.addListener(marker, 'click', function() {
        MonkeyInferno.infowindow.setContent(place.name);
        MonkeyInferno.infowindow.open(map, this);
      });
    },
    automaticCompletion:function(){
      var bounds, southWestLat, southWestLong, northEastLat, northEastLong;
      google.maps.event.addListenerOnce(MonkeyInferno.map, 'bounds_changed', function(){
         bounds = this.getBounds();
         southWestLat = bounds.getSouthWest().Ja;
         southWestLong = bounds.getSouthWest().Ka;
         northEastLat = bounds.getNorthEast().Ja;
         northEastLong = bounds.getNorthEast().Ka;
         var defaultBounds = new google.maps.LatLngBounds(
           new google.maps.LatLng(southWestLat,southWestLong),
           new google.maps.LatLng(northEastLat,northEastLong)
         );
         var input = document.getElementById('searchInput');
         var options = {
           bounds: defaultBounds,
           types: ["restaurant", "establishment"]
         };
         MonkeyInferno.autocomplete = new google.maps.places.Autocomplete(input, options);
         MonkeyInferno.onResultSelected();
      });
    },
    showResultsList:function(results){
      $('ul#results').empty();
      for(r in results){
        $('#results').append( '<li>' + 
                              '<img src=' + results[r].icon +' alt=' + results[r].name + '/>' + 
                              '<span>' + results[r].name + '</span>' +
                              '<div>' + results[r].vicinity + '</div>' +
                              '</li>');
      }
    },
    onSubmitPress:function(){
      $('form#searchForm').submit(function(e){
        return false;
      });
    },
    onResultSelected:function(){
      google.maps.event.addListener(MonkeyInferno.autocomplete, 'place_changed', function() {
        MonkeyInferno.showSelectedResult(MonkeyInferno.autocomplete.getPlace());
      });
    },
    showSelectedResult:function(result){
      $('ul#results').empty();
      $('#results').append( '<li>' + 
                            '<img src=' + result.icon +' alt=' + result.name + '/>' + 
                            '<span>' + result.name + '</span>' +
                            '<div>' + result.vicinity + '</div>' +
                            '</li>');

    }

  }
  	
  MonkeyInferno.init();
  	
});