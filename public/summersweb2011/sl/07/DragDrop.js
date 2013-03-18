function dragDropEnable(element)
{
  element.AddEventListener("MouseLeftButtonDown", onMouseLeftButtonDown);
  element.AddEventListener("MouseMove", onMouseMove);
  element.AddEventListener("MouseLeftButtonUp", onMouseLeftButtonUp);

  var dragging = false;
  var lastPoint = null;

  function onMouseLeftButtonDown(sender, mouseEventArgs)
  {
    sender.CaptureMouse();
    lastPoint = mouseEventArgs.GetPosition(null);
    dragging = true;
  }

  function onMouseMove(sender, mouseEventArgs)
  {
    if (dragging)
    {
      var point = mouseEventArgs.GetPosition(null);
      sender["Canvas.Left"] += point.X - lastPoint.X;
      sender["Canvas.Top"] += point.Y - lastPoint.Y;
      lastPoint = point;
    }
  }

  function onMouseLeftButtonUp(sender, mouseEventArgs)
  {
    sender.ReleaseMouseCapture();
    dragging = false;
  }

  element.GetHost().Content.Root.AddEventListener("MouseLeave", onMouseLeave);
  function onMouseLeave(sender, mouseEventArgs)
  {
    dragging = false;
  }
}