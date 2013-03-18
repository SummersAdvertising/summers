function createSilverlight()
{
  Silverlight.createObject("06/Figure 6.4 with Click Handler.xaml",
    document.body, "silverlightControl",
    {width: "100%", height: "100%", version: "1.0"},
    {onError: onSilverlightError});
}

var topMostZIndex = 3;

function onClick(sender, eventArgs)
{
  topMostZIndex++;
  sender["Canvas.ZIndex"] = topMostZIndex;
}

// This is here to make this code work inside and outside of the examples browser:
function onSilverlightError(sender, args) { Silverlight.default_error_handler(sender, args); }