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
    request.open("GET", "http://qcs-simcere-dev.usequantum.com.cn/facts_backend-2.6/rest/users/logout", true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send();
    localStorage.clear();
    window.location.href = "login.html"
}

function query() {
    return new Promise(function(resolve) {
        // 调用接口取数据
        var url = "http://qcs-simcere-dev.usequantum.com.cn/facts_backend-2.6/rest/training/records/list";
        var request = new XMLHttpRequest();

        request.open("POST", url, true);
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.setRequestHeader("token", token);
        request.send("{\"pagingTool\":{\"currentPage\":1,\"pageSize\":102400},\"queryOrderBies\":[{\"columnName\":\"class.name\",\"orderType\":\"asc\"}]}");
        
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    r = JSON.parse(request.responseText);
                    resolve(r);
                }
            }
        }
    });
}

// Get attendance code information
function AH_code() {

    var url = "http://qcs-simcere-dev.usequantum.com.cn/facts_backend-2.6/rest/codes/childrenOf?codes=_TRAINING_AH";
    var request = new XMLHttpRequest();
    request.open("GET",url,false);
    request.setRequestHeader("token", token);
    request.send();

    return JSON.parse(request.responseText);
}

// chart

am4core.ready(function() {
    am4core.useTheme(am4themes_animated);

    var pieChart = am4core.create("chart1", am4charts.PieChart);
    pieChart.radius = am4core.percent(65);
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
    pieChart.legend.valueLabels.template.align = "right";
    pieChart.legend.valueLabels.template.textAlign = "end";  

    query().then(function(data){
        // PieChart
        var resp = data;
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

                data.push(d);

            }
        }

        data.sort((a,b) => (a.count<b.count) ? 1 : -1);
        data = data.slice(0,10);

        // title
        var title = pieChart.titles.create();
        title.text = "Lesson Attendance Distribution (by Organization)";
        title.fontSize = 20;
        title.marginTop = 15;


        pieChart.data = data;



        /////////////////////////        XY Chart         ////////////////////////////////////
        var xyChart = am4core.create("chart2", am4charts.XYChart);

        xyChart.colors.step = 2;

        // Legend position
        xyChart.legend = new am4charts.Legend();
        xyChart.legend.position = "right";
        xyChart.legend.valign = "top";

        xyChart.legend.labels.template.maxWidth = 150;

        xyChart.cursor = new am4charts.XYCursor();
        xyChart.cursor.lineY.disabled = true;
        xyChart.cursor.lineX.disabled = true;

        // title
        var title = xyChart.titles.create();
        title.text = "Attendance & Qualification Percentage (by Lesson)";
        title.fontSize = 20;
        title.marginBottom = 15;

        // Define x-axis
        var xAxis = xyChart.xAxes.push(new am4charts.CategoryAxis());
        xAxis.dataFields.category = 'Name';
        //xAxis.title.text = "Lesson Name";
        xAxis.renderer.labels.template.rotation = 45;
        xAxis.renderer.labels.template.verticalCenter = "middle";
        xAxis.renderer.labels.template.horizontalCenter = "left";
        xAxis.renderer.cellStartLocation = 0.1;
        xAxis.renderer.cellEndLocation = 0.9;
        xAxis.renderer.grid.template.location = 0;
        xAxis.renderer.minGridDistance = 30;
        xAxis.tooltip.disabled = true;

        /*xAxis.renderer.labels.template.adapter.add("dy", function(dy, target) {
            if (target.dataItem && target.dataItem.index & 2 == 2) {
            return dy + 15;
            }
            return dy;
        });*/

        // Define y-axis
        var yAxis = xyChart.yAxes.push(new am4charts.ValueAxis());
        yAxis.min = 0;
        yAxis.max = 100;
        yAxis.title.text = "Percentage";

        // Create series function
        function createSeries(value, name) {
            var series = xyChart.series.push(new am4charts.ColumnSeries());
            series.dataFields.valueY = value;
            series.dataFields.categoryX = 'Name';
            series.name = name;

            series.tooltipText = "{categoryX}: [bold]{valueY}%[/]";
            series.tooltip.pointerOrientation = "vertical";

            return series;
        }

        // Get code information
        var AttCode = AH_code();
        AttCode = AttCode.DATA;
        AttCode = AttCode[0].childCodes;

        NQual = AttCode[4].code;
        Qual = AttCode[5].code;
        //console.log(AttCode);

        var classInfo = [];
        for (var i = 0; i < array.length; i++){

            // store training class info
            lessonInfo = array[i].trainingClass.lesson;
            // store class result into training class object
            lessonInfo.result = array[i].result;
            classInfo.push(lessonInfo);
        }
        //console.log(classInfo);

        var idList = [];
        var xyData = [];
        for (var i = 0; i < classInfo.length; i++) {

            var classID = classInfo[i].id;
            var className = classInfo[i].name;

            // if no this classID, count 
            if (idList.indexOf(classID) == -1) {
            
                idList.push(classID)

                // extract total number of people taking this lesson
                var total = classInfo.filter(function(obj){

                    return obj.id == classID 
                });

                // extract number of attendance
                var attend = classInfo.filter(function(obj){

                    return (obj.id == classID && obj.result != NQual)
                });
                
                // extract number of Qualified
                var qualified = classInfo.filter(function(obj){

                    return (obj.id == classID && obj.result == Qual)
                });

                attRes = Math.round((attend.length / total.length) * 100);
                qualRes = Math.round((qualified.length / total.length) * 100);
                var d = {"Name":className, "Attended": attRes, "Qualified": qualRes};

                xyData.push(d);
            }

        }

        

        xyData.sort((a,b) => (a.Attended<b.Attended) ? 1 : -1);
        xyChart.data = xyData;

        createSeries("Attended","Attendance Rate");
        createSeries("Qualified","Qualification Rate");

        document.getElementById("mask_left").style.display = "none";
    });
});