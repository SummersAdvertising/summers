
var data = {
	articles: [],
	category: {}
};

var xml = new XMLHttpRequest();
xml.open("GET", 'data/' + window.location.href.match(/\/([\w]+)\.html/)[1] + '.xml', false);
xml.onreadystatechange=function()
{
	if (xml.readyState==4)
	{			
		var xmldoc = xml.responseXML;
		
		var i = 0;
		while( xmldoc.getElementsByTagName('article')[i] != undefined && xmldoc.getElementsByTagName('article')[i] != null ) {
			
			var xarticle = xmldoc.getElementsByTagName('article')[i];
			
			var obj = new Object();
			
			obj.title = xarticle.getElementsByTagName('title')[0].childNodes[0].nodeValue;
			obj.src = xarticle.getElementsByTagName('src')[0].childNodes[0].nodeValue;
						
			data.articles.push(obj);
			
			i ++;
		}
		
		var xcategory = xmldoc.getElementsByTagName('category')[0];
		
		data.category.title = xcategory.getElementsByTagName('title')[0].childNodes[0].nodeValue;
		data.category.next = xcategory.getElementsByTagName('next')[0].childNodes[0].nodeValue;
		data.category.prev = xcategory.getElementsByTagName('prev')[0].childNodes[0].nodeValue;
			
		
		window.onload = function() {			
			var case_show = new caseShow();
		};
		
	}
}

xml.setRequestHeader('Content-Type', 'text/xml');

xml.send();