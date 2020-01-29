/*
 * Pure jQuery Style Switcher (http://www.userfirstinteractive.com/)
 * @author Scott D. Brooks 
 * @created by UserFirst Interactive (creations@userfirstinteractive.com)
 * 
 */
	$(".colorswitcher").css("display", "block");
	$(".colorswitcher").css("width", "30px");
	$(".colorswitcher").css("background", "#fff");
	$(".colorswitcher").css("padding", "7px 7px 5px 5px");
	$(".colorswitcher").css("position", "fixed");
	$(".colorswitcher").css("z-index", "9999");
	$(".colorswitcher").css("bottom", "20%");
	$(".colorswitcher").css("left", "0");
	$(".colorswitcher").css("box-shadow", "0 0 10px grey");
	$(".colorswitcher").css("border", "1px solid #aaa");
	$(".colorswitcher").css("border-radius", "0 4px 4px 0");
	$(".colorswitcher a").css("display", "block");
	$(".colorswitcher a").css("width", "30px");
	$(".colorswitcher a").css("margin", "4px 0");
	$(".colorswitcher hr").css("margin", "7px 0");

	function setStyle(myStyle) { 	
		if (myStyle == "color1"){
		}
		else{  // blue

		}
	}

	function setCookie(choosenStyle) {  
		// javascript set
		$.cookie('style', null); 			// clear cookie
		$.cookie('style', choosenStyle); 	// set cookie		
	}		

	
	$(document).ready(function() {
	// stylesheet setup
	var headID = document.getElementsByTagName("head")[0];		   
	var cssNode = document.createElement('link');
	cssNode.type = 'text/css';
	cssNode.rel = 'stylesheet';
	
	var style_color = $.cookie('style');
	if (style_color != undefined) {
		cssNode.href = 'css/colors/' + style_color + '/color.css';		
	} else {
		cssNode.href = 'css/colors/color1/color.css';
		style_color = "color1";
	}			
	cssNode.media = 'screen';
	headID.appendChild(cssNode);
	// set style for the image src.  Not required unless you are setting an image dynamically, like we do here.
	setStyle(style_color);
	
	// click actions
	$(".switchTo1").click(function()
	{
    	setStyle("color1");
    	setCookie("color1");
		location.reload();
	});
	$(".switchTo1-1").click(function()
	{
    	setStyle("color1-1");
    	setCookie("color1-1");
		location.reload();
	});
	$(".switchTo1-2").click(function()
	{
    	setStyle("color1-2");
    	setCookie("color1-2");
		location.reload();
	});

	$(".switchTo2").click(function()
	{
    	setStyle("color2");
		setCookie("color2");
		location.reload();
	});
	
	$(".switchTo3").click(function()
	{
    	setStyle("color3");
		setCookie("color3");
		location.reload();
	});
	
	$(".switchTo4").click(function()
	{
    	setStyle("color4");
		setCookie("color4");
		location.reload();
	});
	
	$(".switchTo5").click(function()
	{
    	setStyle("color5");
		setCookie("color5");
		location.reload();
	});
	
	$(".switchTo6").click(function()
	{
    	setStyle("color6");
		setCookie("color6");
		location.reload();
	});
});