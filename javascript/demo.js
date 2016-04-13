/**
 * Created by Administrator on 2016/4/13.
 */
window.onload = function(){
    new calendar360Star().init({
        yearNum: 2100,//数据库中的信息只保存1900-2100年信息
        wrapId: 'calendar-wrap',
        weather: true
    });
};