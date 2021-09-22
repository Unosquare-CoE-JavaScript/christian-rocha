function toggle(...args) {
  var position = 0;
  var toggleArgs = args;
  return function toggle() {
    console.log(toggleArgs[position]);
    if (position > toggleArgs.length - 2) {
      position = 0
    } else {
      position++
    }
  }
}

var hello = toggle('hello');
var onOff = toggle('on','off');
var speed = toggle('slow','medium','fast');
var noValue = toggle();


hello();
hello();

onOff();
onOff();
onOff();

speed();
speed();
speed();
speed();

noValue();