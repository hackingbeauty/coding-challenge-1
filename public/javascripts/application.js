$(document).ready (function() {

  CodingChallenge1 = {
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
      CodingChallenge1.map = new google.maps.Map(document.getElementById('map'), {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: sf,
        zoom: 12
      });
      var request = {
        location: sf,
        radius: '12000', 
        types: ["restaurant", "establishment"]
      };
      CodingChallenge1.infowindow = new google.maps.InfoWindow();
      CodingChallenge1.service = new google.maps.places.PlacesService(CodingChallenge1.map);
      CodingChallenge1.service.search(request, CodingChallenge1.mapCallBack);
    },
    mapCallBack:function(results,status){
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        CodingChallenge1.results = results;
        for (var i = 0; i < results.length; i++) {
          var place = results[i];
          CodingChallenge1.createMarker(place); 
        }
        CodingChallenge1.showResultsList(results);
      }
    },
    createMarker:function(place){
      var placeLoc = place.geometry.location;
      var marker = new google.maps.Marker({
        map: CodingChallenge1.map,
        position: new google.maps.LatLng(placeLoc.lat(), placeLoc.lng())
      });
      google.maps.event.addListener(marker, 'click', function() {
        CodingChallenge1.infowindow.setContent(place.name);
        CodingChallenge1.infowindow.open(map, this);
      });
    },
    automaticCompletion:function(){
      var bounds, southWestLat, southWestLong, northEastLat, northEastLong;
      google.maps.event.addListenerOnce(CodingChallenge1.map, 'bounds_changed', function(){
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
         CodingChallenge1.autocomplete = new google.maps.places.Autocomplete(input, options);
         CodingChallenge1.onResultSelected();
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
      google.maps.event.addListener(CodingChallenge1.autocomplete, 'place_changed', function() {
        CodingChallenge1.showSelectedResult(CodingChallenge1.autocomplete.getPlace());
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
  	
  CodingChallenge1.init();
  	
});