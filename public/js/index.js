var pupil = document.getElementsByClassName("pupil");
document.onmousemove = function () {
  var x = (event.clientX * 8) / window.innerWidth + "%";
  var y = (event.clientY * 8) / window.innerHeight + "%";

  for (var i = 0; i < 4; i++) {
    pupil[i].style.left = x;
    pupil[i].style.top = y;
    pupil[i].style.transform = "translate(" + x + "," + y + ")";
  }
};
