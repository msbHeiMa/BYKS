var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    var sPage = req.params.page;
    res.render('servicemanager/app', { title: 'Swig Express', User: { Name: 'Admin' } });
});

/* GET home page. servicemanager*/
router.get('/servicemanager/:page', function (req, res, next) {
    var sPage = req.params.page;
    sPage = sPage.split('.')[0] + '.tpl';
    res.render('servicemanager/' + sPage, { title: 'Swig Express', User: { Name: 'Admin' } });
});

function getZzSwigData() {
    var zzSwigData = {
        title: '长兴县社会治理网格化信息管理系统',
        static: "/",
        esrimap: "http://222.46.11.118:14380/api_3.18_pub/"
    };
    return zzSwigData;
}

var token = '8d1d8d57-aeb9-4d20-aa04-fa5b73cbaade';//'97bdc6f4-6e68-4f31-b26b-f8b933d21581';
/* GET home page. zhzl*/

router.get('/zhzl/:page', function (req, res, next) {
    var sPage = req.params.page;
    sPage = sPage.split('.')[0] + '.tpl';
    var zzSwigData = getZzSwigData()
    res.setHeader("Set-Cookie", "CIGToken=" + token + "; path=/;");
    res.render('zhzl/' + sPage, zzSwigData);
});
router.get('/zhzl/:module/:page', function (req, res, next) {
    var sPage = req.params.page;
    var sModule = req.params.module;
    var ro = req.query.ro;
    var zzSwigData = getZzSwigData()
    if (ro) {
        zzSwigData.requireOptimized = true;
    }
    sPage = sPage.split('.')[0] + '.tpl';
    res.setHeader("Set-Cookie", "CIGToken=" + token + "; path=/;");
    res.render(`zhzl/${sModule}/${sPage}`, zzSwigData);
});


function getCigSwigData(){
    var cigSwigData = {
        title: 'CIG信息资源整合平台',
    };
    return cigSwigData;
}
// cig 项目路由
router.get('/cigWeb/:page', function (req, res, next) {
    var sPage = req.params.page;
    sPage = sPage.split('.')[0] + '.tpl';
    var cigSwigData = getCigSwigData()
    res.setHeader("Set-Cookie", "CIGToken=" + token + "; path=/;");
    res.render('cigWeb/' + sPage, cigSwigData);
});
router.get('/cigWeb/:module/:page', function (req, res, next) {
    var sPage = req.params.page;
    var sModule = req.params.module;
    var ro = req.query.ro;
    var cigSwigData = getCigSwigData()
    if (ro) {
        cigSwigData.requireOptimized = true;
    }
    sPage = sPage.split('.')[0] + '.tpl';
    res.setHeader("Set-Cookie", "CIGToken=" + token + "; path=/;");
    res.render(`cigWeb/${sModule}/${sPage}`, cigSwigData);
});
router.get('/cigWeb/:module/:module1/:page', function (req, res, next) {
    var sPage = req.params.page;
    var sModule = req.params.module;
    var sModule1 = req.params.module1;
    var ro = req.query.ro;
    var cigSwigData = getCigSwigData()
    if (ro) {
        cigSwigData.requireOptimized = true;
    }
    sPage = sPage.split('.')[0] + '.tpl';
    res.setHeader("Set-Cookie", "CIGToken=" + token + "; path=/;");
    res.render(`cigWeb/${sModule}/${sModule1}/${sPage}`, cigSwigData);
});

module.exports = router;
