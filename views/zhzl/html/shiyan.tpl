<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>毕业课设</title>
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport" />
    <link rel="stylesheet" href="../../../components/bootstrap-3.3.7-dist/css/bootstrap.css" />
    <link rel="stylesheet" href="../../../components/bootstrap-3.3.7-dist/css/buttons.css" />
    <link rel="stylesheet" href="../../../zhzl/lcgl/css/Enrolmentcourses.css" />
    <link rel="stylesheet" href="../../../zhzl/lcgl/css/layout.css" />
    <link rel="SHORTCUT ICON" href="../../../logo.ico"/>

</head>

<body class="skin-blue sidebar-mini">
    
    <div id="main"> 
        <ul> 
            <li :src="utterer">{{utterer}}</li>
            <!--<li :src="row.id">{{row.id}}</li>
            <li :src="row.utterer">{{row.utterer}}</li>
            <li>{{row.fbTime}}</li>
            <li>{{row.worksName}}</li>
            <li>{{row.worksName}}</li>-->
        </ul>
        <byks-ul :row="row"></byks-ul>
        <byks-li :row="row"></byks-li>
        
    </div>    
    <script src="../../../components/jquery/dist/jquery.min.js"></script>
    <script src="../../../components/bootstrap-3.3.7-dist/js/bootstrap.js"></script>
    <script src="../../../components/vue/dist/vue.js"></script>
    <script type="text/javascript" src="../../../zhzl/lcgl/js/shiyan.js"></script>
    <script>
		$('.carousel').carousel();
		$('#someTab').tab('show')
	</script>
</body>

</html>