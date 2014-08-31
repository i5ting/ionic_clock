
angular.module('starter.controllers', [])


.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  },

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('UserInfoCtrl', function($scope, $ionicModal, $timeout) {
	$scope.user = JSON.parse(window.localStorage['user']);
	
	$scope.$on('$viewContentLoaded', function(e, d) {
	  console.log('UserInfoCtrl viewContentLoaded......');
	
	});
})

.controller('LastWordListCtrl', function($scope, $ionicModal, $timeout) {
	
	$scope.$on('$viewContentLoaded', function(e, d) {
	  console.log('LastWordListCtrl viewContentLoaded......');
 
		$scope.data = [];
		var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024); 

		db.transaction(function (tx) {            
			tx.executeSql('SELECT * FROM last_word order by id desc',[],function(tx,result){
				console.log(result)
			  var len=result.rows.length;
			  var msg = "<p>Found rows: " + len + "</p>";  
			    
	      for(var i = 0; i < len ; i++){
	       	var str = result.rows.item(i);
					console.log(str)
					var obj={'title':str['content'],'date':str['date']};
					
					$scope.data.push(obj);
	      }
						
			});
									 
		});
		
		
	});
})


.controller('LastWordCtrl', function($scope, $ionicModal, $timeout, $state) {
	 
	$scope.$on('$viewContentLoaded', function(e, d) {
	  console.log('LastWordCtrl viewContentLoaded......');
	
	});
	
	$scope.save_last_word = function(){
	
		var d = new Date();
	
		var y = d.getFullYear();
		var m = d.getMonth();
		var dd = d.getDate();	
		var h =  d.getHours();
		var mm = d.getMinutes();
		var ss = d.getSeconds() ;

		var datetime = y+'-'+m+'-'+dd+' '+h+':'+mm+':'+ss;
		var c = angular.element(document.getElementById('last_word_content')).val();
		var sql = "INSERT INTO last_word (content,date) values ('"+c+"','"+datetime+"')";
		console.log('sql = ' +sql);
		
		var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024); 

		db.transaction(function (tx) {            
			tx.executeSql(sql);
		});
		
		alert('发表成功');
		$state.go('app.index');
		
	}
})


.controller('LoginCtrl', function($scope, $ionicModal, $timeout, $compile) {
 	$scope.right_click = function(){
 		alert('点击登录按钮');
 	}
	var i = $compile("<button ng-click='right_click()'>登录</button>")($scope);
 
	$scope.$on('$viewContentLoaded', function(e, d) {
		console.log('PlaylistCtrl viewContentLoaded......');
		
		if(d.url == "/app/login"){	
			var back_btn = document.getElementsByTagName('ion-nav-back-button')[0];	
			angular.element(back_btn).html('<i class="icon ion-ios7-arrow-back"></i>');
		
			var right_btn = angular.element(back_btn).parent().find('div')[1];
			angular.element(right_btn).html('').append(i);
		}

	});
	
})

