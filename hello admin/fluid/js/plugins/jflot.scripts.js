$(function () {

    // Pie chart
    if($("#chart_pie").length || $("#chart_pie2").length || $("#chart_donut").length) {
    var data = [];
    var series = Math.floor(Math.random()*10)+1;
    for( var i = 0; i<series; i++)
    {
        data[i] = { label: "Series"+(i+1), data: Math.floor(Math.random()*100)+1 }
    }

    if($("#chart_pie").length) {
    $.plot($("#chart_pie"), data, 
    {
        series: {
            pie: { 
                show: true
            }
        }
    });
    }
    if($("#chart_pie2").length) {
    $.plot($("#chart_pie2"), data, 
    {
        series: {
            pie: { 
                show: true,
                radius: 1,
                label: {
                    show: true,
                    radius: 1,
                    formatter: function(label, series){
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'+label+'<br/>'+Math.round(series.percent)+'%</div>';
                    },
                    background: { opacity: 0.8 }
                }
            }
        },
        legend: {
            show: false
        }
    });
    }
    if($("#chart_donut").length) {
    $.plot($("#chart_donut"), data,
    {
            series: {
                pie: { 
                    innerRadius: 0.5,
                    show: true
                }
            },
            grid: { hoverable: true, clickable: true }
    });
    }
    }
 


    // Another plot
    if($("#chart_bars").length) {
    var d1 = [];
    for (var i = 0; i <= 10; i += 1)
        d1.push([i, parseInt(Math.random() * 30)]);
    
    var plot = $.plot($("#chart_bars"),
           [ { data: d1, label: "sample variable"}], {
               series: {
                   bars: {show: true, barWidth: 0.9}
               },
               grid: { hoverable: true, clickable: true },
               yaxis: { min: 0, max: 60 }
             });
    }

    // Interactive chart
    if($("#chart").length) {
    var sin = [], cos = [];
    for (var i = 0; i < 14; i += 1) {
        sin.push([i, Math.sin(i)]);
        cos.push([i, Math.cos(i)]);
    }

    var plot = $.plot($("#chart"),
           [ { data: sin, label: "sin(x)", color: "rgb(255, 100, 123)"}, { data: cos, label: "cos(x)", color: "rgb(33, 57, 237)" } ], {
               series: {
                   lines: { show: true },
                   points: { show: true }
               },
               grid: { hoverable: true, clickable: true },
               yaxis: { min: -1.2, max: 1.2 }
             });

    function showTooltip(x, y, contents) {
        $('<div id="tooltip" class="tipsy"><div class="tipsy-inner">' + contents + '</div></div>').css( {
            position: 'absolute',
            display: 'none',
            top: y + 5,
            left: x + 5
        }).appendTo("body").fadeIn(200);
    }

    var previousPoint = null;
    $("#chart").bind("plothover", function (event, pos, item) {
        $("#x").text(pos.x.toFixed(2));
        $("#y").text(pos.y.toFixed(2));

            if (item) {
                if (previousPoint != item.dataIndex) {
                    previousPoint = item.dataIndex;
                    
                    $("#tooltip").remove();
                    var x = item.datapoint[0].toFixed(2),
                        y = item.datapoint[1].toFixed(2);
                    
                    showTooltip(item.pageX, item.pageY,
                                item.series.label + " of " + x + " = " + y);
                }
            }
            else {
                $("#tooltip").remove();
                previousPoint = null;            
            }

    });
    }



    // Movable chart

    // we use an inline data source in the example, usually data would
    // be fetched from a server
    if($("#chart_moving").length) {
    var data = [], totalPoints = 50;
    function getRandomData() {
        if (data.length > 0)
            data = data.slice(1);

        // do a random walk
        while (data.length < totalPoints) {
            var prev = data.length > 0 ? data[data.length - 1] : 50;
            var y = prev + Math.random() * 10 - 5;
            if (y < 0)
                y = 0;
            if (y > 100)
                y = 100;
            data.push(y);
        }

        // zip the generated y values with the x values
        var res = [];
        for (var i = 0; i < data.length; ++i)
            res.push([i, data[i]])
        return res;
    }

    // setup control widget
    var updateInterval = 1000;
    $("#updateInterval").val(updateInterval).change(function () {
        var v = $(this).val();
        if (v && !isNaN(+v)) {
            updateInterval = +v;
            if (updateInterval < 1)
                updateInterval = 1;
            if (updateInterval > 2000)
                updateInterval = 2000;
            $(this).val("" + updateInterval);
        }
    });

    // setup plot
    var options = {
        series: {
            lines: {
              show: true,
              fill: true
            },
            shadowSize: 0
        },
        yaxis: { min: 0, max: 100 },
        xaxis: { show: false },
        colors: ["#e62d00"]
    };
    var plot = $.plot($("#chart_moving"), [ getRandomData() ], options);

    function update() {
        plot.setData([ getRandomData() ]);
        // since the axes don't change, we don't need to call plot.setupGrid()
        plot.draw();
        
        setTimeout(update, updateInterval);
    }

    update();
    }

});