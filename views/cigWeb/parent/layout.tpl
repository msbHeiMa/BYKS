{% extends 'layoutvuebase.tpl' %} 
{% block content_wrap %}

{% raw %}
<div class="l-content">
    <div class="cig-breadcrumb" id="cig-breadcrumb">
        <template v-for="(item,index) in items">
            <a :href="item.url || 'javascript:;'" :target="item.target || '_self'" @click="item.fn && item.fn()">{{item.text}}</a>
            <template v-if="index < items.length - 1"> &gt; </template>
        </template>
    </div>
    {% endraw %}
    <div class="cig-content">
        {% block content %} 
        {% endblock %} 
    </div>
</div>
{% endblock %} 

{% block script_wrap %} 
    <script>
        // requirejs(['adminLteApp'],function(){});
        requirejs(["breadcrumb"],function(breadcrumb){
            breadcrumb.$mount("#cig-breadcrumb");
        });
    </script>
    {% block script %} 
    {% endblock %} 
{% endblock %} 
