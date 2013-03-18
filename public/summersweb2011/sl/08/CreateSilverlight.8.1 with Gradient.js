function createSilverlight()
{
  Silverlight.createObjectEx(
    {
      source: "08/Figure 8.1 with Gradient.xaml",
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
  // Start the download of bigFile.zip
  var downloader = control.CreateObject("downloader");
  downloader.AddEventListener("DownloadProgressChanged", onProgressChanged);
  downloader.AddEventListener("Completed", onCompleted);
  downloader.Open("GET", "08/bigFile.zip?" + new Date()); // The querystring is there to avoid caching
  downloader.Send();
}

// Handler for updating the progress bar
function onProgressChanged(sender, eventArgs)
{
  var percentComplete = sender.DownloadProgress * 100;
  sender.FindName("middleStop1").Offset = sender.DownloadProgress;
  sender.FindName("middleStop2").Offset = sender.DownloadProgress;
  sender.FindName("progressBarText").Text = Math.floor(percentComplete) + "%";
}

// Handler for successful completion of download
function onCompleted(sender, eventArgs)
{
  var control = sender.GetHost();
  var root = control.Content.Root;

  // Parse and load XAML from inside the .ZIP file
  var newContent = control.Content.CreateFromXamlDownloader(
    sender, "Main.xaml");
  // Remove the progress bar XAML content from the root Canvas
  root.Children.Clear();
  // Add the downloaded content to the root Canvas
  root.Children.Add(newContent);
}

// This is here to make this code work inside and outside of the examples browser:
function onSilverlightError(sender, args) { Silverlight.default_error_handler(sender, args); }