// Constructor for ScrollingCanvas
function ScrollingCanvas(content)
{
  // Used for scrollbar Width, upArrow/downArrow Width and Height, and the
  // delta for position and time when perfoming continuous scrolling:
  this.SMALLVALUE = 16;

  // Build up the XAML for the ScrollingCanvas, including the scrollbar
  var xaml = '<Canvas>';
  xaml += '  <Canvas.Clip><RectangleGeometry Name="clip"/></Canvas.Clip>';
  xaml += '  <Canvas Name="scrollBar" Width="' + this.SMALLVALUE
          + '" Background="WhiteSmoke">';
  xaml += '    <Canvas Name="upArrow" Width="' + this.SMALLVALUE
          + '" Height="' + this.SMALLVALUE + '" Background="LightGray">';
  xaml += '      <Line X1="8" X2="8" Y1="11" Y2="11.1" Stroke="Black"'
          + '      StrokeThickness="12" StrokeStartLineCap="Triangle"/>';
  xaml += '    </Canvas>';
  xaml += '    <Canvas Name="downArrow" Width="' + this.SMALLVALUE + '" Height="'
          + this.SMALLVALUE + '" Background="LightGray">';
  xaml += '      <Line X1="8" X2="8" Y1="6" Y2="6.1" Stroke="Black"'
          + '      StrokeThickness="12" StrokeEndLineCap="Triangle"/>';
  xaml += '    </Canvas>';
  xaml += '    <Canvas Name="thumb" Width="' + this.SMALLVALUE
          + '" Background="DarkGray">';
  xaml += '      <Ellipse Name="thumbCircle" Width="12" Height="12"'
          + '      Canvas.Left="2" Fill="LightGray"/>';
  xaml += '    </Canvas>';
  xaml += '  </Canvas>';
  xaml += '</Canvas>';

  // Create the elements and add the passed-in content as a child of the root
  this.canvas = content.GetHost().Content.CreateFromXaml(xaml, true);
  this.canvas.Children.Add(content);
    
  // Store the important elements in member variables
  this.clip = this.canvas.FindName("clip");
  this.scrollBar = this.canvas.FindName("scrollBar");
  this.upArrow = this.canvas.FindName("upArrow");
  this.downArrow = this.canvas.FindName("downArrow");
  this.thumb = this.canvas.FindName("thumb");
  this.thumbCircle = this.canvas.FindName("thumbCircle");
  this.content = content;

  // Move any Canvas.Left and Canvas.Top setting from the content
  this.canvas["Canvas.Left"] = content["Canvas.Left"];
  this.canvas["Canvas.Top"] = content["Canvas.Top"];
  content["Canvas.Left"] = 0;
  content["Canvas.Top"] = 0;

  // Attach event handlers to the thumb
  this.thumb.AddEventListener("MouseLeftButtonDown",
    delegate(this, this.onThumbMouseLeftButtonDown));
  this.thumb.AddEventListener("MouseMove", delegate(this, this.onThumbMouseMove));
  this.thumb.AddEventListener("MouseLeftButtonUp",
    delegate(this, this.onThumbMouseLeftButtonUp));

  // Attach event handlers to the up and down arrows
  this.upArrow.AddEventListener("MouseLeftButtonDown",
    delegate(this, this.onArrowMouseLeftButtonDown));
  this.upArrow.AddEventListener("MouseLeftButtonUp",
    delegate(this, this.onArrowMouseUpOrLeave));
  this.upArrow.AddEventListener("MouseLeave",
    delegate(this, this.onArrowMouseUpOrLeave));
  this.downArrow.AddEventListener("MouseLeftButtonDown",
    delegate(this, this.onArrowMouseLeftButtonDown));
  this.downArrow.AddEventListener("MouseLeftButtonUp",
    delegate(this, this.onArrowMouseUpOrLeave));
  this.downArrow.AddEventListener("MouseLeave",
    delegate(this, this.onArrowMouseUpOrLeave));

  // By default, set the root Canvas height to match
  // the content height (which means no scrolling)
  this.resize(content.Width, content.Height);
}

