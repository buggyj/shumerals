
/*\
title: $:/plugins/bj/asciisvg/shulib.js
type: application/javascript
module-type: library



\*/
(function() {
shu = {};
shu.test = function (){alert("test")}
shu.neck = 0.7;//ratio controlling the slope of cape 
shu.headroom = 0.7;
shu.ears = 0.1;
shu.ratiocalc = function (x) {return  Math.log(x)}
shu.subfactorheight = function(subfactor,num) {
	//hack to make enough room for dot
	//if (num < 2) num =2;
	if (subfactor < 2) subfactor =2;
	return shu.ratiocalc(subfactor) /(shu.ratiocalc(num)+shu.ratiocalc(subfactor));
}
shu.subshuheight = function(subfactor,num) {
	//hack to make enough room for dot
	//if (num < 2) num =2;
	if (subfactor < 2) subfactor =2;
	return shu.ratiocalc(num) /(shu.ratiocalc(num)+shu.ratiocalc(subfactor));
}
function mid(a,b) {
	var mid = [];
	mid [0] = (b[0]+a[0])/2;//(a[0]< b[0])? b[0]-a[0]:a[0]-b[0];
	mid [1] = (b[1]+a[1])/2;//a[1]< b[1])? b[1]-a[1]:a[1]-b[1];
	return mid;
}

shu.biggestprime=function(num){
  var root = Math.sqrt(num),   
  x = 2; 
  
  if(num % x){//if not divisible by 2 
   x = 3;//assign first odd
   while((num % x) && ((x = x + 2) < root)){}//iterate odds
  }
  //if no factor found then num is prime
  x = (x <= root) ? x : num;

  //if num isn't prime factor make recursive call
  return (x === num) ? x : shu.biggestprime(num/x) ;
}
shu.icon2 = function(m,X,Y,size,mode) {
//for not connected we need to shorten the line segments so the ends don't touch the vertices
	var a = [[X-size/2,Y-size/2],[X-size/2,Y+size/2],[X+size/2,Y-size/2],[X+size/2,Y+size/2]];

		switch (mode) {
			case null:
			case 0:
			case 1:
				 MSVG.line(a[0],a[1],{strokewidth:2,stroke:"red"})
				 MSVG.line(a[2],a[3],{strokewidth:2,stroke:"red"})
				break;
			case 2:
				 MSVG.line(mid(a[0],mid(a[0],a[1])),mid(mid(a[0],a[1]),a[1]),{strokewidth:2,stroke:"red"})
				 MSVG.line(mid(a[2],mid(a[2],a[3])),mid(mid(a[2],a[3]),a[3]),{strokewidth:2,stroke:"red"})
				break;
			default:
				break;
		}
	if (!mode && m!==-1) shu.icon(m,1,X,Y,size/2,0);
	else if (m!==-1){
		var pt;
		pt= mid(a[0],a[1]);shu.icon(m,1,pt[0],pt[1],size/2,0);
		pt= mid(a[2],a[3]);shu.icon(m,1,pt[0],pt[1],size/2,0);
	}

}
shu.icon = function(n,m,X,Y,size,mode) {
//for not conected we need to shorten the line segments so the ends don't touch the vertices
	var a = []
	function getfactor (n) {
		var getfactor = [1,1,1.414,1.732,1.414,1.176,1,0.868,0.765];
		if (n<9) return getfactor[n];
		return 1;
	}
	var i
	if (n==1) {MSVG.dot([X,Y],{marker:'o',markerfill:'black'});return}
	if (n==2) {shu.icon2(m,X,Y,size*0.707,mode);}
	else {
		//size with the the enclosing radius - use lookup table for side length
		var side = getfactor(n)*size/2;
		if (n==4) a = [[X-side/2,Y-side/2],[X-side/2,Y+side/2],[X+side/2,Y+side/2],[X+side/2,Y-side/2],[X-side/2,Y-side/2]];
		else
		 for (i = 0; i < n+1; i++)
			a[i] = [X +size/2* Math.sin(2*Math.PI/n*(1)*i),Y+size/2*Math.cos(2*Math.PI/n*(1)*i)];
		
		switch (mode) {
			case null:
			case 0:
			case 1:
				for (var j =0; j< a.length-1; j++) MSVG.line(a[j],a[j+1],{strokewidth:2,stroke:"red"});
				break;
			case 2:
				for (var j =0; j< a.length-1; j++) MSVG.line(mid(a[j],mid(a[j],a[j+1])),mid(mid(a[j],a[j+1]),a[j+1]),{strokewidth:2,stroke:"red"});
				break;
			default:
				break;
		}

		if (!mode && m!==-1) shu.icon(m,1,X,Y,(n==2||n==4)?size/2:size/2,0);
		else if (m!==-1){
			var pt;
			for (var j =0; j< a.length-1; j++){pt= mid(a[j],a[j+1]);shu.icon(m,1,pt[0],pt[1],size/4,0);}
		}
	}

}
shu.rendplus = function(num, left, right, h, up,newshu,neck,ears,headroom) {
	neck1 = shu.neck;//ratio controlling the slope of cape 
	headroom1 = shu.headroom;
	ears1 = shu.ears;
	shu.neck = neck;//ratio controlling the slope of cape 
	shu.headroom = headroom||shu.headroom;
	shu.ears = ears||shu.ears;
	shu.rend (num, left, right, h, up,newshu);
	shu.neck = neck1;//ratio controlling the slope of cape 
	shu.headroom = headroom1;
	shu.ears = ears1;
}
shu.draw =function (num,X,Y,size) {
shu.rend(num,[X-size/2,Y-size/2],[X + size/2,Y-size/2],size,true,true);
}
shu.rend = function(num, left, right, h, up,newshu) {
	var ret;
	if (num < 5) {
		var X = (left[0] + right[0])/2,Y = right[1]+h/2;
		shu.icon(num,1,X,Y,h,0);
	}
	else {
		ret = shu.rendinner (num, left, right, h, up,newshu,1);
		MSVG.dot([(right[0]+left[0])/2,ret[2]],{marker:'o',markerfill:'black'});
	}
}
shu.rendinner = function(num, left, right, h, up,newshu,headroom) {
	var cap = [],neck = shu.neck,min = 0,hdelta,ret ;
	if (headroom == null) headroom = shu.headroom;
	if (num ==2) {
		if (left[0]==right[0]) {
			 min = (up)?h*headroom/10:-h*headroom/5;
			 left[0]+=min;
			 right[0]-=min;
			 h = h*4/5;
		 }
		MSVG.line( left, [left[0],left[1]+h*headroom],{strokewidth:2,stroke:'red'});
		MSVG.line( right, [right[0],right[1]+h*headroom],{strokewidth:2,stroke:'red'});
		return [left[0],right[0],right[1]+(h*headroom/2)];
	}
	if (num ==1) {
		return [left[0],right[0],h/2];
	}
	if (num % 4 == 0) {
		var hdelta = h*0.05;
		var righttop = [];
		righttop[0] = right[0];
		righttop[1] = right[1] + h; 
		
	var capeleft =[left[0]+hdelta,left[1]+hdelta];
	var caperight =[right[0]-hdelta,right[1]+hdelta];
		
		ret =(shu.rendinner(num / 4,capeleft,caperight,h-2*hdelta,up,true,1));
		var scales = MSVG.getAllScales();
		scales[3] *=0.5;
		MSVG.reScales(scales);
		MSVG.rect(left,righttop,{stroke:'red'});
		return ret;
	}
	var subshu = shu.biggestprime(num) ;
	var subfactor = num/subshu;

	num = subshu;

		//render subfactor
		
	var base =left[1];
	var hdelta = h*headroom;
	var subleft=[],subright=[];//alert(hdelta +"-"+ shu.subfactorheight(subfactor,num);)
	var hdelta2 =  hdelta * shu.subfactorheight(subfactor,num);
	var hdelta3=h*(1-shu.headroom)/4
	if (up){
	subleft[1] =base+hdelta3;
	subright[1] =base+hdelta3;
	
	}
	else {
	subleft[1] =base-hdelta3;
	subright[1] =base-hdelta3;
	}
	var width = right[0] -left[0];
	var instep = (1 - neck)/2;
	subleft[0]	= left[0]+instep*width;
	subright[0]	= right[0]-instep*width;
	if (subfactor > 1) {
		//var X = (!up)? subleft[0] - subright[0]:subright[0] - subleft[0];
		//var Y = subleft[1];
		//MSVG.dot([X,Y],{marker:'o',markerfill:'black'});
		if (subfactor % 3 ==0 ){//&& num == 1) {
			subleft[0] =left[0]+2*hdelta3;
			subright[0]=right[0]-2*hdelta3;
			ret = (shu.rendinner(subfactor,subleft,subright,hdelta2,up,true));
		}
		else {
		//alert (num);alert(subfactor)
			ret = (shu.rendinner(subfactor,subleft,subright,hdelta2,up,true));
		}
	} else {
		var X = (!up)? subleft[0] - subright[0]:subright[0] - subleft[0];
		var Y = subleft[1];//alert(hdelta3)
		ret = [subleft[0],subright[0],subleft[1]+(hdelta3)];
	}

	if (newshu )MSVG.line( left, right,{strokewidth:2,stroke:'red'});

	if (num % 3 == 2) {
		num = num - 2;
		var hdelta = h*headroom,head;
		var base =left[1]; //y coord
		if (up) head = base + hdelta;
		else head = base - hdelta;

		cap.push([left[0],head]);
		cap.push([right[0],head]);
		MSVG.path (cap,{stroke:'red',strokewidth:2});
	} 
	else if (num % 3 == 1) {
		num -=4;
		var hdelta=h*headroom,head;
		var ear;
		var base =left[1]; //y coord
		if (up) {head = base + hdelta;ear = hdelta*shu.ears}
		else {head = base - hdelta; ear = -hdelta*shu.ears}
		cap.push([left[0],head+ear]);
		cap.push([left[0],head]);
		cap.push([right[0],head]);
		cap.push([right[0],head+ear]);
		MSVG.path (cap,{stroke:'red',strokewidth:2});
	}
	else { //divisable by 3 - no cap
		neck = 0;
		var hdelta = h*headroom,head;
		var base =left[1]; //y coord
		if (up) head = base + hdelta;
		else head = base - hdelta;
	}
	/**** now draw the cape *****/
	num = num /3;
	var width = right[0] -left[0];
	var instep = (1 - neck)/2;
	var capeleft =[left[0]+instep*width,head];
	var caperight =[right[0]-instep*width,head];

	MSVG.line(left,capeleft,{strokewidth:2,stroke:'red'});
	MSVG.line(right,caperight,{strokewidth:2,stroke:'red'});
	var hdelta1 = hdelta * shu.subshuheight(subfactor,num);
	//render subshu
	if (num > 1) shu.rendinner(num,capeleft,caperight,hdelta1,!up);

return ret;

}

})();
