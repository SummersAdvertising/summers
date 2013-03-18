function createSilverlight()
{
  Silverlight.createObject("04/Figure 4.8.xaml",
    document.body, "silverlightControl",
    {width: "100%", height: "100%", version: "1.0"},
    {onLoad: onLoad, onError: onSilverlightError});
}

// Silverlight onLoad event handler
function onLoad(control, userContext, rootElement)
{
  var downloader = control.CreateObject("downloader");
  downloader.AddEventListener("Completed", onCompleted);
  downloader.Open("GET", "04/DingsbumsBats.ttf");
  downloader.Send();
}

function onCompleted(sender, eventArgs)
{
  var textBlock = sender.FindName("textBlock");

  // Add the downloaded font to the TextBlock's collection of possible typefaces.
  // (sender is the downloader object)
  textBlock.SetFontSource(sender);

  // Be sure to use the "friendly name" of the font, not the filename!
  textBlock.FontFamily = "DingsbumsBats";
}

// This is here to make this code work inside and outside of the examples browser:
function onSilverlightError(sender, args) { Silverlight.default_error_handler(sender, args); }