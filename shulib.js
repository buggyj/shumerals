
/*\
title: $:/plugins/bj/asciisvg/shulib.js
type: application/javascript
module-type: library



\*/
(function() {
shu = {};
shu.test = function (){alert("test")}
shu.neck = 0.7;//ratio controlling the slope of cape 
shu.usableHfraction = 0.7;
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
shu.rendplus = function(num, left, right, h, up,newshu,neck,ears,usableHfraction) {
	neck1 = shu.neck;//ratio controlling the slope of cape 
	usableHfraction1 = shu.usableHfraction;
	ears1 = shu.ears;
	shu.neck = neck;//ratio controlling the slope of cape 
	shu.usableHfraction = usableHfraction||shu.usableHfraction;
	shu.ears = ears||shu.ears;
	shu.rend (num, left, right, h, up,newshu);
	shu.neck = neck1;//ratio controlling the slope of cape 
	shu.usableHfraction = usableHfraction1;
	shu.ears = ears1;
}
shu.draw =function (num,X,Y,size) {
	if (num == 0) return;
	size = size * 0.707;
	shu.rend(num,[X-size/2,Y-size/2],[X + size/2,Y-size/2],size,true,true);
	
}
shu.drawouter =function (num,X,Y,size,facx, facy) {
	facx = facx||1;
	facy = facy||1;
	var sizex = size * 0.707 *facx;
	var sizey = size * 0.707 *facy;
return(shu.rendinner(num,[X-sizex/2,Y-sizey/2],[X + sizex/2,Y-sizey/2],sizey,true,true,1));
}
shu.tobase =function (cent, facx, facy) {
	var X = cent[0];
	var Y = cent[1];
	var size = cent[2];
	facx = facx||1;
	facy = facy||1;
	var sizex = size * 0.707 *facx;
	var sizey = size * 0.707 *facy;
return([[X-sizex/2,Y-sizey/2],[X + sizex/2,Y-sizey/2],sizey]);
}
shu.tocent = function(base) {
	var X = (base[0][0] + base[1][0])/2,Y = base[1][1]+base[2]/2;
	return([X,Y,base[2]]);
}
shu.rend = function(num, left, right, h, up,newshu) {
	var ret;
	if (num < 5) {
		var X = (left[0] + right[0])/2,Y = right[1]+h/2;
		shu.icon(num,1,X,Y,h,0);
	}
	else {
		ret = shu.rendinner (num, left, right, h, up,newshu,1);
		MSVG.dot([(right[0]+left[0])/2,ret[1][1]+ret[2]/2],{marker:'o',markerfill:'black'});
	}
}
shu.rendinner = function(num, left, right, h, up,newshu,usableHfraction) {
	var cap = [],neck = shu.neck,min = 0,hdelta,ret ;
	if (usableHfraction == null) usableHfraction = shu.usableHfraction;
	var number = num;
	if (num ==1) {
		return [left,right,h];
	}
	if (num ==2) {//alert(left[0]+"=="+right[0])
		/*
		if (true){//(left[0]==right[0]) {
			 min = (up)?h*usableHfraction/5:-h*usableHfraction/5;
			 var centre =(left[0]+ right[0])/2;
			 left[0] =centre+min;
			 right[0] = centre-min;
			 //h = h*4/5;
		 }*/
		MSVG.line( left, [left[0],left[1]+h*usableHfraction],{strokewidth:2,stroke:'red'});
		MSVG.line( right, [right[0],right[1]+h*usableHfraction],{strokewidth:2,stroke:'red'});
		return [left,right,(h)];
	}
	if (num % 4 == 0) {
		var hdelta = h*0.1;
		var righttop = [];
		righttop[0] = right[0];
		righttop[1] = right[1] + h; 
		
	var innerLeft =[left[0]+hdelta,left[1]+hdelta];
	var innerRight =[right[0]-hdelta,right[1]+hdelta];
		//var scales = MSVG.getAllScales();
		//scales[3] *=0.5;
		//MSVG.reScales(scales);	
		ret =(shu.rendinner(num / 4,innerLeft,innerRight,h-2*hdelta,up,true,1-shu.ears));

		MSVG.rect(left,righttop,{stroke:'red'});
		return ret;
	}
	var subshu = shu.biggestprime(num) ;
	var subfactor = num/subshu;

	var curshu = subshu;

		//render subfactor
		
	var base =left[1];//alert(subshu +"-"+h*usableHfraction)
	var hdelta = h*usableHfraction;
	var subleft=[],subright=[];//alert(hdelta +"-"+ shu.subfactorheight(subfactor,subshu);)
	var hdelta2 =  hdelta * shu.subfactorheight(subfactor,subshu/3);
	var margin=h*(1-shu.usableHfraction)/4
	if (up){
	subleft[1] =base+margin;
	subright[1] =base+margin;
	
	}
	else {
	subleft[1] =base-margin;
	subright[1] =base-margin;
	}
	var width = right[0] -left[0];
	var instep = (1 - neck)/2;
	subleft[0]	= left[0]+instep*width;
	subright[0]	= right[0]-instep*width;
	if (subfactor > 1) {
{
		//alert (subshu);alert(subfactor)
		    if (curshu % 3 == 0 && subfactor % 3 !=0 ) {
				// there is less usable space inside a triangle
				subleft[0]	= left[0]+5*instep*width;
				subright[0]	= right[0]-5*instep*width;
				ret = (shu.rendinner(subfactor,subleft,subright,hdelta2*2/3,up,true));
			}
		    else 
				ret = (shu.rendinner(subfactor,subleft,subright,hdelta2,up,true));
		}
	} else {
		ret = (shu.rendinner(subfactor,subleft,subright,hdelta2,up,true));
	}

	if (newshu )MSVG.line( left, right,{strokewidth:2,stroke:'red'});

	if (subshu % 3 == 2) {
		subshu = subshu - 2;
		var hdelta = h*usableHfraction,head;
		var base =left[1]; //y coord
		if (up) head = base + hdelta;
		else head = base - hdelta;

		cap.push([left[0],head]);
		cap.push([right[0],head]);

	} 
	else if (subshu % 3 == 1) {
		subshu -=4;
		var hdelta=h*usableHfraction,head;
		var ear;
		var base =left[1]; //y coord
		if (up) {head = base + hdelta;ear = hdelta*shu.ears}
		else {head = base - hdelta; ear = -hdelta*shu.ears}
		cap.push([left[0],head+ear]);
		cap.push([left[0],head]);
		cap.push([right[0],head]);
		cap.push([right[0],head+ear]);

	}
	else { //divisable by 3 - no cap
		neck = 0;
		var hdelta = h*usableHfraction,head;
		var base =left[1]; //y coord
		if (up) head = base + hdelta;
		else head = base - hdelta;
	}
	/**** now draw the cape *****/
	subshu = subshu /3;
	var width = right[0] -left[0];
	var instep = (1 - neck)/2;
	var capeleft =[left[0]+instep*width,head];
	var caperight =[right[0]-instep*width,head];
	var hdelta1 = hdelta * shu.subshuheight(subfactor,subshu);
	//render subshu 
	if (subshu > 1) {
		
		//if the subshuber is a three?
		shu.rendinner(subshu,capeleft,caperight,hdelta1,!up);

	}
	if (neck !=0) 		MSVG.path (cap,{stroke:'red',strokewidth:2});
	MSVG.line(left,capeleft,{strokewidth:2,stroke:'red'});
	MSVG.line(right,caperight,{strokewidth:2,stroke:'red'});


return ret;

}

})();
