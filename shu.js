<$asciisvg class="SVGgraph" options="height:400,width:400,scales:[-6,6,-1,14], border:'none'">`
window.shu = {};
window.shu.neck = 0.7;//ratio controlling the slope of cape 
window.shu.headroom = 0.7;
window.shu.ears = 0.1;
window.shu.ratiocalc = function (x) {return  Math.log(x)}
window.shu.subfactorheight = function(subfactor,num) {
	return shu.ratiocalc(subfactor) /(shu.ratiocalc(num)+shu.ratiocalc(subfactor));
}
window.shu.subshuheight = function(subfactor,num) {
	return shu.ratiocalc(num) /(shu.ratiocalc(num)+shu.ratiocalc(subfactor));
}
window.shu.biggestprime=function(num){
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
window.shu.rend = function(num, left, right, h, up,newshu) {
var cap = [],neck = shu.neck;
if (num ==2) {
	line( left, [left[0],left[1]+h*shu.headroom],{strokewidth:2,stroke:"red"});
	line( right, [right[0],right[1]+h*shu.headroom],{strokewidth:2,stroke:"red"});
	return;
}
if (num % 4 == 0) {
	var hdelta = h*0.05;
	var righttop = [];
	righttop[0] = right[0];
	righttop[1] = right[1] + h; 
	rect(left,righttop,{stroke:"red"});
var capeleft =[left[0]+hdelta,left[1]+hdelta];
var caperight =[right[0]-hdelta,right[1]+hdelta];
	
	if (num > 4) shu.rend(num / 4,capeleft,caperight,h-2*hdelta,up,true);
	return;
}
var subshu = shu.biggestprime(num) ;
var subfactor = num/subshu;
num = subshu;
if (newshu )line( left, right,{strokewidth:2,stroke:"red"});

if (num % 3 == 2) {
	num = num - 2;
	var hdelta = h*shu.headroom,head;
	var base =left[1]; //y coord
	if (up) head = base + hdelta;
	else head = base - hdelta;

	cap.push([left[0],head]);
	cap.push([right[0],head]);
	path (cap,{stroke:"red",strokewidth:2});
} 
else if (num % 3 == 1) {
	num -=4;
	var hdelta=h*shu.headroom,head;
	var ear;
	var base =left[1]; //y coord
	if (up) {head = base + hdelta;ear = hdelta*shu.ears}
	else {head = base - hdelta; ear = -hdelta*shu.ears}
	cap.push([left[0],head+ear]);
	cap.push([left[0],head]);
	cap.push([right[0],head]);
	cap.push([right[0],head+ear]);
	path (cap,{stroke:"red",strokewidth:2});
}
else { //divisable by 3
	neck = 0;
	var hdelta = h*shu.headroom,head;
	var base =left[1]; //y coord
	if (up) head = base + hdelta;
	else head = base - hdelta;
}
num = num /3;
var width = right[0] -left[0];
var instep = (1 - neck)/2;
var capeleft =[left[0]+instep*width,head];
var caperight =[right[0]-instep*width,head];
line(left,capeleft,{strokewidth:2,stroke:"red"});
line(right,caperight,{strokewidth:2,stroke:"red"});
var hdelta1 = hdelta * shu.subshuheight(subfactor,num);
//render subshu
if (num > 1) shu.rend(num,capeleft,caperight,hdelta1,!up);
//render subfactor
var hdelta2 =  hdelta * shu.subfactorheight(subfactor,num);
hdelta=h*(1-shu.headroom)/4
if (up){
capeleft[1] =base+hdelta;
caperight[1] =base+hdelta;
}
else {
capeleft[1] =base-hdelta;
caperight[1] =base-hdelta;
}

if (subfactor > 1) 
if (subfactor % 3 ==0 && num == 1) {
	capeleft[0] =left[0]+hdelta;
	caperight[0]=right[0]-hdelta;
	shu.rend(subfactor,capeleft,caperight,hdelta2,up,true);
}
else {
//alert (num);alert(subfactor)
shu.rend(subfactor,capeleft,caperight,hdelta2,up,true);
}
}
shu.rend(32*17*1221,[-3,0],[3,0],9,true,true);

`</$asciisvg>
