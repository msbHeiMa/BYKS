<script type="text/javascript" src="/components/requirejs/require.js"></script>
{% if requireOptimized %}
<script type="text/javascript" src="/cig/vue/cig-vue-components.js"></script>
<script type="text/javascript" src="/cig/require-config-prod.js"></script>
{% else %}    
<script type="text/javascript" src="/cig/require-config-dev.js"></script>
{% endif %}
<script type="text/javascript" src="/cigWeb/parent/require-config.js"></script>
