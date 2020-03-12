// 从 localStorage 取用户姓名

var first_name = localStorage.getItem("first_name");
var last_name = localStorage.getItem("last_name");

document.getElementById("full_name").innerHTML=first_name + " " + last_name;

function logout(){
    var request = new XMLHttpRequest();
    request.open("GET", "http://qcs-simcere-dev.usequantum.com.cn/facts_backend-2.6/rest/users/logout", false);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send();

    console.log(JSON.parse(request.responseText));
    localStorage.clear();
    window.location.href="login.html"

}