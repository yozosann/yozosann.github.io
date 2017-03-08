// JavaScript Document
function Swipe(container){
	 var element = container.getElementsByTagName("ul")[0];
	 var swipe = {};
     var slides = document.querySelectorAll(".content-wrap > li");
     var width = container.offsetWidth;
     var height = container.offsetHeight;
     element.style.width = width * slides.length + "px";
     element.style.height = height + "px";
     for(var i = 0; i<slides.length;i++){
	     slides[i].style.width = width + "px";
         slides[i].style.height = height + "px";
	 }
	 swipe.scrollTo = function(x,speed){
	 element.style.transitionTimingFunction = 'linear';
	 element.style.transitionDuration = speed + 'ms';
	 element.style.transform = 'translate3d(-' + x + 'px,0px,0px)';
	 return this;
	}
	
	return swipe;	
}