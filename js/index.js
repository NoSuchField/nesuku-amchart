// 从 localStorage 取用户姓名

var first_name = localStorage.getItem("first_name");
var last_name = localStorage.getItem("last_name");

// 获取 token
var token = localStorage.getItem("token");

// 没有token 直接返回登录页面
if (!token) {
    window.location.href = "/login.html";
}

document.getElementById("full_name").innerHTML = first_name + " " + last_name;

function logout() {
    var request = new XMLHttpRequest();
    request.open("GET", "http://qcs-simcere-dev.usequantum.com.cn/facts_backend-2.6/rest/users/logout", false);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send();

    console.log(JSON.parse(request.responseText));
    localStorage.clear();
    window.location.href = "login.html"

}

function query() {
    // 调用接口取数据
    var url = "http://qcs-simcere-dev.usequantum.com.cn/facts_backend-2.6/rest/training/records/list";
    var request = new XMLHttpRequest();
    request.open("POST", url, false)
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.setRequestHeader("token", token);
    request.send("{\"pagingTool\":{\"currentPage\":1,\"pageSize\":102400},\"queryOrderBies\":[{\"columnName\":\"class.name\",\"orderType\":\"asc\"}]}");
    return JSON.parse(request.responseText);
}


// chart

am4core.ready(function() {
    am4core.useTheme(am4themes_animated);

    var pieChart = am4core.create("chart1", am4charts.PieChart);
    pieChart.innerRadius = am4core.percent(30);


    // 创建 pieSeries
    var pieSeries = pieChart.series.push(new am4charts.PieSeries());

    // 设置 value & category
    pieSeries.dataFields.category = "name";
    pieSeries.dataFields.value = "count";

    pieSeries.slices.template.stroke = am4core.color("#FFFFFF");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpticity = 0.8;

    // 指针样式
    pieSeries.slices.template.cursorOverStyle = [{
        "property": "cursor",
        "value": "pointer"
    }];

    // 图例
    // Add a legend
    pieChart.legend = new am4charts.Legend();

    var resp = query();

    // 数据部分
    // {"name": "xxxx", "count": 12}
    var data = [];
    var org_list = [];

    // 遍历 Array
    var array = resp.DATA;

    for (var index = 0; index < array.length; index++) {
        const element = array[index];
        org_list = org_list.concat(element.employee.orgs);
    }

    // 去重

    var remove_dup_list = [];

    for (var index = 0; index < org_list.length; index++) {
        const element = org_list[index];

        // 统计组织架构出现的次数
        var org_id = element.id;

        if (remove_dup_list.indexOf(org_id) == -1) {
            remove_dup_list.push(org_id);
            // 名字
            var name = element.full_name;

            var org_list_filterd = org_list.filter(function(o) {
                return o.id == org_id;
            });

            var d = {
                "name": name,
                "count": org_list_filterd.length
            };

            if (data.length < 10) {
                data.push(d);
            } else {
                break;
            }

        }
    }

    pieChart.data = data;


    // var xyChart = am4core.create("chart2", am4charts.XYChart);

});