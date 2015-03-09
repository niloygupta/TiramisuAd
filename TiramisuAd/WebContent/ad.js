function getMoreInfo()
{
	customURL = "ad-info.html";
	window.location.href = customURL;
	window.location.assign(customURL);
}

function addBookToCart(event) 
{
	
	/*asin = getCookie("asin");
	devId = getCookie("devId");
	traceId = getCookie("traceId");*/
	
	asin = sessionStorage.getItem('asin');
	devId = sessionStorage.getItem('devId');
	traceId = sessionStorage.getItem('traceId');
	

	$.ajax({
        type: "GET",
        url: "http://ec2-54-165-114-150.compute-1.amazonaws.com:8080/ajServer/add",
        crossDomain: true,
        dataType: "jsonp",
        data: 'mtype=addcart&devIdentifier='+devId+'&quantity=1&productASIN='+asin,
        success: function (data) {
        	if(data.result=="success")
        		alert("Added Book Successfully")
        	else
        		alert("Unable to Add Book")
        	closeAd();
        			
        },
        error: function (err) {
        }
  
		});
	behaviourUpdate(asin,devId,'addcart',traceId);
}
   
    function goToCart(event) 
    {
    	
    	/*asin = getCookie("asin");
    	devId = getCookie("devId");
    	traceId = getCookie("traceId");*/
    	
    	asin = sessionStorage.getItem('asin');
   		devId = sessionStorage.getItem('devId');
   		traceId = sessionStorage.getItem('traceId');

    	
    	$.ajax({
            type: "GET",
        url: "http://ec2-54-165-114-150.compute-1.amazonaws.com:8080/ajServer/add",
        crossDomain: true,
        dataType: "jsonp",
        data: 'mtype=shopping&devIdentifier='+devId,
        success: function (data) {
        	if(data.result=="success")
        	{
        		window.location.href = data.purl;
        		window.location.assign(data.purl);
        	}
        		//window.open(data.purl);	
        },
        error: function (err) {
        }
  
		});
	behaviourUpdate(asin,devId,'tocart',traceId);
	
}    

function behaviourUpdate(asin,devId,event,traceId) 
{
	$.ajax({
        type: "GET",
        url: "http://ec2-54-165-114-150.compute-1.amazonaws.com:8080/ajServer/trace",
        crossDomain: true,
        dataType: "jsonp",
        data: 'mtype=behaviourUpdate&devIdentifier='+devId+'&asin='+asin+'&event='+event+'&trace_id='+traceId
		});
} 

function traceUpdate(devId,lat,long,traceId) 
{
	$.ajax({
        type: "GET",
        url: "http://ec2-54-165-114-150.compute-1.amazonaws.com:8080/ajServer/trace",
        crossDomain: true,
        dataType: "jsonp",
        data: 'mtype=traceUpdate&devIdentifier='+devId+'&lat='+lat+'&long='+long+'&trace_id='+traceId+'&time='+Date.now
		});
} 

function getTraceId(devId)
{
	if (!Date.now) {
	    Date.now = function() { return new Date().getTime(); }
	}
	var traceId = devId+ Date.now(); 
    return traceId;
}
function getDeviceId()
{
	var devId;
	if($.cookie('devId') == null)
	{
		genDevId(function(devId){$.cookie('devId',devId);});
		alert($.cookie('devId'));
	}
	
	return $.cookie('devId');
}
function genDevId(callback)
{
    $.ajax({
        type: "GET",
        url: "http://ec2-54-165-114-150.compute-1.amazonaws.com:8080/ajServer/trace",
        crossDomain: true,
        dataType: "jsonp",
        data: 'mtype=getUserId',
        success: function (data) {
        	//alert(data.devId);
        	devId = data.devId;
        	alert(devId);
        	callback(devId);
        }
});

}
    
    function closeAd()
    {
    	//();
    	//self.close ();
    	//open(location, '_self').close();
    	//window.history.back();
    	window.close();
    }
    
    
    function setCookie(cname,cvalue,exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires=" + d.toGMTString();
        document.cookie = cname+"="+cvalue+"; "+expires;
    }

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
    
   