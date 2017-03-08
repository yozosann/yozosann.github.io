////////////////////////////////////////////////////////
//===================动画处理============================ //
////////////////////////////////////////////////////////
function BoyWalk(){
	var boyWalk = {};
	var container = document.getElementById("content");
var visualWidth = container.offsetWidth;
var visualHeight = container.offsetHeight;

//获取数据
var getValue = function(className){
	 var elem = document.getElementsByClassName(className)[0];
	 return {
                height: elem.offsetHeight,
                top: elem.offsetTop
            };
	}

//路的Y轴
var pathY = function(){
		var data = getValue("a_background_middle");
		return data.top + data.height / 2;
	}
	
var boy = document.getElementById("boy");
//var $boy = $("#boy");
var boyHeight = boy.offsetHeight;

//修正小男孩位置
boy.style.top = pathY() - boyHeight + 25 + 'px';

//暂停走路
function pauseWalk(){
	addClass(boy,"pauseWalk");
	}

// 恢复走路
function restoreWalk() {
    removeClass(boy,"pauseWalk");
}

// css3的动作变化
function slowWalk() {
    addClass(boy,"slowWalk");
}

// 计算移动距离
function calculateDist(direction, proportion) {
    return (direction == "x" ?
        visualWidth : visualHeight) * proportion;
}

// 用transition做运动
function stratRun(x,y, runTime) {
    // 恢复走路
    restoreWalk();
    // 运动的属性
	 boy.style.left = x + 'px';
	 boy.style.top = y + 'px';
	 boy.style.transitionProperty = 'all';
	 boy.style.transitionDuration = runTime + 'ms';
	 boy.style.transitionTimingFunction = 'linear';
}

// 开始走路
function walkRun(time, dist, disY) {
    time = time || 3000;
    // 脚动作
    slowWalk();
    // 开始走路
	stratRun(dist, disY, time)
}

//走进商店
function walkToShop(runTime){
	    restoreWalk();
	var doorObj = document.getElementsByClassName("door")[0];
	var shop = document.getElementsByClassName("shop")[0];
	var doorOffsetLeft = doorObj.offsetLeft + shop.offsetLeft;
	var boyOffsetLeft = boy.offsetLeft;
	var instanceX = (doorOffsetLeft + doorObj.offsetWidth / 2 ) - (boyOffsetLeft + boy.offsetWidth / 2);
	boy.style.transitionDuration = runTime + 'ms';
//	boy.style.transform = 'translateX(' + instanceX + 'px),scale(0.3,0.3)';
    boy.style.transform = 'matrix(0.5,0,0,0.5,' + instanceX + ',0)';
	boy.style.opacity = 0.1;
}


//走出商店
function walkOutShop(runTime){	
	var doorObj = document.getElementsByClassName("door")[0];
	var shop = document.getElementsByClassName("shop")[0];
	var doorOffsetLeft = doorObj.offsetLeft + shop.offsetLeft;
	var boyOffsetLeft = boy.offsetLeft;
	var instanceX = (doorOffsetLeft + doorObj.offsetWidth / 2 ) - (boyOffsetLeft + boy.offsetWidth / 2);
//	boy.style.transform = 'translateX(' + instanceX + 'px),scale(1,1)';
	boy.style.transform = 'matrix(1,0,0,1,' + instanceX + ',0)';
	boy.style.transitionDuration = runTime + 'ms';
	boy.style.opacity = 1;
}

function birdFly(){
	var bird = document.getElementsByClassName("bird")[0];
	bird.style.right = visualWidth + 'px';
	bird.style.transitionProperty = 'all';
	bird.style.transitionDuration = 15000 + 'ms';
	bird.style.transitionTimingFunction = 'linear';
	addClass(bird,"birdFly");
}

//取花
function takeFlower(){
	addClass(boy,'slowFlolerWalk');
	}

//返回给外部的接口
boyWalk.birdFly = function(){
	return birdFly();
	}
boyWalk.takeFlower = function(){
	return takeFlower();
	}
boyWalk.toShop = function(){
	return walkToShop.apply(null,arguments);
}
boyWalk.disappear = function(){
	boy.style.opacity = 0; 	
}
boyWalk.outShop = function(){
	return walkOutShop.apply(null,arguments);
}
boyWalk.walkTo = function(time,proportionX, proportionY){
	var distX = calculateDist('x', proportionX);
    var distY = calculateDist('y', proportionY);
	return walkRun(time,distX, distY);
}
boyWalk.stopWalk = function(){
	var left = boy.offsetLeft;
	var top = boy.offsetTop;
	boy.style.top = top + 'px';
	boy.style.left = left + 'px';
	pauseWalk();
}
boyWalk.setColor = function(value){
	boy.style.backgroundColor = value;
	}
boyWalk.rotate = function(){
	restoreWalk();
	addClass(boy,'boy-rotate');
	}
boyWalk.resetOriginal = function(){
	removeClass(boy,'slowWalk');
	removeClass(boy,'slowFlolerWalk');
	addClass(boy,'boyOriginal');
	}
return boyWalk;
}