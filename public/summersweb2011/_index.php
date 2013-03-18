<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="Robots" content="index,follow"/>
<meta name="keywords" content="網頁設計,網站製作,web design,網站設計,廣告,ajax,silverlight,javascript,php,asp,.net,網站後台程式,web 2.0,網站程式撰寫,網站代管,網路行銷"  />
<meta name="description" content="在網站製作上具有豐富經驗，服務國際大廠及中小企業，以最快最新的技術，為客戶節省寶貴的預算與時間，完成注重使用者經驗的企業網站或 活動網站。服務範圍並包括廣告行銷策略擬定、平面廣告設計等"  />
<meta name="abstract" content="在網站製作上具有豐富經驗，服務國際大廠及中小企業，以最快最新的技術，為客戶節省寶貴的預算與時間，完成注重使用者經驗的企業網站或 活動網站。服務範圍並包括廣告行銷策略擬定、平面廣告設計等"/>
<meta name="DC.Rights" content=”夏天廣告”/>
<meta name="DC.Date" content=”2010/9/30”/>
<meta name="DC.Language" scheme=”W3CDTF” content=”zh-TW”/>
<meta name="DC.Subject" content=”夏天廣告──企業網站、活動網站、廣告策略、平面設計”/>
<meta name="DC.Type" content=”公司介紹”/>
<title>夏天廣告有限公司Summers Advertising Co., Ltd.</title>
<link href="indexcss.css" rel="stylesheet" type="text/css">
<link href="textstyle.css" rel="stylesheet" type="text/css">
<link rel="shortcut icon" href="images/summericon.ico">
<style type="text/css">

<!--
html {
    overflow-y: scroll;
}

-->
</style>
<script type="text/javascript" src="scripts/btn_function.js"></script>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js" type="text/javascript"></script>
<script src="scripts/jquery.tabSlideOut.v1.3.js"></script>

<script language="javascript">
// <![CDATA[
	
$(document).ready(function() {
});
	
// ]]>
</script>
         
<script>
         $(function(){
		 //將側選單隱藏DIV讀取完畢後顯示出來
             $(".slide-out-div").show();  
         //選單動作
             $('.slide-out-div').tabSlideOut({
                 tabHandle: '.handle',                              //class of the element that will be your tab
                 pathToTabImage: 'images/sidemenu_02.png',          //path to the image for the tab (optionaly can be set using css)
                 imageHeight: '296px',                               //height of tab image
                 imageWidth: '37px',                               //width of tab image    
                 tabLocation: 'left',                               //side of screen where tab lives, top, right, bottom, or left
                 speed: 300,                                        //speed of animation
                 action: 'hover',                                   //options: 'click' or 'hover', action to trigger animation
                 topPos: '190px',                                   //position from the top
                 fixedPosition: false                               //options: true makes it stick(fixed position) on scroll
             });
         });

</script>
<script language="JavaScript">
// 預先載入影像
function preloadImages() {
	var a = (typeof arguments[0] == 'object')? arguments[0] : arguments;
	for(var i = a.length -1; i > 0; i--) {
		jQuery("<img>").attr("src", 'images/'+a[i]);
	}
}
preloadImages("images/indexbtn1_1.gif","images/indexbtn1_2.png","images/indexbtn2_1.gif","images/indexbtn2_2.png","images/sidemenu_01.png","images/sidemenu_02.png","images/shadow.png","images/indextitle.png","images/index_01.png","images/index_02.png","images/indexleg.jpg","images/background.jpg");

    
  window.fbAsyncInit = function() {
	FB.init({appId: '192621397415393', status: true, cookie: true,
			 xfbml: true});
  };
  	FB.Event.subscribe('auth.login', function(response) {
        window.location.reload();
      });
  (function() {
	var e = document.createElement('script');
	e.type = 'text/javascript';
	e.src = document.location.protocol +
	  '//connect.facebook.net/zh_TW/all.js';
	e.async = true;
	document.getElementById('fb-root').appendChild(e);
  }());
  
</script>
</head>
<?php

define('FACEBOOK_APP_ID', '192621397415393');
define('FACEBOOK_SECRET', 'a8f6d6067dce0c44315fd892bedfc560');

function get_facebook_cookie($app_id, $application_secret) {
  $args = array();
  parse_str(trim($_COOKIE['fbs_' . $app_id], '\\"'), $args);
  
  ksort($args);
  $payload = '';
  foreach ($args as $key => $value) {
    if ($key != 'sig') {
      $payload .= $key . '=' . $value;
    }
  }
  if (md5($payload . $application_secret) != $args['sig']) {
    return null;
  }
  return $args;
}

