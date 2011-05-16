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
          MonkeyInferno.drawGoogleMap();
        },
        error:function(res){
          alert("There was an error!");
        }
      })
    },
    drawGoogleMap:function(){
      console.log("inside drawMapPoints");
    }
  }
  
  MonkeyInferno.getRestaurants();
	
});