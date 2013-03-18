function createSilverlight()
{
  Silverlight.createObjectEx(
    {
      source: "09/Figure 9.1 MouseEnterLeave.xaml",
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
  growWidthAnimation = control.content.findName("growWidthAnimation");
  shrinkWidthAnimation = control.content.findName("shrinkWidthAnimation");

  growWidthAnimation.Stop();
  shrinkWidthAnimation.Stop();

  var rectangle = control.content.findName("rectangle");
  rectangle.addEventListener("MouseEnter", onMouseEnter);
  rectangle.addEventListener("MouseLeave", onMouseLeave);
}

function onMouseEnter()
{
  growWidthAnimation.Begin();
  shrinkWidthAnimation.Stop();
}

function onMouseLeave()
{
  shrinkWidthAnimation.Begin();
  growWidthAnimation.Stop();
}

// This is here to make this code work inside and outside of the examples browser:
function onSilverlightError(sender, args) { Silverlight.default_error_handler(sender, args); }