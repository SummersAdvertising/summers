function createSilverlight()
{
  Silverlight.createObjectEx(
    {
      source: "07/DragDrop Example.xaml",
      parentElement: document.body,
      id: "silverlightControl",
      properties:
      { width: "100%", height: "100%", version: "1.0" },
      events: { onLoad: onLoad, onError: onSilverlightError }
    }
  );
}

// Silverlight onLoad event handler
function onLoad(control, userContext, rootElement)
{
  dragDropEnable(rootElement.FindName("one"));
  dragDropEnable(rootElement.FindName("two"));
  dragDropEnable(rootElement.FindName("eventInfo"));
}

// This is here to make this code work inside and outside of the examples browser:
function onSilverlightError(sender, args) { Silverlight.default_error_handler(sender, args); }