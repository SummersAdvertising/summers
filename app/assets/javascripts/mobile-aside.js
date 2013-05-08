$(document).ready(function() {	
	$('#aside-ctrl').click(function(event) { 
   /* aside-box 顯示後,綁上點擊document中的物件隱藏 aside-box 的事件 */
    $('#aside-box').fadeIn(function(){
      $(document).click(function() {
        $('#aside-box').fadeOut();
        $(document).unbind();
      });
    });

    event.preventDefault();
	});  
	
  var isNavOpen = false;
	$('#nav-ctrl').click(function() {
    $('#nav-ctrl').unbind();
    showNav();
	});

  function showNav(){
    var leftPosition;

    switch(isNavOpen){
      case true:
        leftPosition = 0;
        break;
      case false:
        leftPosition = 150;
        break;
    }
    
    $('article').animate({ left: leftPosition }, 1000, 'easeOutQuad', function() {
      $('#nav-ctrl').click(function() {
        $('#nav-ctrl').unbind();
        showNav();
      });
    });

    isNavOpen = isNavOpen? false : true;
  }
});