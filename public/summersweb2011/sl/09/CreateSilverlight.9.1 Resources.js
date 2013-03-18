function createSilverlight()
{
  Silverlight.createObjectEx(
    {
      source: "09/Figure 9.1 Resources.xaml",
      parentElement: document.body,
      id: "silverlightControl",
      properties: { width: "100%", height: "100%", version: "1.0" },
      events: { onLoad: onLoad, onError: onSilverlightError }
    }
  );
}

// Silverlight onLoad event handler
function onLoad(control, context, rootElement)
{
  storyboard = control.Content.FindName("storyboard");
  animation = control.Content.FindName("animation");

  storyboard.addEventListener("Completed", onCompleted);

  // Start by growing:
  animation.To = 100;
  storyboard.Begin();
}

function onCompleted()
{
  if (animation.To == 100)
  {
    // Done growing, so start shrinking:
    animation.To = 50;
    storyboard.Begin();
  }
  else
  {
    // Done shrinking, so start growing:
    animation.To = 100;
    storyboard.Begin();
  }
}

// This is here to make this code work inside and outside of the examples browser:
function onSilverlightError(sender, args) { Silverlight.default_error_handler(sender, args); }