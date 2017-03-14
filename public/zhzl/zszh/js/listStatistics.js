$(document).ready(function () {
     initTable();
     initTablee();
 });
 function initTable() {
     var initQueryParams = function (params) {
         var temp = {
             limit: params.limit,
             offset: params.offset,
             queryName: params.search,
         };
         return temp;
     };
     //初始化表格,动态从服务器加载数据  
     $('#table').cigTable({
         url: zhzlconfig.backendurl + "/zszh/listStatisticsPotal",
         queryParams: initQueryParams,
         columns: [
            {
                title: '辖区',
                field: 'departmentName',
                align: 'center',
                valign: 'middle',
                formatter: departmentFormatter,
            },
            {
                title: '一级',
                field: 'firstLevel',
                align: 'center',
                valign: 'middle',
            },
            {
                title: '二级',
                field: 'seconeLevel',
                align: 'center',
                valign: 'middle',
            },
            {
                title: '三级',
                field: 'thirdLevel',
                align: 'center',
                valign: 'middle',
            },
            {
                title: '四级',
                field: 'forthLevel',
                align: 'center',
                valign: 'middle',
            },
            {
                title: '小计',
                field: 'total',
                align: 'center',
                valign: 'middle',
            },
            {
                title: '操作',
                field: 'DETAILED',
                align: 'center',
                valign: 'middle',
                formatter: operateFormatter,
            }
        ]
     });
 }


function operateFormatter(value, row, index) {
    return [
        "<a class='btn btn-link btn-xs' href='peopleList.html?departId=" + row.SSDWBM + "&userLevel=" + row.userLevel + "&title=" + row.departmentName + "'>", '详细</a>'
    ].join('');
}

function departmentFormatter(value, row, index) {
    return [
        "<a class='app' href='departmentPeopleList.html?departId=" + row.SSDWBM + "&title=" + row.departmentName + "'>" + row.departmentName + '</a>',
      
    ].join('');
}


function initTablee() {
    $.ajax({
        headers: { Accept: "application/json", "Content-Type": "application/json"},
        type: "GET",
        url:  zhzlconfig.backendurl + "/zszh/listStatisticsPotal",
        dataType: 'json',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
         success: function (result) {
             var index=result.data.rows.length-1;
             $("#upName").html(result.data.rows[index].upName);
             $("#firstLevel").html(result.data.rows[index].firstLevel);
             $("#seconeLevel").html(result.data.rows[index].seconeLevel);
             $("#thirdLevel").html(result.data.rows[index].thirdLevel);
             $("#forthLevel").html(result.data.rows[index].forthLevel);
             $("#total").html(result.data.rows[index].total);
              // $('value').html(result.rows[0].SENDERNAME);
            //console.log(result.data.rows[0].gridName)
            var pieData = [
				{
					value: result.data.rows[index].firstLevel,
					color:"#F7464A",
					highlight: "#FF5A5E",
					label: "Red"
				},
				{
					value: result.data.rows[index].seconeLevel,
					color: "#46BFBD",
					highlight: "#5AD3D1",
					label: "Blue"
				},
				{
					value: result.data.rows[index].thirdLevel,
					color: "#FDB45C",
					highlight: "#FFC870",
					label: "Yellow"
				},
				{
					value: result.data.rows[index].forthLevel,
					color: "#32CD32",
					highlight: "#00FF00",
					label: "Green"
				}

			];
            //绘制
			
				var ctx = document.getElementById("myChart").getContext("2d");
				window.myPie = new Chart(ctx).Doughnut(pieData);
          }
    })
}


			
    