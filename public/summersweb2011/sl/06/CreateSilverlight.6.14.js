function createSilverlight()
{
  Silverlight.createObject("06/Figure 6.14.xaml",
    document.body, "silverlightControl",
    {width: "100%", height: "100%", version: "1.0"},
    {onLoad: onLoad, onError: onSilverlightError});
}

// Silverlight onLoad event handler
function onLoad(control, context, rootElement)
{
  control.Content.OnResize = onResize;
  // Force the resize call so the content starts out centered:
  onResize(rootElement);
}

// Silverlight OnResize event handler
function onResize(sender)
{
  var content = sender.GetHost().Content;
  var transform = content.FindName("rootScale");

  // Maximize the scale to fit everything yet maintain the aspect ratio:
  var scale = Math.min(content.ActualWidth / content.Root.Width,
                       content.ActualHeight / content.Root.Height);
  transform.ScaleX = scale;
  transform.ScaleY = scale;

  content.Root["Canvas.Left"] =
    (content.ActualWidth - content.Root.Width * scale) / 2;
  content.Root["Canvas.Top"] =
    (content.ActualHeight - content.Root.Height * scale) / 2;
}

// This is here to make this code work inside and outside of the examples browser:
function onSilverlightError(sender, args) { Silverlight.default_error_handler(sender, args); }