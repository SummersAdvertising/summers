function createSilverlight()
{
  Silverlight.createObject("04/Figure 4.5.xaml",
    document.body, "silverlightControl",
    {width: "100%", height: "100%", version: "1.0"},
    {onLoad: onLoad, onError: onSilverlightError});
}

// Silverlight onLoad event handler
function onLoad(control, userContext, rootElement)
{
  var rectangle = control.content.findName("rectangle");
  var text = control.content.findName("text");

  rectangle.Width = text.ActualWidth;
  rectangle.Height = text.ActualHeight;
}

// This is here to make this code work inside and outside of the examples browser:
function onSilverlightError(sender, args) { Silverlight.default_error_handler(sender, args); }