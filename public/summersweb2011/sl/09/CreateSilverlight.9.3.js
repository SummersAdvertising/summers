function createSilverlight()
{
  Silverlight.createObjectEx(
    {
      source: "09/Figure 9.3.xaml",
      parentElement: document.body,
      id: "silverlightControl",
      properties: { width: "100%", height: "100%", version: "1.0" },
      events: { onLoad: onLoad, onError: onSilverlightError }
    }
  );
}

// Silverlight onLoad event handler
function onLoad(control, userContext, rootElement)
{
  var storyboard = control.content.findName("storyboard");
  storyboard.Begin();
}

// This is here to make this code work inside and outside of the examples browser:
function onSilverlightError(sender, args) { Silverlight.default_error_handler(sender, args); }