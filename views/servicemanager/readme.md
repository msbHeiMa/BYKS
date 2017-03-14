# 项目文档结构要求
static
|--public                   #静态文件
   |--components            #公共组件文件夹
   |--cig                   #项目组件文件夹
      |--xxobject           #xx项目组件
	      |--img
	      |--css
	      |--js
   |--servicemanager        #项目静态文件夹
      |--img            
	    |--js
	    |--css
|--routes
   |--index.js              #调试
|--views
   |--servicemanager        #项目模板文件夹
      |--parent        
	       |--layout.tpl  #项目母模板
	 |--index.tpl         #index.html页
|--.gitignore               #node_modules,public/components等目录需要排除
|--app.js             
|--www.js
|--package.json
|--.bowerrc           
|--bower.json           #公共引用的描述文件
|--Gruntfile.js         #Grunt任务
|--fis-conf.js          #fis任务
|--readme.md            #项目文档结构要求

# 项目初始化命令
$ cnpm install
$ bower install

# 项目发布命令
$ grunt
$ cd .prepublish
$ fis3 release components
$ fis3 release nocomponents #不含components目录
 

