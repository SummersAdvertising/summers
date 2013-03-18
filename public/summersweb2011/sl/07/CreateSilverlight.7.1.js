function createSilverlight()
{
  Silverlight.createObjectEx(
    {
      source: "07/Figure 7.1.xaml",
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
  for (var i = 0; i < rootElement.Children.Count; i++)
  {
    var element = rootElement.Children.GetItem(i);

    if (element.ToString() == "Ellipse")
    {
      element.addEventListener("MouseMove", onMouseMove);
      element.addEventListener("MouseEnter", onMouseEnter);
      element.addEventListener("MouseLeave", onMouseLeave);
      element.addEventListener("MouseLeftButtonDown", onMouseLeftButtonDown);
      element.addEventListener("MouseLeftButtonUp", onMouseLeftButtonUp);
    }
  }

  eventInfo = rootElement.FindName("eventInfo");
}

function onMouseMove(sender, mouseEventArgs)
{
  sender.Fill = "Orange";
  eventInfo.Text = "MouseMove: " + sender + " named " + sender.Name;
}

function onMouseEnter(sender, mouseEventArgs)
{
  sender.Fill = "Yellow";
  eventInfo.Text = "MouseEnter: " + sender + " named " + sender.Name;
}

function onMouseLeave(sender, mouseEventArgs)
{
  sender.Fill = "Green";
  eventInfo.Text = "MouseLeave: " + sender + " named " + sender.Name;
}

function onMouseLeftButtonDown(sender, mouseEventArgs)
{
  sender.Fill = "Blue";
  eventInfo.Text = "MouseLeftButtonDown: " + sender + " named " + sender.Name;
}

function onMouseLeftButtonUp(sender, mouseEventArgs)
{
  sender.Fill = "Purple";
  eventInfo.Text = "MouseLeftButtonUp: " + sender + " named " + sender.Name;
}

// This is here to make this code work inside and outside of the examples browser:
function onSilverlightError(sender, args) { Silverlight.default_error_handler(sender, args); }