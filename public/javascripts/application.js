$(document).ready (function() {

  MonkeyInferno = {
    map: undefined,
    init:function(){
      this.drawMap();
      this.getRestaurantList();
      this.autoComplete();
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
        //Google says this value is set in meters. San Francisco is 47.6 square miles, 
        //which is 123 Kilometers, which is 123,000 meters; however, the generated points exceed the boundary of SF
        radius: '12000', 
        types: ["restaurant", "establishment"]
      };
      infowindow = new google.maps.InfoWindow();
      service = new google.maps.places.PlacesService(MonkeyInferno.map);
      service.search(request, MonkeyInferno.mapCallBack);
    },
    mapCallBack:function(results,status){
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          var place = results[i];
          MonkeyInferno.createMarker(place); 
        }
      }
    },
    createMarker:function(place){
      var placeLoc = place.geometry.location;
      var marker = new google.maps.Marker({
        map: MonkeyInferno.map,
        position: new google.maps.LatLng(placeLoc.lat(), placeLoc.lng())
      });
      google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
      });
    },
    autoComplete:function(){
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

         autocomplete = new google.maps.places.Autocomplete(input, options);
      });

    },
    getRestaurantList:function(){
      // $.ajax({
      //   url: '/get_restaurants',
      //   dataType: 'json',
      //   success:function(res){
      //     var restaurants = res.results;
      //     for(r in restaurants){
      //       $('#restaurants').append( '<li>' + 
      //                                 '<img src=' + restaurants[r].icon +' alt=' + restaurants[r].name + '/>' + 
      //                                 '<span>' + restaurants[r].name + '</span>' +
      //                                 '<div>' + restaurants[r].vicinity + '</div>' +
      //                                 '</li>');
      //     }
      //   },
      //   error:function(res){
      //     alert("There was an error!");
      //   }
      // })
    }
  }
  	
  MonkeyInferno.init();
  	
});