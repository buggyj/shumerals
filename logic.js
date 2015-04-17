/*\
title: $:/macros/bj/shumerals/lg.js
type: application/javascript
module-type: macro

<<calendar year month>>
<<calendar year>> - year calendar
<<calendar>> - this month

Options:$:/macros/diary/options.json
\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

/*
Information about this macro
CAL demo
*/

exports.name = "lg";

exports.params = [
	{ name: "instring"},{name: "lgclass" }
];
/*
Run the macro
*/

function replaceAll(str,mapObj,mapSrc){

    var re = new RegExp(Object.keys(mapObj).join("|"),"gi");

    return str.replace(re, function(matched){
        return mapSrc[matched.toLowerCase()];
    });
}
exports.run = function(instring, lgclass) {
	lgclass = lgclass||"lgclass";
	var replaedsource = {"\\[":"<table>                         <tr><td>","\\|":"</td><td>","\\]":"</td></tr></table>"};
	var replacemapped;
	if (lgclass )replacemapped = {  '[':'<table class="'+lgclass+'"><tr><td>',  '|':'</td><td>'  ,']':'</td></tr></table>'};
	else replacemapped = {  '[':'<table><tr><td>',  '|':'</td><td>'  ,']':'</td></tr></table>'};
return replaceAll(instring,replaedsource, replacemapped);
}

})();
