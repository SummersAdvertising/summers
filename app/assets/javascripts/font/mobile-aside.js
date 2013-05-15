$(document).ready(function() {  
  $("#ctrl").click(function(){
    $('#ctrl').unbind();
    showNav(); 
  });

  function showNav(){
    if($('#ctrl').parent("nav, aside").css("left") == "-140px"){
      var leftPosition = 0;
    }
    else
    {
      var leftPosition = -140;
    }

    $('#ctrl').parent("nav, aside").animate({left: leftPosition},800,'easeOutCubic', function() {
      $('#ctrl').click(function() {
        $('#ctrl').unbind();
        showNav();
      });
    });
    
  }

  $(window).resize(function(){
    var isNarrow = ($(window).width()<582);
    $('#ctrl').parent("nav, aside").css("left", isNarrow? "-140px":"0px");
  });
});