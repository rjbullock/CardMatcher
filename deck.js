"use strict";
var Deck = (function () {
  function n(n, e) {
    var o = Date.now(),
      r = o + n,
      u = r + e,
      i = { start: r, end: u };
    x.push(i), h || ((h = !0), requestAnimationFrame(t));
    var a = {
      start: function (n) {
        return (i.startcb = n), a;
      },
      progress: function (n) {
        return (i.progresscb = n), a;
      },
      end: function (n) {
        return (i.endcb = n), a;
      },
    };
    return a;
  }
  function t() {
    var n = Date.now();
    if (!x.length) return void (h = !1);
    for (var e, o = 0; o < x.length; o++)
      if (((e = x[o]), !(n < e.start))) {
        e.started || ((e.started = !0), e.startcb && e.startcb());
        var r = (n - e.start) / (e.end - e.start);
        e.progresscb && e.progresscb(1 > r ? r : 1),
          n > e.end && (e.endcb && e.endcb(), x.splice(o--, 1));
      }
    requestAnimationFrame(t);
  }
  function e(n) {
    if ("undefined" != typeof S[n]) return S[n];
    if ("undefined" != typeof C[n]) return (S[n] = n), n;
    for (
      var t,
        e = n[0].toUpperCase() + n.slice(1),
        o = ["webkit", "moz", "Moz", "ms", "o"],
        r = 0,
        u = o.length;
      u > r;
      r++
    )
      if (((t = o[r] + e), "undefined" != typeof C[t])) return (S[n] = t), t;
  }
  function o(n, t, e) {
    return (
      "undefined" != typeof g || (g = r()),
      (e = e || 0),
      g
        ? "translate3d(" + n + ", " + t + ", " + e + ")"
        : "translate(" + n + ", " + t + ")"
    );
  }
  function r() {
    var n = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    if (!n) return !1;
    var t = e("transform"),
      o = document.createElement("p");
    return (
      document.body.appendChild(o),
      (o.style[t] = "translate3d(1px,1px,1px)"),
      (g = o.style[t]),
      (g = null != g && g.length && "none" !== g),
      document.body.removeChild(o),
      g
    );
  }
  function u(n) {
    return document.createElement(n);
  }
  function i(t) {
    function r(n) {
      n.card && n.card(C);
    }
    function i(n) {
      function t(n) {
        w &&
          ("mousemove" === n.type
            ? ((u.x = n.clientX), (u.y = n.clientY))
            : ((u.x = n.touches[0].clientX), (u.y = n.touches[0].clientY)),
          (g.style[y] =
            o(
              Math.round(C.x + u.x - r.x) + "px",
              Math.round(C.y + u.y - r.y) + "px"
            ) + (C.rot ? " rotate(" + C.rot + "deg)" : "")));
      }
      function e(n) {
        q &&
          Date.now() - i < 200 &&
          C.setSide("front" === C.side ? "back" : "front"),
          "mouseup" === n.type
            ? (d(window, "mousemove", t), d(window, "mouseup", e))
            : (d(window, "touchmove", t), d(window, "touchend", e)),
          w && ((C.x = C.x + u.x - r.x), (C.y = C.y + u.y - r.y));
      }
      var r = {},
        u = {},
        i = Date.now();
      n.preventDefault(),
        "mousedown" === n.type
          ? ((r.x = u.x = n.clientX),
            (r.y = u.y = n.clientY),
            c(window, "mousemove", t),
            c(window, "mouseup", e))
          : ((r.x = u.x = n.touches[0].clientX),
            (r.y = u.y = n.touches[0].clientY),
            c(window, "touchmove", t),
            c(window, "touchend", e)),
        w &&
          ((g.style[y] =
            o(C.x + "px", C.y + "px") +
            (C.rot ? " rotate(" + C.rot + "deg)" : "")),
          (g.style.zIndex = I++));
    }
    function f(n) {
      n.appendChild(g), (C.$root = n);
    }
    function s() {
      C.$root && C.$root.removeChild(g), (C.$root = null);
    }
    function l(n) {
      "front" === n
        ? ("back" === C.side && g.removeChild(k),
          (C.side = "front"),
          g.appendChild(b),
          C.setRankSuit(C.rank, C.suit))
        : ("front" === C.side && g.removeChild(b),
          (C.side = "back"),
          g.appendChild(k),
          g.setAttribute("class", "card"));
    }
    var p,
      y = e("transform"),
      m = (t % 13) + 1,
      h = (t / 13) | 0,
      x = (52 - t) / 4,
      g = u("div"),
      b = u("div"),
      k = u("div"),
      w = !1,
      q = !1,
      C = {
        i: t,
        rank: m,
        suit: h,
        pos: t,
        $el: g,
        mount: f,
        unmount: s,
        setSide: l,
      },
      S = v.modules;
    b.classList.add("face"),
      k.classList.add("back"),
      (g.style[y] = o(-x + "px", -x + "px")),
      (C.x = -x),
      (C.y = -x),
      (C.z = x),
      (C.rot = 0),
      C.setSide("back"),
      c(g, "mousedown", i),
      c(g, "touchstart", i);
    for (p in S) r(S[p]);
    return (
      (C.animateTo = function (t) {
        var e,
          r,
          u,
          i,
          a,
          c,
          d = t.delay,
          f = t.duration,
          s = t.x,
          l = void 0 === s ? C.x : s,
          p = t.y,
          m = void 0 === p ? C.y : p,
          v = t.rot,
          h = void 0 === v ? C.rot : v,
          x = t.ease,
          b = t.onStart,
          k = t.onProgress,
          w = t.onComplete;
        n(d, f)
          .start(function () {
            (e = C.x || 0), (r = C.y || 0), (u = C.rot || 0), b && b();
          })
          .progress(function (n) {
            var t = M[x || "cubicInOut"](n);
            (i = l - e),
              (a = m - r),
              (c = h - u),
              k && k(n, t),
              (C.x = e + i * t),
              (C.y = r + a * t),
              (C.rot = u + c * t),
              (g.style[y] =
                o(C.x + "px", C.y + "px") +
                (c ? "rotate(" + C.rot + "deg)" : ""));
          })
          .end(function () {
            w && w();
          });
      }),
      (C.setRankSuit = function (n, t) {
        var e = a(t);
        g.setAttribute("class", "card " + e + " rank" + n);
      }),
      C.setRankSuit(m, h),
      (C.enableDragging = function () {
        w || ((w = !0), (g.style.cursor = "move"));
      }),
      (C.enableFlipping = function () {
        q || (q = !0);
      }),
      (C.disableFlipping = function () {
        q && (q = !1);
      }),
      (C.disableDragging = function () {
        w && ((w = !1), (g.style.cursor = ""));
      }),
      C
    );
  }
  function a(n) {
    return 0 === n
      ? "spades"
      : 1 === n
      ? "hearts"
      : 2 === n
      ? "clubs"
      : 3 === n
      ? "diamonds"
      : "joker";
  }
  function c(n, t, e) {
    n.addEventListener(t, e);
  }
  function d(n, t, e) {
    n.removeEventListener(t, e);
  }
  function f(n) {
    var t = Math.round(Math.random()) ? -1 : 1;
    return t * n;
  }
  function s(n) {
    for (var t, e, o = n.length - 1; o; o--)
      (t = (Math.random() * o) | 0), (e = n[o]), (n[o] = n[t]), (n[t] = e);
    return n;
  }
  function l() {
    return window
      .getComputedStyle(document.body)
      .getPropertyValue("font-size")
      .slice(0, -2);
  }
  function p(n) {
    return (n * Math.PI) / 180;
  }
  function y(n) {
    function t(n) {
      return function () {
        var t = this,
          o = arguments;
        e(function (e) {
          n.apply(t, r.concat.apply(e, o));
        });
      };
    }
    function e(n) {
      n && (u.push(n), 1 === u.length && o());
    }
    function o() {
      u[0](function (n) {
        if (n) throw n;
        (u = u.slice(1)), u.length && o();
      });
    }
    var r = Array.prototype,
      u = [];
    return (n.queue = e), (n.queued = t), n;
  }
  function m(n) {
    function t(n, t, e) {
      u[n] || (u[n] = []), u[n].push({ cb: t, ctx: e });
    }
    function e(n, t, e) {
      u[n] || (u[n] = []), u[n].push({ cb: t, ctx: e, once: !0 });
    }
    function o(n) {
      var t = this,
        e = Array.prototype.slice(arguments, 1),
        o = u[n] || [];
      o.filter(function (n) {
        return n.cb.apply(t, e), !n.once;
      });
    }
    function r(n, t) {
      return n
        ? t
          ? void (u[n] = u[n].filter(function (n) {
              return n.cb !== t;
            }))
          : void (u[n] = [])
        : void (u = {});
    }
    n || (n = {});
    var u = {};
    return (n.on = t), (n.one = e), (n.off = r), (n.trigger = o), n;
  }
  function v(n) {
    function t(n) {
      (r = n), r.appendChild(d);
    }
    function e() {
      r.removeChild(d);
    }
    function o(n) {
      n.deck && n.deck(f);
    }
    var r,
      a,
      c = new Array(n ? 55 : 52),
      d = u("div"),
      f = m({ mount: t, unmount: e, cards: c, $el: d }),
      s = v.modules;
    y(f);
    for (a in s) o(s[a]);
    d.classList.add("deck");
    for (var l, p = c.length; p; p--)
      (l = c[p - 1] = i(p - 1)), l.setSide("back"), l.mount(d);
    return f;
  }
  var h,
    x = [];
  window.requestAnimationFrame ||
    (window.requestAnimationFrame = function (n) {
      setTimeout(n, 0);
    });
  var g,
    b,
    k,
    w,
    q,
    C = document.createElement("p").style,
    S = {},
    I = 52,
    M = {
      linear: function (n) {
        return n;
      },
      quadIn: function (n) {
        return n * n;
      },
      quadOut: function (n) {
        return n * (2 - n);
      },
      quadInOut: function (n) {
        return 0.5 > n ? 2 * n * n : -1 + (4 - 2 * n) * n;
      },
      cubicIn: function (n) {
        return n * n * n;
      },
      cubicOut: function (n) {
        return --n * n * n + 1;
      },
      cubicInOut: function (n) {
        return 0.5 > n
          ? 4 * n * n * n
          : (n - 1) * (2 * n - 2) * (2 * n - 2) + 1;
      },
      quartIn: function (n) {
        return n * n * n * n;
      },
      quartOut: function (n) {
        return 1 - --n * n * n * n;
      },
      quartInOut: function (n) {
        return 0.5 > n ? 8 * n * n * n * n : 1 - 8 * --n * n * n * n;
      },
      quintIn: function (n) {
        return n * n * n * n * n;
      },
      quintOut: function (n) {
        return 1 + --n * n * n * n * n;
      },
      quintInOut: function (n) {
        return 0.5 > n ? 16 * n * n * n * n * n : 1 + 16 * --n * n * n * n * n;
      },
    },
    E = {
      deck: function (n) {
        function t(t, e) {
          var o =
            n.cards.filter(function (n) {
              return "front" === n.side;
            }).length / n.cards.length;
          n.cards.forEach(function (n, t) {
            n.setSide(e ? e : o > 0.5 ? "back" : "front");
          }),
            t();
        }
        n.flip = n.queued(t);
      },
    },
    A = {
      deck: function (n) {
        function t(t, e) {
          var o = n.cards;
          o.sort(function (n, t) {
            return e ? n.i - t.i : t.i - n.i;
          }),
            o.forEach(function (n, r) {
              n.sort(
                r,
                o.length,
                function (n) {
                  n === o.length - 1 && t();
                },
                e
              );
            });
        }
        n.sort = n.queued(t);
      },
      card: function (n) {
        var t = n.$el;
        n.sort = function (e, o, r, u) {
          var i = e / 4,
            a = 10 * e;
          n.animateTo({
            delay: a,
            duration: 400,
            x: -i,
            y: -150,
            rot: 0,
            onComplete: function () {
              t.style.zIndex = e;
            },
          }),
            n.animateTo({
              delay: a + 500,
              duration: 400,
              x: -i,
              y: -i,
              rot: 0,
              onComplete: function () {
                r(e);
              },
            });
        };
      },
    },
    O = {
      deck: function (n) {
        function t(t) {
          var e = n.cards;
          (b = l()),
            s(e),
            e.forEach(function (n, o) {
              (n.pos = o),
                n.shuffle(function (n) {
                  n === e.length - 1 && t();
                });
            });
        }
        n.shuffle = n.queued(t);
      },
      card: function (n) {
        var t = n.$el;
        n.shuffle = function (e) {
          var o = n.pos,
            r = o / 4,
            u = 2 * o;
          n.animateTo({
            delay: u,
            duration: 200,
            x: (f(40 * Math.random() + 20) * b) / 16,
            y: -r,
            rot: 0,
          }),
            n.animateTo({
              delay: 200 + u,
              duration: 200,
              x: -r,
              y: -r,
              rot: 0,
              onStart: function () {
                t.style.zIndex = o;
              },
              onComplete: function () {
                e(o);
              },
            });
        };
      },
    },
    T = {
      deck: function (n) {
        function t(t) {
          var e = n.cards,
            o = e.length;
          (k = l()),
            e
              .slice(-5)
              .reverse()
              .forEach(function (n, e) {
                n.poker(e, o, function (e) {
                  n.setSide("front"), 4 === e && t();
                });
              });
        }
        n.poker = n.queued(t);
      },
      card: function (n) {
        var t = n.$el;
        n.poker = function (e, o, r) {
          var u = 250 * e;
          n.animateTo({
            delay: u,
            duration: 250,
            x: Math.round((70 * (e - 2.05) * k) / 16),
            y: Math.round((-110 * k) / 16),
            rot: 0,
            onStart: function () {
              t.style.zIndex = o - 1 + e;
            },
            onComplete: function () {
              r(e);
            },
          });
        };
      },
    },
    $ = {
      deck: function (t) {
        function e(e) {
          var o = t.cards;
          o.forEach(function (t, r) {
            t.setSide("front"),
              t.intro(r, function (r) {
                n(250, 0).start(function () {
                  t.setSide("back");
                }),
                  r === o.length - 1 && e();
              });
          });
        }
        t.intro = t.queued(e);
      },
      card: function (n) {
        var t = e("transform"),
          r = n.$el;
        n.intro = function (e, u) {
          var i = 500 + 10 * e,
            a = e / 4;
          (r.style[t] = o(-a + "px", "-250px")),
            (r.style.opacity = 0),
            (n.x = -a),
            (n.y = -250 - a),
            (n.rot = 0),
            n.animateTo({
              delay: i,
              duration: 1e3,
              x: -a,
              y: -a,
              onStart: function () {
                r.style.zIndex = e;
              },
              onProgress: function (n) {
                r.style.opacity = n;
              },
              onComplete: function () {
                (r.style.opacity = ""), u && u(e);
              },
            });
        };
      },
    },
    z = {
      deck: function (n) {
        function t(t) {
          var e = n.cards,
            o = e.length;
          (w = l()),
            e.forEach(function (n, r) {
              n.fan(r, o, function (n) {
                n === e.length - 1 && t();
              });
            });
        }
        n.fan = n.queued(t);
      },
      card: function (n) {
        var t = n.$el;
        n.fan = function (e, o, r) {
          var u = e / 4,
            i = 10 * e,
            a = (e / (o - 1)) * 260 - 130;
          n.animateTo({ delay: i, duration: 300, x: -u, y: -u, rot: 0 }),
            n.animateTo({
              delay: 300 + i,
              duration: 300,
              x: (55 * Math.cos(p(a - 90)) * w) / 16,
              y: (55 * Math.sin(p(a - 90)) * w) / 16,
              rot: a,
              onStart: function () {
                t.style.zIndex = e;
              },
              onComplete: function () {
                r(e);
              },
            });
        };
      },
    },
    D = {
      deck: function (n) {
        function t(t) {
          var e = n.cards;
          (q = l()),
            e.forEach(function (n) {
              n.bysuit(function (n) {
                n === e.length - 1 && t();
              });
            });
        }
        n.bysuit = n.queued(t);
      },
      card: function (n) {
        var t = n.rank,
          e = n.suit;
        n.bysuit = function (o) {
          var r = n.i,
            u = 10 * r;
          n.animateTo({
            delay: u,
            duration: 400,
            x: -Math.round((8 * (6.75 - t) * q) / 16),
            y: -Math.round((92 * (1.5 - e) * q) / 16),
            rot: 0,
            onComplete: function () {
              o(r);
            },
          });
        };
      },
    };
  return (
    (v.animationFrames = n),
    (v.ease = M),
    (v.modules = {
      bysuit: D,
      fan: z,
      intro: $,
      poker: T,
      shuffle: O,
      sort: A,
      flip: E,
    }),
    (v.Card = i),
    (v.prefix = e),
    (v.translate = o),
    v
  );
})();