.controller('HomeCtrl', function($scope,$ionicModal,DateUtils,ImageWithTime,$state, StateManager) {
	
	var stage = new PIXI.Stage(0xFFFFFF, true);
	stage.setInteractive(true);
	
	// create a renderer instance
	var renderer = PIXI.autoDetectRenderer(320, 300);
	
	$scope.$on('$viewContentLoaded', function(e, d) {
	  console.log('HOME ctrl viewContentLoaded......');
		StateManager.change($scope, e, d);
	});
		
	/**
	$scope.$on('$viewContentLoaded', function(e, d) {
		

		var back_btn = document.getElementsByTagName('ion-nav-back-button')[0];	
		// angular.element(back_btn).html('<i class="icon ion-ios7-arrow-back"></i>自定义左侧按钮');
	
		var right_btn = angular.element(back_btn).parent().find('div')[1];
		angular.element(right_btn).html('');
		
		
		renderer.view.style.display = "block";

		requestAnimFrame(animate);

		// create a texture from an image path
		var texture = PIXI.Texture.fromImage("img/sxl.png");

		// create a new Sprite using the texture
		var bunny = new PIXI.Sprite(texture);
		// enable the bunny to be interactive.. this will allow it to respond to mouse and touch events
		bunny.interactive = true;
		// this button mode will mean the hand cursor appears when you rollover the bunny with your mouse
		bunny.buttonMode = true;

		// center the sprites anchor point
		bunny.anchor.x = 0.5;
		bunny.anchor.y = 0.5;

		// move the sprite to the center of the screen
		bunny.position.x = 150;
		bunny.position.y = 200;

		stage.addChild(bunny);


		var graphics = new PIXI.Graphics();
	
		draw_life(graphics);

		stage.addChild(graphics);
	
		// let's create moving shape
		var thing = new PIXI.Graphics();
		stage.addChild(thing);
		thing.position.x = 400/2;
		thing.position.y = 400/2;
	
		var count = 0;
		
		function animate(time) {
		    requestAnimFrame(animate);

		    // just for fun, let's rotate mr rabbit a little
		     bunny.rotation += 0.005;

				bunny.scale = new PIXI.Point(.7,1);
				bunny.alpha = .9;
				
				// bunny.position = new PIXI.Point(300,150);
				 
		    // render the stage
		    renderer.render(stage);
			
			// requestAnimationFrame( animate );

			TWEEN.update( time );
			 
			
		}
		
		function draw_life(graphics){
			graphics.beginFill(0xB5AA75);
			graphics.lineStyle(2, 0x8BB575, 1);

			// // draw a rectangle
			// graphics.drawRect(50, 20, 300, 10);
	
			init();
			animate();
		}
		
		
		var elems = [];

		function init() {

			elems = [];
			
			for(var i = 0;i < 10;i++ ){
			 	var startValue = 300 + (Math.random() - Math.random()) * 250;
				var endValue = 300 + (Math.random() - Math.random()) * 250;

				var domElement = document.createElement('div');
				var bg = (Math.random() * 0xffffff) >> 0;
				
				domElement.style.position = 'absolute';
				domElement.style.top = 71+30*i+ 'px';
				domElement.style.left =  '75px';
				domElement.style.background = '#' + bg.toString(16);
				domElement.style.width = '150px';
				domElement.style.height = '20px';

				var elem = { x: 50, domElement: domElement };

				var updateCallback = function() {
					this.domElement.style.left = this.x + 'px';
				}

				var tween = new TWEEN.Tween(elem)
					.to({ x: 151 }, 4000)
					.delay(Math.random() * 1000)
					.onUpdate(updateCallback)
					.easing(TWEEN.Easing.Back.Out)
					.start();

				var tweenBack = new TWEEN.Tween(elem, false)
					.to({ x: startValue}, 4000)
					.delay(Math.random() * 1000)
					.onUpdate(updateCallback)
					.easing(TWEEN.Easing.Elastic.InOut);

				// tween.chain(tweenBack);
				// tweenBack.chain(tween);

				canvas.appendChild(elem.domElement);

				elems.push(elem);
			}
		}

		function animate1( time ) {
			requestAnimationFrame( animate );
			TWEEN.update( time );
		}
		
	});
	*/
	
	$scope.share_last_word = function(){
		$scope.last_word_modal.show();
	}
	
	$scope.dismiss_share_last_word = function(){
		$scope.last_word_modal.hide();
	}
	
	$scope.write_a_last_word = function(){
		$scope.dismiss_share_last_word();
		$state.go('app.lastword');
	}
	
	$scope.create_account = function(){
		alert('创建用户成功，马上开启死亡时钟之旅');
		console.log('create_account ing.....');
		
		var user = {
			'name':document.getElementById('user_name').value,
			'city':document.getElementById('user_city').value,
			'birthday':document.getElementById('user_birthday').value,
			'avatar':document.getElementById('user_avatar').value
		}
		
		localStorage.setItem('user',JSON.stringify(user));
		
		$scope.modal.hide();
	}
	
	// localStorage.removeItem('user');
	// localStorage.setItem('user',{
// 		name:'alred sang',
// 		birthday:'1986-03-17'
// 	});
//	
	// $scope.create_role = function(){

  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });
	
	$ionicModal.fromTemplateUrl('templates/home/create_role.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
	
	
	
	$ionicModal.fromTemplateUrl('templates/home/last_word.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.last_word_modal = modal;
  });
	
	
	
	setTimeout(function(){
		
		if(localStorage.getItem('user')){
			// alert('user exist');
		
		}else{
			// alert('user not exiest');
			$scope.modal.show();
		}
	 
	},1000);
	
	window.currentState = $state;
	window.show_last_word = true;
	
	$scope.state = function(){
		alert(111);
	};
	
	if(JSON.parse(window.localStorage['user'])){
		var user = JSON.parse(window.localStorage['user']);
		var birthday = user.birthday;
		
		// alert(birthday)
		DateUtils.count_time(birthday)
		ImageWithTime.count_time(birthday,$scope)
			 
	}
	
})

