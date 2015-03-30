/*\
title: $:/core/modules/widgets/micon.js
type: application/javascript
module-type: widget



\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

if($tw.browser) {
	require("$:/plugins/bj/asciisvg/jquery.min.js");
	require("$:/plugins/bj/asciisvg/ASCIImathsvg.js");
	require("$:/plugins/bj/asciisvg/shulib.js");
}
var Widget = require("$:/core/modules/widgets/widget.js").widget;

var nullWidget = function(parseTreeNode,options) {
	this.initialise(parseTreeNode,options);
};

/*
Inherit from the base widget class
*/
nullWidget.prototype = new Widget();

/*
Render this widget into the DOM
*/
nullWidget.prototype.render = function(parent,nextSibling) {
	this.parentDomNode = parent;
	this.computeAttributes();
	this.execute();
	this.renderChildren(parent,nextSibling);
	MSVG.initPictures("#currentGraph");
};

/*
Compute the internal state of the widget
*/
nullWidget.prototype.execute = function() {
	var attrs = {id: "currentGraph",};
	var opts,scale = true;
	var options = this.getAttribute("options");
	if (options) {
		if (options.indexOf("scales")== -1) {
			scale = false; 
		}
			eval("opts={" + options + "}");
			
			opts.wheel = false;
			opts.pan = false;
			if (!scale){
				opts.scales = [];
				opts.scales[0] = 0;
				opts.scales[1] = opts.width ;		
				opts.scales[2] = 0;
				opts.scales[3] = opts.height;
			}
			options = JSON.stringify(opts).replace(/^\{([\s\S]*)\}$/,"$1")  ;      

    }
	$tw.utils.each(this.attributes,function(attribute,name) {
			attrs[name] =attribute;			
	});
	this.makeChildWidgets([{type: "element", tag: "div", attributes: {
				"class": {type: "string", value: "SVGgraph"},"id": {type: "string", value: "currentGraph"},"options": {type: "string", value: options}}, children: this.parseTreeNode.children}]);

};

/*
Selectively refreshes the widget if needed. Returns true if the widget or any of its children needed re-rendering
*/
nullWidget.prototype.refresh = function(changedTiddlers) {

		return false;		

};

exports["micon"] = nullWidget;

})();
