angular.module('clock.no320.services',[])

.constant('DEFAULT_SETTINGS', {
  'tempUnits': 'f'
})

.factory('HelloService', function($rootScope, DEFAULT_SETTINGS) {
    var obj = {			
	    sayHello: function() {
	      console.log('hello service')
	    }
  }

  return obj;
})


.factory('DateUtils', function($rootScope, DEFAULT_SETTINGS) {
	
	/**
	 * _count_time('19860317')
	 */
	function _count_time(birthday){
		var year = birthday.substring(0,4)
		var month = birthday.substring(4,6)
		var day = birthday.substring(6,8)
	
		var old = new Date();
		old.setFullYear(year);
		old.setMonth(month);
		old.setDate(day);
	
		var all_days = 80*365;
	
		var d = new Date();
	
		var y = d.getFullYear();
		var m = d.getMonth();
		var dd = d.getDate();
	
		var ke_yong = (80 - (y - parseInt(year) ) )*365 + (12-m)*30 + (31-dd)
	
		var leaving_day = all_days - ke_yong -1;
	
		// 你还可以活XX年，你的生命还剩XX天，XX小时，XX分，XX秒
	 
		var yy = (80 - (y - parseInt(year) ) ) - 1
	
		var h = 24 - d.getHours() - 1;
	
		var mm =  (60 - d.getMinutes() )
		var ss =  (60 - d.getSeconds() )

		var text = ('你还可以活'+ yy +'年，你的生命还剩' + leaving_day+ '天，'+h+'小时，'+mm+'分，'+ss+'秒 ');
		_write_to_html(text);
		
		setTimeout(function(){
			_count_time(birthday)
		},1000);
	
	}
	
	function _write_to_html(text){
		var leaving_time_show = document.getElementById('leaving_time_show');
		angular.element(leaving_time_show).html(text);
	}
		
  return {
		count_time:function(birthday){
			_count_time(birthday)
		}
	
  };
})
