// am4core.ready(function(){
//     // chart_box_a

//     // Themes begin
//     am4core.useTheme(am4themes_animated);

//     // 创建图表对象 (饼图)
//     var pieChart = am4core.create("chart_box_a", am4charts.PieChart3D);

//     // 内圈半径

//     // 外圈
//     // pieChart.radius = am4core.percent(60);

//     // 内圈
//     pieChart.innerRadius = am4core.percent(45);

//     // Add data
//     pieChart.data = [
//         {"country":"Czechia","vaule1":301.9, "vaule2":301.9, "vaule3": 154},
//         {"country":"Austria","vaule1":128.3, "vaule2":291.9, "vaule3": 401},
//         {"country":"Lithuania","vaule1":501.9, "vaule2":345.9, "vaule3": 211},
//         {"country":"Ireland","vaule1":201.1, "vaule2":354.9, "vaule3": 269},
//         {"country":"Australia","vaule1":139.9, "vaule2":122.9, "vaule3": 101},
//         {"country":"Germany","vaule1":165.8, "vaule2":199.9, "vaule3": 246}
//     ];

//     // 得到 Series 对象
//     var pieSeries = pieChart.series.push(new am4charts.PieSeries());

//     // 指定 Category 与 Value
//     pieSeries.dataFields.category = "country";
//     pieSeries.dataFields.value = "vaule1";

//     // 设置分割线 (slices) 样式

//     // 颜色
//     // pieSeries.slices.template.stroke = am4core.color("white");

//     // // 线宽
//     // pieSeries.slices.template.strokeWidth = 2;

//     // // 透明度
//     // pieSeries.slices.template.strokeOpacity = 1.0;

//     // 动画
//     pieSeries.hiddenState.properties.endAngle = -90;
//     pieSeries.hiddenState.properties.startAngle = -90;

//     // 指示线
//     pieSeries.alignLabels = false;
//     pieSeries.labels.template.bent = true;
//     pieSeries.labels.template.radius = 3;
//     pieSeries.labels.template.padding(3,3,3,3);

//     // 图例
//     pieChart.legend = new am4charts.Legend();
//     var title = pieChart.titles.create();
//     title.text = "Speed";
//     title.fontSize = 25;
//     title.marginBottom = 30;
//     title.fill = am4core.color("#666666");

//     // pieSeries.legendSettings.valueText.
//     // pieSeries.legendSettings.labelText 
//     // series2.labels.template.propertyFields.disabled = "disabled";

//     // 创建图表对象 (X-Y 图)
//     var xyChart = am4core.create("chart_box_b", am4charts.XYChart);

//     // Category 坐标轴
//     var categoryAxis = xyChart.xAxes.push(new am4charts.CategoryAxis());
//     categoryAxis.dataFields.category = "country";
//     categoryAxis.renderer.grid.template.location = 0;
//     categoryAxis.renderer.minGridDistance = 30;

//     // Value 坐标轴
//     var valueAxis = xyChart.yAxes.push(new am4charts.ValueAxis());

//     // 栏
//     // var series = xyChart.series.push(new am4charts.ColumnSeries());
//     // series.dataFields.categoryX = "country";
//     // series.dataFields.valueY = "vaule1";

//     // // 悬浮提示
//     // series.columns.template.tooltipText = "{categoryX}: $ [bold]{valueY}[/]";

//     // // 填充透明度（柱子的）
//     // series.columns.template.fillOpacity = 0.6;

//     // // 边框线形

//     // series.columns.template.strokeWidth = 2;
//     // series.columns.template.strokeOpacity = 1;

//     // 数据绑定

//     xyChart.data = pieChart.data;

//     function createSeries(name, color){
//         var series = xyChart.series.push(new am4charts.LineSeries());
//         series.name = name;
//         series.dataFields.valueY = name;
//         series.dataFields.categoryX = "country";
//         series.stroke = color;
//         series.strokeWidth = 3;
//         series.propertyFields.strokeDasharray = "lineDash";
//         series.tooltip.label.textAlign = "middle";

