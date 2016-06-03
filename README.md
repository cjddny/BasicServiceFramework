# BasicServiceFramework
*基于nodejs，mongodb，mysql的基础框架*


####运行环境
linux,macOS

####安装与启动
本框架涉及了`mongodb`,`redis`,`mysql`等数据库服务，首先确认他们都已经正确安装。
若无安装则可以先下载linux环境有名的包管理工具`HomeBrew`(http://brew.sh/)。


安装完HomeBrew
则分别执行

```
Brew install mongodb
Brew install redis
Brew install mysql
```

接着我们要开启这些数据库服务


启动redis
```
redis-server /usr/local/etc/redis.confBrew install redis
```


启动mysql
```
mysql.server start
```


启动mongodb,首先要在系统根目录建数据库文件 data/db
```
sudo mongod
```


