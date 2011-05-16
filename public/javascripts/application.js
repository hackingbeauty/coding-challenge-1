$(document).ready (function() {

  MonkeyInferno = {
    getRestaurants:function(){
      $.ajax({
        url: '/get_restaurants',
        dataType: 'json',
        success:function(res){
          console.log(res);
          var restaurants = res.results;
          for(r in restaurants){
            console.log(restaurants[r]);
            $('#restaurants').append( '<li>' + 
                                        '<img src=' + restaurants[r].icon +' alt=' + restaurants[r].name + '/>' + 
                                        '<span>' + restaurants[r].name + '</span>' +
                                        '<div>' + restaurants[r].vicinity + '</div>' +
                                      '</li>');
          }
          return res;
        },
        error:function(res){
          alert("There was an error!");
        }
      })
    }
  }
  
  MonkeyInferno.getRestaurants();
	
});