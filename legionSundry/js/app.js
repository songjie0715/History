function sendMessage(e){var t=window.navigator.userAgent.toLowerCase(),s="wap";"micromessenger"==t.match(/MicroMessenger/i)&&(s="wx");var a={alg:"HS256",typ:"JWT"},n={head:{apiver:"1.1",src:s,sp:"",appver:""},events:[{type:"log",network:"",uid:"",ctime:"",position:"",action:"CLICK",data:[]}]},o=JSON.parse(e);n.events[0].data=o.data,n.events[0].position=o.position,n.events[0].ctime=o.ctime;var i=KJUR.jws.JWS.sign("HS256",a,n,"4w3ui1FHZbllRvemjLJyAgWs8vVupXrm4lczY9Bu7rSffb9Wg+ybq3HWd00av+8/wcUEjyCxlc0Mzxq4xx0F7A==");ga("send",{hitType:"event",eventLabel:i})}!function(e,t,s,a,n,o,i){e.GoogleAnalyticsObject=n,e[n]=e[n]||function(){(e[n].q=e[n].q||[]).push(arguments)},e[n].l=1*new Date,o=t.createElement(s),i=t.getElementsByTagName(s)[0],o.async=1,o.src=a,i.parentNode.insertBefore(o,i)}(window,document,"script","https://www.google-analytics.com/analytics.js","ga"),ga("create","UA-XXXXX-Y","auto"),ga(function(e){var t=e.get("sendHitTask");e.set("sendHitTask",function(e){t(e);for(var s,a=e.get("hitPayload"),n=a.split("&"),o=0;o<n.length;o++){var i=n[o],c=i.split("=");"el"==c[0]&&(s=c[1])}s&&$.ajax({type:"POST",url:"https://loggingtest.motie.com/octopus/message",data:{token:s},dataType:"json",success:function(e){1==e.result?console.log("success"):console.log("failure")}})})});