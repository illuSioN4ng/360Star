#[HTML5 天气预报](http://www.hubwiz.com/course/55a60445a164dd0d75929fbd/)课程实现
利用[YahooAPI](https://developer.yahoo.com/weather/documentation.html)实现简单的天气预报功能。    
[Demo](http://la413972057.github.io/html5weather/)    
已知不足：    
天气图标不够。。。应该要有47种，Orz    
**新增功能：**     
利用新浪API实现IP定位初始城市[新浪API](http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js)    
返回值：    
国家：remote_ip_info.country    
省：remote_ip_info.province    
市：remote_ip_info.city    
区：remote_ip_info.district    
ISP：remote_ip_info.isp    
类型：remote_ip_info.type    
其他：remote_ip_info.desc    
备注：需要将相关函数写入回调函数中，确保所在城市获取之后运行相关函数，否则将报错，城市未定义    