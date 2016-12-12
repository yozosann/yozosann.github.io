// SnowFly
function Fly(){
  var snow = {};
  var snowFlakeURI = ['images/snowflake/snowflake1.png',
					  'images/snowflake/snowflake2.png',
					  'images/snowflake/snowflake3.png',
					  'images/snowflake/snowflake4.png',
					  'images/snowflake/snowflake5.png',
					  'images/snowflake/snowflake6.png'];
					  
  var visualWidth = container.offsetWidth;
  var visualHeight = container.offsetHeight;
  
  function snowflake(){
	  var flakeContainer = document.getElementById("snowflake");
	  function getImagesNames(){
		  return 	snowFlakeURI[Math.floor(Math.random()*6)];}
	  function createSnowBox(){
		  var url = getImagesNames();
		  var newSnow = document.createElement("div");
		  newSnow.className = 'snowRoll';
		  newSnow.style.width ='41px';
		  newSnow.style.height = '41px';
		  newSnow.style.position = 'absolute';
		  newSnow.style.backgroundSize = 'cover';
		  newSnow.style.zIndex = '100000';
		  newSnow.style.top = '-41px';
		  newSnow.style.backgroundImage = 'url(' + url + ')';
		  var startPositionLeft = visualWidth * Math.random() - 100,
			  startOpacity      = 1;
		  var randomStart = Math.random();
		  randomStart = randomStart < 0.5 ? startOpacity : randomStart;
		  
		  newSnow.style.left = startPositionLeft + 'px';
		  newSnow.style.opacity = randomStart;
		  
		  return newSnow;			
	  }
	  function snowFly(flake){		
		  var endPositionTop    = visualHeight - 40,
			  endPositionLeft   = visualWidth * Math.random() - 200 + Math.random() * 500,
			  duration          = visualHeight * 10 + Math.random() * 5000;
		  
		  flake.style.transitionProperty = 'all';
		  flake.style.left               = endPositionLeft + 'px';
		  flake.style.top                = endPositionTop + 'px';
		  flake.style.opacity            = 0.7;
		  flake.style.transitionDuration = duration + 'ms';
		  flake.style.transitionTimingFunction = 'ease-out';
		  setTimeout(removeSnow,50 + duration,flake);
	  }
	  function removeSnow(flake){
		  flakeContainer.removeChild(flake);
	  }
	  setInterval(function(){
		  var flake = createSnowBox();
		  flakeContainer.appendChild(flake);
		  setTimeout(snowFly,50,flake);
	  },200);
  }	
  snow.snowFlake = function(){
	  return snowflake();
	  }
  return snow;
}
