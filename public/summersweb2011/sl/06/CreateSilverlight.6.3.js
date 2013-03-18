function createSilverlight()
{
  Silverlight.createObjectEx(
    {
      source: "06/Figure 6.3.xaml",
      parentElement: document.body,
      id: "silverlightControl",
      properties:
        { width: "100%", height: "100%", version: "1.0" },
      events: { onLoad: onLoad, onError: onSilverlightError }
    }
  );
}

// Silverlight onLoad event handler
function onLoad(control, context, rootElement)
{
  control.Content.OnResize = onResize;
  // Force the resize call to ensure the content starts out centered
  onResize(rootElement);
}

// Silverlight OnResize event handler
function onResize(sender, eventArgs)
{
  var content = sender.GetHost().Content;
  content.Root["Canvas.Left"] = (content.ActualWidth - content.Root.Width) / 2;
  content.Root["Canvas.Top"] = (content.ActualHeight - content.Root.Height) / 2;
}

// This is here to make this code work inside and outside of the examples browser:
function onSilverlightError(sender, args) { Silverlight.default_error_handler(sender, args); }