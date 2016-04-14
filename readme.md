## 360Star前端星计划之万年历
[demo](http://la413972057.github.io/360Star/demo.html)
### 组件文件： 360StarCalendar.js    
- 使用方法：    
新建calender360Star对象并链式调用init方法，传入配置信息，配置信息详细见下文。    
```
window.onload = function(){
    new calendar360Star().init({
        yearNum: 2100,//数据库中的信息只保存1900-2100年信息
        wrapId: 'calendar-wrap',
        weather: true
    });
};
```
- 配置信息介绍    
  - yearNum：显示从1900年开始到yearNum设置时间的日历信息，（数据库中的信息只保存1900-2100年信息）
  - wrapId : 包裹日历插件的盒子ID
  - weather: 布尔型，是否需要weather插件。
    
### 组件内含插件
1. html5weather
利用新浪API实现IP定位初始城市[新浪API](http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js)和[YahooAPI](https://developer.yahoo.com/weather/documentation.html)实现简单的天气预报功能。    
[Demo](http://la413972057.github.io/html5weather/)    
新浪json返回值：    
国家：remote_ip_info.country    
省：remote_ip_info.province    
市：remote_ip_info.city    
区：remote_ip_info.district    
ISP：remote_ip_info.isp    
类型：remote_ip_info.type    
其他：remote_ip_info.desc    
已知不足：    
天气图标不够。。。应该要有47种，Orz   
 
### 主体设计文档
1. calendar360Star
    1. 2016年法定假日调休基本数据键值对信息    
      _ftvVacation为放假信息    
      _ftvWorkday为调假信息    
      _ftvVacationIfo 2016 假日信息    
    2. 当天时间    
      nowDay当天时间    
      year年份信息    
      month月份信息    
    3. _makeDays(year, month)函数    
      渲染该年月的日历主体，生成四十二个dayobj。
    4. _classCountByMonthAndDay(dayObj, classname)函数    
      传入dayObj和classname,根据dayObj.dataset.name来判断dayObj的类名。
    5. _dayInformation(dayobj)函数      
      渲染每天农历相关信息，初一则变为月份信息、节气显示、周末数字颜色、节气文字颜色等
    6. _almanacRender(dayInfo)函数      
      更新农历信息，并重新渲染页面
    7. _getDayCountByYearAndMonth(year,month)函数    
      返回该月份的天数
    8. _builtSetYearAndMonth(yearNum)函数    
      渲染日历头部年份选择器、月份选择器和节假日选择器
    9. _setDayInfo(year, month, day)函数    
      根据calendar.solar2lunar(year, month, day)返回的数据（详细介绍见下文），渲染农历详细信息
    10. _render(config)函数    
      根据配置信息渲染页面
    11. _bind(that)、_bindClick(that)    
      分别绑定日历头部点击事件。
    12. **calendar对象**
      主要阴阳历转换均在该函数中。
2. calendar对象
  具体实现请看代码注释。
  canlendar.solar2lunar(y, m, d)方法返回如下：    
```
  { 
  lYear: 2016,
    lMonth: 1,
    lDay: 1,
    Animal: '猴',
    IMonthCn: '正月',
    IDayCn: '初一',
    cYear: 2016,
    cMonth: 2,
    cDay: 8,
    gzYear: '丙申',
    gzMonth: '庚寅',
    gzDay: '庚申',
    isToday: false,
    isLeap: false,
    nWeek: 1,
    ncWeek: '星期一',
    isTerm: false,
    Term: null,
    isSolarFestival: false,
    solarFestival: null,
    isLunarFestival: true,
    LunarFestival: '春节' 
    }
```

### 已知不足
1. 没有实现农历宜忌相关代码，Orz~~~~
2. 天气插件直接拿之前的demo来修改，使用了jQuery。