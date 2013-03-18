function createSilverlight()
{
  Silverlight.createObjectEx(
    {
      source: "09/Figure 9.1.xaml",
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
  rectangle = control.content.findName("rectangle");
  count = 0;

  // Call updateWidth every 100 milliseconds
  handle = setInterval(updateWidth, 100);
}

function updateWidth()
{
  if (count == 10)
  {
    // The animation is complete
    clearInterval(handle);
  }
  else
  {
    // Increase the Width by 5 pixels
    rectangle.Width += 5;    
    count++;
  }
}

// This is here to make this code work inside and outside of the examples browser:
function onSilverlightError(sender, args) { Silverlight.default_error_handler(sender, args); }