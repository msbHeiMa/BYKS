{% extends '../../parent/layout.tpl' %} 
{% block title %}数据抽取记录{%endblock%} 
{% block style %} {% endblock %} 

{% block content %}
    <div id="content" class="content-wrapper">
        {% include '../../parent/queryTable.tpl' %}

        <div is="bs-pop" 
            type="lg" title="日志" ref="pop">
            <textarea v-text="popLog" style="width: 100%;height: 300px">
            </textarea>
            <template slot="footer">
                <button type="button" class="btn btn-default" @click="hide">关闭</button>
            </template>
        </div>
    </div>
{% endblock %} 
{% block script%} 
    <script>
        requirejs(["/cigWeb/cigjoin/source/loglist.js"],function(mountFn){
            mountFn("#content")
        });
    </script>
{% endblock %}