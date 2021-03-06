/* Math object extensions */
Math.sec = function (x) {
  return 1 / Math.cos(x);
};
Math.csc = function (x) {
  return 1 / Math.sin(x);
};
Math.cot = function (x) {
  return 1 / Math.tan(x);
};
Math.asec = function (x) {
  return Math.acos(1 / x);
};
Math.acsc = function (x) {
  return Math.asin(1 / x);
};
Math.acot = function (x) {
  return Math.atan(1 / x);
};
Math.sinh = function (x) {
  return (Math.exp(x) - Math.exp(-x)) / 2;
};
Math.cosh = function (x) {
  return (Math.exp(x) + Math.exp(-x)) / 2;
};
Math.tanh = function (x) {
  return (Math.exp(x) - Math.exp(-x)) / (Math.exp(x) + Math.exp(-x));
};
Math.sech = function (x) {
  return 1 / Math.cosh(x);
};
Math.csch = function (x) {
  return 1 / Math.sinh(x);
};
Math.coth = function (x) {
  return 1 / Math.tanh(x);
};
Math.asinh = function (x) {
  return Math.log(x + Math.sqrt(x * x + 1));
};
Math.acosh = function (x) {
  return Math.log(x + Math.sqrt(x * x - 1));
};
Math.atanh = function (x) {
  return Math.log((1 + x) / (1 - x)) / 2;
};
Math.sech = function (x) {
  return 1 / Math.cosh(x);
};
Math.csch = function (x) {
  return 1 / Math.sinh(x);
};
Math.coth = function (x) {
  return 1 / Math.tanh(x);
};
Math.asech = function (x) {
  return Math.acosh(1 / x);
};
Math.acsch = function (x) {
  return Math.asinh(1 / x);
};
Math.acoth = function (x) {
  return Math.atanh(1 / x);
};
Math.sign = function (x) {
  return (x === 0 ? 0 : (x < 0 ? -1 : 1));
};
Math.step = function (x, f, g) {
  return (x < 0 ? (g ? g : 0) : (f ? f : 1));
};
Math.root = function (x, index) {
  return Math.pow(x, 1 / index);
};
Math.factorial = function (n) {
  if (n === 0) {
    return 1;
  }
  if (n < 0) {
    if ((n % 1) === 0) {
      return;
    }
    if (n > -1) {
      return Math.factorial(n + 1) / (n + 1);
    }
    return -Math.PI / (Math.factorial(-1 - n) * Math.sin(Math.PI * n));
  }
  var r = n;
  if ((n % 1) === 0) {
    while (n > 1) {
      n = n - 1;
      r = r * n;
    }
  } else {
    r = Math.exp((n + 0.5) * Math.log(n + 1) - n - n * (0.1121105 + n * 0.08106103) / (1.452342 + n * (2.410858 + n)));
  }
  return r;
};
Math.Gamma = function (n) {
  return Math.factorial(n - 1);
};
Math.Beta = function (x, y) {
  return Math.Gamma(x) * Math.Gamma(y) / Math.Gamma(x + y);
};
Math.C = function (x, k) { // Binomial coefficient function
  var res = 1 / ((x + 1) * Math.Beta(k + 1, x - k + 1));
  return res;
};
Math.truncate = function (x, n) { // Truncate decimal number to n places after decimal point
  var k = n || 0;
  return Math.floor(x * Math.pow(10, k)) / Math.pow(10, k);
};
Math.randomString = function (len, str) {
  var chars = (str || "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz").split('');
  var uuid = [],
      rnd = Math.random;
  var radix = chars.length;
  for (var i = 0; i < len; i++) {
    uuid[i] = chars[0 | rnd() * radix];
  }
  return uuid.join('');
};
Math.runif = function (a, b, n) { // Generate random number in [a,b] with n digits after .
  var k = n || 0;
  return Math.truncate((b + Math.pow(10, -k) - a) * Math.random() + a, k);
};
Math.rnormal = function (mean, stdev) {
  mean = mean || 0;
  stdev = stdev || 1;
  var u1 = 0,
      u2 = 0;
  while (u1 * u2 === 0) {
    u1 = Math.random();
    u2 = Math.random();
  }
  return stdev * (Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)) + mean;
};

(function () {

  // This fixes $(...).attr() to work as expected with SVG elements.
  // Does not currently use *AttributeNS() since we rarely need that.
  // See http://api.jquery.com/attr/ for basic documentation of .attr()
  // Additional functionality:
  // - When getting attributes, a string that's a number is return as type number.
  // - If an array is supplied as first parameter, multiple values are returned
  // as an object with values for each given attributes
  var proxied = jQuery.fn.attr,
      svgns = "http://www.w3.org/2000/svg";
  jQuery.fn.attr = function (key, value) {
    var len = this.length;
    if (!len) return this;
    for (var i = 0; i < len; i++) {
      var elem = this[i];
      // set/get SVG attribute
      if (elem.namespaceURI === svgns) {
        // Setting attribute
        if (value !== undefined) {
          elem.setAttribute(key, value);
        } else if ($.isArray(key)) {
          // Getting attributes from array
          var j = key.length,
              obj = {};
          while (j--) {
            var aname = key[j];
            var attr = elem.getAttribute(aname);
            // This returns a number when appropriate
            if (attr || attr === "0") {
              attr = isNaN(attr) ? attr : attr - 0;
            }
            obj[aname] = attr;
          }
          return obj;
        } else if (typeof key === "object") {
          // Setting attributes form object
          for (v in key) {
            elem.setAttribute(v, key[v]);
          }
          // Getting attribute
        } else {
          var attr = elem.getAttribute(key);
          if (attr || attr === "0") {
            attr = isNaN(attr) ? attr : attr - 0;
          }
          return attr;
        }
      } else {
        return proxied.apply(this, arguments);
      }
    }
    return this;
  };
}());