//         series.tooltipText = "{categoryX}: [b]{valueY}[/]";
//         series.strokeWidth = 2;

        

//         // Set up tooltip
//         series.adapter.add("tooltipText", function(ev) {
//             var text = "[bold]{categoryX}[/]\n";
//             xyChart.series.each(function(item) {
//             text += "[" + item.stroke.hex + "]●[/] " + item.name + ": {" + item.dataFields.valueY + "}\n";
//             });
//             return text;
//         });

//         // 气泡背景颜色
//         series.tooltip.getFillFromObject = false;
//         series.tooltip.background.fill = am4core.color("#fff");

//         series.tooltip.label.fill = am4core.color("#00");

//         // 圆点

//         var bullet = series.bullets.push(new am4charts.Bullet());

//         var rectangle = bullet.createChild(am4core.Rectangle);

//         rectangle.width = 5;
//         rectangle.height = 5;
//         rectangle.fill = color;
//         rectangle.horizontalCenter = "middle";
//         rectangle.verticalCenter = "middle";

        

//     }

//     // 折线
//     createSeries("vaule1", am4core.color("red"));
//     createSeries("vaule2", am4core.color("yellow"));
//     createSeries("vaule3", am4core.color("green"));

//     // 图例
//     xyChart.legend = new am4charts.Legend();

    

//     // 参考线
//     xyChart.cursor = new am4charts.XYCursor();
//     xyChart.cursor.maxTooltipDistance = 0;

//     // 悬浮提示



// });


//under script
am4core.ready(function(){
    console.log("###### am4core.ready ######")

    // chart_box_a 

    // themes begin
    // am4core.useTheme(am4themes_animated);

    //create piechart 
    var xyChart = am4core.create("chart_box_a",am4charts.XYChart);


    // outer radius
    //pieChart.radius = am4core.percent(70); //i.e. your radius is 70cm instead of 100cm
    // inner radius
    //pieChart.innerRdius = am4core.percent(45)

    //Add data 
    xyChart.data = [
    {
      region: "华北",
      sales: 17118
      
    },{
      region: "华东",
      sales: 17632
    },
    
    {
      region: "华中",
      sales: 5751
    },
    {
      region: "华南",
      sales: 6452
    },{
      region: "西北",
      sales: 1830
    },
    {
      region: "东北",
      sales: 4635
    },
    {
      region: "西南",
      sales: 4379
    }
    
  ];

    var title = xyChart.titles.create();
    title.text = "各地区销售额占比";
    title.fontSize = 25;
    title.fill = am4core.color("blue");

    // x-axis
    var xbar = xyChart.xAxes.push(new am4charts.CategoryAxis());
    xbar.dataFields.category = "region";
    xbar.renderer.grid.template.location = 0;
    xbar.renderer.minGridDistance = 30;

    //y-axis
    var ybar = xyChart.yAxes.push(new am4charts.ValueAxis());

    //get series 

    var series1 = xyChart.series.push(new am4charts.ColumnSeries());
    //series1.name = "{categoryX}";
    series1.dataFields.valueY = "sales";
    series1.dataFields.categoryX = "region";
    series1.columns.template.tooltipText = "Category: {categoryX}\nValue: {valueY}";
    //series1.columns.template.fill = am4core.color("green").lighten(-0.7);

   //legend
   xyChart.legend = new am4charts.Legend();
   xyChart.legend.position = "top";

   //参考线
   xyChart.cursor = new am4charts.XYCursor();
   xyChart.cursor.maxTooltipDistance = 0;


    // individually set slice color
    /*series1.colors.list = [
      am4core.color("#739FE2"),
      am4core.color("#62D2E0"),
      am4core.color("#72DCBB"),
      am4core.color("#B3EEAC"),
      am4core.color("#DDF7D7"),
      am4core.color("#F5E4B3"),
      am4core.color("#FDF6A0")
    ];

    /*pieChart.legend = new am4charts.Legend();
    pieSeries.legendSettings.valueText = " ";
    pieChart.legend.position = "top";

*/
    // column

    

});

