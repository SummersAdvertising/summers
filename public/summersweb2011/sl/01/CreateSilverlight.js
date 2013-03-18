function createSilverlight()
{
  Silverlight.createObjectEx(
    {
      source: "01/Chapter1.xaml",
      parentElement: document.getElementById("placeholder"),
      id: "silverlightControl",
      properties:
      { width: "390", height: "100", version: "1.0", background: "Yellow" },
      events: { onError: onSilverlightError }
    }
  );
}

// This is here to make this code work inside and outside of the examples browser:
function onSilverlightError(sender, args) { Silverlight.default_error_handler(sender, args); }