$cookie = get_facebook_cookie(FACEBOOK_APP_ID, FACEBOOK_SECRET);
$user = json_decode(file_get_contents(
    'https://graph.facebook.com/me?access_token=' .
    $cookie['access_token']))->me;
	
die(var_export($user));
?>
<body>
<div id="fb-root"></div>
<div id="bigbody">

<script src="http://connect.facebook.net/zh_TW/all.js#xfbml=1"></script>
<div class="facebook_like">
	
	<fb:like href="summers.com.tw" show_faces="false" style="float: right;" width="340" font="arial">
    </fb:like>

    <a class="FansLink" target="_blank" style="float: right; margin-right: 8px;"
        href="http://www.facebook.com/pages/xia-tian-guang-gao-chuang-yi-xiao-yu-zhou-yong-yuan38duC/183671124990124">
        <span style="color: #3B5998; cursor: pointer; font-size: 12px; line-height: 25px; " >
            夏天廣告粉絲專區
        </span>
    </a>
    
    <div height="35px" width="150" style="float: right; margin-right: 200px; margin-top: 2px;">
        <fb:login-button autologoutlink="true"></fb:login-button>
        <a target="_blank" href="http://www.facebook.com/dialog/feed?app_id=192621397415393&redirect_uri=http://localhost:8080/summers/">
        	<span style="color: #3B5998; cursor: pointer; font-size: 12px; line-height: 25px; " >
        		推到Facebook上
            </span>
        </a>
    </div>
</div>

 <div class="slide-out-div" style="display:none">
 <a class="handle" ></a>
 
 <table width="325" border="0" cellspacing="0" cellpadding="0">
   <tr>
     <td width="124" height="81">&nbsp;</td>
     <td width="170">&nbsp;</td>
     <td width="31">&nbsp;</td>
   </tr>
   <tr>
     <td>&nbsp;</td>
     <td><span class="text_gray_12">業務連絡</span></td>
     <td>&nbsp;</td>
   </tr>
   <tr>
     <td>&nbsp;</td>
     <td class="text_gray_12">符秉威</td>
     <td>&nbsp;</td>
   </tr>
   <tr>
     <td>&nbsp;</td>
     <td class="text_gray_12"><a href="mailto:awhere@summers.com.tw">awhere@summers.com.tw </a></td>
     <td>&nbsp;</td>
   </tr>
   <tr>
     <td>&nbsp;</td>
     <td class="text_gray_12">02-23219217分機17</td>
     <td>&nbsp;</td>
   </tr>
   <tr>
     <td height="34">&nbsp;</td>
     <td valign="top"><span class="text_gray_12">台北市新生南路一段142號3樓</span><br></td>
     <td>&nbsp;</td>
   </tr>

   <tr>
     <td>&nbsp;</td>
     <td class="text_red_11"><a href="intro.html" class="link2">夏天廣告完整介紹</a></td>
     <td>&nbsp;</td>
   </tr>
   <tr>
     <td>&nbsp;</td>
     <td>&nbsp;</td>
     <td>&nbsp;</td>
   </tr>
 </table>
 </div>
 
 <div id="indextitle"><img src="images/indextitle.png" width="617" height="206"></div>
 <div id="sideshadow"><img src="images/shadow.png" width="21" height="310"></div>
 <div id="indexpoint">
   <table width="842" border="0" cellspacing="0" cellpadding="0">
     <tr>
       <td width="423"><img src="images/index_01.png" width="423" height="166"></td>
       <td width="419"><img src="images/index_02.jpg" width="419" height="166"></td>
     </tr>
   </table>
 </div>
 
 <div id="indexleg">
   <table width="887" border="0" cellspacing="0" cellpadding="0">
     <tr>
       <td><img src="images/indexleg.jpg" width="887" height="53"></td>
     </tr>
     <tr>
       <td><div align="center" class="text_gray_11"> ©2010 Summers Advertising</div></td>
     </tr>
   </table>
 </div>
 <div id="indexbtn">
   <table width="455" border="0" cellspacing="0" cellpadding="0">
     <tr>
       <td width="208" height="188" valign="top"><a href="success.htm"><img src="images/indexbtn1_1.gif" name="btn1" width="196" height="190" border="0" id="btn1" onmouseover="mouseOver1()" onmouseout="mouseOut1()"></a></td>
       <td width="247"><a href="advantage.htm"><img src="images/indexbtn2_1.gif" name="btn2" width="240" height="180" border="0" id="btn2" onmouseover="mouseOver2()" onmouseout="mouseOut2()"></a></td>
     </tr>
   </table>
 </div>
</div>
</body>
</html>
