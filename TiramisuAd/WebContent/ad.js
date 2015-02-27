function getMoreInfo()
{
	customURL = "ad-info.html";
	window.location.href = customURL;
	window.location.assign(customURL);
}

function addBookToCart(asin,devId,traceId) 
{
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
   
    function goToCart(asin,devId,traceId) 
    {
    	$.ajax({
            type: "GET",
        url: "http://ec2-54-165-114-150.compute-1.amazonaws.com:8080/ajServer/add",
        crossDomain: true,
        dataType: "jsonp",
        data: 'mtype=shopping&devIdentifier='+devId,
        success: function (data) {
        	if(data.result=="success")
        		window.open(data.purl);	
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

function traceUpdate(devId,lat,longitude,trace_id) 
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
	var traceId = devId+''+ Date.now; 
    	return traceId;
    }
    
    function closeAd()
    {
    	close();
    }
   