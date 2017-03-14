//根据jQuery选择器找到需要加载ystep的容器
//loadStep 方法可以初始化ystep
$.ajax({
  headers: { Accept: "application/json", "Content-Type": "application/json" },
  type: "GET",
  url: zhzlconfig.backendurl + "/zszh/getProcStatusByfunmdataID?funmdataID=533d5fdc-522c-4730-8304-a47063cc41bd",
  dataType: 'json',
  contentType: "application/x-www-form-urlencoded; charset=utf-8",
  success: function (result) {
    // $("#content").val(result.data.proData.content);
    // $("#title").val(result.data.proData.title);
    $(".ystep1").loadStep({
      //ystep的外观大小
      //可选值：small,large
      size: "large",
      //ystep配色方案
      //可选值：green,blue
      color: "blue",
      //ystep中包含的步骤
      steps: result.data.proData
    });
    $(".ystep1").setStep(result.data.passNode);
  }
})
// var aa= [{
//         //步骤名称
//         title: "开始"
//       },{
//         title: "填报",
//         //步骤内容(鼠标移动到本步骤节点时，会提示该内容)
//         content: "单位: 社区医院  用户：王天阳医生     时间：2017/2/9 16:30"
//       },{
//         title: "审核1",
//         content: "单位: 社区医院  用户：王天阳医生  时间：2017/2/9 16:30"
//       },{
//         title: "审核2",
//         content: "单位: 社区医院  用户：王天阳医生   时间：2017/2/9 16:30"
//       },{
//         title: "重新填报",
//         content: "单位: 社区医院  用户：王天阳医生  时间：2017/2/9 16:30"
//       },{
//         title: "审核3",
//         content: "单位: 社区医院  用户：王天阳医生  时间：2017/2/9 16:30"
//       },{
//         title: "审核4",
//         content: "单位: 社区医院  用户：王天阳医生  时间：2017/2/9 16:30"
//       },{
//         title: "结束"
//       }]