.controller('SecondCtrl', function($scope,$ionicNavBarDelegate, $state) {

	var back_btn = document.getElementsByTagName('ion-nav-bar')[0];

	angular.element(back_btn).bind('click',function(){
		
		$state.go('app.index');
	});
	
	
	$scope.$on('$viewContentLoaded', function(e, d) {
	  console.log('SecondCtrl viewContentLoaded......');

		// $ionicNavBarDelegate.setTitle('second page');
		
	});

 

	
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: '设置', id: 1 },
    { title: '音量音效', id: 2 },
    { title: '个人信息', id: 3 ,url: '#/app/user_info'}
  ];
	
	$scope.$on('$viewContentLoaded', function(e, d) {
	  console.log('PlaylistsCtrl viewContentLoaded......');
	
		// var right_btn = document.getElementsByTagName('div').hasClass('right-buttons');
		if(d.url == "/app/playlists"){
			var back_btn = document.getElementsByTagName('ion-nav-bar')[0];	
		
			var right_btn = angular.element(back_btn).find('div')[1];
			angular.element(right_btn).html('');
		}

	});
})

.controller('PlaylistCtrl', function($scope, $stateParams,$ionicNavBarDelegate,$compile) {
 	$scope.right_click = function(){
 		alert('right_click');
 	}
	var i = $compile("<button ng-click='right_click()'>right</button>")($scope);
	
	$scope.setNavTitle = function(title) {
    $ionicNavBarDelegate.setTitle(title);
  }

	$scope.$on('$viewContentLoaded', function(e, d) {
		console.log('PlaylistCtrl viewContentLoaded......');
		
		if(d.url == "/app/playlists/3"){	
			var back_btn = document.getElementsByTagName('ion-nav-back-button')[0];	
			angular.element(back_btn).html('<i class="icon ion-ios7-arrow-back"></i>返回');
		
			var right_btn = angular.element(back_btn).parent().find('div')[1];
			angular.element(right_btn).html('').append(i);
		}else if(d.url == "/app/playlists/2"){
			var back_btn = document.getElementsByTagName('ion-nav-back-button')[0];	
			angular.element(back_btn).html('<i class="icon ion-ios7-arrow-back"></i>返回');
			
			var right_btn = angular.element(back_btn).parent().find('div')[1];
			angular.element(right_btn).html('').html('');
			
		}else{
			var back_btn = document.getElementsByTagName('ion-nav-back-button')[0];	
			angular.element(back_btn).html('<i class="icon ion-ios7-arrow-back"></i>Back');
			
			var right_btn = angular.element(back_btn).parent().find('div')[1];
			angular.element(right_btn).html('').html('');
		}

	});
	 
})

/**** Home ****/ 
.controller('CreateRoleCtrl', function($scope,$ionicModal) {

	
		
		
})
