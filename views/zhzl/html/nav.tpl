<div id="nav">
		<ul class="daohang">
			<li>
				<a href="index.html" class="img">
					<img src="../../../zhzl/lcgl/images/logo.jpg" alt="" id="logo">
				</a>
			</li>
			<li><a   href="index.html">首页</a></li>
			<li><a   href="Videoteaching.html">视频教学</a></li>
			<li><a   href="Enrolmentcourses.html">报名课程</a></li>
			<li><a   href="worksshow.html">作品展示</a></li>
			<li><a   href="login.html">登陆/注册</a></li>
			<li class="panduanxianshi" v-if="data!='管理员'"><a   href="Mymanagement.html">我的管理</a></li>
			<li class="panduanxianshi" v-else></li>
			<li class="username" > 
				<b>
					<a href="login.html" class="userImage">
						<img src="../../../zhzl/lcgl/images/admin.jpg">
					</a>
				</b>
				<span><span class="welcome">欢迎登陆</span> <a href="javescript:viod(0)" class="logout" @click="logout"></a></span>
			</li>
		</ul>

	</div>