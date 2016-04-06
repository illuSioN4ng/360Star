/**
 * Created by illuSioN4ng on 2016/4/6.
 */
function $(id) {
    return document.getElementById(id);
}

var nowDay = new Date();
var year=parseInt(nowDay.getFullYear());
var month=parseInt(nowDay.getMonth());

window.onload = function(){
    builtSetYearAndMonth(100);
};

//显示该年该月的日历

function makeDays(year,month)
{

    var firstDay = new Date(year,month,1),
        lastDay = new Date(year,month,getDayCountByYearAndMonth(year,month)),
        //获得每月的前面空余的天数
        firstDayBefore = parseInt(firstDay.getDay()),
        lastDayOfLastMonth = getDayCountByYearAndMonth(year,month - 1),
        lastDayAfter = 6 - parseInt(lastDay.getDay());
    //显示每月前面空余的天数
    for(var i= 0; i < firstDayBefore; i++) {
        dayobj = document.createElement("div");
        dayobj.className="dayOfOtherMonth";
        dayobj.innerHTML = lastDayOfLastMonth - firstDayBefore + i + 1;
        $("days").appendChild(dayobj);
    }
    //显示每月的天数
    for(var i=1;i<=getDayCountByYearAndMonth(year,month);i++)
    {
        dayobj = document.createElement("div");
        dayobj.className="day";
        dayobj.name=year+"-"+(parseInt(month)+1)+"-"+i;
        $("days").appendChild(dayobj);
        dayobj.innerHTML = i;

        //设置当天的样式
        if(nowDay.getFullYear()==year && nowDay.getMonth()==month && nowDay.getDate()==i)
        {
            dayobj.id="thisDay";
        }

        dayobj.onmouseover= function(){
            this.style.backgroundColor="#f5f5f5";
        }
        dayobj.onmouseout= function(){
            this.style.backgroundColor="#fff";
        }
        dayobj.onclick= function(){
            //$("borthTextAre").value=this.name;
            //$("borthTextAre").innerHTML = $("borthTextAre").value;
            //$("borthTextAre").innerHTML="你的生日："+this.name;
            $("borthText").value = this.name;
        }
    }
    //显示每月后空余的天数
    for(var i= 0; i < lastDayAfter; i++) {
        dayobj = document.createElement("div");
        dayobj.className="dayOfOtherMonth";
        dayobj.innerHTML = i + 1;
        $("days").appendChild(dayobj);
    }
}

//计算该年该月的天数
function getDayCountByYearAndMonth(year,month)
{
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
}
//初始化年月选择器
function builtSetYearAndMonth(yearNum)
{
    for(var i=-yearNum; i<yearNum;i++){
        yearObj = document.createElement("option");
        yearObj.innerHTML =parseInt(nowDay.getFullYear())+i;
        yearObj.value =parseInt(nowDay.getFullYear())+i;
        $("setYear").appendChild(yearObj);
    }
    for(var i=0;i<12;i++)
    {
        monthObj = document.createElement("option");
        monthObj.innerHTML=i+1;
        monthObj.value =i;
        $("setMonth").appendChild(monthObj);
    }
    $("setYear").selectedIndex = yearNum;
    $("setMonth").selectedIndex = parseInt(nowDay.getMonth());
    makeDays(parseInt(year),parseInt(month));
}

function chose(ele)
{
    if(ele.id == "setYear"){
        year = ele.value;
    }
    if(ele.id == "setMonth"){
        month = ele.value;
    }
    $("days").innerHTML="";
    makeDays(year,month);
}