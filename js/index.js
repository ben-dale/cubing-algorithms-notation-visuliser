// Generated by CoffeeScript 1.9.2
(function() {
  var $, b, bi, d, di, e, ei, f, fi, generateImages, getImageForMove, handleErrors, hideError, k, l, li, m, mi, pllalgs, r, removeInversion, ri, s, showError, showImage, si, u, ui, v;

  $ = jQuery;

  b = "./images/b.png";

  bi = "./images/bi.png";

  d = "./images/d.png";

  di = "./images/di.png";

  f = "./images/f.png";

  fi = "./images/fi.png";

  l = "./images/l.png";

  li = "./images/li.png";

  r = "./images/r.png";

  ri = "./images/ri.png";

  u = "./images/u.png";

  ui = "./images/ui.png";

  ei = "./images/ei.png";

  e = "./images/e.png";

  m = "./images/m.png";

  mi = "./images/mi.png";

  s = "./images/s.png";

  si = "./images/si.png";

  pllalgs = {
    "T-Perm": "R U R' U' R' F R2 U' R' U' R U R' F'",
    "J(a)-Perm": "R' U L' U2 R U' R' U2 R L U'",
    "J(b)-Perm": "R U R' F' R U R' U' R' F R2 U' R' U'",
    "R(a)-Perm": "R U R' F' R U2 R' U2 R' F R U R U2 R' U'",
    "R(b)-Perm": "R' U2 R U2 R' F R U R' U' R' F' R2 U'",
    "F-Perm": "R' U' F' R U R' U' R' F R2 U' R' U' R U R' U R",
    "Y-Perm": "F R U' R' U' R U R' F' R U R' U' R' F R F'",
    "H-Perm": "M2' U M2' U2 M2' U M2'",
    "U(a)-Perm": "R2 U' R' U' R U R U R U' R",
    "U(b)-Perm": "R' U R' U' R' U' R' U R U R2",
    "Z-Perm": "M2' U M2' U M' U2 M2' U2 M' U2",
    "A(a)-Perm": "R' F R' B2 R F' R' B2 R2",
    "A(b)-Perm": "R B' R F2 R' B R F2 R2",
    "F-Perm": "R' U R U' R2 F' U' F U R F R' F' R2 U'"
  };

  getImageForMove = function(move) {
    switch (move) {
      case "B":
        return b;
      case "B'":
      case "Bi":
        return bi;
      case "D":
        return d;
      case "D'":
      case "Di":
        return di;
      case "F":
        return f;
      case "F'":
      case "Fi":
        return fi;
      case "L":
        return l;
      case "L'":
      case "Li":
        return li;
      case "R":
        return r;
      case "R'":
      case "Ri":
        return ri;
      case "U":
        return u;
      case "U'":
      case "Ui":
        return ui;
      case "E":
        return e;
      case "E'":
      case "Ei":
        return ei;
      case "M":
        return m;
      case "M'":
      case "Mi":
        return mi;
      case "S":
        return s;
      case "S'":
      case "Si":
        return si;
      default:
        return "";
    }
  };

  showError = function(message) {
    return $("#warning-message").html(message).show();
  };

  hideError = function() {
    return $("#warning-message").hide();
  };

  showImage = function(n) {
    return $("#images").append("<img src=" + n + " />");
  };

  handleErrors = function(invalidMoves) {
    var i, len, message, move;
    if (invalidMoves.length > 0) {
      message = "Unable to parse the following moves: <ul>";
      for (i = 0, len = invalidMoves.length; i < len; i++) {
        move = invalidMoves[i];
        message += "<li>" + move + "</li>";
      }
      message += "</ul>";
      return showError(message);
    }
  };

  removeInversion = function(move) {
    return move.replace("i", "").replace("'", "");
  };

  generateImages = function() {
    var algorithm, extractedNumber, i, image, invalidMoves, j, len, move, noOfRepeats, notation, ref, x;
    $("#images").empty();
    invalidMoves = [];
    notation = $("#notation").val().trim();
    algorithm = notation.split(" ");
    for (i = 0, len = algorithm.length; i < len; i++) {
      move = algorithm[i];
      if (move.length > 0) {
        noOfRepeats = 1;
        extractedNumber = removeInversion(move).split(move[0])[1];
        if ((extractedNumber != null ? extractedNumber.length : void 0) !== 0 && isFinite(extractedNumber)) {
          noOfRepeats = extractedNumber;
          move = move.replace(noOfRepeats, "");
        }
        image = getImageForMove(move);
        if (image.length === 0) {
          invalidMoves.push(move);
        } else {
          for (x = j = 0, ref = noOfRepeats; j < ref; x = j += 1) {
            showImage(image);
          }
        }
      }
    }
    return handleErrors(invalidMoves);
  };

  $("#generateImages").on("click", function(event) {
    hideError();
    return generateImages();
  });

  $("#pll-algs").on("change", function(event) {
    var selected;
    hideError();
    selected = $("#pll-algs").find(":selected").text();
    $("#notation").val(pllalgs[selected]);
    return generateImages();
  });

  for (k in pllalgs) {
    v = pllalgs[k];
    $("#pll-algs").append("<option>" + k + "</option>");
  }

  $("#notation").val(pllalgs["T-Perm"]);

  generateImages();

}).call(this);