MSVG = function ($) { // character lists for STIX fonts
  var cal = ["\uD835\uDC9C", "\u212C", "\uD835\uDC9E", "\uD835\uDC9F", "\u2130", "\u2131", "\uD835\uDCA2", "\u210B", "\u2110", "\uD835\uDCA5", "\uD835\uDCA6", "\u2112", "\u2133", "\uD835\uDCA9", "\uD835\uDCAA", "\uD835\uDCAB", "\uD835\uDCAC", "\u211B", "\uD835\uDCAE", "\uD835\uDCAF", "\uD835\uDCB0", "\uD835\uDCB1", "\uD835\uDCB2", "\uD835\uDCB3", "\uD835\uDCB4", "\uD835\uDCB5", "\uD835\uDCB6", "\uD835\uDCB7", "\uD835\uDCB8", "\uD835\uDCB9", "\u212F", "\uD835\uDCBB", "\u210A", "\uD835\uDCBD", "\uD835\uDCBE", "\uD835\uDCBF", "\uD835\uDCC0", "\uD835\uDCC1", "\uD835\uDCC2", "\uD835\uDCC3", "\u2134", "\uD835\uDCC5", "\uD835\uDCC6", "\uD835\uDCC7", "\uD835\uDCC8", "\uD835\uDCC9", "\uD835\uDCCA", "\uD835\uDCCB", "\uD835\uDCCC", "\uD835\uDCCD", "\uD835\uDCCE", "\uD835\uDCCF"];
  var frk = ["\uD835\uDD04", "\uD835\uDD05", "\u212D", "\uD835\uDD07", "\uD835\uDD08", "\uD835\uDD09", "\uD835\uDD0A", "\u210C", "\u2111", "\uD835\uDD0D", "\uD835\uDD0E", "\uD835\uDD0F", "\uD835\uDD10", "\uD835\uDD11", "\uD835\uDD12", "\uD835\uDD13", "\uD835\uDD14", "\u211C", "\uD835\uDD16", "\uD835\uDD17", "\uD835\uDD18", "\uD835\uDD19", "\uD835\uDD1A", "\uD835\uDD1B", "\uD835\uDD1C", "\u2128", "\uD835\uDD1E", "\uD835\uDD1F", "\uD835\uDD20", "\uD835\uDD21", "\uD835\uDD22", "\uD835\uDD23", "\uD835\uDD24", "\uD835\uDD25", "\uD835\uDD26", "\uD835\uDD27", "\uD835\uDD28", "\uD835\uDD29", "\uD835\uDD2A", "\uD835\uDD2B", "\uD835\uDD2C", "\uD835\uDD2D", "\uD835\uDD2E", "\uD835\uDD2F", "\uD835\uDD30", "\uD835\uDD31", "\uD835\uDD32", "\uD835\uDD33", "\uD835\uDD34", "\uD835\uDD35", "\uD835\uDD36", "\uD835\uDD37"];
  var bbb = ["\uD835\uDD38", "\uD835\uDD39", "\u2102", "\uD835\uDD3B", "\uD835\uDD3C", "\uD835\uDD3D", "\uD835\uDD3E", "\u210D", "\uD835\uDD40", "\uD835\uDD41", "\uD835\uDD42", "\uD835\uDD43", "\uD835\uDD44", "\u2115", "\uD835\uDD46", "\u2119", "\u211A", "\u211D", "\uD835\uDD4A", "\uD835\uDD4B", "\uD835\uDD4C", "\uD835\uDD4D", "\uD835\uDD4E", "\uD835\uDD4F", "\uD835\uDD50", "\u2124", "\uD835\uDD52", "\uD835\uDD53", "\uD835\uDD54", "\uD835\uDD55", "\uD835\uDD56", "\uD835\uDD57", "\uD835\uDD58", "\uD835\uDD59", "\uD835\uDD5A", "\uD835\uDD5B", "\uD835\uDD5C", "\uD835\uDD5D", "\uD835\uDD5E", "\uD835\uDD5F", "\uD835\uDD60", "\uD835\uDD61", "\uD835\uDD62", "\uD835\uDD63", "\uD835\uDD64", "\uD835\uDD65", "\uD835\uDD66", "\uD835\uDD67", "\uD835\uDD68", "\uD835\uDD69", "\uD835\uDD6A", "\uD835\uDD6B"];
  var CONST = 0,
      UNARY = 1,
      BINARY = 2,
      INFIX = 3,
      LEFTBRACKET = 4,
      RIGHTBRACKET = 5,
      SPACE = 6,
      UNDEROVER = 7,
      DEFINITION = 8,
      LEFTRIGHT = 9,
      TEXT = 10,
      BIG = 11,
      STRETCHY = 13,
      MATRIX = 14; // token types
  var symbols = [ // variable Greek letters
  {
    input: "\\varepsilon",
    tag: "mi",
    output: "\u025B",
    ttype: CONST
  },
  {
    input: "\\varsigma",
    tag: "mi",
    output: "\u03C2",
    ttype: CONST
  },
  {
    input: "\\vartheta",
    tag: "mi",
    output: "\u03D1",
    ttype: CONST
  },
  {
    input: "\\varphi",
    tag: "mi",
    output: "\u03D5",
    ttype: CONST
  },
  {
    input: "\\varpi",
    tag: "mi",
    output: "\u03D6",
    ttype: CONST
  },
  {
    input: "\\varrho",
    tag: "mi",
    output: "\u03F1",
    ttype: CONST
  },
  // lower-case Greek letters
  {
    input: "\\alpha",
    tag: "mi",
    output: "\u03B1",
    ttype: CONST
  },
  {
    input: "\\beta",
    tag: "mi",
    output: "\u03B2",
    ttype: CONST
  },
  {
    input: "\\gamma",
    tag: "mi",
    output: "\u03B3",
    ttype: CONST
  },
  {
    input: "\\delta",
    tag: "mi",
    output: "\u03B4",
    ttype: CONST
  },
  {
    input: "\\epsilon",
    tag: "mi",
    output: "\u03B5",
    ttype: CONST
  },
  {
    input: "\\zeta",
    tag: "mi",
    output: "\u03B6",
    ttype: CONST
  },
  {
    input: "\\eta",
    tag: "mi",
    output: "\u03B7",
    ttype: CONST
  },
  {
    input: "\\theta",
    tag: "mi",
    output: "\u03B8",
    ttype: CONST
  },
  {
    input: "\\iota",
    tag: "mi",
    output: "\u03B9",
    ttype: CONST
  },
  {
    input: "\\kappa",
    tag: "mi",
    output: "\u03BA",
    ttype: CONST
  },
  {
    input: "\\lambda",
    tag: "mi",
    output: "\u03BB",
    ttype: CONST
  },
  {
    input: "\\mu",
    tag: "mi",
    output: "\u03BC",
    ttype: CONST
  },
  {
    input: "\\nu",
    tag: "mi",
    output: "\u03BD",
    ttype: CONST
  },
  {
    input: "\\xi",
    tag: "mi",
    output: "\u03BE",
    ttype: CONST
  },
  {
    input: "\\omicron",
    tag: "mi",
    output: "\u03BF",
    ttype: CONST
  },
  {
    input: "\\pi",
    tag: "mi",
    output: "\u03C0",
    ttype: CONST
  },
  {
    input: "\\rho",
    tag: "mi",
    output: "\u03C1",
    ttype: CONST
  },
  {
    input: "\\sigma",
    tag: "mi",
    output: "\u03C3",
    ttype: CONST
  },
  {
    input: "\\tau",
    tag: "mi",
    output: "\u03C4",
    ttype: CONST
  },
  {
    input: "\\upsilon",
    tag: "mi",
    output: "\u03C5",
    ttype: CONST
  },
  {
    input: "\\phi",
    tag: "mi",
    output: "\u03C6",
    ttype: CONST
  },
  {
    input: "\\chi",
    tag: "mi",
    output: "\u03C7",
    ttype: CONST
  },
  {
    input: "\\psi",
    tag: "mi",
    output: "\u03C8",
    ttype: CONST
  },
  {
    input: "\\omega",
    tag: "mi",
    output: "\u03C9",
    ttype: CONST
  },
  // upper-case Greek letters
  {
    input: "\\Alpha",
    tag: "mo",
    output: "\u0391",
    ttype: CONST
  },
  {
    input: "\\Beta",
    tag: "mo",
    output: "\u0392",
    ttype: CONST
  },
  {
    input: "\\Gamma",
    tag: "mo",
    output: "\u0393",
    ttype: CONST
  },
  {
    input: "\\Delta",
    tag: "mo",
    output: "\u0394",
    ttype: CONST
  },
  {
    input: "\\Epsilon",
    tag: "mo",
    output: "\u0395",
    ttype: CONST
  },
  {
    input: "\\Zeta",
    tag: "mo",
    output: "\u0396",
    ttype: CONST
  },
  {
    input: "\\Eta",
    tag: "mo",
    output: "\u0397",
    ttype: CONST
  },
  {
    input: "\\Theta",
    tag: "mo",
    output: "\u0398",
    ttype: CONST
  },
  {
    input: "\\Iota",
    tag: "mo",
    output: "\u0399",
    ttype: CONST
  },
  {
    input: "\\Kappa",
    tag: "mo",
    output: "\u039A",
    ttype: CONST
  },
  {
    input: "\\Lambda",
    tag: "mo",
    output: "\u039B",
    ttype: CONST
  },
  {
    input: "\\Mu",
    tag: "mo",
    output: "\u039C",
    ttype: CONST
  },
  {
    input: "\\Nu",
    tag: "mo",
    output: "\u039D",
    ttype: CONST
  },
  {
    input: "\\Xi",
    tag: "mo",
    output: "\u039E",
    ttype: CONST
  },
  {
    input: "\\Omicron",
    tag: "mo",
    output: "\u039F",
    ttype: CONST
  },
  {
    input: "\\Pi",
    tag: "mo",
    output: "\u03A0",
    ttype: CONST
  },
  {
    input: "\\Rho",
    tag: "mo",
    output: "\u03A1",
    ttype: CONST
  },
  {
    input: "\\Sigma",
    tag: "mo",
    output: "\u03A3",
    ttype: CONST
  },
  {
    input: "\\Tau",
    tag: "mo",
    output: "\u03A4",
    ttype: CONST
  },
  {
    input: "\\Upsilon",
    tag: "mo",
    output: "\u03A5",
    ttype: CONST
  },
  {
    input: "\\Phi",
    tag: "mo",
    output: "\u03A6",
    ttype: CONST
  },
  {
    input: "\\Chi",
    tag: "mo",
    output: "\u03A7",
    ttype: CONST
  },
  {
    input: "\\Psi",
    tag: "mo",
    output: "\u03A8",
    ttype: CONST
  },
  {
    input: "\\Omega",
    tag: "mo",
    output: "\u03A9",
    ttype: CONST
  },
  //fractions
  {
    input: "\\frac12",
    tag: "mo",
    output: "\u00BD",
    ttype: CONST
  },
  {
    input: "\\frac14",
    tag: "mo",
    output: "\u00BC",
    ttype: CONST
  },
  {
    input: "\\frac34",
    tag: "mo",
    output: "\u00BE",
    ttype: CONST
  },
  {
    input: "\\frac13",
    tag: "mo",
    output: "\u2153",
    ttype: CONST
  },
  {
    input: "\\frac23",
    tag: "mo",
    output: "\u2154",
    ttype: CONST
  },
  {
    input: "\\frac15",
    tag: "mo",
    output: "\u2155",
    ttype: CONST
  },
  {
    input: "\\frac25",
    tag: "mo",
    output: "\u2156",
    ttype: CONST
  },
  {
    input: "\\frac35",
    tag: "mo",
    output: "\u2157",
    ttype: CONST
  },
  {
    input: "\\frac45",
    tag: "mo",
    output: "\u2158",
    ttype: CONST
  },
  {
    input: "\\frac16",
    tag: "mo",
    output: "\u2159",
    ttype: CONST
  },
  {
    input: "\\frac56",
    tag: "mo",
    output: "\u215A",
    ttype: CONST
  },
  {
    input: "\\frac18",
    tag: "mo",
    output: "\u215B",
    ttype: CONST
  },
  {
    input: "\\frac38",
    tag: "mo",
    output: "\u215C",
    ttype: CONST
  },
  {
    input: "\\frac58",
    tag: "mo",
    output: "\u215D",
    ttype: CONST
  },
  {
    input: "\\frac78",
    tag: "mo",
    output: "\u215E",
    ttype: CONST
  },
  //binary operation symbols
  {
    input: "\\pm",
    tag: "mo",
    output: "\u00B1",
    ttype: CONST
  },
  {
    input: "\\mp",
    tag: "mo",
    output: "\u2213",
    ttype: CONST
  },
  {
    input: "\\triangleleft",
    tag: "mo",
    output: "\u22B2",
    ttype: CONST
  },
  {
    input: "\\triangleright",
    tag: "mo",
    output: "\u22B3",
    ttype: CONST
  },
  {
    input: "\\cdot",
    tag: "mo",
    output: "\u22C5",
    ttype: CONST
  },
  {
    input: "\\star",
    tag: "mo",
    output: "\u22C6",
    ttype: CONST
  },
  {
    input: "\\ast",
    tag: "mo",
    output: "\u002A",
    ttype: CONST
  },
  {
    input: "\\times",
    tag: "mo",
    output: "\u00D7",
    ttype: CONST
  },
  {
    input: "\\div",
    tag: "mo",
    output: "\u00F7",
    ttype: CONST
  },
  {
    input: "\\circ",
    tag: "mo",
    output: "\u2218",
    ttype: CONST
  },
  {
    input: "\\bullet",
    tag: "mo",
    output: "\u2022",
    ttype: CONST
  },
  {
    input: "\\oplus",
    tag: "mo",
    output: "\u2295",
    ttype: CONST
  },
  {
    input: "\\ominus",
    tag: "mo",
    output: "\u2296",
    ttype: CONST
  },
  {
    input: "\\otimes",
    tag: "mo",
    output: "\u2297",
    ttype: CONST
  },
  {
    input: "\\bigcirc",
    tag: "mo",
    output: "\u25CB",
    ttype: CONST
  },
  {
    input: "\\oslash",
    tag: "mo",
    output: "\u2298",
    ttype: CONST
  },
  {
    input: "\\odot",
    tag: "mo",
    output: "\u2299",
    ttype: CONST
  },
  {
    input: "\\land",
    tag: "mo",
    output: "\u2227",
    ttype: CONST
  },
  {
    input: "\\wedge",
    tag: "mo",
    output: "\u2227",
    ttype: CONST
  },
  {
    input: "\\lor",
    tag: "mo",
    output: "\u2228",
    ttype: CONST
  },
  {
    input: "\\vee",
    tag: "mo",
    output: "\u2228",
    ttype: CONST
  },
  {
    input: "\\cap",
    tag: "mo",
    output: "\u2229",
    ttype: CONST
  },
  {
    input: "\\cup",
    tag: "mo",
    output: "\u222A",
    ttype: CONST
  },
  {
    input: "\\sqcap",
    tag: "mo",
    output: "\u2293",
    ttype: CONST
  },
  {
    input: "\\sqcup",
    tag: "mo",
    output: "\u2294",
    ttype: CONST
  },
  {
    input: "\\uplus",
    tag: "mo",
    output: "\u228E",
    ttype: CONST
  },
  {
    input: "\\amalg",
    tag: "mo",
    output: "\u2210",
    ttype: CONST
  },
  {
    input: "\\bigtriangleup",
    tag: "mo",
    output: "\u25B3",
    ttype: CONST
  },
  {
    input: "\\bigtriangledown",
    tag: "mo",
    output: "\u25BD",
    ttype: CONST
  },
  {
    input: "\\dag",
    tag: "mo",
    output: "\u2020",
    ttype: CONST
  },
  {
    input: "\\dagger",
    tag: "mo",
    output: "\u2020",
    ttype: CONST
  },
  {
    input: "\\ddag",
    tag: "mo",
    output: "\u2021",
    ttype: CONST
  },
  {
    input: "\\ddagger",
    tag: "mo",
    output: "\u2021",
    ttype: CONST
  },
  {
    input: "\\lhd",
    tag: "mo",
    output: "\u22B2",
    ttype: CONST
  },
  {
    input: "\\rhd",
    tag: "mo",
    output: "\u22B3",
    ttype: CONST
  },
  {
    input: "\\unlhd",
    tag: "mo",
    output: "\u22B4",
    ttype: CONST
  },
  {
    input: "\\unrhd",
    tag: "mo",
    output: "\u22B5",
    ttype: CONST
  },
  //BIG Operators
  {
    input: "\\sum",
    tag: "mo",
    output: "\u2211",
    ttype: UNDEROVER
  },
  {
    input: "\\prod",
    tag: "mo",
    output: "\u220F",
    ttype: UNDEROVER
  },
  {
    input: "\\bigcap",
    tag: "mo",
    output: "\u22C2",
    ttype: UNDEROVER
  },
  {
    input: "\\bigcup",
    tag: "mo",
    output: "\u22C3",
    ttype: UNDEROVER
  },
  {
    input: "\\bigwedge",
    tag: "mo",
    output: "\u22C0",
    ttype: UNDEROVER
  },
  {
    input: "\\bigvee",
    tag: "mo",
    output: "\u22C1",
    ttype: UNDEROVER
  },
  {
    input: "\\bigsqcap",
    tag: "mo",
    output: "\u2A05",
    ttype: UNDEROVER
  },
  {
    input: "\\bigsqcup",
    tag: "mo",
    output: "\u2A06",
    ttype: UNDEROVER
  },
  {
    input: "\\coprod",
    tag: "mo",
    output: "\u2210",
    ttype: UNDEROVER
  },
  {
    input: "\\bigoplus",
    tag: "mo",
    output: "\u2A01",
    ttype: UNDEROVER
  },
  {
    input: "\\bigotimes",
    tag: "mo",
    output: "\u2A02",
    ttype: UNDEROVER
  },
  {
    input: "\\bigodot",
    tag: "mo",
    output: "\u2A00",
    ttype: UNDEROVER
  },
  {
    input: "\\biguplus",
    tag: "mo",
    output: "\u2A04",
    ttype: UNDEROVER
  },
  {
    input: "\\int",
    tag: "mo",
    output: "\u222B",
    ttype: CONST
  },
  {
    input: "\\oint",
    tag: "mo",
    output: "\u222E",
    ttype: CONST
  },
  //binary relation symbols
  {
    input: ":=",
    tag: "mo",
    output: ":=",
    ttype: CONST
  },
  {
    input: "\\lt",
    tag: "mo",
    output: "<",
    ttype: CONST
  },
  {
    input: "\\gt",
    tag: "mo",
    output: ">",
    ttype: CONST
  },
  {
    input: "\\ne",
    tag: "mo",
    output: "\u2260",
    ttype: CONST
  },
  {
    input: "\\neq",
    tag: "mo",
    output: "\u2260",
    ttype: CONST
  },
  {
    input: "\\le",
    tag: "mo",
    output: "\u2264",
    ttype: CONST
  },
  {
    input: "\\leq",
    tag: "mo",
    output: "\u2264",
    ttype: CONST
  },
  {
    input: "\\leqslant",
    tag: "mo",
    output: "\u2264",
    ttype: CONST
  },
  {
    input: "\\ge",
    tag: "mo",
    output: "\u2265",
    ttype: CONST
  },
  {
    input: "\\geq",
    tag: "mo",
    output: "\u2265",
    ttype: CONST
  },
  {
    input: "\\geqslant",
    tag: "mo",
    output: "\u2265",
    ttype: CONST
  },
  {
    input: "\\equiv",
    tag: "mo",
    output: "\u2261",
    ttype: CONST
  },
  {
    input: "\\ll",
    tag: "mo",
    output: "\u226A",
    ttype: CONST
  },
  {
    input: "\\gg",
    tag: "mo",
    output: "\u226B",
    ttype: CONST
  },
  {
    input: "\\doteq",
    tag: "mo",
    output: "\u2250",
    ttype: CONST
  },
  {
    input: "\\prec",
    tag: "mo",
    output: "\u227A",
    ttype: CONST
  },
  {
    input: "\\succ",
    tag: "mo",
    output: "\u227B",
    ttype: CONST
  },
  {
    input: "\\preceq",
    tag: "mo",
    output: "\u227C",
    ttype: CONST
  },
  {
    input: "\\succeq",
    tag: "mo",
    output: "\u227D",
    ttype: CONST
  },
  {
    input: "\\subset",
    tag: "mo",
    output: "\u2282",
    ttype: CONST
  },
  {
    input: "\\supset",
    tag: "mo",
    output: "\u2283",
    ttype: CONST
  },
  {
    input: "\\subseteq",
    tag: "mo",
    output: "\u2286",
    ttype: CONST
  },
  {
    input: "\\supseteq",
    tag: "mo",
    output: "\u2287",
    ttype: CONST
  },
  {
    input: "\\sqsubset",
    tag: "mo",
    output: "\u228F",
    ttype: CONST
  },
  {
    input: "\\sqsupset",
    tag: "mo",
    output: "\u2290",
    ttype: CONST
  },
  {
    input: "\\sqsubseteq",
    tag: "mo",
    output: "\u2291",
    ttype: CONST
  },
  {
    input: "\\sqsupseteq",
    tag: "mo",
    output: "\u2292",
    ttype: CONST
  },
  {
    input: "\\sim",
    tag: "mo",
    output: "\u223C",
    ttype: CONST
  },
  {
    input: "\\simeq",
    tag: "mo",
    output: "\u2243",
    ttype: CONST
  },
  {
    input: "\\approx",
    tag: "mo",
    output: "\u2248",
    ttype: CONST
  },
  {
    input: "\\cong",
    tag: "mo",
    output: "\u2245",
    ttype: CONST
  },
  {
    input: "\\Join",
    tag: "mo",
    output: "\u22C8",
    ttype: CONST
  },
  {
    input: "\\bowtie",
    tag: "mo",
    output: "\u22C8",
    ttype: CONST
  },
  {
    input: "\\in",
    tag: "mo",
    output: "\u2208",
    ttype: CONST
  },
  {
    input: "\\ni",
    tag: "mo",
    output: "\u220B",
    ttype: CONST
  },
  {
    input: "\\owns",
    tag: "mo",
    output: "\u220B",
    ttype: CONST
  },
  {
    input: "\\propto",
    tag: "mo",
    output: "\u221D",
    ttype: CONST
  },
  {
    input: "\\vdash",
    tag: "mo",
    output: "\u22A2",
    ttype: CONST
  },
  {
    input: "\\dashv",
    tag: "mo",
    output: "\u22A3",
    ttype: CONST
  },
  {
    input: "\\models",
    tag: "mo",
    output: "\u22A8",
    ttype: CONST
  },
  {
    input: "\\perp",
    tag: "mo",
    output: "\u22A5",
    ttype: CONST
  },
  {
    input: "\\smile",
    tag: "mo",
    output: "\u2323",
    ttype: CONST
  },
  {
    input: "\\frown",
    tag: "mo",
    output: "\u2322",
    ttype: CONST
  },
  {
    input: "\\asymp",
    tag: "mo",
    output: "\u224D",
    ttype: CONST
  },
  {
    input: "\\notin",
    tag: "mo",
    output: "\u2209",
    ttype: CONST
  },
  //matrices
  {
    input: "\\begin{eqnarray}",
    output: "X",
    ttype: MATRIX,
    invisible: true
  },
  {
    input: "\\begin{array}",
    output: "X",
    ttype: MATRIX,
    invisible: true
  },
  {
    input: "\\\\",
    output: "}&{",
    ttype: DEFINITION
  },
  {
    input: "\\end{eqnarray}",
    output: "}}",
    ttype: DEFINITION
  },
  {
    input: "\\end{array}",
    output: "}}",
    ttype: DEFINITION
  },
  //grouping and literal brackets
  {
    input: "\\big",
    tag: "mo",
    output: "X",
    atval: "1.2",
    ttype: BIG
  },
  {
    input: "\\Big",
    tag: "mo",
    output: "X",
    atval: "1.8",
    ttype: BIG
  },
  {
    input: "\\bigg",
    tag: "mo",
    output: "X",
    atval: "2.3",
    ttype: BIG
  },
  {
    input: "\\Bigg",
    tag: "mo",
    output: "X",
    atval: "2.9",
    ttype: BIG
  },
  {
    input: "\\left",
    tag: "mo",
    output: "X",
    ttype: LEFTBRACKET
  },
  {
    input: "\\right",
    tag: "mo",
    output: "X",
    ttype: RIGHTBRACKET
  },
  {
    input: "{",
    output: "{",
    ttype: LEFTBRACKET,
    invisible: true
  },
  {
    input: "}",
    output: "}",
    ttype: RIGHTBRACKET,
    invisible: true
  },
  {
    input: "(",
    tag: "mo",
    output: "(",
    atval: "1",
    ttype: STRETCHY
  },
  {
    input: "[",
    tag: "mo",
    output: "[",
    atval: "1",
    ttype: STRETCHY
  },
  {
    input: "\\lbrack",
    tag: "mo",
    output: "[",
    atval: "1",
    ttype: STRETCHY
  },
  {
    input: "\\{",
    tag: "mo",
    output: "{",
    atval: "1",
    ttype: STRETCHY
  },
  {
    input: "\\lbrace",
    tag: "mo",
    output: "{",
    atval: "1",
    ttype: STRETCHY
  },
  {
    input: "\\langle",
    tag: "mo",
    output: "\u2329",
    atval: "1",
    ttype: STRETCHY
  },
  {
    input: "\\lfloor",
    tag: "mo",
    output: "\u230A",
    atval: "1",
    ttype: STRETCHY
  },
  {
    input: "\\lceil",
    tag: "mo",
    output: "\u2308",
    atval: "1",
    ttype: STRETCHY
  },
  // rtag:"mi" causes space to be inserted before a following sin, cos, etc.
  // (see function parseExpr() )
  {
    input: ")",
    tag: "mo",
    output: ")",
    rtag: "mi",
    atval: "1",
    ttype: STRETCHY
  },
  {
    input: "]",
    tag: "mo",
    output: "]",
    rtag: "mi",
    atval: "1",
    ttype: STRETCHY
  },
  {
    input: "\\rbrack",
    tag: "mo",
    output: "]",
    rtag: "mi",
    atval: "1",
    ttype: STRETCHY
  },
  {
    input: "\\}",
    tag: "mo",
    output: "}",
    rtag: "mi",
    atval: "1",
    ttype: STRETCHY
  },
  {
    input: "\\rbrace",
    tag: "mo",
    output: "}",
    rtag: "mi",
    atval: "1",
    ttype: STRETCHY
  },
  {
    input: "\\rangle",
    tag: "mo",
    output: "\u232A",
    rtag: "mi",
    atval: "1",
    ttype: STRETCHY
  },
  {
    input: "\\rfloor",
    tag: "mo",
    output: "\u230B",
    rtag: "mi",
    atval: "1",
    ttype: STRETCHY
  },
  {
    input: "\\rceil",
    tag: "mo",
    output: "\u2309",
    rtag: "mi",
    atval: "1",
    ttype: STRETCHY
  },
  {
    input: "|",
    tag: "mo",
    output: "\u2223",
    atval: "1",
    ttype: STRETCHY
  },
  {
    input: "\\|",
    tag: "mo",
    output: "\u2225",
    atval: "1",
    ttype: STRETCHY
  },
  {
    input: "\\vert",
    tag: "mo",
    output: "\u2223",
    atval: "1",
    ttype: STRETCHY
  },
  {
    input: "\\Vert",
    tag: "mo",
    output: "\u2225",
    atval: "1",
    ttype: STRETCHY
  },
  {
    input: "\\mid",
    tag: "mo",
    output: "\u2223",
    atval: "1",
    ttype: STRETCHY
  },
  {
    input: "\\parallel",
    tag: "mo",
    output: "\u2225",
    atval: "1",
    ttype: STRETCHY
  },
  {
    input: "/",
    tag: "mo",
    output: "/",
    atval: "1.01",
    ttype: STRETCHY
  },
  {
    input: "\\backslash",
    tag: "mo",
    output: "\u2216",
    atval: "1",
    ttype: STRETCHY
  },
  {
    input: "\\setminus",
    tag: "mo",
    output: "\\",
    ttype: CONST
  },
  //miscellaneous symbols
  {
    input: "\\!",
    tag: "mspace",
    atname: "width",
    atval: "-0.167em",
    ttype: SPACE
  },
  {
    input: "\\,",
    tag: "mspace",
    atname: "width",
    atval: "0.167em",
    ttype: SPACE
  },
  {
    input: "\\>",
    tag: "mspace",
    atname: "width",
    atval: "0.222em",
    ttype: SPACE
  },
  {
    input: "\\:",
    tag: "mspace",
    atname: "width",
    atval: "0.222em",
    ttype: SPACE
  },
  {
    input: "\\;",
    tag: "mspace",
    atname: "width",
    atval: "0.278em",
    ttype: SPACE
  },
  {
    input: "~",
    tag: "mspace",
    atname: "width",
    atval: "0.333em",
    ttype: SPACE
  },
  {
    input: "\\quad",
    tag: "mspace",
    atname: "width",
    atval: "1em",
    ttype: SPACE
  },
  {
    input: "\\qquad",
    tag: "mspace",
    atname: "width",
    atval: "2em",
    ttype: SPACE
  },
  {
    input: "\\prime",
    tag: "mo",
    output: "\u2032",
    ttype: CONST
  },
  {
    input: "'",
    tag: "mo",
    output: "\u02B9",
    ttype: CONST
  },
  {
    input: "''",
    tag: "mo",
    output: "\u02BA",
    ttype: CONST
  },
  {
    input: "'''",
    tag: "mo",
    output: "\u2034",
    ttype: CONST
  },
  {
    input: "''''",
    tag: "mo",
    output: "\u2057",
    ttype: CONST
  },
  {
    input: "\\ldots",
    tag: "mo",
    output: "\u2026",
    ttype: CONST
  },
  {
    input: "\\cdots",
    tag: "mo",
    output: "\u22EF",
    ttype: CONST
  },
  {
    input: "\\vdots",
    tag: "mo",
    output: "\u22EE",
    ttype: CONST
  },
  {
    input: "\\ddots",
    tag: "mo",
    output: "\u22F1",
    ttype: CONST
  },
  {
    input: "\\forall",
    tag: "mo",
    output: "\u2200",
    ttype: CONST
  },
  {
    input: "\\exists",
    tag: "mo",
    output: "\u2203",
    ttype: CONST
  },
  {
    input: "\\Re",
    tag: "mo",
    output: "\u211C",
    ttype: CONST
  },
  {
    input: "\\Im",
    tag: "mo",
    output: "\u2111",
    ttype: CONST
  },
  {
    input: "\\aleph",
    tag: "mo",
    output: "\u2135",
    ttype: CONST
  },
  {
    input: "\\hbar",
    tag: "mo",
    output: "\u210F",
    ttype: CONST
  },
  {
    input: "\\ell",
    tag: "mo",
    output: "\u2113",
    ttype: CONST
  },
  {
    input: "\\wp",
    tag: "mo",
    output: "\u2118",
    ttype: CONST
  },
  {
    input: "\\emptyset",
    tag: "mo",
    output: "\u2205",
    ttype: CONST
  },
  {
    input: "\\infty",
    tag: "mo",
    output: "\u221E",
    ttype: CONST
  },
  {
    input: "\\surd",
    tag: "mo",
    output: "\\sqrt{}",
    ttype: DEFINITION
  },
  {
    input: "\\partial",
    tag: "mo",
    output: "\u2202",
    ttype: CONST
  },
  {
    input: "\\nabla",
    tag: "mo",
    output: "\u2207",
    ttype: CONST
  },
  {
    input: "\\triangle",
    tag: "mo",
    output: "\u25B3",
    ttype: CONST
  },
  {
    input: "\\therefore",
    tag: "mo",
    output: "\u2234",
    ttype: CONST
  },
  {
    input: "\\angle",
    tag: "mo",
    output: "\u2220",
    ttype: CONST
  },
  {
    input: "\\diamond",
    tag: "mo",
    output: "\u22C4",
    ttype: CONST
  },
  {
    input: "\\Diamond",
    tag: "mo",
    output: "\u25C7",
    ttype: CONST
  },
  {
    input: "\\neg",
    tag: "mo",
    output: "\u00AC",
    ttype: CONST
  },
  {
    input: "\\lnot",
    tag: "mo",
    output: "\u00AC",
    ttype: CONST
  },
  {
    input: "\\bot",
    tag: "mo",
    output: "\u22A5",
    ttype: CONST
  },
  {
    input: "\\top",
    tag: "mo",
    output: "\u22A4",
    ttype: CONST
  },
  {
    input: "\\square",
    tag: "mo",
    output: "\u25AB",
    ttype: CONST
  },
  {
    input: "\\Box",
    tag: "mo",
    output: "\u25A1",
    ttype: CONST
  },
  {
    input: "\\wr",
    tag: "mo",
    output: "\u2240",
    ttype: CONST
  },
  //standard functions
  //Note UNDEROVER *must* have tag:"mo" to work properly
  {
    input: "\\arccos",
    tag: "mi",
    output: "arccos",
    ttype: UNARY,
    func: true
  },
  {
    input: "\\arcsin",
    tag: "mi",
    output: "arcsin",
    ttype: UNARY,
    func: true
  },
  {
    input: "\\arctan",
    tag: "mi",
    output: "arctan",
    ttype: UNARY,
    func: true
  },
  {
    input: "\\arg",
    tag: "mi",
    output: "arg",
    ttype: UNARY,
    func: true
  },
  {
    input: "\\cos",
    tag: "mi",
    output: "cos",
    ttype: UNARY,
    func: true
  },
  {
    input: "\\cosh",
    tag: "mi",
    output: "cosh",
    ttype: UNARY,
    func: true
  },
  {
    input: "\\cot",
    tag: "mi",
    output: "cot",
    ttype: UNARY,
    func: true
  },
  {
    input: "\\coth",
    tag: "mi",
    output: "coth",
    ttype: UNARY,
    func: true
  },
  {
    input: "\\csc",
    tag: "mi",
    output: "csc",
    ttype: UNARY,
    func: true
  },
  {
    input: "\\deg",
    tag: "mi",
    output: "deg",
    ttype: UNARY,
    func: true
  },
  {
    input: "\\det",
    tag: "mi",
    output: "det",
    ttype: UNARY,
    func: true
  },
  {
    input: "\\dim",
    tag: "mi",
    output: "dim",
    ttype: UNARY,
    func: true
  },
  {
    input: "\\exp",
    tag: "mi",
    output: "exp",
    ttype: UNARY,
    func: true
  },
  {
    input: "\\gcd",
    tag: "mi",
    output: "gcd",
    ttype: UNARY,
    func: true
  },
  {
    input: "\\hom",
    tag: "mi",
    output: "hom",
    ttype: UNARY,
    func: true
  },
  {
    input: "\\inf",
    tag: "mo",
    output: "inf",
    ttype: UNDEROVER
  },
  {
    input: "\\ker",
    tag: "mi",
    output: "ker",
    ttype: UNARY,
    func: true
  },
  {
    input: "\\lg",
    tag: "mi",
    output: "lg",
    ttype: UNARY,
    func: true
  },
  {
    input: "\\lim",
    tag: "mo",
    output: "lim",
    ttype: UNDEROVER
  },
  {
    input: "\\liminf",
    tag: "mo",
    output: "liminf",
    ttype: UNDEROVER
  },
  {
    input: "\\limsup",
    tag: "mo",
    output: "limsup",
    ttype: UNDEROVER
  },
  {
    input: "\\ln",
    tag: "mi",
    output: "ln",
    ttype: UNARY,
    func: true
  },
  {
    input: "\\log",
    tag: "mi",
    output: "log",
    ttype: UNARY,
    func: true
  },
  {
    input: "\\max",
    tag: "mo",
    output: "max",
    ttype: UNDEROVER
  },
  {
    input: "\\min",
    tag: "mo",
    output: "min",
    ttype: UNDEROVER
  },
  {
    input: "\\Pr",
    tag: "mi",
    output: "Pr",
    ttype: UNARY,
    func: true
  },
  {
    input: "\\sec",
    tag: "mi",
    output: "sec",
    ttype: UNARY,
    func: true
  },
  {
    input: "\\sin",
    tag: "mi",
    output: "sin",
    ttype: UNARY,
    func: true
  },
  {
    input: "\\sinh",
    tag: "mi",
    output: "sinh",
    ttype: UNARY,
    func: true
  },
  {
    input: "\\sup",
    tag: "mo",
    output: "sup",
    ttype: UNDEROVER
  },
  {
    input: "\\tan",
    tag: "mi",
    output: "tan",
    ttype: UNARY,
    func: true
  },
  {
    input: "\\tanh",
    tag: "mi",
    output: "tanh",
    ttype: UNARY,
    func: true
  },
  //arrows
  {
    input: "\\gets",
    tag: "mo",
    output: "\u2190",
    ttype: CONST
  },
  {
    input: "\\leftarrow",
    tag: "mo",
    output: "\u2190",
    ttype: CONST
  },
  {
    input: "\\to",
    tag: "mo",
    output: "\u2192",
    ttype: CONST
  },
  {
    input: "\\rightarrow",
    tag: "mo",
    output: "\u2192",
    ttype: CONST
  },
  {
    input: "\\leftrightarrow",
    tag: "mo",
    output: "\u2194",
    ttype: CONST
  },
  {
    input: "\\uparrow",
    tag: "mo",
    output: "\u2191",
    ttype: CONST
  },
  {
    input: "\\downarrow",
    tag: "mo",
    output: "\u2193",
    ttype: CONST
  },
  {
    input: "\\updownarrow",
    tag: "mo",
    output: "\u2195",
    ttype: CONST
  },
  {
    input: "\\Leftarrow",
    tag: "mo",
    output: "\u21D0",
    ttype: CONST
  },
  {
    input: "\\Rightarrow",
    tag: "mo",
    output: "\u21D2",
    ttype: CONST
  },
  {
    input: "\\Leftrightarrow",
    tag: "mo",
    output: "\u21D4",
    ttype: CONST
  },
  {
    input: "\\iff",
    tag: "mo",
    output: "~\\Longleftrightarrow~",
    ttype: DEFINITION
  },
  {
    input: "\\Uparrow",
    tag: "mo",
    output: "\u21D1",
    ttype: CONST
  },
  {
    input: "\\Downarrow",
    tag: "mo",
    output: "\u21D3",
    ttype: CONST
  },
  {
    input: "\\Updownarrow",
    tag: "mo",
    output: "\u21D5",
    ttype: CONST
  },
  {
    input: "\\mapsto",
    tag: "mo",
    output: "\u21A6",
    ttype: CONST
  },
  {
    input: "\\longleftarrow",
    tag: "mo",
    output: "\u27F5",
    ttype: CONST
  },
  {
    input: "\\longrightarrow",
    tag: "mo",
    output: "\u27F6",
    ttype: CONST
  },
  {
    input: "\\longleftrightarrow",
    tag: "mo",
    output: "\u27F7",
    ttype: CONST
  },
  {
    input: "\\Longleftarrow",
    tag: "mo",
    output: "\u27F8",
    ttype: CONST
  },
  {
    input: "\\Longrightarrow",
    tag: "mo",
    output: "\u27F9",
    ttype: CONST
  },
  {
    input: "\\Longleftrightarrow",
    tag: "mo",
    output: "\u27FA",
    ttype: CONST
  },
  {
    input: "\\longmapsto",
    tag: "mo",
    output: "\u27FC",
    ttype: CONST
  },
  //commands with argument
  {
    input: "\\sqrt",
    tag: "msqrt",
    output: "sqrt",
    ttype: UNARY
  },
  {
    input: "\\root",
    tag: "mroot",
    output: "root",
    ttype: BINARY
  },
  {
    input: "\\frac",
    tag: "mfrac",
    output: "/",
    ttype: BINARY
  },
  {
    input: "\\bfrac",
    tag: "mfrac",
    output: "/",
    ttype: BINARY
  },
  {
    input: "\\stackrel",
    tag: "mover",
    output: "stackrel",
    ttype: BINARY
  },
  {
    input: "\\atop",
    tag: "mfrac",
    output: "",
    ttype: INFIX
  },
  {
    input: "\\choose",
    tag: "mfrac",
    output: "",
    ttype: INFIX
  },
  {
    input: "\\over",
    tag: "mfrac",
    output: "/",
    ttype: INFIX
  },
  {
    input: "_",
    tag: "msub",
    output: "_",
    ttype: INFIX
  },
  {
    input: "^",
    tag: "msup",
    output: "^",
    ttype: INFIX
  },
  {
    input: "\\mbox",
    tag: "mtext",
    output: "mbox",
    ttype: TEXT
  },
  //diacritical marks
  {
    input: "\\acute",
    tag: "mover",
    output: "\u00B4",
    ttype: UNARY,
    acc: true
  },
  {
    input: "\\grave",
    tag: "mover",
    output: "\u0060",
    ttype: UNARY,
    acc: true
  },
  {
    input: "\\breve",
    tag: "mover",
    output: "\u02D8",
    ttype: UNARY,
    acc: true
  },
  {
    input: "\\check",
    tag: "mover",
    output: "\u02C7",
    ttype: UNARY,
    acc: true
  },
  {
    input: "\\dot",
    tag: "mover",
    output: ".",
    ttype: UNARY,
    acc: true
  },
  {
    input: "\\ddot",
    tag: "mover",
    output: "..",
    ttype: UNARY,
    acc: true
  },
  {
    input: "\\mathring",
    tag: "mover",
    output: "\u00B0",
    ttype: UNARY,
    acc: true
  },
  {
    input: "\\vec",
    tag: "mover",
    output: "\u2192",
    ttype: UNARY,
    acc: true
  },
  {
    input: "\\overrightarrow",
    tag: "mover",
    output: "\u2192",
    ttype: UNARY,
    acc: true
  },
  {
    input: "\\overleftarrow",
    tag: "mover",
    output: "\u2190",
    ttype: UNARY,
    acc: true
  },
  {
    input: "\\hat",
    tag: "mover",
    output: "\u005E",
    ttype: UNARY,
    acc: true
  },
  {
    input: "\\widehat",
    tag: "mover",
    output: "\u0302",
    ttype: UNARY,
    acc: true
  },
  {
    input: "\\tilde",
    tag: "mover",
    output: "~",
    ttype: UNARY,
    acc: true
  },
  {
    input: "\\widetilde",
    tag: "mover",
    output: "\u02DC",
    ttype: UNARY,
    acc: true
  },
  {
    input: "\\bar",
    tag: "mover",
    output: "\u203E",
    ttype: UNARY,
    acc: true
  },
  {
    input: "\\overbrace",
    tag: "mover",
    output: "\u23B4",
    ttype: UNARY,
    acc: true
  },
  {
    input: "\\overline",
    tag: "mover",
    output: "\u00AF",
    ttype: UNARY,
    acc: true
  },
  {
    input: "\\underbrace",
    tag: "munder",
    output: "\u23B5",
    ttype: UNARY,
    acc: true
  },
  {
    input: "\\underline",
    tag: "munder",
    output: "\u00AF",
    ttype: UNARY,
    acc: true
  },
  //typestyles and fonts
  {
    input: "\\displaystyle",
    tag: "mstyle",
    atname: "displaystyle",
    atval: "true",
    ttype: UNARY
  },
  {
    input: "\\textstyle",
    tag: "mstyle",
    atname: "displaystyle",
    atval: "false",
    ttype: UNARY
  },
  {
    input: "\\scriptstyle",
    tag: "mstyle",
    atname: "scriptlevel",
    atval: "1",
    ttype: UNARY
  },
  {
    input: "\\scriptscriptstyle",
    tag: "mstyle",
    atname: "scriptlevel",
    atval: "2",
    ttype: UNARY
  },
  {
    input: "\\mathrm",
    tag: "mtext",
    output: "text",
    ttype: TEXT
  },
  {
    input: "\\textrm",
    tag: "mtext",
    output: "text",
    ttype: TEXT
  },
  {
    input: "\\mathbf",
    tag: "mstyle",
    atname: "mathvariant",
    atval: "bold",
    ttype: UNARY
  },
  {
    input: "\\textbf",
    tag: "mstyle",
    atname: "mathvariant",
    atval: "bold",
    ttype: UNARY
  },
  {
    input: "\\mathit",
    tag: "mstyle",
    atname: "mathvariant",
    atval: "italic",
    ttype: UNARY
  },
  {
    input: "\\textit",
    tag: "mstyle",
    atname: "mathvariant",
    atval: "italic",
    ttype: UNARY
  },
  {
    input: "\\mathtt",
    tag: "mstyle",
    atname: "mathvariant",
    atval: "monospace",
    ttype: UNARY
  },
  {
    input: "\\texttt",
    tag: "mstyle",
    atname: "mathvariant",
    atval: "monospace",
    ttype: UNARY
  },
  {
    input: "\\mathsf",
    tag: "mstyle",
    atname: "mathvariant",
    atval: "sans-serif",
    ttype: UNARY
  },
  {
    input: "\\mathbb",
    tag: "mstyle",
    atname: "mathvariant",
    atval: "double-struck",
    ttype: UNARY,
    codes: bbb
  },
  {
    input: "\\mathcal",
    tag: "mstyle",
    atname: "mathvariant",
    atval: "script",
    ttype: UNARY,
    codes: cal
  },
  {
    input: "\\mathfrak",
    tag: "mstyle",
    atname: "mathvariant",
    atval: "fraktur",
    ttype: UNARY,
    codes: frk
  }];
  var names = []; //list of latex input symbols
  var mathVariant = 'italic';
  if (!document.createElementNS) document.createElementNS = function (link, type) {
    return this.createElement(type);
  };

  function compareNames(x, y) {
    if (x.input > y.input) {
      return 1;
    } else {
      return -1;
    }
  }

  function refreshSymbols() {
    var len = symbols.length;
    symbols.sort(compareNames);
    for (var i = 0; i < len; i++) {
      names[i] = symbols[i].input;
    }
  }

  function strim(str, n) {
    return $.trim(str.slice(n));
  }

  function createElementXHTML(elType) {
    return document.createElementNS("http://www.w3.org/1999/xhtml", elType);
  }

  function position(str, n) {
    var pos = $.inArray(str, names.slice(n));
    if (pos < 0) {
      var narr = names.concat([str]);
      narr.sort();
      pos = $.inArray(str, narr.slice(n))
    }
    return n + pos;
  }

  function getSymbol(str) { //return maximal initial substring of str that appears in names
    //return null if there is none
    var k = 0; //new pos
    var j = 0; //old pos
    var mk; //match pos
    var st;
    var tagst;
    var match = "";
    var more = true;
    var sLen = str.length;
    for (var i = 1; i <= sLen && more; i++) {
      st = str.slice(0, i); //initial substring of length i
      j = k;
      k = position(st, j);
      if (k < names.length && str.slice(0, names[k].length) == names[k]) {
        match = names[k];
        mk = k;
        i = match.length;
      }
      more = k < names.length && str.slice(0, names[k].length) >= names[k];
    }
    if (match !== "") {
      return symbols[mk];
    }
    k = 1;
    st = str.slice(0, 1); //take 1 character
    if ("0" <= st && st <= "9") {
      tagst = "mn";
    } else {
      tagst = (("A" > st || st > "Z") && ("a" > st || st > "z") ? "mo" : "mi");
    }
    return {
      input: st,
      tag: tagst,
      output: st,
      ttype: CONST
    };
  }

  function parseSexpr(str) { //parses str and returns [node,tailstr,(node)tag]
    var symbol, node, result, result2, i, st, newFrag = document.createDocumentFragment();
    var ch, newst, text = '';
    symbol = getSymbol(str); //either a token or a bracket or empty
    if (symbol === null || symbol.ttype == RIGHTBRACKET) {
      return [null, str, null];
    }
    if (symbol.ttype == DEFINITION) {
      str = symbol.output + strim(str, symbol.input.length);
      symbol = getSymbol(str);
      if (symbol === null || symbol.ttype == RIGHTBRACKET) {
        return [null, str, null];
      }
    }

    if (symbol.ttype == CONST && symbol.tag == 'mi' && str != '') {
      while (symbol.ttype == CONST && symbol.tag == 'mi' && str != '') {
        text += symbol.output;
        str = strim(str, symbol.input.length);
        symbol = getSymbol(str);
      }
      node = createMmlNode("mi", document.createTextNode(text));
      node.setAttribute("mathvariant", mathVariant);
      return [node, str, "mi"];
    } else str = strim(str, symbol.input.length);
    switch (symbol.ttype) {
    case SPACE:
      node = createMmlNode(symbol.tag);
      node.setAttribute(symbol.atname, symbol.atval);
      return [node, str, symbol.tag];
    case UNDEROVER:
      return [createMmlNode(symbol.tag, document.createTextNode(symbol.output)), str, symbol.tag];
    case CONST:
      node = createMmlNode(symbol.tag, document.createTextNode(symbol.output));
      return [node, str, symbol.tag];
    case STRETCHY:
      // added by DRW
      node = createMmlNode(symbol.tag, document.createTextNode(symbol.output));
      if (symbol.input == "|" || symbol.input == "\\vert" || symbol.input == "\\|" || symbol.input == "\\Vert") {
        node.setAttribute("lspace", "0em");
        node.setAttribute("rspace", "0em");
      }
      node.setAttribute("maxsize", symbol.atval); // don't allow to stretch here
      if (symbol.rtag !== null) {
        return [node, str, symbol.rtag];
      } else {
        return [node, str, symbol.tag];
      }
      break;
    case BIG:
      // added by DRW
      var atval = symbol.atval;
      symbol = getSymbol(str);
      if (symbol === null) {
        return [null, str, null];
      }
      str = strim(str, symbol.input.length);
      node = createMmlNode(symbol.tag, document.createTextNode(symbol.output));
      node.setAttribute("minsize", atval);
      node.setAttribute("maxsize", atval);
      return [node, str, symbol.tag];
    case LEFTBRACKET:
      //read (expr+)
      if (symbol.input == "\\left") { // left what?
        symbol = getSymbol(str);
        if (symbol !== null) {
          if (symbol.input == ".") {
            symbol.invisible = true;
          }
          str = strim(str, symbol.input.length);
        }
      }
      result = parseExpr(str, true, false);
      if (symbol === null || (typeof symbol.invisible == "boolean" && symbol.invisible)) {
        node = createMmlNode("mrow", result[0]);
      } else {
        node = createMmlNode("mo", document.createTextNode(symbol.output));
        node = createMmlNode("mrow", node);
        node.appendChild(result[0]);
      }
      return [node, result[1], result[2]];
    case MATRIX:
      //read (expr+)
      if (symbol.input == "\\begin{array}") {
        var mask = "";
        symbol = getSymbol(str);
        str = $.trim(str);
        if (symbol === null) {
          mask = "l";
        } else {
          str = strim(str, symbol.input.length);
          if (symbol.input != "{") {
            mask = "l";
          } else {
            do {
              symbol = getSymbol(str);
              if (symbol !== null) {
                str = strim(str, symbol.input.length);
                if (symbol.input != "}") {
                  mask = mask + symbol.input;
                }
              }
            } while (symbol !== null && symbol.input !== "" && symbol.input != "}");
          }
        }
        result = parseExpr("{" + str, true, true);
        node = createMmlNode("mtable", result[0]);
        mask = mask.replace(/l/g, "left ");
        mask = mask.replace(/r/g, "right ");
        mask = mask.replace(/c/g, "center ");
        node.setAttribute("columnalign", mask);
        node.setAttribute("displaystyle", "false");
        return [node, result[1], null];
      } else { // eqnarray
        result = parseExpr("{" + str, true, true);
        node = createMmlNode("mtable", result[0]);
        node.setAttribute("columnalign", "right center left");
        node.setAttribute("displaystyle", "true");
        node = createMmlNode("mrow", node);
        return [node, result[1], null];
      }
      break;
    case TEXT:
      if (str.charAt(0) == "{") {
        i = str.indexOf("}");
      } else {
        i = 0;
      }
      if (i == -1) {
        i = str.length;
      }
      st = str.slice(1, i);
      node = createMmlNode(symbol.tag, document.createTextNode(st));
      newFrag.appendChild(node);
      str = strim(str, i + 1);
      return [createMmlNode("mrow", newFrag), str, null];
    case UNARY:
      if (symbol.atname == 'mathvariant') {
        mathVariant = symbol.atval;
      }
      result = parseSexpr(str);
      if (result[0] === null) {
        return [createMmlNode(symbol.tag, document.createTextNode(symbol.output)), str];
      }
      if (typeof symbol.func == "boolean" && symbol.func) { // functions hack
        st = str.charAt(0);
        if (st == "^" || st == "_" || st == ",") {
          return [createMmlNode(symbol.tag, document.createTextNode(symbol.output)), str, symbol.tag];
        } else {
          node = createMmlNode("mrow", createMmlNode(symbol.tag, document.createTextNode(symbol.output)));
          node.appendChild(result[0]);
          return [node, result[1], symbol.tag];
        }
      }
      if (symbol.input == "\\sqrt") { // sqrt
        return [createMmlNode(symbol.tag, result[0]), result[1], symbol.tag];
      } else if (typeof symbol.acc == "boolean" && symbol.acc) { // accent
        node = createMmlNode(symbol.tag, result[0]);
        var output = symbol.output;
        var node1 = createMmlNode("mo", document.createTextNode(output));
        if (symbol.input == "\\vec" || symbol.input == "\\check") { // don't allow to stretch
          node1.setAttribute("maxsize", "1.2");
        } // why doesn't "1" work?  \vec nearly disappears in firefox
        if (symbol.input == "\\underbrace" || symbol.input == "\\underline") {
          node1.setAttribute("accentunder", "true");
        } else {
          node1.setAttribute("accent", "true");
        }
        node.appendChild(node1);
        if (symbol.input == "\\overbrace" || symbol.input == "\\underbrace") {
          node.ttype = UNDEROVER;
        }
        return [node, result[1], symbol.tag];
      } else { // font change or displaystyle command
        if (typeof symbol.codes != "undefined") {
          for (i = 0; i < result[0].childNodes.length; i++) {
            if (result[0].childNodes[i].nodeName == "mi" || result[0].nodeName == "mi") {
              st = (result[0].nodeName == "mi" ? result[0].firstChild.nodeValue : result[0].childNodes[i].firstChild.nodeValue);
              newst = '';
              for (var j = 0; j < st.length; j++) {
				ch = st.charCodeAt(j);
                if (ch > 64 && ch < 91) {
                  newst = newst + symbol.codes[ch - 65];
                } else if (ch > 96 && ch < 123) {
                    newst = newst + symbol.codes[ch - 71];
                }
              }
              if (result[0].nodeName == "mi") {
                result[0] = createMmlNode("mo").appendChild(document.createTextNode(newst));
              } else {
                result[0].replaceChild(createMmlNode("mo").appendChild(document.createTextNode(newst)), result[0].childNodes[i]);
              }
            }
          }
        }
        node = createMmlNode(symbol.tag, result[0]);
        node.setAttribute(symbol.atname, symbol.atval);
        if (symbol.input == "\\scriptstyle" || symbol.input == "\\scriptscriptstyle") {
          node.setAttribute("displaystyle", "false");
        }
        return [node, result[1], symbol.tag];
      }
      break;
    case BINARY:
      result = parseSexpr(str);
      if (result[0] === null) {
        return [createMmlNode("mo", document.createTextNode(symbol.input)), str, null];
      }
      result2 = parseSexpr(result[1]);
      if (result2[0] === null) {
        return [createMmlNode("mo", document.createTextNode(symbol.input)), str, null];
      }
      if (symbol.input == "\\root" || symbol.input == "\\stackrel") {
        newFrag.appendChild(result2[0]);
      }
      newFrag.appendChild(result[0]);
      if (symbol.input == "\\frac" || symbol.input == "\\bfrac") {
        newFrag.appendChild(result2[0]);
      }
      node = createMmlNode(symbol.tag, newFrag);
      if (symbol.input == "\\bfrac") {
        node.setAttribute("bevelled", "true");
      }
      return [node, result2[1], symbol.tag];
    case INFIX:
      str = strim(str, symbol.input.length);
      return [createMmlNode("mo", document.createTextNode(symbol.output)), str, symbol.tag];
    default:
      return [createMmlNode(symbol.tag, document.createTextNode(symbol.output)), str, symbol.tag]; //its a constant
    }
  }

  function parseIexpr(str) {
    var symbol, sym1, sym2, node, result, tag, underover;
    sym1 = getSymbol(str);
    result = parseSexpr(str);
    node = result[0];
    str = result[1];
    tag = result[2];
    symbol = getSymbol(str);
    if (symbol.ttype == INFIX) {
      str = strim(str, symbol.input.length);
      result = parseSexpr(str);
      if (result[0] === null) { // show box in place of missing argument
        result[0] = createMmlNode("mo", document.createTextNode("\u25A1"));
      }
      str = result[1];
      tag = result[2];
      if (symbol.input == "_" || symbol.input == "^") {
        sym2 = getSymbol(str);
        tag = null; // no space between x^2 and a following sin, cos, etc.
        // This is for \underbrace and \overbrace
        underover = ((sym1.ttype == UNDEROVER) || (node.ttype == UNDEROVER));
        if ((symbol.input == "_" && sym2.input == "^") || (symbol.input == "^" && sym2.input == "_")) {
          str = strim(str, sym2.input.length);
          var res2 = parseSexpr(str);
          str = res2[1];
          tag = res2[2]; // leave space between x_1^2 and a following sin etc.
          node = createMmlNode((underover ? "munderover" : "msubsup"), node);
          if (symbol.input == "_") {
            node.appendChild(result[0]);
            node.appendChild(res2[0]);
          } else {
            node.appendChild(res2[0]);
            node.appendChild(result[0]);
          }
        } else if (symbol.input == "_") {
          node = createMmlNode((underover ? "munder" : "msub"), node);
          node.appendChild(result[0]);
        } else {
          node = createMmlNode((underover ? "mover" : "msup"), node);
          node.appendChild(result[0]);
        }
        node = createMmlNode("mrow", node); // so sum does not stretch
      } else {
        node = createMmlNode(symbol.tag, node);
        if (symbol.input == "\\atop" || symbol.input == "\\choose") {
          node.setAttribute("linethickness", "0ex");
        }
        node.appendChild(result[0]);
        if (symbol.input == "\\choose") {
          node = createMmlNode("mfenced", node);
        }
      }
    }
    return [node, str, tag];
  }

  function parseExpr(str, rightbracket, matrix) {
    var symbol, node, result, i, tag, newFrag = document.createDocumentFragment();
    do {
      str = $.trim(str);
      result = parseIexpr(str);
      node = result[0];
      str = result[1];
      tag = result[2];
      symbol = getSymbol(str);
      if (node) {
        if ((tag == "mn" || tag == "mi") && symbol !== null && typeof symbol.func == "boolean" && symbol.func) { // Add space before \sin in 2\sin x or x\sin x
          var space = createMmlNode("mspace");
          space.setAttribute("width", "0.167em");
          node = createMmlNode("mrow", node);
          node.appendChild(space);
        }
        if (tag == 'mstyle') {
          mathVariant = 'italic';
        }
        newFrag.appendChild(node);
      }
    } while ((symbol.ttype != RIGHTBRACKET) && symbol !== null && symbol.output !== "");
    tag = null;
    if (symbol.ttype == RIGHTBRACKET) {
      if (symbol.input == "\\right") { // right what?
        str = strim(str, symbol.input.length);
        symbol = getSymbol(str);
        if (symbol !== null && symbol.input == ".") {
          symbol.invisible = true;
        }
        if (symbol !== null) {
          tag = symbol.rtag;
        }
      }
      if (symbol !== null) {
        str = strim(str, symbol.input.length);
      } // ready to return
      var len = newFrag.childNodes.length;
      if (matrix && len > 0 && newFrag.childNodes[len - 1].nodeName == "mrow"){
 //     if (matrix && len > 0 && newFrag.childNodes[len - 1].nodeName == "mrow" && len > 1 && newFrag.childNodes[len - 2].nodeName == "mo" && newFrag.childNodes[len - 2].firstChild.nodeValue == "&") {
	  //matrix
        var pos = []; // positions of ampersands
        var m = newFrag.childNodes.length;
        for (i = 0; matrix && i < m; i = i + 2) {
          pos[i] = [];
          node = newFrag.childNodes[i];
          for (var j = 0; j < node.childNodes.length; j++) {
            if (node.childNodes[j].firstChild && node.childNodes[j].firstChild.nodeValue == "&") {
              pos[i][pos[i].length] = j;
            }
          }
        }
        var row, frag, n, k, table = document.createDocumentFragment();
        for (i = 0; i < m; i = i + 2) {
          row = document.createDocumentFragment();
          frag = document.createDocumentFragment();
          node = newFrag.firstChild; // <mrow> -&-&...&-&- </mrow>
          n = node.childNodes.length;
          k = 0;
          for (j = 0; j < n; j++) {
            if (typeof pos[i][k] != "undefined" && j == pos[i][k]) {
              node.removeChild(node.firstChild); //remove &
              row.appendChild(createMmlNode("mtd", frag));
              k++;
            } else {
              frag.appendChild(node.firstChild);
            }
          }
          row.appendChild(createMmlNode("mtd", frag));
          if (newFrag.childNodes.length > 2) {
            newFrag.removeChild(newFrag.firstChild); //remove <mrow> </mrow>
            newFrag.removeChild(newFrag.firstChild); //remove <mo>&</mo>
          }
          table.appendChild(createMmlNode("mtr", row));
        }
        return [table, str];
      }
      if (typeof symbol.invisible != "boolean" || !symbol.invisible) {
        node = createMmlNode("mo", document.createTextNode(symbol.output));
        newFrag.appendChild(node);
      }
    }
    return [newFrag, str, tag];
  }

  function createMmlNode(t, frag) {
    var node = document.createElementNS("http://www.w3.org/1998/Math/MathML", t);
    if (frag) {
      $(node).append(frag);
    }
    return node;
  }

  var SVG, canvas;
  var collection = [];

  function createSVGElement(elType) {
    return document.createElementNS("http://www.w3.org/2000/svg", elType);
  }

  function getSVGElement(id, el) {
    var res = {
      node: null,
      newEl: false
    };
    if (id) {
      id = SVG.id + "_" + id;
      res.node = $("#" + id)[0];
    }
    if (!res.node) {
      res.node = createSVGElement(el);
      if (id) {
        res.node.id = id;
      }
      res.newEl = true;
    }
    return res;
  }

  function openGroup(id, clear) {
    var newEl = getSVGElement(id, 'g');
    appendSVG(newEl);
    canvas = $("#" + SVG.id + "_" + id)[0];
    if (clear) {
      $(canvas).empty();
    }
  }

  function closeGroup() {
    canvas = $("#" + SVG.id + "_Canvas")[0];
  }

  function appendSVG(elmt) {
    if (elmt.newEl) {
      $(canvas).append(elmt.node);
    }
  }

  function addButton(parent, text, title, func, id) {
    var node = createElementXHTML("span");
    node.className = "svgButton";
    node.title = title;
    node.onclick = func;
    if (id) node.id = id;
    $(node).append(text);
    $(node).css({
      paddingRight: "0.5em",
      paddingLeft: "0.5em",
      fontSize: "1em",
      fontFamily: "monospace",
      background: "blue",
      color: "yellow",
      cursor: "pointer"
    });
    $(node).mouseover(function () {
      $(this).css({
        background: "yellow",
        color: "blue"
      });
    });
    $(node).mouseout(function () {
      $(this).css({
        background: "blue",
        color: "yellow"
      });
    });
    $(parent).append(node);
    return parent;
  }

  function pictureAttributes() { //object creator
    this.id = null;
    this.stroke = "blue";
    this.strokewidth = 1;
    this.strokeopacity = 1; // transparent = 0, solid =1
    this.strokedasharray = "none"; // "10,10" gives 10px long dashes
    this.fill = "none"; // default fill color
    this.fillopacity = 1;
    this.fixed = false;
    this.fontstyle = "normal"; // default text shape normal|italic|inherit
    this.fontfamily = "serif"; // default font times|ariel|helvetica|...
    this.fontweight = "normal"; // normal|bold|bolder|lighter|100|...|900
    this.fontsize = 12;
    this.fontstroke = "none"; // default font outline color
    this.fontstrokewidth = 1;
    this.fontstrokeopacity = 1;
    this.fontstrokedasharray = "none";
    this.fontfill = "black"; // default font color
    this.fontfillopacity = 1;
    this.sector = false;
    this.largearc = 0;
    this.marker = "o";
    this.orient = "auto";
    this.size = 8;
    this.units = "userSpaceOnUse";
    this.markerstroke = "blue";
    this.markerstrokewidth = 1;
    this.markerstrokeopacity = 1;
    this.markerstrokedasharray = "none";
    this.markerfill = "none";
    this.markerfillopacity = 1;
    this.sweep = 0;
    this.rx = 0;
    this.ry = 0;
    this.closed = false;
    this.curve = "";
    this.direction = [1, 0];
    this.ticklabels = "";
    this.pos = "";
    this.points = 200;
    this.backgroundcolor = "none";
    this.backgroundopacity = 1;
  }

  function pictureObject() { //object creator
    this.id = null;
    this.src = "";
    this.width = 320;
    this.height = null;
    this.factor = 1;
    this.xmin = -5;
    this.xmax = 5;
    this.ymin = null;
    this.ymax = null;
    this.xunitlength = null;
    this.yunitlength = null;
    this.origin = [0, 0];
    this.mouse = [null, null];
    this.coords = "cartesian";
    this.drag = null;
    this.pan = true;
    this.locked = false;
    this.attr = new pictureAttributes();
  }

  function drawPicture() { //execute user input
    $(canvas).empty();
    $("#" + SVG.id + " .svgMarker").remove();
    SVG.attr = new pictureAttributes();
    try {
      this.code = function () {
        with(Math) {
          eval(SVG.src)
        };
      }();
      this.code = null;
    } catch (err) {
      var errstr;
      if (typeof err == "object") {
        errstr = err.name + " " + err.message + " " + err.number + " " + err.description;
      } else {
        errstr = err;
      }
      alert(errstr + "\n" + SVG.src);
    }
    collection[SVG.id] = SVG;
  }

  function setOptions(atr) {
    for (var i in atr) {
      SVG.attr[i] = atr[i];
    }
  }

  function getOptions(attr, options, prefix) {
    var pref = prefix || "";
    if (typeof attr == "string") {
      return (options[pref + attr] == undefined ? SVG.attr[pref + attr] : options[pref + attr]);
    } else {
      var i, newAttr = {},
          len = attr.length,
          item;
      for (i = 0; i < len; i++) {
        item = attr[i];
        newAttr[item] = options[pref + item] == undefined ? SVG.attr[pref + item] : options[pref + item];
      }
      return newAttr;
    }
  }

  function setAction(evt, fn, id) {
    if (!$.isFunction(fn)) {
      return;
    }
    var node = id ? $("#" + SVG.id + "_" + id) : $("#" + SVG.id);
    $(node).bind(evt, fn);
  }

  function getAngle(p) {
    p = p || [0, 0];
    var res = Math.atan2(SVG.mouse[1] - p[1], SVG.mouse[0] - p[0]);
    res = (res < 0) ? res + 2 * Math.PI : res;
    return res;
  }

  function getDistance(p) {
    p = p || [0, 0];
    return Math.sqrt(Math.pow(SVG.mouse[0] - p[0], 2) + Math.pow(SVG.mouse[1] - p[1], 2));
  }

  function updateButton() {
    var obj = $("#SVGtoolbar #SVGupdateButton");
    if (obj.text() == 'Edit') {
      obj.text('Update');
      obj.attr("title", "Update picture");
      $("#SVGsrc").val(SVG.src).css("display", "block");
    } else {
      SVG.src = $("#SVGsrc").val();
      drawPicture();
    }
  }

  function closeEditor() {
    $("#SVGtoolbar").slideUp();
    $("#SVGsrc").val("");
    SVG.locked = false;
  }

  function switchTo(evt) { // used by dynamic code to select appropriate graph
    var name = evt.currentTarget.id;
    if (SVG.id == name || SVG.locked) return false; //no need to refresh, we are still in the same picture
    SVG = collection[name];
    canvas = $("#" + SVG.id + "_Canvas")[0];
    return false;
  }

  function onWheel(evt) {
    if (SVG.locked) return false;
    evt = evt || window.event;
    var factor = 1;
    evt.preventDefault();
    evt.stopPropagation();
    if (evt.wheelDelta) { /* IE/Opera. */
      factor = (evt.wheelDelta > 0) ? 0.8 : 1.25;
    } else if (evt.detail) { /** Mozilla case. */
      /* In Mozilla, sign of delta is different than in IE. */
      factor = (evt.detail < 0) ? 0.8 : 1.25;
    }
    if (evt.altKey) {
      resize(factor);
    } else zoom(factor);
    return false;
  }

  function onClick(evt) {
    if (SVG.locked) return false;
    if (evt.button === 0) {
      if (evt.shiftKey) {
        $("#SVGtoolbar #SVGupdateButton").text("Update");
        $("#SVGsrc").val(SVG.src);
        $("#SVGtoolbar").css({
          "top": evt.pageY,
          "left": evt.pageX
        }).slideDown();
        SVG.locked = true;
        evt.stopImmediatePropagation();
      } else if (SVG.pan) {
        SVG.drag = [evt.clientX, evt.clientY];
        document.body.style.cursor = 'move';
      }
    }
    return false;
  }

  function onDrop(evt) {
    if (SVG.drag == null) return false;
    document.body.style.cursor = 'default';
    var xlen = (SVG.drag[0] - evt.clientX) / SVG.xunitlength;
    var ylen = (-SVG.drag[1] + evt.clientY) / SVG.yunitlength;
    SVG.drag = null;
    if (xlen != 0 || ylen != 0) {
      setScales([SVG.xmin + xlen, SVG.xmax + xlen, SVG.ymin + ylen, SVG.ymax + ylen]);
    }
    return false;
  }

  function setScales(scales) {
    if (scales) {
      SVG.xmin = scales[0];
      SVG.xmax = scales[1];
      SVG.ymin = scales[2];
      SVG.ymax = scales[3];
    }
    SVG.xunitlength = SVG.width / (SVG.xmax - SVG.xmin);
    SVG.yunitlength = SVG.height / (SVG.ymax - SVG.ymin);
    SVG.origin = [-SVG.xmin * SVG.xunitlength, -SVG.ymin * SVG.yunitlength];
    drawPicture();
  }

  function reScales(scales) {
    if (scales) {
      SVG.xmin = scales[0];
      SVG.xmax = scales[1];
      SVG.ymin = scales[2];
      SVG.ymax = scales[3];
    }
    SVG.xunitlength = SVG.width / (SVG.xmax - SVG.xmin);
    SVG.yunitlength = SVG.height / (SVG.ymax - SVG.ymin);
    SVG.origin = [-SVG.xmin * SVG.xunitlength, -SVG.ymin * SVG.yunitlength];

  }
function getAllScales() {
    var res = [null, null, null, null, 0];
      res[0] = SVG.xmin;
      res[1] = SVG.xmax;
      res[2] = SVG.ymin;
      res[3] = SVG.ymax;
      return res;
    }
  function getScales(scales) {
    scales = scales || [];
    var res = [null, null, null, null, 0];
    if (scales.length == 0) {
      res[0] = SVG.xmin;
      res[1] = SVG.xmax;
    }
    if (scales.length > 1) {
      if (typeof scales[0] == "number" && typeof scales[1] == "number" && scales[1] > scales[0]) {
        res[0] = scales[0];
        res[1] = scales[1];
        res[4] = 4;
      } else {
        res[0] = SVG.xmin;
        res[1] = SVG.xmax;
      }
    }
    if (scales.length == 4) {
      if (typeof scales[2] == "number" && typeof scales[3] == "number" && scales[3] > scales[2]) {
        res[2] = scales[2];
        res[3] = scales[3];
        res[4] += 8;
      }
    }
    return res;
  }

  function resize(factor) {
    SVG.factor = (SVG.factor * factor).toFixed(3);
    SVG.width /= factor;
    SVG.height /= factor;
    var picture = $("#" + SVG.id);
    picture.attr("width", SVG.width);
    picture.attr("height", SVG.height);
    var parent = picture[0].parentNode;
    if (parent.nodeName == 'DIV') {
      parent.style.width = SVG.width + "px";
      parent.style.height = SVG.height + "px";
    }
    setScales();
  }
  function resizeme(factor) {
    SVG.factor = (SVG.factor * factor).toFixed(3);
    SVG.width /= factor;
    SVG.height /= factor;
    var picture = $("#" + SVG.id);
    picture.attr("width", SVG.width);
    picture.attr("height", SVG.height);
    var parent = picture[0].parentNode;
    if (parent.nodeName == 'DIV') {
      parent.style.width = SVG.width + "px";
      parent.style.height = SVG.height + "px";
    }
    //setScales();
  }
  function zoom(factor, center) {
    var px, py;
    if (center) {
      px = (SVG.xmax + SVG.xmin) * 0.5;
      py = (SVG.ymax + SVG.ymin) * 0.5;
    } else {
      px = SVG.mouse[0];
      py = SVG.mouse[1];
    }
    SVG.factor = (SVG.factor * factor).toFixed(3);
    var dx = (SVG.xmax - SVG.xmin) * factor;
    var dy = (SVG.ymax - SVG.ymin) * factor;
    var xmin = (1 - factor) * px + factor * SVG.xmin;
    var ymin = (1 - factor) * py + factor * SVG.ymin;
    setScales([xmin, xmin + dx, ymin, ymin + dy]);
  }

  function updateCartesianCoord() {
    if (!SVG.locked) {
      $("#" + SVG.id + "_Coords").text("(" + SVG.mouse[0].toFixed(2) + ", " + SVG.mouse[1].toFixed(2) + ")");
    }
    return false;
  }

  function updatePolarCoord() {
    if (!SVG.locked) {
      $("#" + SVG.id + "_Coords").text("(" + getDistance().toFixed(2) + ", " + getAngle().toFixed(2) + ")");
    }
    return false;
  }

  function getPosition(evt) {
	var a = [null,null];
    var off = $(evt.currentTarget.parentNode).offset();
    a[0] = (evt.pageX - off.left - SVG.origin[0]) / SVG.xunitlength;
    a[1] = (SVG.height - SVG.origin[1] - evt.pageY + off.top) / SVG.yunitlength;
    return a;
  }

  function updatePosition(evt) {
    SVG.mouse = getPosition(evt);
    return false;
  }

  function removeCoord() {
    $("#" + SVG.id + "_Coords").text("");
    return false;
  }

  function tracker(pos, options) {
    options = options || {};
    var coords = options.coords || SVG.coords;
    var func = (coords == "polar") ? updatePolarCoord : updateCartesianCoord;
    options.id = "Coords";
    options.fixed = true;
    text(pos, "", options);
    setAction("mousemove", func);
    setAction("mouseout", removeCoord);
  }

  function exportSVG() {
    var svg = "<?xml version=\'1.0\' encoding=\'UTF-8\' standalone=\'no\'?>\n";
    svg += $("#" + SVG.id).parent().html();
    svg = svg.replace(/&nbsp;/g, "");
    svg = svg.replace(/><(?!\/)/g, ">\n<");
    $("#SVGtoolbar #SVGupdateButton").text("Edit").attr("title", "Edit script");
    $("#SVGsrc").val(svg).css('display', 'block');
  }

  function toSVG(p) {
    var x = p[0] * SVG.xunitlength + SVG.origin[0];
    var y = SVG.height - p[1] * SVG.yunitlength - SVG.origin[1];
    return [x, y];
  }

  function toSVGPair(p) {
    var q = toSVG(p);
    return q[0] + " " + q[1];
  }

  function setStrokeAndFill(node, options, prefix) {
    var attributes = ["stroke", "strokewidth", "strokedasharray", "strokeopacity", "fill", "fillopacity"];
    var attr = getOptions(attributes, options, prefix);
    var elem = $(node);
    elem.attr("stroke", attr.stroke);
    elem.attr("stroke-width", attr.strokewidth / SVG.factor);
    elem.attr("stroke-dasharray", attr.strokedasharray);
    elem.attr("stroke-opacity", attr.strokeopacity);
    elem.attr("fill", attr.fill);
    elem.attr("fill-opacity", attr.fillopacity);
  }

  function button(p, q, txt, action, options) {
    options = options || {};
    options.id = (options.id || Math.randomString(8));
    rect(p, q, options);
    setAction("click", action, options.id);
    options.fill = null;
    options.fillopacity = 1;
    options.id += "_t"
    text([(p[0] + q[0]) * 0.5, (p[1] + q[1]) * 0.5], txt, options);
    setAction("click", action, options.id);
  }

  function setMarkers(obj, options) {
    var markerChars = "o*sSx+<>|";
    var attributes = ["marker", "size", "units", "orient", "markerstroke", "markerstrokewidth", "markerstrokeopacity"];
    var attr = getOptions(attributes, options);
    var node, node2, i, id, pos = ["marker-start", "marker-mid", "marker-end"];
    var lim = attr.marker.length;
    for (i = 0; i < lim; i++) {
      var type = attr.marker.charAt(i);
      if (type == "-" || markerChars.indexOf(type) < 0) continue;
      id = (options.id || Math.randomString(8)) + 'Marker_' + markerChars.indexOf(type);
      node = $("#" + SVG.id + "_" + id);
      if (node.length === 0) {
        node = $(getSVGElement(id, 'marker').node);
        node.attr("class", "svgMarker");
        node.attr("viewBox", "0 0 10 10");
        node.attr("refX", 5);
        node.attr("refY", 5);
        node.attr("orient", attr.orient);
        node.attr("markerUnits", attr.units);
        switch (type) {
        case "*":
        case "o":
          node2 = $(createSVGElement('circle'));
          node2.attr("cx", 5);
          node2.attr("cy", 5);
          node2.attr("r", 4);
          break;
        case ">":
          node2 = $(createSVGElement('path'));
          node2.attr("d", "M0 0 L10 5 L0 10 z");
          node.attr("refX", 10);
          break;
        case "<":
          node2 = $(createSVGElement('path'));
          node2.attr("d", "M10 0 L10 10 L0 5 z");
          node.attr("refX", 0);
          break;
        case "x":
          node2 = $(createSVGElement('path'));
          node2.attr("d", "M0 0 L10 10 M0 10 L10 0");
          break;
        case "+":
          node2 = $(createSVGElement('path'));
          node2.attr("d", "M5 0 L5 10 M0 5 L10 5");
          break;
        case "|":
          node2 = $(createSVGElement('path'));
          node2.attr("d", "M5 0 L5 10");
          break;
        case "S":
        case "s":
          node2 = $(createSVGElement('rect'));
          node2.attr("x", 0);
          node2.attr("y", 0);
          node2.attr("width", 10);
          node2.attr("height", 10);
        }
        setStrokeAndFill(node2, options, "marker");
        node2.attr("stroke-width", attr.markerstrokewidth);
        if ("*<>S".indexOf(type) > -1) {
          node2.attr("fill", attr.markerstroke);
          node2.attr("fill-opacity", attr.markerstrokeopacity);
        }
        node.append(node2);
        $("#" + SVG.id + "_Defs").append(node);
      }
      node.attr("markerWidth", attr.size / SVG.factor);
      node.attr("markerHeight", attr.size / SVG.factor);
      $(obj).attr(pos[i], "url\(#" + SVG.id + "_" + id + "\)");
    }
  }

  function setLabels(p, options) {
    var i, point = [0, 0],
        pos;
    var label = (typeof options.label == "string") ? [options.label] : options.label;
    var labelpos = getOptions("pos", options);
    labelpos = (typeof labelpos == "string") ? [labelpos] : labelpos;
    var poslen = labelpos.length;
    var size = options.size || SVG.attr.size;
    var dx = (.5 * size / SVG.xunitlength) / SVG.factor;
    var dy = (.5 * size / SVG.yunitlength) / SVG.factor;
    for (i = 0; i < label.length; i++) {
      options.isLabel = "_label" + i;
      point[0] = p[i][0];
      point[1] = p[i][1];
      pos = (poslen > i) ? labelpos[i].toUpperCase() : pos;
      if (/E/.test(pos)) point[0] += dx;
      if (/W/.test(pos)) point[0] -= dx;
      if (/N/.test(pos)) point[1] += dy;
      if (/S/.test(pos)) point[1] -= dy;
      options.pos = pos;
      text(point, label[i], options);
    }
  } //////////////////////////user graphics commands start/////////////////////////

  function line(p, q, options) { // segment connecting points p,q (coordinates in units)
    options = options || {};
    options.closed = false;
    options.curve = "";
    path([p, q], options);
  }

  function dot(p, options) {
    options = options || {};
    var direction = getOptions("direction", options);
    var q = [p[0] + direction[0] / SVG.xunitlength, p[1] + direction[1] / SVG.yunitlength];
    var st = "M" + toSVGPair(p) + " " + toSVGPair(q);
    var elmt = getSVGElement(options.id, 'path');
    var elem = $(elmt.node);
    elem.attr("d", st);
    elem.attr("stroke", "none");
    setMarkers(elem, options);
    appendSVG(elmt);
    if (options.label) setLabels([p], options);
  }

  function path(list, options, append) {
    options = options || {};
    var i, elmt = getSVGElement(options.id, 'path');
    var attr = getOptions(["curve", "closed"], options);
    var len = list.length;
    if (len > 0) {
      var node = $(elmt.node);
      var st = (append && !elmt.newEl) ? elmt.node.getAttribute("d") : "";
      st += "M" + toSVGPair(list[0]) + " " + attr.curve;
      for (i = 1; i < len; i++) {
        st += toSVGPair(list[i]) + " ";
      }
      if (attr.closed) st += "Z";
      node.attr("d", st);
      setStrokeAndFill(node, options);
      if (options.marker) setMarkers(node, options);
      appendSVG(elmt);
      if (options.label) setLabels(list, options);
    }
  }

  function rotate(id, angle, options) {
    if (!id || !angle) return;
    var node = $("#" + SVG.id + "_" + id)[0];
    if (node) {
      options = options || {};
      var center = options.center ? toSVG(options.center) : SVG.origin;
      angle = -angle * 180 / Math.PI;
      var transform = node.getAttribute("transform") || "";
      transform = "rotate(" + angle + " " + center + ") " + (options.replace ? "" : transform);
      $(node).attr("transform", transform);
    }
  }

  function translate(id, delta, options) {
    if (!id || !delta) return;
    var node = $("#" + SVG.id + "_" + id)[0];
    if (node) {
      options = options || {};
      delta = toSVG(delta);
      var transform = node.getAttribute("transform") || "";
      transform = "translate(" + (delta[0] - SVG.origin[0]) + "  " + (SVG.origin[1] + delta[1] - SVG.height) + ") " + (options.replace ? "" : transform);
      $(node).attr("transform", transform);
    }
  }

  function curve(list, options) {
    options = options || {};
    options.curve = options.curve || "T";
    path(list, options);
  }

  function circle(center, radius, options) {
    ellipse(center, radius, radius, options);
  }

  function loop(p, options) { // d is a direction vector e.g. [1,0] means loop starts in that direction
    options = options || {};
    var d = options.direction || [1, 0];
    options.curve = "C";
    options.closed = false;
    path([p, [p[0] + d[0], p[1] + d[1]],
      [p[0] - d[1], p[1] + d[0]], p], options);
  }

  function arc(options) { // coordinates in units
    options = options || {};
    var start = options.start;
    var end = options.end;
    var center = options.center;
    var startangle = options.startangle;
    var endangle = options.endangle;
    var st = "M",
        elmt = getSVGElement(options.id, 'path');
    var attr = getOptions(["largearc", "sweep", "closed", "sector"], options);
    var radius = options.radius;
    if (center != null && startangle != null && endangle != null && radius != null) {
      start = [radius * Math.cos(startangle) + center[0], radius * Math.sin(startangle) + center[1]];
      end = [radius * Math.cos(endangle) + center[0], radius * Math.sin(endangle) + center[1]];
    }
    if (start == null || end == null) return;
    if (!radius) {
      var v = [end[0] - start[0], end[1] - start[1]];
      radius = Math.sqrt(v[0] * v[0] + v[1] * v[1]);
    }
    if (attr.sector) st += toSVGPair(center) + " ";
    st += toSVGPair(start) + " A" + radius * SVG.xunitlength + "," + radius * SVG.yunitlength + " 0 " + attr.largearc + "," + attr.sweep + " " + toSVGPair(end);
    if (attr.sector || attr.closed) st += " z";
    var node = $(elmt.node);
    node.attr("d", st);
    setStrokeAndFill(node, options);
    if (options.marker) setMarkers(node, options);
    appendSVG(elmt);
    if (options.label) setLabels([start, end], options);
  }

  function sector(options) {
    if (!options.center || !options.startangle || !options.endangle || !options.radius) return;
    options.sector = true;
    arc(options);
  }

  function ellipse(center, rx, ry, options) { // coordinates in units
    options = options || {};
    var elmt = getSVGElement(options.id, 'ellipse');
    center = toSVG(center);
    var node = $(elmt.node)
    node.attr("cx", center[0]);
    node.attr("cy", center[1]);
    node.attr("rx", rx * SVG.xunitlength);
    node.attr("ry", ry * SVG.yunitlength);
    setStrokeAndFill(node, options);
    appendSVG(elmt);
  }

  function polygon(list, options) {
    options = options || {};
    options.closed = true;
    path(list, options);
  }

  function rect(p, q, options) { // LL and UR corners in units
    options = options || {};
    var elmt = getSVGElement(options.id, 'rect');
    var attr = getOptions(["rx", "ry"], options);
    var node = $(elmt.node);
    node.attr("x", toSVG(p)[0]);
    node.attr("y", toSVG(q)[1]);
    node.attr("width", (q[0] - p[0]) * SVG.xunitlength);
    node.attr("height", (q[1] - p[1]) * SVG.yunitlength);
    node.attr("rx", attr.rx * SVG.xunitlength);
    node.attr("ry", attr.ry * SVG.yunitlength);
    setStrokeAndFill(node, options);
    appendSVG(elmt);
  }

  function text(p, st, options) {
    options = options || {};
    var id = options.id;
    var attr = getOptions(["fontstyle", "fontfamily", "fontweight", "fontfill", "fontsize", "fixed", "pos"], options);
    if (id && options.isLabel) id += options.isLabel;
    var pos = attr.pos.toUpperCase();
    if (!attr.fixed) {
      attr.fontsize /= SVG.factor;
    }
    var elem, node, dx, dy, latex = false,
        str = $.trim(st.toString()),
        q = toSVG(p);
    if (str.charAt(0) == '$') {
      str = str.substr(1, str.length - 2);
      latex = true;
    }
    if (latex) { // layer for LaTeXMathML
      if (p[0] > SVG.xmax || p[0] < SVG.xmin || p[1] > SVG.ymax || p[1] < SVG.ymin) return;
      node = createElementXHTML("div");
      node.style.position = "absolute";
      node.style.left = "-1000px";
      node.style.top = "-1000px";
      $("body").append(node);
      var math = MSVG.parseMath(str, true, attr.fontsize + "px", attr.fontfill);
      var mathNode = $(node);
      mathNode.append($(math).clone());
      dx = -node.offsetWidth / 2;
      dy = -node.offsetHeight / 2;
      if (/N/.test(pos)) dy = -node.offsetHeight;
      if (/S/.test(pos)) dy = 0;
      if (/E/.test(pos)) dx = 0;
      if (/W/.test(pos)) dx = -node.offsetWidth;
      var width = mathNode.width(),
          height = mathNode.height();
      mathNode.remove();
      q[0] += dx;
      q[1] += dy;
      var elmt = getSVGElement(id, 'foreignObject');
      elem = $(elmt.node);
      elem.empty().append(math);
      elem.attr("width", width);
      elem.attr("height", height);
    } else { // regular text goes into SVG
      var baseline = "middle",
          textanchor = "middle";
      if (/E/.test(pos)) textanchor = "start";
      if (/W/.test(pos)) textanchor = "end";
      if (/N/.test(pos)) baseline = "text-after-edge";
      if (/S/.test(pos)) baseline = "text-before-edge";
      var elmt = getSVGElement(id, 'text');
      elem = $(elmt.node);
      elem.empty().text(str);
      elem.attr("font-style", attr.fontstyle);
      elem.attr("font-family", attr.fontfamily);
      elem.attr("font-weight", attr.fontweight);
      elem.attr("font-size", attr.fontsize);
      elem.attr("text-anchor", textanchor);
      elem.attr("dominant-baseline", baseline);
      setStrokeAndFill(elem, options, "font");
    }
    elem.attr("x", q[0]);
    elem.attr("y", q[1]);
    appendSVG(elmt);
  }

  function image(url, options) {
    options = options || {};
    var elmt = getSVGElement(options.id, 'image');
    var elem = $(elmt.node);
    var height = options.height ? options.height / SVG.factor : SVG.height;
    var width = options.width ? options.width / SVG.factor : SVG.width;
    var origin = toSVG(options.origin || [SVG.xmin, SVG.ymin]);
    var pos = (options.pos || "").toUpperCase();
    var x = origin[0] - width * 0.5;
    var y = origin[1] - height * 0.5;
    if (/N/.test(pos)) y -= height * 0.5;
    if (/S/.test(pos)) y += height * 0.5;
    if (/E/.test(pos)) x += width * 0.5;
    if (/W/.test(pos)) x -= width * 0.5;
    elem.attr("x", x);
    elem.attr("y", y);
    elem.attr("width", width);
    elem.attr("height", height);
    elem.attr("preserveAspectRatio", "none");
    elmt.node.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", url);
    appendSVG(elmt);
  }

  function grid(options) {
    options = options || {};
    var dx, dy, x, y, k;
    var orig = options.origin || [0, 0];
    var id = options.id || "Grid";
    options.stroke = options.stroke || "grey";
    options.strokewidth = (options.strokewidth || SVG.attr.strokewidth * 0.5);
    var coords = options.coords || SVG.coords;
    var lim = getScales(options.scales);
    openGroup(id, true);
    lim[2] = (typeof lim[2] == "number") ? lim[2] : SVG.ymin;
    lim[3] = (typeof lim[3] == "number") ? lim[3] : SVG.ymax;
    if (coords == "polar") { //polar grid
      dx = options.dx || 1;
      dy = options.dy || 3;
      var limit = Math.max(Math.abs(lim[0]), Math.abs(lim[1]), Math.abs(lim[2]), Math.abs(lim[3]));
      for (x = dx; x < limit; x += dx) {
        circle(orig, x, options);
      }
      if (dy > 1) {
        for (y = 1; y < dy; y++) {
          k = Math.tan(y * Math.PI / (2 * dy));
          line([lim[0], (lim[0] - orig[0]) * k + orig[1]], [SVG.xmax, (lim[1] - orig[0]) * k + orig[1]], options);
          line([lim[0], -(lim[0] - orig[0]) * k + orig[1]], [SVG.xmax, -(lim[1] - orig[0]) * k + orig[1]], options);
        }
      }
    } else { //cartesian grid
      dx = options.dx || 1;
      dy = options.dy || dx;
      for (x = orig[0]; x < SVG.xmax; x += dx) {
        if (x > lim[0] && x < lim[1]) {
          line([x, lim[2]], [x, lim[3]], options);
        }
      }
      for (x = orig[0] - dx; x > SVG.xmin; x -= dx) {
        if (x > lim[0] && x < lim[1]) {
          line([x, lim[2]], [x, lim[3]], options);
        }
      }
      for (y = orig[1]; y < SVG.ymax; y += dy) {
        if (y > lim[2] && y < lim[3]) {
          line([lim[0], y], [lim[1], y], options);
        }
      }
      for (y = orig[1] - dy; y > SVG.ymin; y -= dy) {
        if (y > lim[2] && y < lim[3]) {
          line([lim[0], y], [lim[1], y], options);
        }
      }
    }
    closeGroup();
  }

  function axes(options) {
    options = options || {};
    options.marker = "-|" + (options.marker ? options.marker.charAt(0) : "-");
    var i, x, y, start, stop, label;
    var dx = options.dx || 1;
    var dy = options.dy || dx;
    var id = options.id || "Axes";
    var fontsize = getOptions("fontsize", options);
    var coords = options.coords || SVG.coords;
    var orig = (coords == "polar") ? [0, 0] : (options.origin || [0, 0]);
    var ddx = options.decx || Math.max(0, -Math.floor(Math.log(dx) / Math.log(10)));
    var ddy = options.decy || Math.max(0, -Math.floor(Math.log(dy) / Math.log(10)));
    options.stroke = options.stroke || "black";
    options.strokewidth = (options.strokewidth || SVG.attr.strokewidth * 0.5);
    options.markerstroke = options.stroke;
    options.markerstrokewidth = options.strokewidth;
    openGroup(id, true);
    var lim = getScales(options.scales);
    lim[2] = lim[2] || SVG.ymin;
    lim[3] = lim[3] || SVG.ymax;
    if ($.isArray(options.xticks)) {
      var xticks = options.xticks.sort();
      var list2 = [
        [lim[0], orig[1]]
      ];
      label = [""];
      for (i = 0; i < xticks.length; i++) {
        list2.push([xticks[i], orig[1]]);
        label.push(String(xticks[i].toFixed(ddx)));
      }
      list2.push([lim[1], orig[1]]);
      label.push("");
    } else {
      var list1 = [],
          label1 = [];
      var list2 = [],
          label2 = [];
      start = SVG.xmin + 0.25 * dx;
      stop = SVG.xmax - 0.25 * dx;
      i = 1;
      var cand, leftExit = 0,
          rightExit = 0;
      while (leftExit * rightExit == 0) {
        cand = orig[0] + i * dx;
        if (cand > start) {
          if (cand < stop) {
            list1.push([cand, orig[1]]);
            label1.push(String(cand.toFixed(ddx)));
          } else {
            rightExit = 1;
          }
        }
        cand = orig[0] - i * dx;
        if (cand < stop) {
          if (cand > start) {
            list2.push([cand, orig[1]]);
            label = (coords == "polar") ? "" : cand.toFixed(ddx);
            label2.push(String(label));
          } else {
            leftExit = 1;
          }
        }
        i++;
      }
      list1.push([lim[1], orig[1]]);
      label1.push("");
      list2.push([lim[0], orig[1]]);
      label2.push("");
      list2.reverse();
      list2 = list2.concat(list1);
      label2.reverse();
      label = label2.concat(label1);
    }
    if (options.ticklabels != false) {
      options.label = label;
      options.pos = "S";
    }
    path(list2, options);
    if ($.isArray(options.yticks)) {
      var yticks = options.yticks.sort();
      var list2 = [
        [orig[0], lim[2]]
      ];
      label = [""];
      for (i = 0; i < yticks.length; i++) {
        list2.push([orig[0], yticks[i]]);
        label.push(String(yticks[i].toFixed(ddy)));
      }
      list2.push([orig[0], lim[3]]);
      label.push("");
    } else {
      list1 = [], label1 = [];
      list2 = [];
      label2 = [];
      start = SVG.ymin + 0.25 * dy;
      stop = SVG.ymax - 0.25 * dy;
      i = 1;
      leftExit = 0;
      rightExit = 0;
      while (leftExit * rightExit == 0) {
        cand = orig[1] + i * dy;
        if (cand > start) {
          if (cand < stop) {
            list1.push([orig[0], cand]);
            label1.push(String(cand.toFixed(ddy)));
          } else {
            rightExit = 1;
          }
        }
        cand = orig[1] - i * dy;
        if (cand < stop) {
          if (cand > start) {
            list2.push([orig[0], cand]);
            label = (coords == "polar") ? "" : cand.toFixed(ddy);
            label2.push(String(label));
          } else {
            leftExit = 1;
          }
        }
        i++;
      }
      list1.push([orig[0], lim[3]]);
      label1.push("");
      list2.push([orig[0], lim[2]]);
      label2.push("");
      list2.reverse();
      list2 = list2.concat(list1);
      label2.reverse();
      label = label2.concat(label1);
    }
    if (options.ticklabels != false) {
      options.label = label;
      options.pos = "W";
    }
    options.stroke = options.markerstroke;
    path(list2, options);
    closeGroup();
  }

  function list(fun, tmin, tmax, options) {
    var inc = (tmax - tmin) / getOptions("points", options);
    if (inc <= 0 || fun.length == 0) return;
    var t, pth, g = [],
        xt, yt;
    for (t = 1; t >= 0; t--) {
      if ($.isFunction(fun[t])) {
        g[t] = fun[t];
      } else if (typeof fun[t] == "string") {
        with(Math) {
          eval("g[" + t + "] = function(x){return " + fun[t] + "}");
        }
      } else {
        return;
      }
    }
    if (g.length < 2) return;
    pth = [];
    for (t = tmin; t <= tmax; t += inc) {
      xt = g[0](t);
      yt = g[1](t);
      if (isFinite(xt) && isFinite(yt)) pth[pth.length] = [xt, yt];
    }
    return pth;
  }

  function plot(fun, options) {
    options = options || {};
    var append, pth, steps = options.steps || [];
    var n_steps = steps.length;
    options.closed = false;
    options.curve = "";
    var xmin = (options.min == null) ? SVG.xmin : Math.max(SVG.xmin, options.min);
    var xmax = (options.max == null) ? SVG.xmax : Math.min(SVG.xmax, options.max);
    if (n_steps === 0) {
      pth = list(["x", fun], xmin, xmax, options);
      if (pth) path(pth, options);
    } else {
      options.id = options.id || Math.randomString(6);
      steps.sort();
      var steps_a = [];
      steps_a.push(xmin);
      for (i = 0; i < n_steps; i++) {
        if (steps[i] > xmin && steps[i] < xmax) {
          steps_a.push(steps[i]);
        }
      }
      steps_a.push(xmax);
      n_steps = steps_a.length - 1;
      for (i = 0; i < n_steps; i++) {
        xmax = steps_a[i + 1];
        xmin = steps_a[i];
        pth = list(["x", fun], xmin, xmax, options);
        append = (i > 0);
        if (pth) path(pth, options, append);
      }
    }
  }

  function area(fun1, fun2, options) {
    options = options || {};
    options.curve = "";
    options.closed = true;
    var xmin = (options.min == null) ? SVG.xmin : options.min;
    var xmax = (options.max == null) ? SVG.xmax : options.max;
    var pth1 = list(["x", fun1], xmin, xmax, options);
    var pth2 = list(["x", fun2], xmin, xmax, options);
    if (pth1 && pth2) {
      pth1 = pth1.concat(pth2.reverse());
      path(pth1, options);
    }
  }

  function polarPlot(fun, options) {
    var g1, g2;
    if (typeof fun == "string") {
      with(Math) {
        eval("g1 = function(x){return (" + fun + ")*cos(x)}");
        eval("g2 = function(x){return (" + fun + ")*sin(x)}");
      }
    } else if ($.isFunction(fun)) {
      with(Math) {
        eval("g1 = function(x){return fun(x)*cos(x)}");
        eval("g2 = function(x){return fun(x)*sin(x)}");
      }
    }
    parametricPlot(g1, g2, options);
  }

  function parametricPlot(fun1, fun2, options) {
    options = options || {};
    options.closed = false;
    options.curve = "";
    var xmin = (options.min == null) ? 0 : options.min;
    var xmax = (options.max == null) ? 2 * Math.PI : options.max;
    var pth = list([fun1, fun2], xmin, xmax, options);
    if (pth) path(pth, options);
  }

  function slopeField(fun, options) {
    options = options || {};
    var g = fun;
    if (typeof fun == "string") with(Math) {
      eval("g = function(x,y){return " + fun + "}")
    };
    var gxy, x, y, u, v, dz;
    var dx = (options.dx == null) ? 1 : options.dx;
    var dy = (options.dy == null) ? 1 : options.dy;
    dz = Math.sqrt(dx * dx + dy * dy) / 6;
    var xmin = Math.ceil(SVG.xmin / dx);
    var ymin = Math.ceil(SVG.ymin / dy);
    for (x = xmin; x <= SVG.xmax; x += dx) for (y = ymin; y <= SVG.ymax; y += dy) {
      gxy = g(x, y);
      if (!isNaN(gxy)) {
        if (Math.abs(gxy) == "Infinity") {
          u = 0;
          v = dz;
        } else {
          u = dz / Math.sqrt(1 + gxy * gxy);
          v = gxy * u;
        }
        line([x - u, y - v], [x + u, y + v], options);
      }
    }
  } // Public stuff
  return {
	dot:dot,
	line:line,
	path:path,
	rect:rect,
	image:image,
	resizeme:resizeme,
	reScales:reScales,
	getAllScales:getAllScales,
    showFormulaOnMouseOver: false,
    latexImages: false,
    //set to true to force external converter
    //latexConverter: "http://www.codecogs.com/gif.latex?",
    //latexConverter: "http://www.forkosh.dreamhost.com/mimetex.cgi?",
    latexConverter: "http://chart.apis.google.com/chart?cht=tx&chs=1x0&chf=bg,s,FFFFFF00&chco=000000&chl=",
    mathColor: "",
    mathFontSize: "",
    mathFontFamily: "",
    define: function (oldstr, newstr) {
      if (MSVG.latexImages) {
        return;
      }
      if ((typeof oldstr) == "string") {
        oldstr = [oldstr];
        newstr = [newstr];
      }
      var i, len = oldstr.length;
      if (len != newstr.length) {
        return;
      }
      for (i = 0; i < len; i++) {
        symbols = symbols.concat([{
          input: "\\" + oldstr[i],
          tag: "mo",
          output: newstr[i],
          ttype: DEFINITION
        }]);
      }
      refreshSymbols();
    },
    parseMath: function (str, displaystyle, size, color) {
      if (str === null) {
        return null;
      }
      str = str.replace(/_([^\{])/gm, "_{$1}");
      str = str.replace(/\^([^\{])/gm, "^{$1}");
      var frag = parseExpr(str.replace(/^\s+/g, ""), false, false)[0];
      var node = createMmlNode("mstyle", frag);
      $(node).attr({
        displaystyle: displaystyle,
        mathcolor: color || MSVG.mathColor,
        mathsize: size || MSVG.mathFontSize,
        fontfamily: MSVG.mathFontFamily
      });
      node = createMmlNode("math", node);
      if (MSVG.showFormulaOnMouseOver) {
        $(node).attr({
          title: str.replace(/\s+/g, " ")
        });
      }
      return node;
    },
    parseMathExternal: function (str, displaystyle, size, color) {
      if (str === null) {
        return null;
      }
      var node = createElementXHTML("img");
      var snip = MSVG.latexConverter + str;
      $(node).attr({
        src: snip
      });
      if (MSVG.showFormulaOnMouseOver) {
        $(node).attr({
          title: str.replace(/\s+/g, " ")
        });
      }
      return node;
    },
    generic: function () {
      if (!$.browser.mozilla) {
        MSVG.latexImages = true;
      }
      if (MSVG.latexImages) {
        MSVG.parseMath = MSVG.parseMathExternal;
      } else {
        refreshSymbols();
      }
      if (!document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1")) {
        MSVG.initPictures = MSVG.removePictures;
      }
    },
    removePictures: function (obj) {
      var pictures = obj ? $(obj) : $(".SVGgraph");
      $(pictures).each(function () {
        var that = $(this);
        this.id = null;
        that.empty();
        that.css({
          color: "red",
          background: "yellow"
        });
        that.text('Missing picture: your  browser does not support inline SVG');
        window.setTimeout(function () {
          that.remove();
        }, 10000);
      });
    },
    initPictures: function (obj) {
      var options, scales, qnode, node, node2, status, elem;
      var pictures = obj ? $(obj) : $(".SVGgraph");
      $(pictures).each(function () {
        var that = $(this);
        status = 0;
        SVG = new pictureObject();
        options = $(this).attr("options");
        that.removeAttr("id");
        if (options) {
          with(Math) {
            eval("options={" + options + "}");
          }
          setOptions(options);
        } else options = {};
        if (options.pan == false) SVG.pan = false;
        SVG.coords = options.coords || SVG.coords;
        SVG.src = $.trim($(this).text());
        that.empty();
        if (typeof options.width == "number" && options.width > 0) {
          SVG.width = options.width;
          status += 1;
        }
        if (typeof options.height == "number" && options.height > 0) {
          SVG.height = options.height;
          status += 2;
        }
        var scales = getScales(options.scales);
        SVG.xmin = scales[0];
        SVG.xmax = scales[1];
        SVG.ymin = scales[2];
        SVG.ymax = scales[3];
        status += scales[4];
        SVG.height = options.height;
        if (status % 4 != 0) {
          SVG.width = options.width;
        }
        if (!SVG.width) {
          SVG.width = 1.6 * SVG.height;
        } else if (!SVG.height) {
          SVG.height = 0.625 * SVG.width;
        }
        if (status < 8) {
          SVG.ymax = 0.5 * SVG.height * (SVG.xmax - SVG.xmin) / SVG.width;
          SVG.ymin = -SVG.ymax;
        } else if (status < 12) {
          SVG.xmax = 0.5 * SVG.width * (SVG.ymax - SVG.ymin) / SVG.height;
          SVG.xmin = -SVG.xmax;
        }
        if (status == 12 || status == 13) {
          SVG.height = SVG.width * (SVG.ymax - SVG.ymin) / (SVG.xmax - SVG.xmin);
        } else if (status == 14) {
          SVG.width = SVG.height * (SVG.xmax - SVG.xmin) / (SVG.ymax - SVG.ymin);
        }
        SVG.id = options.id || Math.randomString(16);
        qnode = createSVGElement("svg");
        elem = $(qnode);
        qnode.id = SVG.id;
        elem.attr("xmlns", "http://www.w3.org/2000/svg");
        elem.attr("xmlns:ev", "http://www.w3.org/2001/xml-events");
        elem.attr("xmlns:xlink", "http://www.w3.org/1999/xlink");
        elem.attr("version", "1.1");
        elem.attr("baseProfile", "full");
        if (options.border) {
          elem.attr("style", "border:" + options.border);
        }
        node2 = createSVGElement("defs");
        node2.id = SVG.id + "_Defs";
        $(qnode).append(node2);
        node2 = createSVGElement("g");
        node2.id = SVG.id + "_Canvas";
        $(qnode).append(node2);
        that.append(qnode);
        this.style.position = "relative";
        if (!(this.nodeName == 'SPAN')) {
          setAction("mousemove", updatePosition);
          if (SVG.pan) setAction("mouseup", onDrop);
          if (window.addEventListener) {
            var evt = $.browser.mozilla ? "DOMMouseScroll" : "mousewheel";
            if (options.wheel != false) qnode.addEventListener(evt, onWheel, false);
          }
        }
        setAction("mousedown", onClick);
        setAction("mouseover", switchTo);
        canvas = $("#" + SVG.id + "_Canvas")[0];
        resize(1);
      });
      if (pictures.length > 0 && $("#SVGtoolbar").length === 0) {
        node = createElementXHTML("span");
        node.id = "SVGtoolbar";
        node.style.position = "absolute";
        node.style.textAlign = "left";
        node.style.zIndex = 10;
        node = addButton(node, "X", "Close editor", closeEditor);
        node = addButton(node, "Update", "Update picture", updateButton, "SVGupdateButton");
        node = addButton(node, "SVG", "View SVG code", exportSVG);
        node = addButton(node, "-", "Zoom out", function () {
          zoom(1.25, true)
        });
        node = addButton(node, "+", "Zoom in", function () {
          zoom(0.8, true)
        });
        node = addButton(node, "\u2191", "Enlarge picture", function () {
          resize(0.8)
        });
        node = addButton(node, "\u2193", "Reduce picture", function () {
          resize(1.25)
        });
        $(node).append("<br />");
        node2 = createElementXHTML("textarea");
        $(node2).attr({
          id: "SVGsrc",
          rows: 8,
          cols: 60
        });
        $(node).append(node2);
        $(node).hide();
        $("body").append(node);
      }
    }
  };
}(jQuery);
