# BasicServiceFramework
*基于express，mongodb，mysql的基础框架*


####运行环境
linux,macOS

####安装

本框架涉及了`mongodb`,`redis`,`mysql`等数据库服务，首先确认他们都已经正确安装。
若无安装则可以先下载linux环境有名的包管理工具`HomeBrew`(http://brew.sh/)。


安装完`HomeBrew`
则分别执行

```
Brew install node
Brew install mongodb
Brew install redis
Brew install mysql
```

####启动服务
接着我们要开启这些数据库服务


启动redis
```
sudo redis-server /usr/local/etc/redis.conf
```


启动mysql
```
sudo mysql.server start
```


启动mongodb,首先要在系统根目录建数据库文件 data/db
```
sudo mongod
```

####服务器运行

我们在本机运行环境使用了nodemon作为node进程管理(自动重启)(http://nodemon.codeplex.com/),
express(http://www.expressjs.com.cn/)作为web框架

建议在这里用npm安装为全局的
```
sudo npm install express -g
sudo npm install nodemon -g
```

然后我们还要安装依赖包，切换到程序根目录，执行
```
sudo npm install
```

最后执行
```
sudo nodemon app.js
```

不出意外的话你的服务已经正常跑起来了~

