/**
 * Created by Administrator on 2016/9/29.
 */
//商品下拉菜单
window.onload=function() {
    var oCdl_sp = document.getElementById('cdl_sp');
    var oCdlul = document.getElementById('cdlul');
    var time_ul = null;var time_ul2 = null;
    oCdl_sp.onmouseover = function () {
        startMove(400);
        clearTimeout(time_ul);
        time_ul = setTimeout(function(){
            oCdlul.style.display='block';
        },400);
        //oCdlul.style.display='block';
        clearTimeout(time_ul2);
    }

    oCdl_sp.onmouseout = function () {
        startMove(39);
        clearTimeout(time_ul2);
        time_ul2 = setTimeout(function(){
            oCdlul.style.display='none';
        },50);
        clearTimeout(time_ul);
    }
    var timer_sp = null;

    function startMove(iTarget) {
        var oCdl_sp = document.getElementById('cdl_sp');
        clearInterval(timer_sp);
        timer_sp = setInterval(function () {
            var iSpeed = (iTarget - oCdl_sp.offsetHeight) / 8;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            if (oCdl_sp.offsetHeight == iTarget) {
                clearInterval(timer_sp);
            }
            else {
                oCdl_sp.style.height = oCdl_sp.offsetHeight + iSpeed + 'px';
            }
        }, 30);
    }

}