/**
 * Created by Administrator on 2016/4/10.
 */
/**
 * Created by illuSioN4ng on 2016/4/6.
 */
var calendar360Star = (function(){
    var nowDay = new Date(),
        year=parseInt(nowDay.getFullYear()),
        month=parseInt(nowDay.getMonth());

    //显示该年该月的日历
    var _makeDays = function(year,month){
        var firstDay = new Date(year,month,1),
            lastDay = new Date(year,month,_getDayCountByYearAndMonth(year,month)),
        //获得每月的前面空余的天数
            firstDayBefore = parseInt(firstDay.getDay()),
            lastDayOfLastMonth = _getDayCountByYearAndMonth(year,month - 1),
        //获得每月的后面空余的天数
            lastDayAfter = 6 - parseInt(lastDay.getDay()),
            dayobj = null;
        //console.log(firstDayBefore);
        //显示每月前面空余的天数
        for(var i= 0; i < firstDayBefore; i++) {
            dayobj = document.createElement("div");
            dayobj.className="dayOfOtherMonth";
            dayobj.innerHTML = lastDayOfLastMonth - firstDayBefore + i + 1;
            document.getElementById("days").appendChild(dayobj);
        }
        //显示每月的天数
        for(i=1;i <= _getDayCountByYearAndMonth(year,month); i++)
        {
            dayobj = document.createElement("div");
            dayobj.className="day";
            dayobj.name=year+"-"+(parseInt(month)+1)+"-"+i;
            document.getElementById("days").appendChild(dayobj);
            dayobj.innerHTML = i;

            //设置当天的样式
            if(nowDay.getFullYear()==year && nowDay.getMonth()==month && nowDay.getDate()==i)
            {
                dayobj.id="thisDay";
            }

            dayobj.onmouseover= function(){
                this.style.backgroundColor="#f5f5f5";
            };

            dayobj.onmouseout= function(){
                this.style.backgroundColor="#fff";
            };

            dayobj.onclick= function(){
                //document.getElementById("borthTextAre").value=this.name;
                //document.getElementById("borthTextAre").innerHTML = document.getElementById("borthTextAre").value;
                //document.getElementById("borthTextAre").innerHTML="������գ�"+this.name;
                document.getElementById("borthText").value = this.name;
            }
        }
        //显示每月后空余的天数
        for(i= 0; i < lastDayAfter; i++) {
            dayobj = document.createElement("div");
            dayobj.className="dayOfOtherMonth";
            dayobj.innerHTML = i + 1;
            document.getElementById("days").appendChild(dayobj);
        }
    };


    //计算该年该月的天数
    var _getDayCountByYearAndMonth = function(year,month){
        month++;
        if(month===4 || month===6 || month===9 || month===11)
            return 30;
        if(month===2)
        {
            if(((year%4===0)&&(year%100!==0)) || (year%400 === 0))
                return 28;
            return 29;
        }
        return 31;
    };

    var _chose = function(ele){
        if(ele.id == "setYear"){
            year = ele.value;
        }
        if(ele.id == "setMonth"){
            month = ele.value;
        }
        document.getElementById("days").innerHTML="";
        _makeDays(year,month);
        //return this;
    };

    var _builtSetYearAndMonth = function(yearNum){
        for(var i=-yearNum; i<yearNum;i++){
            var yearObj = document.createElement("option");
            yearObj.innerHTML = parseInt(nowDay.getFullYear())+i;
            yearObj.value = parseInt(nowDay.getFullYear())+i;
            document.getElementById("setYear").appendChild(yearObj);
        }
        for(i = 0; i < 12; i++)
        {
            var monthObj = document.createElement("option");
            monthObj.innerHTML = i + 1;
            monthObj.value = i;
            document.getElementById("setMonth").appendChild(monthObj);
        }
        document.getElementById("setYear").selectedIndex = yearNum;
        document.getElementById("setMonth").selectedIndex = parseInt(nowDay.getMonth());
        _makeDays(parseInt(year),parseInt(month));
    };

    //渲染日历主体结构
    var _render = function(id){
        //var wrapId = document.getElementById(id);
        //wrapId.innerHTML = '<div id="borthTextAre" >你的生日：<input id="borthText" type="text" /></div><div id="setDate"> 选择年份：<select id="setYear"></select>  选择月份：<select id="setMonth"></select> </div><!-- 日历 begin--> <div id ="dateBody"> <div class="weekday">日</div> <div class="weekday">一</div> <div class="weekday">二</div> <div class="weekday">三</div> <div class="weekday">四</div> <div class="weekday">五</div> <div class="weekday">六</div><!-- 日历天数显示 begin--> <div  id="days"></div><!-- 日历天数显示 end--><br style="clear:both;" /></div> <!--日历 end -->';
    }

    var _bind = function(that){
        that.onchange = function(){
            var id = that.id,
                value = that.value;
            if(id === "setYear"){
                year = value;
                //console.log(year);
            }
            if(id === "setMonth"){
                month = value;
                //console.log(month);
            }
            document.getElementById("days").innerHTML="";
            _makeDays(year,month);
        };
    };

    var CalendarFunc = function(){

    };
    //初始化
    CalendarFunc.prototype.init = function(config){//config配置对象
        var yearNum = config.yearNum;
        _render(config.wrapId);
        _builtSetYearAndMonth(yearNum);
        _bind(document.getElementById('setYear'));
        _bind(document.getElementById('setMonth'));
        return this;
    }

    return CalendarFunc;
})();

window.onload = function(){
    new calendar360Star().init({
        yearNum: 100,
        wrapId: 'calendar-wrap'
    });
};
