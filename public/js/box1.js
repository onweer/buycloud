/**
 * Created by Administrator on 2016/9/22.
 */

var time      = null;
var autoTime   = null;
var ms         = 100;
var autoMs     = 3000;
var iTarget    = 0;
var speed      = 0;
var nextTarget = 0;

window.onload  = function()
{
    var obj    = document.getElementById('play');
    var oOl    = obj.getElementsByTagName('ol')[0];
    var aLis   = oOl.getElementsByTagName('li');
    var oUl    = obj.getElementsByTagName('ul')[0];
    var oUlLis = oUl.getElementsByTagName('li');
    var oPrev  = obj.getElementsByTagName('p')[0];
    var oNext  = obj.getElementsByTagName('p')[1];

    oUl.style.width = oUlLis.length * oUlLis[0].offsetWidth + "px";

    for( var i = 0; i < aLis.length; i+=1 )
    {
        aLis[i].onmouseover = getIndx;
    }

    obj.onmouseover = function()
    {
        clearInterval(currentTime);
    }
    obj.onmouseout = function()
    {
        if(currentTime)
        {
            clearInterval(currentTime);
        }
        currentTime = setInterval("autoPlay()",autoMs);
    }

    oPrev.onmousedown = fnPrev;
    oNext.onmousedown = fnNext;

    currentTime = setInterval("autoPlay()",autoMs);
}

// 前一张
function fnPrev()
{
    var obj    = document.getElementById('play');
    var oOl    = obj.getElementsByTagName('ol')[0];
    var aLis   = oOl.getElementsByTagName('li');
    nextTarget-=1;
    if(nextTarget < 0){ nextTarget = aLis.length-1; }
    goTime(nextTarget);
}

// 后一张
function fnNext()
{
    var obj    = document.getElementById('play');
    var oOl    = obj.getElementsByTagName('ol')[0];
    var aLis   = oOl.getElementsByTagName('li');
    nextTarget+=1;
    if(nextTarget === aLis.length){ nextTarget = 0; }
    goTime(nextTarget);
}

// 自动播放
function autoPlay()
{
    var obj    = document.getElementById('play');
    var oOl    = obj.getElementsByTagName('ol')[0];
    var aLis   = oOl.getElementsByTagName('li');

    nextTarget+=1;
    if( nextTarget >= aLis.length ) { nextTarget = 0; }
    goTime(nextTarget)
}

// 获取当前的索引值
function getIndx()
{
    var obj    = document.getElementById('play');
    var oOl    = obj.getElementsByTagName('ol')[0];
    var aLis   = oOl.getElementsByTagName('li');

    for( var i = 0; i < aLis.length; i+=1 )
    {
        if(aLis[i] === this)
        {
            goTime(i);
        }
    }
}

// 开始启动
function goTime(index)
{
    var obj      = document.getElementById('play');
    var oUl      = obj.getElementsByTagName('ul')[0];
    var oOl      = obj.getElementsByTagName('ol')[0];
    var aLis     = oOl.getElementsByTagName('li');
    var iLiWidth = oUl.getElementsByTagName('li')[0].offsetWidth;

    for( var i = 0; i < aLis.length; i+=1 )
    {
        aLis[i].className = "";
    }
    aLis[index].className = "active";

    iTarget = -index * iLiWidth;

    if(time){ clearInterval(time); }
    time = setInterval("doMove("+ iTarget +")",ms)
    doMove(iTarget);
}

// 图片滑动
function doMove(target)
{
    var obj = document.getElementById('play');
    var oUl = obj.getElementsByTagName('ul')[0];

    oUl.style.left = speed + "px";
    speed+=(target - oUl.offsetLeft)/3;

    if( Math.abs(target-oUl.offsetLeft) === 0 )
    {
        oUl.style.left = target + "px";
        clearInterval(timer); timer = null;
    }


}

//进度条


function progressFn(cent){
    var cent=10;

    var oDiv1=document.getElementsByClassName('progressBox');
    var oDiv2=document.getElementsByClassName('progressBar');
    var oBtn=document.getElementsByClassName('button1');
    var i;
    for (i = 0; i < oDiv1.length; i++) {
        var allWidth = parseInt(getStyle(oDiv1[i],'width'));
        oDiv2[i].style.clip = 'rect(0px,'+ cent/100 * allWidth +'px,40px,0px)';
    }
    //var oDiv1 = document.getElementById('progressBox');
    //var oDiv2 = document.getElementById('progressBar');
    //var allWidth = parseInt(getStyle(oDiv1[0],'width'));
    //oDiv2[0].style.clip = 'rect(0px,'+ cent/100 * allWidth +'px,40px,0px)';

    function getStyle(obj,attr){
        if(obj.currentStyle){
            return obj.currentStyle[attr];
        }
        else{
            return getComputedStyle(obj,false)[attr];
        }
    }
}
