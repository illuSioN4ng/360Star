function move(t){

	const g = 30; 					//重力加速度
	const blowValue = 0; 			//风的吹动
	var notOverHighest = true;
	var underTrash = true; 			//z坐标处于垃圾桶高度之下

	var trash = {					//垃圾桶配置
		x: 0,
		y: 0,
		z: 500,
		h: 55,
		r: 20
	};

	var ballConfig = {
		r : 5,  				//球的半径
		v: 80,  				//初始速度
		a: Math.PI / 2,			//速度方向与xoy平面夹角
		vz: 10,					//z方向的速度
		x: 0,					//球的初始坐标
		y: 0,
		z: 1000
	};

	function Ball(config){
		this.r = config.r;
		this.vx = config.v * Math.cos(config.a);
		this.vy = config.v * Math.sin(config.a);
		this.vz = config.vz;
		this.x = config.x;
		this.y = config.y;
		this.z = 0;
	}

	var ball = new Ball(ballConfig);

	//是否进入垃圾桶
	function isIn(cX, cY, cR, trashX, trashY, trashR) {
		if(Math.sqrt((cX - trashX) * (cX - trashX) + (cY - trashY) * (cY - trashY)) < (trashR - cR)){
			return true;
		}else {
			return false;
		}
	}

	function getPosition(t, aBall) {
		t = t / 1000;

		var durWhenTop = aBall.vy / g;
		var result = {isIn: false};
		var yPosWhenTop = 0;
		var x = 0,
			y = 0,
			z = 0;
		
		if(t < durWhenTop){
			x = parseInt(aBall.x + aBall.vx * t);
			y = parseInt(aBall.y - aBall.vy * t + 0.5 * g * t * t);
			z = parseInt(aBall.z + aBall.vz * t);
			xPosWhenTop = x;
		}else{
			if(notOverHighest){
				aBall.vx += blowValue;
				notOverHighest = false;
			}

			if(aBall.y > trash.y - trash.h && underTrash){
				result.isIn = isIn(aBall.x, aBall.y, aBall.r, trash.x, trash.y, trash.r);
				underTrash = false;
			}
			
			x  = parseInt(xPosWhenTop + aBall.vx * (t - durWhenTop));
			y = parseInt(aBall.y - aBall.vy * t + 0.5 * g * t * t);
			z = parseInt(aBall.z + aBall.vz * t);
		}
		
		result.x = x;
		result.y = y;
		result.z = z;
		console.log(result);
		return result;
	}
	
	return getPosition(t, ball);
}




