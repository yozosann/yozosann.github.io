// JavaScript Document
	function addClass(elem,classN){
		 if(elem.className == ""){elem.className = classN;}
		 else if(elem.className.match( new RegExp( "(\\s|^)" + classN + "(\\s|$)") )){
			 elem.className = elem.className;
			 }
		 else {elem.className +=" " + classN; }
	}
	function removeClass(elem,classN){
		if(elem.className.match( new RegExp( "(\\s|^)" + classN + "(\\s|$)") ))
		elem.className = elem.className.replace( new RegExp( "(\\s|^)" + classN + "(\\s|$)" )," " );
	}
function listenEvent(eventTarget,eventType,eventHandler){
	if(eventTarget.addEventListener){
		eventTarget.addEventListener(eventType,eventHandler,false);
	}else if(eventTarget.attachEvent){
		eventType = "on" + eventType;
		eventTarget.attachEvent(eventType,eventHandler);
	}else{
		eventTarget["on"+eventType] = eventHandler;
	}
}