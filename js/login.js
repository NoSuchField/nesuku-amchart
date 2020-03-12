function login(){
    // 获取 username 以及 password
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // 发送 POST 请求登录

    // 创建 XMLHttpRequest 对象
    var request = new XMLHttpRequest();

    
    // 请求参数

    request.open("POST", "http://qcs-simcere-dev.usequantum.com.cn/facts_backend-2.6/rest/permissions/login", false);
    
    // 设置请求头
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    // 登录
    var data = JSON.stringify({"userName":username,"password":password});

    request.send(data);

    // 保存返回结果
    var response = JSON.parse(request.responseText);

    // 保存 token
    if(response.DATA){
        // 登录成功
        localStorage.setItem("token", response.DATA.token);

        // 保存其他信息
        localStorage.setItem("first_name", response.DATA.userFirstName);
        localStorage.setItem("last_name", response.DATA.userLastName);

        // TODO 跳转页面
        window.location.href="index.html";
    }else{
        // 登录失败
        alert(response.MSG);
    }
    

    console.log(request.responseText);
}