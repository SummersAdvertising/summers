function createSilverlight()
{
  Silverlight.createObject("06/Figure 6.10.xaml",
    document.body, "silverlightControl",
    {width: "100%", height: "100%", version: "1.0"},
    {onLoad: onLoad, onError: onSilverlightError});
}

// Silverlight onLoad event handler
function onLoad(control, context, rootElement)
{
  // Call addChild every second
  setInterval(addChild, 1000);
}

function addChild()
{
  var control = document.getElementById("silverlightControl");

  // Construct the Canvas XAML with a random Left and Top
  var xaml = '<Canvas Canvas.Left="' + Math.random() * control.Content.ActualWidth
    + '" Canvas.Top="' + Math.random() * control.Content.ActualHeight + '">'
    + '<Rectangle Width="120" Height="330" RadiusX="20" RadiusY="20"'
    + ' Fill="#FFAAAAAA"/>'
    + '<Ellipse Canvas.Left="10" Canvas.Top="10" Width="100" Height="100"'
    + ' Fill="Red"/>'
    + '<Ellipse Canvas.Left="10" Canvas.Top="115" Width="100" Height="100"'
    + ' Fill="Yellow"/>'
    + '<Ellipse Canvas.Left="10" Canvas.Top="220" Width="100" Height="100"'
    + ' Fill="Green"/>'
    + '</Canvas>';

  // Create the Canvas instance and add it to the root Children collection
  var child = control.Content.CreateFromXaml(xaml);
  control.Content.Root.Children.Add(child);
}

// This is here to make this code work inside and outside of the examples browser:
function onSilverlightError(sender, args) { Silverlight.default_error_handler(sender, args); }