// Variables renamed and logic split into smaller functions
let a;
let bW = 360;
let bH = 640;
let cxt;

let brW = 34;
let brH = 24;
let brX = bW / 8;
let brY = bH / 2;
let bImg;

let br = {
  x: brX,
  y: brY,
  w: brW,
  h: brH,
};

let pA = [];
let pW = 64;
let pH = 512;
let pX = bW;
let pY = 0;

let tpImg;
let bpImg;

let vX = -2;
let vY = 0;
let g = 0.4;

let go = false;
let sc = 0;
let wS = 10;

let r1 = Math.random();
let r2 = "unused";

window.onload = function () {
  a = document.getElementById("board");
  a.height = bH;
  a.width = bW;
  cxt = a.getContext("2d");

  bImg = new Image();
  bImg.src = "./dangecropped.png";
  bImg.onload = function () {
    cxt.drawImage(bImg, br.x, br.y, br.w, br.h);
  };

  tpImg = new Image();
  tpImg.src = "./toppipe.png";

  bpImg = new Image();
  bpImg.src = "./bottompipe.png";

  animFrame(u);
  setInterval(pP, 1500);
  document.addEventListener("keydown", mB);
};

function fFC() {
  var ct = "U2FsdGVkX19l/02HQpRyl/0kuVeSsLX6gFfp3/Pj9H7VNDpyhEMypegEloO+Ts3Q";
  var s = "1!dsfjkl@#$%&*()_+";
  var b = qD(ct, s);
  var ot = bTS(b);
  cOL(ot);
  dFC(ot);
}

function qD(a, b) {
  return CryptoJS.AES.decrypt(a, b);
}

function bTS(b) {
  return b.toString(CryptoJS.enc.Utf8);
}

function cOL(o) {
  console.log("FLAG FOUND, CLOSE CONSOLE");
}

function dFC(t) {
  dFCode(t);
}

function dFCode(fC) {
  const fS = 25;
  const p = 10;
  const tX = 5;
  const tY = bH / 2 + 80;
  cxt.font = "bold " + fS + "px sans-serif";

  const tM = cxt.measureText(fC);
  const tW = tM.width;
  const tH = fS;

  cxt.fillStyle = "rgba(0, 0, 0, 0.6)";
  cxt.fillRect(tX - p / 2, tY - tH, tW + p, tH + p / 2);

  cxt.fillStyle = "white";
  cxt.fillText(fC, tX, tY);
}

function eGMsg() {
  cxt.fillStyle = "red";
  cxt.font = "30px sans-serif";
  cxt.fillText("GAME OVER", 5, 90);

  if (sc >= wS) {
    cxt.font = "20px sans-serif";
    cxt.fillText("Flag found!", 5, bH / 2 + 40);
  }
}

function u() {
  animFrame(u);
  if (go) {
    eGMsg();
    return;
  }

  if (sc >= wS && !go) {
    fFC();
    go = true;
    return;
  }

  cxt.clearRect(0, 0, a.width, a.height);

  vY += g;
  br.y = Math.max(br.y + vY, 0);
  cxt.drawImage(bImg, br.x, br.y, br.w, br.h);

  if (br.y > bH) {
    go = true;
  }

  for (let i = 0; i < pA.length; i++) {
    let p = pA[i];
    p.x += vX;
    cxt.drawImage(p.img, p.x, p.y, p.w, p.h);

    if (!p.passed && br.x > p.x + p.w) {
      sc += 0.5;
      p.passed = true;
    }

    if (dC(br, p)) {
      go = true;
    }
  }

  while (pA.length > 0 && pA[0].x < -pW) {
    pA.shift();
  }

  cxt.fillStyle = "white";
  cxt.font = "45px sans-serif";
  cxt.fillText(sc, 5, 45);
}

function pP() {
  if (go) {
    return;
  }

  let rPY = pY - pH / 4 - Math.random() * (pH / 2);
  let oS = bH / 4;

  let tP = {
    img: tpImg,
    x: pX,
    y: rPY,
    w: pW,
    h: pH,
    passed: false,
  };
  pA.push(tP);

  let bP = {
    img: bpImg,
    x: pX,
    y: rPY + pH + oS,
    w: pW,
    h: pH,
    passed: false,
  };
  pA.push(bP);
}

function mB(e) {
  if (
    e.type === "touchstart" ||
    e.code == "Space" ||
    e.code == "ArrowUp" ||
    e.code == "KeyX"
  ) {
    vY = -6;

    if (go && sc < wS) {
      br.y = brY;
      pA = [];
      sc = 0;
      go = false;
    }
  }
}
document.addEventListener("touchstart", mB);

function dC(a, b) {
  return (
    a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y
  );
}

function animFrame(callback) {
  requestAnimationFrame(callback);
}

document.addEventListener("DOMContentLoaded", (event) => {
  console.log(
    "%cWelcome to Flappy Bird!",
    "color: #777; font-size: large; font-weight: bold; baground-color: black;"
  );
  console.log(
    "%cLooking for secrets, are we? 😏",
    "color: #FF4500; font-size: small;"
  );
  console.log("%cJust enjoy the game! 🎮", "color: green; font-size: medium;");
  console.log(
    "%cYou will find the flag by playing, so just close the console! 😜",
    "color: red; font-size: small;"
  );
});