// Resize to the content's width and desired height
ScrollingCanvas.prototype.resize = function(height)
{
  // Resize the canvas and its clipping rectangle
  // (leaving room for the scrollbar)
  this.canvas.Width = this.content.Width + this.SMALLVALUE;
  this.canvas.Height = height;
  this.clip.Rect = "0,0," + this.canvas.Width + "," + this.canvas.Height;

  // Don't show the scrollbar if the content isn't taller than the canvas
  if (this.content.Height <= height)
  {
    this.scrollBar.Visibility = "Collapsed";
    return;
  }
  
  // Show, position and resize the scrollbar
  this.scrollBar.Visibility = "Visible";
  this.scrollBar["Canvas.Left"] = this.content.Width;
  this.scrollBar.Height = height;
  this.downArrow["Canvas.Top"] = height - this.SMALLVALUE;
  this.thumb.Height = Math.max(this.SMALLVALUE,
    (height - 2 * this.SMALLVALUE) * height / this.content.Height);
  this.thumbCircle["Canvas.Top"] = this.thumb.Height / 2
                                 - this.thumbCircle.Height / 2;
  this.maxThumbPosition = this.canvas.Height - this.SMALLVALUE
                        - this.thumb.Height;

  // Calculate the ratio of content scrolling distance to thumb scrolling distance
  this.ratio = (this.content.Height - height) /
               (height - 2 * this.SMALLVALUE - this.thumb.Height);

  // Reset the scrollbar
  this.scrollTo(0);
};

// Capture the mouse when pressing the thumb
ScrollingCanvas.prototype.onThumbMouseLeftButtonDown =
function(sender, mouseEventArgs)
{
  this.thumb.CaptureMouse();
  this.lastThumbPoint = mouseEventArgs.GetPosition(null);
  this.thumbDragging = true;
};

// If pressed, move the thumb along with the mouse
ScrollingCanvas.prototype.onThumbMouseMove = function(sender, mouseEventArgs)
{
  if (this.thumbDragging)
  {
    var point = mouseEventArgs.GetPosition(null);
    this.scrollTo(this.thumb["Canvas.Top"] + point.Y - this.lastThumbPoint.Y);
    this.lastThumbPoint = point;
  }
};

// Release mouse capture when releasing the thumb
ScrollingCanvas.prototype.onThumbMouseLeftButtonUp =
function(sender, mouseEventArgs)
{
  this.thumb.ReleaseMouseCapture();
  this.thumbDragging = false;
};

// Move the content and thumb to the specified vertical position
ScrollingCanvas.prototype.scrollTo = function(thumbPosition)
{
  // Constrain the position to the bounds of the scrollbar
  thumbPosition = Math.max(thumbPosition, this.SMALLVALUE);
  thumbPosition = Math.min(thumbPosition, this.maxThumbPosition);

  if (this.thumb["Canvas.Top"] == thumbPosition)
  {
    // We're already at the desired position.
    // Just in case this is from a continuous scroll:
    this.stopContinuousScrolling();
  }
  else
  {
    // Move the thumb to the desired position
    this.thumb["Canvas.Top"] = thumbPosition;

    // Move the content to the corresponding position
    this.content["Canvas.Top"] = (this.SMALLVALUE - thumbPosition) * this.ratio;
  }
};

// Scroll continuously when pressing the up or down arrow
ScrollingCanvas.prototype.onArrowMouseLeftButtonDown =
function(sender, mouseEventArgs)
{
  this.startContinuousScrolling(sender.Name == "upArrow");
};

// Stop scrolling continuously when releasing the up or down arrow
ScrollingCanvas.prototype.onArrowMouseUpOrLeave = function(sender, mouseEventArgs)
{
  this.stopContinuousScrolling();
};

// Begin continuous scrolling
ScrollingCanvas.prototype.startContinuousScrolling = function(up)
{
  var delta = this.SMALLVALUE;
  if (up)
    delta *= -1;

  // Call scroll every couple of milliseconds, adding the delta
  var scrollTo = delegate(this, this.scrollTo);
  var thumb = this.thumb;
  var callback = function() { scrollTo(thumb["Canvas.Top"] + delta); }
  this.handle = setInterval(callback, this.SMALLVALUE);
};

// End the continuous scrolling, if it is happening
ScrollingCanvas.prototype.stopContinuousScrolling = function()
{
  clearInterval(this.handle);
};

// Helper for attaching events to instance functions
function delegate(target, callback) {
  return function() { callback.apply(target, arguments); };
}