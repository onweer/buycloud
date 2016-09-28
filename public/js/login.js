/**
 * Created by peng on 16/9/27.
 */

function goReg() {
    var id1 = document.getElementById("login");
    var id2 = document.getElementById("register");
    id1.style.display="none";
    id2.style.display="block";
}
function goLogin(){
    var id1 = document.getElementById("login");
    var id2 = document.getElementById("register");
    id1.style.display="block";
    id2.style.display="none";
}
function show() {
    var item = document.getElementById("lId");
    item.style.display="block";

}
