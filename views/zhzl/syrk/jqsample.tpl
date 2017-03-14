{% extends '../parent/layout.tpl' %} 
{% block title %}实有人口{%endblock%} 
{% block style %} 

{% endblock %} 
{% block body %}
	
{%endblock%} 
{% block content %}

<div class="content-wrapper">
    <div id="mainTable">
        <div id="filter"></div>
        <div class="bootstrap-table">
            <div class="fixed-table-toolbar">
                <div class="bs-bars pull-left">
                </div>
                <div class="columns columns-right btn-group pull-right">
                </div>
                <div class="pull-right search">
                </div>
            </div>
        </div>
    </div>
</div>

{% endblock %}

{% block script%}

{% include "../parent/requireConfig.tpl" %}
<script type="text/javascript">
    var curModule="人口管理/户籍人口/人口列表";
    requirejs(['vueJqTableFilter'], function () {
        $("#filter").tableFilter({
            //更多filter类型，参考 /public/zhzl/syrk/vue-table-template.js
            filters:[
                {
    
                    name:"gender",
                    text:"性别",
                    all:true,
                    type:"options",
                    options:[
                        {text:"男",value:"01"},
                        {text:"女",value:"02"},
                    ]
                },
                {
                    name:"hunyin",
                    text:"婚姻",
                    all:true,
                    allItem:{text:"全部",value:""},
                    type:"domain",
                    domainName:"ABC",
                    options:[]
                },
            ],
            filter:{
                gender:"01",
                hunyin:""
            },
            domainAjaxOptions:{
                url:"/sampleData/domains.json",
                type:"get"
            },
            change:function(filter){
                alert(JSON.stringify(filter));
            }
        });
    });
</script>
{% endblock %}