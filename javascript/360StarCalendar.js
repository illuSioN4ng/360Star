/**
 * Created by illuSioN4ng on 2016/4/6.
 */
var calendar360Star = (function(){

    /**
     * 2016年法定假日调休信息
     * _ftvVacation为放假信息
     * _ftvWorkday为调假信息
     * _ftvVacationIfo 2016 假日信息
     */
    var _ftvVacation = {
            '0101':'元旦',
            '0102':'元旦',
            '0103':'元旦',
            '0207':'春节',
            '0208':'春节',
            '0209':'春节',
            '0210':'春节',
            '0211':'春节',
            '0212':'春节',
            '0213':'春节',
            '0402':'清明',
            '0403':'清明',
            '0404':'清明',
            '0430':'劳动节',
            '0501':'劳动节',
            '0502':'劳动节',
            '0609':'端午',
            '0610':'端午',
            '0611':'端午',
            '0915':'中秋',
            '0916':'中秋',
            '0917':'中秋',
            '1001':'国庆',
            '1002':'国庆',
            '1003':'国庆',
            '1004':'国庆',
            '1005':'国庆',
            '1006':'国庆',
            '1007':'国庆'
        },
        _ftvVacationIfo = {
            '元旦': '2016-01-01',
            '春节': '2016-02-08',
            '清明': '2016-04-04',
            '劳动节': '2016-05-01',
            '端午': '2016-06-09',
            '中秋': '2016-09-15',
            '国庆': '2016-10-01'
        },
        _ftvWorkday = {
            '0206': '春节',
            '0214': '春节',
            '0612': '端午',
            '0918': '中秋',
            '1008': '国庆',
            '1009': '国庆'
        };

    var nowDay = new Date(),
        year=parseInt(nowDay.getFullYear()),
        month=parseInt(nowDay.getMonth());

    //显示该年该月的日历
    var _makeDays = function(year, month){
        document.getElementById('days').innerHTML = '';
        var count = 0;
        var firstDay = new Date(year,month,1),
            //lastDay = new Date(year,month,_getDayCountByYearAndMonth(year,month)),
        //获得每月的前面空余的天数
            firstDayBefore = parseInt(firstDay.getDay()),
            lastDayOfLastMonth = _getDayCountByYearAndMonth(year,month - 1),
        //获得每月的后面空余的天数
        //    lastDayAfter = 6 - parseInt(lastDay.getDay()),
            dayobj = null;
            //dayInfo = [];
        //console.log(firstDayBefore);
        //显示每月前面空余的天数
        for(var i= 0; i < firstDayBefore; i++) {
            count++;
            dayobj = document.createElement("div");
            if(parseInt(month) <= 0){
                dayobj.dataset.name=parseInt(year-1) +"-"+ 12 +"-"+(lastDayOfLastMonth - firstDayBefore + i + 1);
            }else{
                dayobj.dataset.name=year+"-"+(parseInt(month))+"-"+(lastDayOfLastMonth - firstDayBefore + i + 1);
            }
            //dayobj.className="dayOfOtherMonth";
            _classCountByMonthAndDay(dayobj, 'dayOfOtherMonth');
            _dayInformation(dayobj);
        }
        //显示每月的天数
        for(i=1;i <= _getDayCountByYearAndMonth(year,month); i++) {
            count++;
            dayobj = document.createElement("div");
            //dayobj.className="day";
            dayobj.dataset.name = year + "-" + ( parseInt(month) + 1 ) + "-" + i;

            //设置当天的样式
            if(nowDay.getFullYear()===year && nowDay.getMonth()===month && nowDay.getDate()===i)
            {
                dayobj.id="thisDay";
                _setDayInfo(nowDay.getFullYear(), nowDay.getMonth()+1, nowDay.getDate());
            }

            _classCountByMonthAndDay(dayobj, 'day');
            _dayInformation(dayobj);
        }
        //显示每月后空余的天数
        var lastMonthDaysCount = 42 - count;
        for(i= 0; i < lastMonthDaysCount; i++) {
            dayobj = document.createElement("div");
            //dayobj.className="dayOfOtherMonth";
            if(parseInt(month) === 11){
                //month = 0;
                //year = parseInt(year) + 1;
                dayobj.dataset.name= (parseInt(year) + 1) + "-" + 1 + "-" + (i + 1);
                //console.log('****'+dayobj.name);
            }else{
                dayobj.dataset.name=parseInt(year) + "-" + (parseInt(month) + 2) + "-" + (i + 1);
                //console.log(dayobj.name);
            }
            _classCountByMonthAndDay(dayobj, 'dayOfOtherMonth');
            _dayInformation(dayobj);
        }
    };

    var _classCountByMonthAndDay = function(dayObj, classname){
        var _month = '',
            _day = '',
            dayString = '',
            dayObjArr = dayObj.dataset.name.split('-');
        //console.log(dayObjArr)
        if(dayObjArr[1] < 10){
            _month = '0' + dayObjArr[1];
        }else{
            _month = '' + dayObjArr[1];
        }
        if (dayObjArr[0] !== '2016') {
            dayObj.className = classname;
        } else {
            if (dayObjArr[2] < 10) {
                _day = '0' + dayObjArr[2];
            } else {
                _day = '' + dayObjArr[2];
            }
            dayString = _month + _day;
            if (dayString in _ftvVacation) {
                dayObj.className = classname + ' day-vacation';
            } else if (dayString in _ftvWorkday) {
                dayObj.className = classname + ' day-workday';
            } else {
                dayObj.className = classname;
            }
        }
    };
    //渲染每天农历相关信息，初一变为月份、节气显示，周末数字颜色、节气文字颜色
    var _dayInformation = function(dayobj){
        var dayInfo = dayobj.dataset.name.split('-'),
            dayInfoDetail = calendar.solar2lunar(dayInfo[0], dayInfo[1], dayInfo[2]);
        var solarDay = '',
            lunarDay = '';
        if(dayInfoDetail.nWeek === 6 || dayInfoDetail.nWeek === 7 ){
            solarDay = '<div class="solar weekend">' + parseInt(dayInfo[2]) + '</div>';
        }else{
            solarDay = '<div class="solar">' + parseInt(dayInfo[2]) + '</div>';
        }
        //渲染公历节日和农历节日
        if(dayInfoDetail.isSolarFestival){
            lunarDay = '<div class="lunar lunar-vacation" title="'+ dayInfoDetail.solarFestival +' ">'+ dayInfoDetail.solarFestival + '</div>';
        }else if(dayInfoDetail.isLunarFestival){
            lunarDay = '<div class="lunar lunar-vacation" title="'+ dayInfoDetail.lunarFestival +' ">'+ dayInfoDetail.lunarFestival + '</div>';
        }else if(dayInfoDetail.isTerm){
            lunarDay = '<div class="lunar lunar-term">'+ dayInfoDetail.Term + '</div>';
        }else{
            if(dayInfoDetail.IDayCn === '初一'){
                lunarDay = '<div class="lunar">'+ dayInfoDetail.IMonthCn + '</div>'
            }else{
                lunarDay = '<div class="lunar">'+ dayInfoDetail.IDayCn + '</div>';
            }
        }

        var innerhtml = '<span class="logo-border"></span>' + solarDay + lunarDay;
        dayobj.innerHTML = innerhtml;
        document.getElementById("days").appendChild(dayobj);
        dayobj.onclick= function(){
            var dayInfo = this.dataset.name.split('-');
            _almanacRender(dayInfo);
        }
    };
    //页面重新渲染，并更新农历信息
    var _almanacRender = function(dayInfo){
        document.getElementById("days").innerHTML="";
        _makeDays(dayInfo[0], dayInfo[1]-1);
        _setDayInfo(dayInfo[0], dayInfo[1], dayInfo[2]);
        document.getElementById("setYear").selectedIndex = parseInt(dayInfo[0]) - 1900;
        document.getElementById("setMonth").selectedIndex = parseInt(dayInfo[1]-1);
    };


    //计算该年该月的天数
    var _getDayCountByYearAndMonth = function(year,month){
        month++;
        if(month===4 || month===6 || month===9 || month===11)
            return 30;
        if(month===2)
        {
            if(((year%4 === 0)&&(year%100 !== 0)) || (year%400 === 0))
                return 29;
            return 28;
        }
        return 31;
    };

    var _builtSetYearAndMonth = function(yearNum){
        for(var i = 1900; i <= yearNum; i++){
            var yearObj = document.createElement("option");
            yearObj.innerHTML = i;
            yearObj.value = i;
            document.getElementById("setYear").appendChild(yearObj);
        }
        for(i = 0; i < 12; i++) {
            var monthObj = document.createElement("option");
            monthObj.innerHTML = i + 1;
            monthObj.value = i;
            document.getElementById("setMonth").appendChild(monthObj);
        }
        var holidayObj = document.createElement("option");
        holidayObj.innerHTML = '2016年假日安排';
        holidayObj.value = '';
        document.getElementById("holiday").appendChild(holidayObj);
        for( var item in _ftvVacationIfo){
            var monthObj = document.createElement("option");
            monthObj.innerHTML = item;
            monthObj.value = _ftvVacationIfo[item];
            document.getElementById("holiday").appendChild(monthObj);
        }
        document.getElementById("setYear").selectedIndex = parseInt(nowDay.getFullYear()) - 1900;
        document.getElementById("setMonth").selectedIndex = parseInt(nowDay.getMonth());
        _makeDays(parseInt(year),parseInt(month));
    };

    var _setDayInfo = function(year, month, day){
        var dayInfo = calendar.solar2lunar(year, month, day);
        document.getElementById('now-date').innerHTML = year + '-' + month + '-' + day;
        document.getElementById('now-weekday').innerHTML = dayInfo.ncWeek;
        document.getElementById('date-show-today').innerHTML = dayInfo.cDay;
        document.getElementById('lunar').innerHTML = '农历' + dayInfo.IMonthCn + dayInfo.IDayCn;
        document.getElementById('lunar-ganzhi').innerHTML = dayInfo.gzYear + '年' + dayInfo.gzMonth + '月' + dayInfo.gzDay + '日';
        var otherInfo = '[' + dayInfo.Animal + '年]';
        if(dayInfo.isSolarFestival){
            otherInfo += dayInfo.solarFestival;
        }else if(dayInfo.isLunarFestival){
            otherInfo += dayInfo.lunarFestival;
            //console.log(otherInfo);
        }else if(dayInfo.isTerm){
            otherInfo += dayInfo.Term;
        }
        document.getElementById('other-info').innerHTML = otherInfo;
    };

    //渲染日历主体结构
    var _render = function(config){
        var wrapId = document.getElementById(config.wrapId),
            innerhtml = '<div class="calendar-container"><div id="setDate"><label for="setYear">年份：</label><select id="setYear"></select><label for="setMonth">月份：</label><select id="setMonth"></select><label for="holiday">节假日安排：</label><select id="holiday"></select> <div id="returnToday">返回今天</div>   <span class="now-time">北京时间:<span id="nowTime"></span></span> </div> <!-- 日历 begin--> <div class="main-calendar-body clearfix"> <div id ="dateBody"><div class="weekday-title clearfix"> <div class="weekday">日</div> <div class="weekday">一</div> <div class="weekday">二</div> <div class="weekday">三</div> <div class="weekday">四</div><div class="weekday">五</div> <div class="weekday">六</div></div> <!-- 日历天数显示 begin--><div  id="days" class="clearfix"></div> <!-- 日历天数显示 end--> </div>  <div class="information"><div class="almanac">    <div class="date-bar">    <span class="now-date" id="now-date"></span>  <span class="now-weekday" id="now-weekday"></span> </div> <div class="date-show-today" id="date-show-today"></div> <div class="date-desc"> <div class="lunar" id="lunar"></div>  <div class="lunar-ganzhi" id="lunar-ganzhi"></div>  <div class="other-info" id="other-info"></div></div>   </div> ',
            weatherInnerHtml = '<div class="weather-forcast"><iframe src ="./html5weather/index.html" width="100%" height="145" scrolling="no" frameborder="0"><p>Your browser does not support iframes.</p></iframe></div>',
            innerhtmlEnd = '</div> </div></div><!--日历 end -->';
        if(config.weather){
            wrapId.innerHTML = innerhtml + weatherInnerHtml + innerhtmlEnd;
        }else{
            wrapId.innerHTML = innerhtml + innerhtmlEnd;
        }
        //时间初始化
        var nowDate = new Date(),
            hour = nowDate.getHours(),
            min = nowDate.getMinutes(),
            sec = nowDate.getSeconds();
        if(hour < 10){hour = '0' + hour;}
        if(min < 10){min = '0' + min;}
        if(sec < 10){sec = '0' + sec;}
        document.getElementById('nowTime').innerHTML = hour + ':'+ min + ':' +sec;
        //时钟定时器
        setInterval(function(){
            var nowDate = new Date(),
                hour = nowDate.getHours(),
                min = nowDate.getMinutes(),
                sec = nowDate.getSeconds();
            if(hour < 10){hour = '0' + hour;}
            if(min < 10){min = '0' + min;}
            if(sec < 10){sec = '0' + sec;}
            document.getElementById('nowTime').innerHTML = hour + ':'+ min + ':' +sec;
        }, 1000);
    };

    /**
     * 绑定select onchange事件
     * @param that
     * @private
     */
    var _bind = function(that){
        that.onchange = function(){
            var id = that.id,
                value = that.value;
            if(id === "setYear"){
                year = value;
                //console.log(year);
            }else if(id === "setMonth"){
                month = value;
                //console.log(month);
            }else if(id === "holiday"){
                //console.log(that.selectedIndex);
                if(that.selectedIndex !== 0){
                    //console.log(that.value)
                    var holidayInfo = that.value.split('-');
                    year = parseInt(holidayInfo[0]);
                    month = parseInt(holidayInfo[1])-1;
                    document.getElementById("days").innerHTML="";
                    _makeDays(year, month);
                    _setDayInfo(parseInt(holidayInfo[0]), parseInt(holidayInfo[1]), parseInt(holidayInfo[2]));
                    document.getElementById("holiday").selectedIndex = 0;
                    return;
                }
            }
            document.getElementById("days").innerHTML="";
            _makeDays(year, month);
        };
    };
    /**
     * 绑定onclick事件
     * @param that
     * @private
     */
    var _bindClick = function(that) {
        that.onclick = function(){
            var nowDay = new Date(),
                dayInfo = [];
            dayInfo[0] = nowDay.getFullYear();
            dayInfo[1] = nowDay.getMonth()+1;
            dayInfo[2] = nowDay.getDate();
            //console.log(dayInfo)
            document.getElementById("setYear").selectedIndex = nowDay.getFullYear() - 1900;
            document.getElementById("setMonth").selectedIndex = parseInt(nowDay.getMonth());
            //month = nowDay.getMonth()+1;
            _makeDays(nowDay.getFullYear(), nowDay.getMonth());
            _almanacRender(dayInfo);
        }
    };

    var calendar = {
        /**
         * 国历节日Festival
         */
        sFtv : {
            '0101': '元旦',
            '0214': '情人节',
            '0308': '妇女节',
            '0312': '植树节',
            '0315': '消费者权益日',
            '0401': '愚人节',
            '0501': '劳动节',
            '0504': '青年节',
            '0512': '护士节',
            '0601': '儿童节',
            '0701': '党的生日',
            '0801': '建军节',
            '0910': '教师节',
            '1001': '国庆节',
            '1006': '老人节',
            '1024': '联合国日',
            '1220': '澳门回归纪念日',
            '1225': '圣诞节'
        },

        /**
         * 农历节日
         */
        lFtv : {
            '0101': '春节',
            '0115': '元宵节',
            '0505': '端午节',
            '0707': '七夕',
            '0715': '中元',
            '0815': '中秋',
            '0909': '重阳',
            '1208': '腊八',
            '1224': '小年'
        },

        /**
         * 农历1900-2100的润大小信息表
         * 最后一位为闰月信息
         * 二到四位为每个月的天数
         * 2033年的十六进制代码是0x04afb，网上流传的众多lunarInfo，其中的2033年都是0x04bd7，是错误的！
         * 因为2003年闰十一月
         */
        lunarInfo:[0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,//1900-1909
            0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,//1910-1919
            0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,//1920-1929
            0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,//1930-1939
            0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,//1940-1949
            0x06ca0,0x0b550,0x15355,0x04da0,0x0a5b0,0x14573,0x052b0,0x0a9a8,0x0e950,0x06aa0,//1950-1959
            0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,//1960-1969
            0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b6a0,0x195a6,//1970-1979
            0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,//1980-1989
            0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x055c0,0x0ab60,0x096d5,0x092e0,//1990-1999
            0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,//2000-2009
            0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,//2010-2019
            0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,//2020-2029
            0x05aa0,0x076a3,0x096d0,0x04afb,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,//2030-2039
            0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0,//2040-2049
            0x14b63,0x09370,0x049f8,0x04970,0x064b0,0x168a6,0x0ea50, 0x06b20,0x1a6c4,0x0aae0,//2050-2059
            0x0a2e0,0x0d2e3,0x0c960,0x0d557,0x0d4a0,0x0da50,0x05d55,0x056a0,0x0a6d0,0x055d4,//2060-2069
            0x052d0,0x0a9b8,0x0a950,0x0b4a0,0x0b6a6,0x0ad50,0x055a0,0x0aba4,0x0a5b0,0x052b0,//2070-2079
            0x0b273,0x06930,0x07337,0x06aa0,0x0ad50,0x14b55,0x04b60,0x0a570,0x054e4,0x0d160,//2080-2089
            0x0e968,0x0d520,0x0daa0,0x16aa6,0x056d0,0x04ae0,0x0a9d4,0x0a2d0,0x0d150,0x0f252,//2090-2099
            0x0d520],//2100


        /**
         * 公历每个月份的天数普通表
         */
        solarMonth:[31,28,31,30,31,30,31,31,30,31,30,31],


        /**
         * 天干地支之天干速查表
         * ["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"]
         */
        Gan:["\u7532","\u4e59","\u4e19","\u4e01","\u620a","\u5df1","\u5e9a","\u8f9b","\u58ec","\u7678"],


        /**
         * 天干地支之地支速查表
         * ["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"]
         */
        Zhi:["\u5b50","\u4e11","\u5bc5","\u536f","\u8fb0","\u5df3","\u5348","\u672a","\u7533","\u9149","\u620c","\u4ea5"],


        /**
         * 天干地支之地支速查表<=>生肖
         * ["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"]
         */
        Animals:["\u9f20","\u725b","\u864e","\u5154","\u9f99","\u86c7","\u9a6c","\u7f8a","\u7334","\u9e21","\u72d7","\u732a"],


        /**
         * 24节气速查表
         * @trans["小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"]
         */
        solarTerm:["\u5c0f\u5bd2","\u5927\u5bd2","\u7acb\u6625","\u96e8\u6c34","\u60ca\u86f0","\u6625\u5206","\u6e05\u660e","\u8c37\u96e8","\u7acb\u590f","\u5c0f\u6ee1","\u8292\u79cd","\u590f\u81f3","\u5c0f\u6691","\u5927\u6691","\u7acb\u79cb","\u5904\u6691","\u767d\u9732","\u79cb\u5206","\u5bd2\u9732","\u971c\u964d","\u7acb\u51ac","\u5c0f\u96ea","\u5927\u96ea","\u51ac\u81f3"],


        /**
         * 1900-2100各年的24节气日期速查表
         * 多少日信息，以十六进制数值存储，
         * 使用时需进行划分成六个部分，并转化为十进制 一位+二位+一位以此类推
         * @Array Of Property
         * @return 0x string For splice
         */
        sTermInfo:[ '9778397bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e','97bcf97c3598082c95f8c965cc920f',
            '97bd0b06bdb0722c965ce1cfcc920f','b027097bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e',
            '97bcf97c359801ec95f8c965cc920f','97bd0b06bdb0722c965ce1cfcc920f','b027097bd097c36b0b6fc9274c91aa',
            '97b6b97bd19801ec9210c965cc920e','97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f',
            'b027097bd097c36b0b6fc9274c91aa','9778397bd19801ec9210c965cc920e','97b6b97bd19801ec95f8c965cc920f',
            '97bd09801d98082c95f8e1cfcc920f','97bd097bd097c36b0b6fc9210c8dc2','9778397bd197c36c9210c9274c91aa',
            '97b6b97bd19801ec95f8c965cc920e','97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2',
            '9778397bd097c36c9210c9274c91aa','97b6b97bd19801ec95f8c965cc920e','97bcf97c3598082c95f8e1cfcc920f',
            '97bd097bd097c36b0b6fc9210c8dc2','9778397bd097c36c9210c9274c91aa','97b6b97bd19801ec9210c965cc920e',
            '97bcf97c3598082c95f8c965cc920f','97bd097bd097c35b0b6fc920fb0722','9778397bd097c36b0b6fc9274c91aa',
            '97b6b97bd19801ec9210c965cc920e','97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722',
            '9778397bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e','97bcf97c359801ec95f8c965cc920f',
            '97bd097bd097c35b0b6fc920fb0722','9778397bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e',
            '97bcf97c359801ec95f8c965cc920f','97bd097bd097c35b0b6fc920fb0722','9778397bd097c36b0b6fc9274c91aa',
            '97b6b97bd19801ec9210c965cc920e','97bcf97c359801ec95f8c965cc920f', '97bd097bd07f595b0b6fc920fb0722',
            '9778397bd097c36b0b6fc9210c8dc2','9778397bd19801ec9210c9274c920e','97b6b97bd19801ec95f8c965cc920f',
            '97bd07f5307f595b0b0bc920fb0722','7f0e397bd097c36b0b6fc9210c8dc2','9778397bd097c36c9210c9274c920e',
            '97b6b97bd19801ec95f8c965cc920f','97bd07f5307f595b0b0bc920fb0722','7f0e397bd097c36b0b6fc9210c8dc2',
            '9778397bd097c36c9210c9274c91aa','97b6b97bd19801ec9210c965cc920e','97bd07f1487f595b0b0bc920fb0722',
            '7f0e397bd097c36b0b6fc9210c8dc2','9778397bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e',
            '97bcf7f1487f595b0b0bb0b6fb0722','7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
            '97b6b97bd19801ec9210c965cc920e','97bcf7f1487f595b0b0bb0b6fb0722','7f0e397bd097c35b0b6fc920fb0722',
            '9778397bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e','97bcf7f1487f531b0b0bb0b6fb0722',
            '7f0e397bd097c35b0b6fc920fb0722','9778397bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e',
            '97bcf7f1487f531b0b0bb0b6fb0722','7f0e397bd07f595b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
            '97b6b97bd19801ec9210c9274c920e','97bcf7f0e47f531b0b0bb0b6fb0722','7f0e397bd07f595b0b0bc920fb0722',
            '9778397bd097c36b0b6fc9210c91aa','97b6b97bd197c36c9210c9274c920e','97bcf7f0e47f531b0b0bb0b6fb0722',
            '7f0e397bd07f595b0b0bc920fb0722','9778397bd097c36b0b6fc9210c8dc2','9778397bd097c36c9210c9274c920e',
            '97b6b7f0e47f531b0723b0b6fb0722','7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2',
            '9778397bd097c36b0b70c9274c91aa','97b6b7f0e47f531b0723b0b6fb0721','7f0e37f1487f595b0b0bb0b6fb0722',
            '7f0e397bd097c35b0b6fc9210c8dc2','9778397bd097c36b0b6fc9274c91aa','97b6b7f0e47f531b0723b0b6fb0721',
            '7f0e27f1487f595b0b0bb0b6fb0722','7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
            '97b6b7f0e47f531b0723b0b6fb0721','7f0e27f1487f531b0b0bb0b6fb0722','7f0e397bd097c35b0b6fc920fb0722',
            '9778397bd097c36b0b6fc9274c91aa','97b6b7f0e47f531b0723b0b6fb0721','7f0e27f1487f531b0b0bb0b6fb0722',
            '7f0e397bd097c35b0b6fc920fb0722','9778397bd097c36b0b6fc9274c91aa','97b6b7f0e47f531b0723b0b6fb0721',
            '7f0e27f1487f531b0b0bb0b6fb0722','7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
            '97b6b7f0e47f531b0723b0787b0721','7f0e27f0e47f531b0b0bb0b6fb0722','7f0e397bd07f595b0b0bc920fb0722',
            '9778397bd097c36b0b6fc9210c91aa','97b6b7f0e47f149b0723b0787b0721','7f0e27f0e47f531b0723b0b6fb0722',
            '7f0e397bd07f595b0b0bc920fb0722','9778397bd097c36b0b6fc9210c8dc2','977837f0e37f149b0723b0787b0721',
            '7f07e7f0e47f531b0723b0b6fb0722','7f0e37f5307f595b0b0bc920fb0722','7f0e397bd097c35b0b6fc9210c8dc2',
            '977837f0e37f14998082b0787b0721','7f07e7f0e47f531b0723b0b6fb0721','7f0e37f1487f595b0b0bb0b6fb0722',
            '7f0e397bd097c35b0b6fc9210c8dc2','977837f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721',
            '7f0e27f1487f531b0b0bb0b6fb0722','7f0e397bd097c35b0b6fc920fb0722','977837f0e37f14998082b0787b06bd',
            '7f07e7f0e47f531b0723b0b6fb0721','7f0e27f1487f531b0b0bb0b6fb0722','7f0e397bd097c35b0b6fc920fb0722',
            '977837f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721','7f0e27f1487f531b0b0bb0b6fb0722',
            '7f0e397bd07f595b0b0bc920fb0722','977837f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721',
            '7f0e27f1487f531b0b0bb0b6fb0722','7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd',
            '7f07e7f0e47f149b0723b0787b0721','7f0e27f0e47f531b0b0bb0b6fb0722','7f0e397bd07f595b0b0bc920fb0722',
            '977837f0e37f14998082b0723b06bd','7f07e7f0e37f149b0723b0787b0721','7f0e27f0e47f531b0723b0b6fb0722',
            '7f0e397bd07f595b0b0bc920fb0722','977837f0e37f14898082b0723b02d5','7ec967f0e37f14998082b0787b0721',
            '7f07e7f0e47f531b0723b0b6fb0722','7f0e37f1487f595b0b0bb0b6fb0722','7f0e37f0e37f14898082b0723b02d5',
            '7ec967f0e37f14998082b0787b0721','7f07e7f0e47f531b0723b0b6fb0722','7f0e37f1487f531b0b0bb0b6fb0722',
            '7f0e37f0e37f14898082b0723b02d5','7ec967f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721',
            '7f0e37f1487f531b0b0bb0b6fb0722','7f0e37f0e37f14898082b072297c35','7ec967f0e37f14998082b0787b06bd',
            '7f07e7f0e47f531b0723b0b6fb0721','7f0e27f1487f531b0b0bb0b6fb0722','7f0e37f0e37f14898082b072297c35',
            '7ec967f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
            '7f0e37f0e366aa89801eb072297c35','7ec967f0e37f14998082b0787b06bd','7f07e7f0e47f149b0723b0787b0721',
            '7f0e27f1487f531b0b0bb0b6fb0722','7f0e37f0e366aa89801eb072297c35','7ec967f0e37f14998082b0723b06bd',
            '7f07e7f0e47f149b0723b0787b0721','7f0e27f0e47f531b0723b0b6fb0722','7f0e37f0e366aa89801eb072297c35',
            '7ec967f0e37f14998082b0723b06bd','7f07e7f0e37f14998083b0787b0721','7f0e27f0e47f531b0723b0b6fb0722',
            '7f0e37f0e366aa89801eb072297c35','7ec967f0e37f14898082b0723b02d5','7f07e7f0e37f14998082b0787b0721',
            '7f07e7f0e47f531b0723b0b6fb0722','7f0e36665b66aa89801e9808297c35', '665f67f0e37f14898082b0723b02d5',
            '7ec967f0e37f14998082b0787b0721','7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66a449801e9808297c35',
            '665f67f0e37f14898082b0723b02d5','7ec967f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721',
            '7f0e36665b66a449801e9808297c35','665f67f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd',
            '7f07e7f0e47f531b0723b0b6fb0721','7f0e26665b66a449801e9808297c35', '665f67f0e37f1489801eb072297c35',
            '7ec967f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722'],


        /**
         * 数字转中文速查表
         * @Array Of Property
         * @trans ['日','一','二','三','四','五','六','七','八','九','十']
         * @return Cn string
         */
        nStr1:["\u65e5","\u4e00","\u4e8c","\u4e09","\u56db","\u4e94","\u516d","\u4e03","\u516b","\u4e5d","\u5341"],


        /**
         * 日期转农历称呼速查表
         * @Array Of Property
         * @trans ['初','十','廿','卅']
         * @return Cn string
         */
        nStr2:["\u521d","\u5341","\u5eff","\u5345"],


        /**
         * 月份转农历称呼速查表
         * @Array Of Property
         * @trans ['正','一','二','三','四','五','六','七','八','九','十','冬\u51ac','腊']
         * @return Cn string
         */
        nStr3:["\u6b63","\u4e8c","\u4e09","\u56db","\u4e94","\u516d","\u4e03","\u516b","\u4e5d","\u5341","\u5341\u4e00","\u814a"],


        /**
         * 返回农历y年一整年的总天数
         * @param lunar Year
         * @return Number
         * @eg:var count = calendar.lYearDays(1987) ;//count=387
         */
        lYearDays:function(y) {
            var i, sum = 348;//12*29 = 348
            for(i=0x8000; i>0x8; i>>=1) { //依次取农历信息中的十六进制第2到4位按位依次对比
                sum += (calendar.lunarInfo[y-1900] & i)? 1: 0;
            }
            return(sum+calendar.leapDays(y));
        },


        /**
         * 返回农历y年闰月是哪个月；若y年没有闰月 则返回0
         * @param lunar Year
         * @return Number (0-12)
         * @eg:var leapMonth = calendar.leapMonth(1987) ;//leapMonth=6
         */
        leapMonth:function(y) {
            return(calendar.lunarInfo[y-1900] & 0xf);//lunarInfo数组最后一位为闰月编码
        },


        /**
         * 返回农历y年闰月的天数 若该年没有闰月则返回0
         * @param lunar Year
         * @return Number (0、29、30)
         * @eg:var leapMonthDay = calendar.leapDays(1987) ;//leapMonthDay=29
         */
        leapDays:function(y) {
            if(calendar.leapMonth(y)) {
                return((calendar.lunarInfo[y-1900] & 0x10000)? 30: 29);//lunarInfo数组第一位为闰月的天数标识，0:29,1:30
            }
            return(0);
        },


        /**
         * 返回农历y年m月（非闰月）的总天数，计算m为闰月时的天数请使用leapDays方法
         * @param lunar Year
         * @return Number (-1、29、30)
         * @eg:var MonthDay = calendar.monthDays(1987,9) ;//MonthDay=29
         */
        monthDays:function(y,m) {
            if(m > 12 || m < 1) {return -1}//月份参数从1至12，参数错误返回-1
            return( (calendar.lunarInfo[y-1900] & (0x10000>>m))? 30: 29 );
        },


        /**
         * 返回公历(!)y年m月的天数
         * @param solar Year
         * @return Number (-1、28、29、30、31)
         * @eg:var solarMonthDay = calendar.leapDays(1987) ;//solarMonthDay=30
         */
        solarDays:function(y,m) {
            if(m>12 || m<1) {return -1} //若参数错误 返回-1
            var ms = m-1;
            if(ms === 1) { //2月份的闰平规律测算后确认返回28或29
                return(((y%4 === 0) && (y%100 !== 0) || (y%400 === 0))? 29: 28);
            }else {
                return(calendar.solarMonth[ms]);
            }
        },


        /**
         * 传入offset偏移量返回干支
         * @param offset 相对甲子的偏移量
         * @return Cn string
         */
        toGanZhi:function(offset) {
            return(calendar.Gan[offset%10]+calendar.Zhi[offset%12]);
        },


        /**
         * 传入公历(!)y年获得该年第n个节气的公历日期
         * @param y公历年(1900-2100)；n二十四节气中的第几个节气(1~24)；从n=1(小寒)算起
         * @return day Number
         * @eg:var  calendar.getTerm(1987,3) ;//4;意即1987年2月4日立春
         */
        getTerm:function(y, n) {
            if(y < 1900 || y > 2100) {
                return -1;
            }
            if(n < 1 || n > 24) {
                return -1;
            }
            var _table = calendar.sTermInfo[y-1900];
            var _info = [
                parseInt('0x'+_table.substr(0,5)).toString() ,
                parseInt('0x'+_table.substr(5,5)).toString(),
                parseInt('0x'+_table.substr(10,5)).toString(),
                parseInt('0x'+_table.substr(15,5)).toString(),
                parseInt('0x'+_table.substr(20,5)).toString(),
                parseInt('0x'+_table.substr(25,5)).toString()
            ];
            var _calday = [
                _info[0].substr(0,1),
                _info[0].substr(1,2),
                _info[0].substr(3,1),
                _info[0].substr(4,2),

                _info[1].substr(0,1),
                _info[1].substr(1,2),
                _info[1].substr(3,1),
                _info[1].substr(4,2),

                _info[2].substr(0,1),
                _info[2].substr(1,2),
                _info[2].substr(3,1),
                _info[2].substr(4,2),

                _info[3].substr(0,1),
                _info[3].substr(1,2),
                _info[3].substr(3,1),
                _info[3].substr(4,2),

                _info[4].substr(0,1),
                _info[4].substr(1,2),
                _info[4].substr(3,1),
                _info[4].substr(4,2),

                _info[5].substr(0,1),
                _info[5].substr(1,2),
                _info[5].substr(3,1),
                _info[5].substr(4,2),
            ];
            return parseInt(_calday[n-1]);
        },


        /**
         * 传入农历数字月份返回汉语通俗表示法
         * @param lunar month
         * @return Cn string
         * @eg:var cnMonth = calendar.toChinaMonth(12) ;//cnMonth='腊月'
         */
        toChinaMonth:function(m) { // 月 => \u6708
            if(m>12 || m<1) {return -1} //若参数错误 返回-1
            var s = calendar.nStr3[m-1];
            s+= "\u6708";//加上月字
            return s;
        },


        /**
         * 传入农历日期数字返回汉字表示法
         * @param lunar day
         * @return Cn string
         * @eg:var cnDay = calendar.toChinaDay(21) ;//cnMonth='廿一'
         */
        toChinaDay:function(d){ //日 => \u65e5
            var s;
            switch (d) {
                case 10:
                    s = '\u521d\u5341';//初十
                    break;
                case 20:
                    s = '\u4e8c\u5341';//二十
                    break;
                case 30:
                    s = '\u4e09\u5341'; //三十
                    break;
                default :
                    s = calendar.nStr2[Math.floor( d/10 )];
                    s += calendar.nStr1[ d%10 ];
            }
            return(s);
        },


        /**
         * 年份转生肖[!仅能大致转换] => 精确划分生肖分界线是“立春”
         * @param y year
         * @return Cn string
         * @eg:var animal = calendar.getAnimal(1987) ;//animal='兔'
         */
        getAnimal: function(y) {
            return calendar.Animals[(y - 4) % 12]
        },

        /**
         * 传入公历年月日获得详细的公历、农历object信息 <=>JSON
         * @param y  solar year
         * @param m solar month
         * @param d  solar day
         * @return JSON object
         * @eg:console.log(calendar.solar2lunar(1987,11,01));
         */
        solar2lunar:function (y, m, d) { //参数区间1900.1.31~2100.12.31
            if(y < 1900 || y > 2100) {
                return -1;
            }//年份限定、上限
            if(y === 1900 && m === 1 && d < 31) {//1900年的正月初一
                return -1;
            }//下限
            if( !y ) { //未传参 获得当天
                var objDate = new Date();
            }else {
                var objDate = new Date(y, parseInt(m)-1, d)
            }
            var i, leap=0, temp=0;
            //修正ymd参数1900.1.31正月初一
            var offset = (Date.UTC(objDate.getFullYear(),objDate.getMonth(),objDate.getDate()) - Date.UTC(1900,0,31))/86400000;
            for( i = 1900; i < 2101 && offset > 0; i++) {
                temp = calendar.lYearDays(i);
                offset -= temp;
            }
            if(offset < 0) {
                offset+=temp;
                i--;
            }

            //是否今天
            var isTodayObj = new Date(),isToday=false;
            if(isTodayObj.getFullYear() === y && isTodayObj.getMonth()+1 === m && isTodayObj.getDate() === d) {
                isToday = true;
            }
            //星期几
            var nWeek = objDate.getDay(),cWeek = calendar.nStr1[nWeek];
            if(nWeek===0) {nWeek =7;}//数字表示周几顺应天朝周一开始的惯例
            //农历年
            var year = i;

            var leap = calendar.leapMonth(i); //闰哪个月，农历信息字符串最后一位
            var isLeap = false;

            //效验闰月
            for(i = 1; i < 13 && offset > 0; i++) {
                //闰月
                if(leap > 0 && i === (leap+1) && isLeap === false){
                    --i;
                    isLeap = true;
                    temp = calendar.leapDays(year); //计算农历闰月天数
                }
                else{
                    temp = calendar.monthDays(year, i);//计算农历普通月天数
                }
                //解除闰月
                if(isLeap===true && i===(leap+1)) {
                    isLeap = false;
                }
                offset -= temp;
            }

            if(offset === 0 && leap > 0 && i === leap+1)
                if(isLeap){
                    isLeap = false;
                }else{
                    isLeap = true;
                    --i;
                }
            if(offset < 0){
                offset += temp;
                --i;
            }
            //农历月
            var month = i;
            //农历日
            var day = offset + 1;

            //天干地支处理
            var sm = m-1;
            var term3 = calendar.getTerm(year, 3); //该农历年立春日期
            var gzY = '';

            //依据立春日进行修正gzY
            if(sm < 2 && d < term3) {
                gzY = calendar.toGanZhi(year-5);
            }else {
                gzY = calendar.toGanZhi(year-4);
            }

            //月柱 1900年1月小寒以前为 丙子月(60进制12 )每月两个节气
            var firstNode = calendar.getTerm(y, (m*2-1));//返回当月第一个节气为几日开始
            var secondNode = calendar.getTerm(y, (m*2));//返回当月第二个节气为几日开始

            //依据1898年冬月（甲子月）1900.1.1差了12个月
            var gzM = calendar.toGanZhi((y-1900)*12 + m + 11);
            if(d >= firstNode) {
                gzM = calendar.toGanZhi((y-1900)*12 + m + 12);
            }

            //传入的日期的节气与否
            var isTerm = false;
            var Term = null;
            if(firstNode === d) {
                isTerm = true;
                Term = calendar.solarTerm[m*2-2];
            }else if(secondNode === d) {
                isTerm = true;
                Term = calendar.solarTerm[m*2-1];
            }
            //传入日期与 1899/12/22(甲子日) 相差天数
            var dayCyclical = Date.UTC(y, sm,  1, 0, 0, 0, 0) / 86400000 - Date.UTC(1899, 12, 22) + d;
            var gzD = calendar.toGanZhi(dayCyclical - 1);

            //节日信息
            var isSolarFestival = false,
                solarFestival = null,
                isLunarFestival = false,
                lunarFestival = null;
            var nowDateStr = (m<10 ? '0'+m : m+'') + (d<10 ? '0'+d : d+'');
            //console.log(nowDateStr);
            if(nowDateStr in calendar.sFtv){
                isSolarFestival = true;
                solarFestival = calendar.sFtv[nowDateStr];
            }
            var nowLunarDate = (month < 10 ? '0'+month : month) + (day < 10 ? '0'+day : day);
            //console.log(nowLunarDate);
            if(nowLunarDate in calendar.lFtv){
                //console.log(calendar.lFtv[nowLunarDate]);
                isLunarFestival = true;
                lunarFestival = calendar.lFtv[nowLunarDate];
                //console.log('========'+lunarFestival);
            }

            return {
                'lYear':year,
                'lMonth':month,
                'lDay':day,
                'Animal':calendar.getAnimal(year),
                'IMonthCn':(isLeap?"\u95f0":'')+calendar.toChinaMonth(month),
                'IDayCn':calendar.toChinaDay(day),
                'cYear':y,
                'cMonth':m,
                'cDay':d,
                'gzYear':gzY,
                'gzMonth':gzM,
                'gzDay':gzD,
                'isToday':isToday,
                'isLeap':isLeap,
                'nWeek':nWeek,
                'ncWeek':"\u661f\u671f"+cWeek,
                'isTerm':isTerm,
                'Term':Term,
                'isSolarFestival':isSolarFestival,
                'solarFestival':solarFestival,
                'isLunarFestival':isLunarFestival,
                'lunarFestival':lunarFestival
            };
        },

        /**
         * 传入农历年月日以及传入的月份是否闰月获得详细的公历、农历object信息 <=>JSON
         * @param y  lunar year
         * @param m lunar month
         * @param d  lunar day
         * @param isLeapMonth  lunar month is leap or not.
         * @return JSON object
         * @eg:console.log(calendar.lunar2solar(1987,9,10));
         */
        lunar2solar:function(y,m,d,isLeapMonth) {	//参数区间1900.1.31~2100.12.1
            var leapOffset = 0;
            var leapMonth = calendar.leapMonth(y);
            var leapDay = calendar.leapDays(y);
            if(isLeapMonth && (leapMonth!=m)) {return -1;}//传参要求计算该闰月公历 但该年得出的闰月与传参的月份并不同
            if(y===2100&&m===12&&d>1 || y===1900&&m===1&&d<31) {return -1;}//超出了最大极限值
            var day = calendar.monthDays(y,m);
            if(y<1900 || y>2100 || d>day) {return -1;}//参数合法性效验

            //计算农历的时间差
            var offset = 0;
            for(var i=1900; i < y; i++) {
                offset+=calendar.lYearDays(i);
            }
            var leap = 0,isAdd= false;
            for(var i = 1; i < m; i++) {
                leap = calendar.leapMonth(y);
                if(!isAdd) {//处理闰月
                    if(leap <= i && leap > 0) {
                        offset += calendar.leapDays(y);isAdd = true;
                    }
                }
                offset+=calendar.monthDays(y, i);
            }
            //转换闰月农历 需补充该年闰月的前一个月的时差
            if(isLeapMonth) {
                offset+=day;
            }
            //1900年农历正月一日的公历时间为1900年1月30日0时0分0秒(该时间也是本农历的最开始起始点)
            var stmap = Date.UTC(1900,1,30,0,0,0);
            var calObj = new Date((offset+d-31)*86400000+stmap);
            var cY = calObj.getUTCFullYear();
            var cM = calObj.getUTCMonth()+1;
            var cD = calObj.getUTCDate();

            return calendar.solar2lunar(cY,cM,cD);
        }
    };

    var CalendarFunc = function(){

    };
    //初始化
    CalendarFunc.prototype.init = function(config){//config配置对象
        //var yearNum = ;
        _render(config);
        _builtSetYearAndMonth(config.yearNum);
        _bind(document.getElementById('setYear'));
        _bind(document.getElementById('setMonth'));
        _bind(document.getElementById('holiday'));
        _bindClick(document.getElementById('returnToday'));
        return this;
    }

    return CalendarFunc;
})();