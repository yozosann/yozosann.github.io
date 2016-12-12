

//跨浏览器事件处理函数单元
var EventUtil = {
    //添加事件处理函数
    addHandler: function (element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        }
        else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        }
        else {
            element["on" + type] = handler;
        }
    },

    //删除事件处理函数
    removeHandler: function (element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        }
        else if (element.detachEvent) {
            element.detachEvent("on" + type, handler);
        }
        else {
            element["on" + type] = null;
        }
    },

    //获取事件
    getEvent: function (event) {
        return event ? event : window.event;
    },

    //获取事件目标
    getTarget: function (event) {
        return event.target || event.srcElement;
    },

    //取消默认行为
    preventDefault: function (event) {
        if (event.preventDefault) {
            event.preventDefault();
        }
        else {
            event.returnValue = false;
        }
    },

    //取消冒泡
    stopPropagation: function (event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        }
        else {
            event.cancelBubble = true;
        }
    },

    //兼容性滚轮操作
    getWheelDelta: function (event) {
        var userAgent = window.navigator.userAgent.toLowerCase();

        if (event.wheelDelta) {
            return (userAgent.indexOf('opera') >= 0 ) ? -wheelDelta : event.wheelDelta;
        }
        else
        {
            return -event.detail * 40;
        }
    }
}

//类操作
var classUtil =
    {
        addClass: function (elem, classN) {
            if (elem.className == "") { elem.className = classN; }
            else if (elem.className.match(new RegExp("(\\s|^)" + classN + "(\\s|$)"))) {
                elem.className = elem.className;
            }
            else { elem.className += " " + classN; }
        },

        removeClass: function (elem, classN) {
            if (elem.className.match(new RegExp("(\\s|^)" + classN + "(\\s|$)")))
                elem.className = elem.className.replace(new RegExp("(\\s|^)" + classN + "(\\s|$)"), " ");
        }
    }

//获取视口大小
function getViewport() {
    if (window.innerWidth){
        return {
            width: window.innerWidth,
            height: window.innerHeight
        };
    }
    else if (document.compatMode == "BackCompat") {
        return {
            width: document.body.clientHeight,
            height: document.body.clientWidth
        };
    }
    else {
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        };
    }
}

//将px数据字符串转为float型
function pxToFloat(nowPos) {
    var begin, end;
    if (nowPos.indexOf('translate') != -1)
    {
        begin = nowPos.indexOf('translate') + 11;
        end = nowPos.indexOf('p', begin);
        return nowPos = parseFloat(nowPos.substring(begin, end));
    }
    else if (nowPos.indexOf('rotate') != -1) {
        begin = nowPos.indexOf('rotate') + 8;
        end = nowPos.indexOf('deg', begin);
        return nowPos = parseFloat(nowPos.substring(begin, end));
    }
    else
    {
        end = nowPos.indexOf('p');
        return nowPos = parseFloat(nowPos.substring(0, end));
    }
}

//打字机单元
var WriteUtil = {
    typeWrite: function (string) {
        var oldNode = document.querySelector("#code");

        var index = 0;
        var nodeParent = oldNode.parentElement;
        var node = oldNode.cloneNode();
        nodeParent.removeChild(oldNode);
        nodeParent.appendChild(node);

        var timer = setInterval(function () {
            var current = string.substr(index, 1);
            if (current == '<') {
                index = string.indexOf('>', index) + 1;
            }
            else {
                index++
            }
            node.innerHTML = string.substring(0, index) + (index & 1 ? '_' : '');
            if (index >= string.length) {
                clearInterval(timer);
            }
        }, 75);
    }
}

var RandomUtil = {

    //产生随机数
    randomNum: function (x, y) {
        return Math.floor(Math.random() * (y - x + 1) + x);
    },

    //产生随机颜色
    randomColor: function () {
        return "rgb(" + this.randomNum(0, 255) + "," + this.randomNum(0, 255) + "," + this.randomNum(0, 255) + ")";
    }
}

//返回当前时间
function now() {
    return window.performance && window.performance.webkitNow ? performance.webkitNow() : new Date().getTime();
}






