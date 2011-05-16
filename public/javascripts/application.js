$(document).ready (function() {

  MonkeyInferno = {
    getRestaurants:function(){
      $.ajax({
        url: '/get_restaurants',
        dataType: 'json',
        success:function(res){
          var restaurants = res.results;
          console.log(restaurants);
          for(r in restaurants){
            $('#restaurants').append( '<li>' + 
                                      '<img src=' + restaurants[r].icon +' alt=' + restaurants[r].name + '/>' + 
                                      '<span>' + restaurants[r].name + '</span>' +
                                      '<div>' + restaurants[r].vicinity + '</div>' +
                                      '</li>');
          }
          MonkeyInferno.drawGoogleMap(restaurants);
        },
        error:function(res){
          alert("There was an error!");
        }
      })
    },
    drawGoogleMap:function(restaurants){
      var map = new GMap2(document.getElementById("map_canvas"));
      map.setCenter(new GLatLng(37.77493,-122.41942), 13);
      for(r in restaurants){
        // console.log("restaurants are " + restaurants[r].name + " " + restaurants[r].geometry.location.lat);
        var point = new GLatLng(restaurants[r].geometry.location.lat, restaurants[r].geometry.location.long);
        var marker = new GMarker(point);
        GEvent.addListener(marker, "click", function() {
          map.openInfoWindowHtml(marker);
        }); 
        map.addOverlay(marker);
        
      }
    }
  }
  
  MonkeyInferno.getRestaurants();
	
});