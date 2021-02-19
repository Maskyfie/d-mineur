$("#myCanvas").mousedown(function (event) {
  var pageX = event.pageX;
  var pageY = event.pageY;
  let pMapX = Math.floor(pageX / w);
  let pMapY = Math.floor(pageY / h);
  tileClicked(pMapX, pMapY);
});
