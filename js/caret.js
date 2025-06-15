const $ = id => document.getElementById(id);
let cursor;

window.onload = () => {
  cursor = $("cursor");
  cursor.style.left = "0px";
};

const nl2br = txt => txt.replace(/\n/g, '');

function typeIt(from, e) {
  if (!pw) $("typer").innerHTML = nl2br(from.value);
}

function moveIt(count, e) {
  const kc = (e || window.event).keyCode || e.which;
  const pos = parseInt(cursor.style.left);
  const step = 10;
  const min = -((count - 1) * step);

  if (kc === 37 && pos >= min) cursor.style.left = (pos - step) + "px";
  if (kc === 39 && pos + step <= 0) cursor.style.left = (pos + step) + "px";
}

const alert = txt => console.log(txt);
