function createSilverlight()
{
  Silverlight.createObjectEx(
    {
      source: "07/Figure 7.2.xaml",
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
  var one = rootElement.FindName("one");
  var two = rootElement.FindName("two");
  var three = rootElement.FindName("three");
  
  rootElement.Children.Clear();
  
  var c1 = new ScrollingCanvas(one);
  var c2 = new ScrollingCanvas(two);
  var c3 = new ScrollingCanvas(three);
  
   rootElement.Children.Add(c1.canvas);
   rootElement.Children.Add(c2.canvas);
   rootElement.Children.Add(c3.canvas);
   
   c1.resize(400);
   c2.resize(200);
   c3.resize(100);
}

// This is here to make this code work inside and outside of the examples browser:
function onSilverlightError(sender, args) { Silverlight.default_error_handler(sender, args); }