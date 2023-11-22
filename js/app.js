(() => {
  "use strict";
  const e = {};
  let t = (e, t = 500, s = 0) => {
      e.classList.contains("_slide") ||
        (e.classList.add("_slide"),
        (e.style.transitionProperty = "height, margin, padding"),
        (e.style.transitionDuration = t + "ms"),
        (e.style.height = `${e.offsetHeight}px`),
        e.offsetHeight,
        (e.style.overflow = "hidden"),
        (e.style.height = s ? `${s}px` : "0px"),
        (e.style.paddingTop = 0),
        (e.style.paddingBottom = 0),
        (e.style.marginTop = 0),
        (e.style.marginBottom = 0),
        window.setTimeout(() => {
          (e.hidden = !s),
            !s && e.style.removeProperty("height"),
            e.style.removeProperty("padding-top"),
            e.style.removeProperty("padding-bottom"),
            e.style.removeProperty("margin-top"),
            e.style.removeProperty("margin-bottom"),
            !s && e.style.removeProperty("overflow"),
            e.style.removeProperty("transition-duration"),
            e.style.removeProperty("transition-property"),
            e.classList.remove("_slide"),
            document.dispatchEvent(
              new CustomEvent("slideUpDone", { detail: { target: e } }),
            );
        }, t));
    },
    s = (e, t = 500, s = 0) => {
      if (!e.classList.contains("_slide")) {
        e.classList.add("_slide"),
          (e.hidden = !e.hidden && null),
          s && e.style.removeProperty("height");
        let i = e.offsetHeight;
        (e.style.overflow = "hidden"),
          (e.style.height = s ? `${s}px` : "0px"),
          (e.style.paddingTop = 0),
          (e.style.paddingBottom = 0),
          (e.style.marginTop = 0),
          (e.style.marginBottom = 0),
          e.offsetHeight,
          (e.style.transitionProperty = "height, margin, padding"),
          (e.style.transitionDuration = t + "ms"),
          (e.style.height = i + "px"),
          e.style.removeProperty("padding-top"),
          e.style.removeProperty("padding-bottom"),
          e.style.removeProperty("margin-top"),
          e.style.removeProperty("margin-bottom"),
          window.setTimeout(() => {
            e.style.removeProperty("height"),
              e.style.removeProperty("overflow"),
              e.style.removeProperty("transition-duration"),
              e.style.removeProperty("transition-property"),
              e.classList.remove("_slide"),
              document.dispatchEvent(
                new CustomEvent("slideDownDone", { detail: { target: e } }),
              );
          }, t);
      }
    },
    i = !0,
    r = (e = 500) => {
      document.documentElement.classList.contains("lock") ? n(e) : a(e);
    },
    n = (e = 500) => {
      let t = document.querySelector("body");
      if (i) {
        let s = document.querySelectorAll("[data-lp]");
        setTimeout(() => {
          for (let e = 0; e < s.length; e++) {
            s[e].style.paddingRight = "0px";
          }
          (t.style.paddingRight = "0px"),
            document.documentElement.classList.remove("lock");
        }, e),
          (i = !1),
          setTimeout(function () {
            i = !0;
          }, e);
      }
    },
    a = (e = 500) => {
      let t = document.querySelector("body");
      if (i) {
        let s = document.querySelectorAll("[data-lp]");
        for (let e = 0; e < s.length; e++) {
          s[e].style.paddingRight =
            window.innerWidth -
            document.querySelector(".wrapper").offsetWidth +
            "px";
        }
        (t.style.paddingRight =
          window.innerWidth -
          document.querySelector(".wrapper").offsetWidth +
          "px"),
          document.documentElement.classList.add("lock"),
          (i = !1),
          setTimeout(function () {
            i = !0;
          }, e);
      }
    };
  function o(e) {
    setTimeout(() => {
      window.FLS && console.log(e);
    }, 0);
  }
  function l(e, t) {
    const s = Array.from(e).filter(function (e, s, i) {
      if (e.dataset[t]) return e.dataset[t].split(",")[0];
    });
    if (s.length) {
      const e = [];
      s.forEach((s) => {
        const i = {},
          r = s.dataset[t].split(",");
        (i.value = r[0]),
          (i.type = r[1] ? r[1].trim() : "max"),
          (i.item = s),
          e.push(i);
      });
      let i = e.map(function (e) {
        return (
          "(" + e.type + "-width: " + e.value + "px)," + e.value + "," + e.type
        );
      });
      i = (function (e) {
        return e.filter(function (e, t, s) {
          return s.indexOf(e) === t;
        });
      })(i);
      const r = [];
      if (i.length)
        return (
          i.forEach((t) => {
            const s = t.split(","),
              i = s[1],
              n = s[2],
              a = window.matchMedia(s[0]),
              o = e.filter(function (e) {
                if (e.value === i && e.type === n) return !0;
              });
            r.push({ itemsArray: o, matchMedia: a });
          }),
          r
        );
    }
  }
  e.popup = new (class {
    constructor(e) {
      let t = {
        logging: !0,
        init: !0,
        attributeOpenButton: "data-popup",
        attributeCloseButton: "data-close",
        fixElementSelector: "[data-lp]",
        youtubeAttribute: "data-youtube",
        youtubePlaceAttribute: "data-youtube-place",
        setAutoplayYoutube: !0,
        classes: {
          popup: "popup",
          popupContent: "popup__content",
          popupActive: "popup_show",
          bodyActive: "popup-show",
        },
        focusCatch: !0,
        closeEsc: !0,
        bodyLock: !0,
        bodyLockDelay: 500,
        hashSettings: { location: !0, goHash: !0 },
        on: {
          beforeOpen: function () {},
          afterOpen: function () {},
          beforeClose: function () {},
          afterClose: function () {},
        },
      };
      (this.isOpen = !1),
        (this.targetOpen = { selector: !1, element: !1 }),
        (this.previousOpen = { selector: !1, element: !1 }),
        (this.lastClosed = { selector: !1, element: !1 }),
        (this._dataValue = !1),
        (this.hash = !1),
        (this._reopen = !1),
        (this._selectorOpen = !1),
        (this.lastFocusEl = !1),
        (this._focusEl = [
          "a[href]",
          'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
          "button:not([disabled]):not([aria-hidden])",
          "select:not([disabled]):not([aria-hidden])",
          "textarea:not([disabled]):not([aria-hidden])",
          "area[href]",
          "iframe",
          "object",
          "embed",
          "[contenteditable]",
          '[tabindex]:not([tabindex^="-"])',
        ]),
        (this.options = {
          ...t,
          ...e,
          classes: { ...t.classes, ...e?.classes },
          hashSettings: { ...t.hashSettings, ...e?.hashSettings },
          on: { ...t.on, ...e?.on },
        }),
        this.options.init && this.initPopups();
    }
    initPopups() {
      this.popupLogging("Проснулся"), this.eventsPopup();
    }
    eventsPopup() {
      document.addEventListener(
        "click",
        function (e) {
          const t = e.target.closest(`[${this.options.attributeOpenButton}]`);
          if (t)
            return (
              e.preventDefault(),
              (this._dataValue = t.getAttribute(
                this.options.attributeOpenButton,
              )
                ? t.getAttribute(this.options.attributeOpenButton)
                : "error"),
              "error" !== this._dataValue
                ? (this.isOpen || (this.lastFocusEl = t),
                  (this.targetOpen.selector = `${this._dataValue}`),
                  (this._selectorOpen = !0),
                  void this.open())
                : void this.popupLogging(
                    `Ой ой, не заполнен атрибут у ${t.classList}`,
                  )
            );
          return e.target.closest(`[${this.options.attributeCloseButton}]`) ||
            (!e.target.closest(`.${this.options.classes.popupContent}`) &&
              this.isOpen)
            ? (e.preventDefault(), void this.close())
            : void 0;
        }.bind(this),
      ),
        document.addEventListener(
          "keydown",
          function (e) {
            if (
              this.options.closeEsc &&
              27 == e.which &&
              "Escape" === e.code &&
              this.isOpen
            )
              return e.preventDefault(), void this.close();
            this.options.focusCatch &&
              9 == e.which &&
              this.isOpen &&
              this._focusCatch(e);
          }.bind(this),
        ),
        this.options.hashSettings.goHash &&
          (window.addEventListener(
            "hashchange",
            function () {
              window.location.hash
                ? this._openToHash()
                : this.close(this.targetOpen.selector);
            }.bind(this),
          ),
          window.addEventListener(
            "load",
            function () {
              window.location.hash && this._openToHash();
            }.bind(this),
          ));
    }
    open(e) {
      if (
        (e &&
          "string" == typeof e &&
          "" !== e.trim() &&
          ((this.targetOpen.selector = e), (this._selectorOpen = !0)),
        this.isOpen && ((this._reopen = !0), this.close()),
        this._selectorOpen ||
          (this.targetOpen.selector = this.lastClosed.selector),
        this._reopen || (this.previousActiveElement = document.activeElement),
        (this.targetOpen.element = document.querySelector(
          this.targetOpen.selector,
        )),
        this.targetOpen.element)
      ) {
        if (
          this.targetOpen.element.hasAttribute(this.options.youtubeAttribute)
        ) {
          const e = `https://www.youtube.com/embed/${this.targetOpen.element.getAttribute(
              this.options.youtubeAttribute,
            )}?rel=0&showinfo=0&autoplay=1`,
            t = document.createElement("iframe");
          t.setAttribute("allowfullscreen", "");
          const s = this.options.setAutoplayYoutube ? "autoplay;" : "";
          t.setAttribute("allow", `${s}; encrypted-media`),
            t.setAttribute("src", e),
            this.targetOpen.element.querySelector(
              `[${this.options.youtubePlaceAttribute}]`,
            ) &&
              this.targetOpen.element
                .querySelector(`[${this.options.youtubePlaceAttribute}]`)
                .appendChild(t);
        }
        this.options.hashSettings.location &&
          (this._getHash(), this._setHash()),
          this.options.on.beforeOpen(this),
          this.targetOpen.element.classList.add(
            this.options.classes.popupActive,
          ),
          document.body.classList.add(this.options.classes.bodyActive),
          this._reopen ? (this._reopen = !1) : r(),
          this.targetOpen.element.setAttribute("aria-hidden", "false"),
          (this.previousOpen.selector = this.targetOpen.selector),
          (this.previousOpen.element = this.targetOpen.element),
          (this._selectorOpen = !1),
          (this.isOpen = !0),
          setTimeout(() => {
            this._focusTrap();
          }, 50),
          document.dispatchEvent(
            new CustomEvent("afterPopupOpen", { detail: { popup: this } }),
          ),
          this.popupLogging("Открыл попап");
      } else
        this.popupLogging(
          "Ой ой, такого попапа нет. Проверьте корректность ввода. ",
        );
    }
    close(e) {
      e &&
        "string" == typeof e &&
        "" !== e.trim() &&
        (this.previousOpen.selector = e),
        this.isOpen &&
          i &&
          (this.options.on.beforeClose(this),
          this.targetOpen.element.hasAttribute(this.options.youtubeAttribute) &&
            this.targetOpen.element.querySelector(
              `[${this.options.youtubePlaceAttribute}]`,
            ) &&
            (this.targetOpen.element.querySelector(
              `[${this.options.youtubePlaceAttribute}]`,
            ).innerHTML = ""),
          this.previousOpen.element.classList.remove(
            this.options.classes.popupActive,
          ),
          this.previousOpen.element.setAttribute("aria-hidden", "true"),
          this._reopen ||
            (document.body.classList.remove(this.options.classes.bodyActive),
            r(),
            (this.isOpen = !1)),
          this._removeHash(),
          this._selectorOpen &&
            ((this.lastClosed.selector = this.previousOpen.selector),
            (this.lastClosed.element = this.previousOpen.element)),
          this.options.on.afterClose(this),
          setTimeout(() => {
            this._focusTrap();
          }, 50),
          this.popupLogging("Закрыл попап"));
    }
    _getHash() {
      this.options.hashSettings.location &&
        (this.hash = this.targetOpen.selector.includes("#")
          ? this.targetOpen.selector
          : this.targetOpen.selector.replace(".", "#"));
    }
    _openToHash() {
      let e = document.querySelector(
        `.${window.location.hash.replace("#", "")}`,
      )
        ? `.${window.location.hash.replace("#", "")}`
        : document.querySelector(`${window.location.hash}`)
        ? `${window.location.hash}`
        : null;
      document.querySelector(`[${this.options.attributeOpenButton}="${e}"]`) &&
        e &&
        this.open(e);
    }
    _setHash() {
      history.pushState("", "", this.hash);
    }
    _removeHash() {
      history.pushState("", "", window.location.href.split("#")[0]);
    }
    _focusCatch(e) {
      const t = this.targetOpen.element.querySelectorAll(this._focusEl),
        s = Array.prototype.slice.call(t),
        i = s.indexOf(document.activeElement);
      e.shiftKey && 0 === i && (s[s.length - 1].focus(), e.preventDefault()),
        e.shiftKey || i !== s.length - 1 || (s[0].focus(), e.preventDefault());
    }
    _focusTrap() {
      const e = this.previousOpen.element.querySelectorAll(this._focusEl);
      !this.isOpen && this.lastFocusEl
        ? this.lastFocusEl.focus()
        : e[0].focus();
    }
    popupLogging(e) {
      this.options.logging && o(`[Попапос]: ${e}`);
    }
  })({});
  let d = (e, t = !1, s = 500, i = 0) => {
    const r = "string" == typeof e ? document.querySelector(e) : e;
    if (r) {
      let a = "",
        l = 0;
      t &&
        ((a = "header.header"), (l = document.querySelector(a).offsetHeight));
      let d = {
        speedAsDuration: !0,
        speed: s,
        header: a,
        offset: i,
        easing: "easeOutQuad",
      };
      if (
        (document.documentElement.classList.contains("menu-open") &&
          (n(), document.documentElement.classList.remove("menu-open")),
        "undefined" != typeof SmoothScroll)
      )
        new SmoothScroll().animateScroll(r, "", d);
      else {
        let e = r.getBoundingClientRect().top + scrollY;
        window.scrollTo({ top: l ? e - l : e, behavior: "smooth" });
      }
      o(`[gotoBlock]: Юхуу...едем к ${e}`);
    } else o(`[gotoBlock]: Ой ой..Такого блока нет на странице: ${e}`);
  };
  let c = {
    getErrors(e) {
      let t = 0,
        s = e.querySelectorAll("*[data-required]");
      return (
        s.length &&
          s.forEach((e) => {
            (null === e.offsetParent && "SELECT" !== e.tagName) ||
              e.disabled ||
              (t += this.validateInput(e));
          }),
        t
      );
    },
    validateInput(e) {
      let t = 0;
      return (
        "email" === e.dataset.required
          ? ((e.value = e.value.replace(" ", "")),
            this.emailTest(e) ? (this.addError(e), t++) : this.removeError(e))
          : ("checkbox" !== e.type || e.checked) && e.value
          ? this.removeError(e)
          : (this.addError(e), t++),
        t
      );
    },
    addError(e) {
      e.classList.add("_form-error"),
        e.parentElement.classList.add("_form-error");
      let t = e.parentElement.querySelector(".form__error");
      t && e.parentElement.removeChild(t),
        e.dataset.error &&
          e.parentElement.insertAdjacentHTML(
            "beforeend",
            `<div class="form__error">${e.dataset.error}</div>`,
          );
    },
    removeError(e) {
      e.classList.remove("_form-error"),
        e.parentElement.classList.remove("_form-error"),
        e.parentElement.querySelector(".form__error") &&
          e.parentElement.removeChild(
            e.parentElement.querySelector(".form__error"),
          );
    },
    formClean(t) {
      t.reset(),
        setTimeout(() => {
          let s = t.querySelectorAll("input,textarea");
          for (let e = 0; e < s.length; e++) {
            const t = s[e];
            t.parentElement.classList.remove("_form-focus"),
              t.classList.remove("_form-focus"),
              c.removeError(t);
          }
          let i = t.querySelectorAll(".checkbox__input");
          if (i.length > 0)
            for (let e = 0; e < i.length; e++) {
              i[e].checked = !1;
            }
          if (e.select) {
            let s = t.querySelectorAll(".select");
            if (s.length)
              for (let t = 0; t < s.length; t++) {
                const i = s[t].querySelector("select");
                e.select.selectBuild(i);
              }
          }
        }, 0);
    },
    emailTest: (e) =>
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(e.value),
  };
  function p(e) {
    return (
      null !== e &&
      "object" == typeof e &&
      "constructor" in e &&
      e.constructor === Object
    );
  }
  function u(e, t) {
    void 0 === e && (e = {}),
      void 0 === t && (t = {}),
      Object.keys(t).forEach((s) => {
        void 0 === e[s]
          ? (e[s] = t[s])
          : p(t[s]) && p(e[s]) && Object.keys(t[s]).length > 0 && u(e[s], t[s]);
      });
  }
  const h = {
    body: {},
    addEventListener() {},
    removeEventListener() {},
    activeElement: { blur() {}, nodeName: "" },
    querySelector: () => null,
    querySelectorAll: () => [],
    getElementById: () => null,
    createEvent: () => ({ initEvent() {} }),
    createElement: () => ({
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {},
      getElementsByTagName: () => [],
    }),
    createElementNS: () => ({}),
    importNode: () => null,
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
  };
  function m() {
    const e = "undefined" != typeof document ? document : {};
    return u(e, h), e;
  }
  const f = {
    document: h,
    navigator: { userAgent: "" },
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
    history: { replaceState() {}, pushState() {}, go() {}, back() {} },
    CustomEvent: function () {
      return this;
    },
    addEventListener() {},
    removeEventListener() {},
    getComputedStyle: () => ({ getPropertyValue: () => "" }),
    Image() {},
    Date() {},
    screen: {},
    setTimeout() {},
    clearTimeout() {},
    matchMedia: () => ({}),
    requestAnimationFrame: (e) =>
      "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0),
    cancelAnimationFrame(e) {
      "undefined" != typeof setTimeout && clearTimeout(e);
    },
  };
  function g() {
    const e = "undefined" != typeof window ? window : {};
    return u(e, f), e;
  }
  function v(e, t) {
    return void 0 === t && (t = 0), setTimeout(e, t);
  }
  function w() {
    return Date.now();
  }
  function b(e, t) {
    void 0 === t && (t = "x");
    const s = g();
    let i, r, n;
    const a = (function (e) {
      const t = g();
      let s;
      return (
        t.getComputedStyle && (s = t.getComputedStyle(e, null)),
        !s && e.currentStyle && (s = e.currentStyle),
        s || (s = e.style),
        s
      );
    })(e);
    return (
      s.WebKitCSSMatrix
        ? ((r = a.transform || a.webkitTransform),
          r.split(",").length > 6 &&
            (r = r
              .split(", ")
              .map((e) => e.replace(",", "."))
              .join(", ")),
          (n = new s.WebKitCSSMatrix("none" === r ? "" : r)))
        : ((n =
            a.MozTransform ||
            a.OTransform ||
            a.MsTransform ||
            a.msTransform ||
            a.transform ||
            a
              .getPropertyValue("transform")
              .replace("translate(", "matrix(1, 0, 0, 1,")),
          (i = n.toString().split(","))),
      "x" === t &&
        (r = s.WebKitCSSMatrix
          ? n.m41
          : 16 === i.length
          ? parseFloat(i[12])
          : parseFloat(i[4])),
      "y" === t &&
        (r = s.WebKitCSSMatrix
          ? n.m42
          : 16 === i.length
          ? parseFloat(i[13])
          : parseFloat(i[5])),
      r || 0
    );
  }
  function y(e) {
    return (
      "object" == typeof e &&
      null !== e &&
      e.constructor &&
      "Object" === Object.prototype.toString.call(e).slice(8, -1)
    );
  }
  function S() {
    const e = Object(arguments.length <= 0 ? void 0 : arguments[0]),
      t = ["__proto__", "constructor", "prototype"];
    for (let i = 1; i < arguments.length; i += 1) {
      const r = i < 0 || arguments.length <= i ? void 0 : arguments[i];
      if (
        null != r &&
        ((s = r),
        !("undefined" != typeof window && void 0 !== window.HTMLElement
          ? s instanceof HTMLElement
          : s && (1 === s.nodeType || 11 === s.nodeType)))
      ) {
        const s = Object.keys(Object(r)).filter((e) => t.indexOf(e) < 0);
        for (let t = 0, i = s.length; t < i; t += 1) {
          const i = s[t],
            n = Object.getOwnPropertyDescriptor(r, i);
          void 0 !== n &&
            n.enumerable &&
            (y(e[i]) && y(r[i])
              ? r[i].__swiper__
                ? (e[i] = r[i])
                : S(e[i], r[i])
              : !y(e[i]) && y(r[i])
              ? ((e[i] = {}), r[i].__swiper__ ? (e[i] = r[i]) : S(e[i], r[i]))
              : (e[i] = r[i]));
        }
      }
    }
    var s;
    return e;
  }
  function E(e, t, s) {
    e.style.setProperty(t, s);
  }
  function T(e) {
    let { swiper: t, targetPosition: s, side: i } = e;
    const r = g(),
      n = -t.translate;
    let a,
      o = null;
    const l = t.params.speed;
    (t.wrapperEl.style.scrollSnapType = "none"),
      r.cancelAnimationFrame(t.cssModeFrameID);
    const d = s > n ? "next" : "prev",
      c = (e, t) => ("next" === d && e >= t) || ("prev" === d && e <= t),
      p = () => {
        (a = new Date().getTime()), null === o && (o = a);
        const e = Math.max(Math.min((a - o) / l, 1), 0),
          d = 0.5 - Math.cos(e * Math.PI) / 2;
        let u = n + d * (s - n);
        if ((c(u, s) && (u = s), t.wrapperEl.scrollTo({ [i]: u }), c(u, s)))
          return (
            (t.wrapperEl.style.overflow = "hidden"),
            (t.wrapperEl.style.scrollSnapType = ""),
            setTimeout(() => {
              (t.wrapperEl.style.overflow = ""),
                t.wrapperEl.scrollTo({ [i]: u });
            }),
            void r.cancelAnimationFrame(t.cssModeFrameID)
          );
        t.cssModeFrameID = r.requestAnimationFrame(p);
      };
    p();
  }
  function x(e, t) {
    return (
      void 0 === t && (t = ""), [...e.children].filter((e) => e.matches(t))
    );
  }
  function C(e, t) {
    void 0 === t && (t = []);
    const s = document.createElement(e);
    return s.classList.add(...(Array.isArray(t) ? t : [t])), s;
  }
  function L(e, t) {
    return g().getComputedStyle(e, null).getPropertyValue(t);
  }
  function P(e) {
    let t,
      s = e;
    if (s) {
      for (t = 0; null !== (s = s.previousSibling); )
        1 === s.nodeType && (t += 1);
      return t;
    }
  }
  function M(e, t) {
    const s = [];
    let i = e.parentElement;
    for (; i; )
      t ? i.matches(t) && s.push(i) : s.push(i), (i = i.parentElement);
    return s;
  }
  function _(e, t, s) {
    const i = g();
    return s
      ? e["width" === t ? "offsetWidth" : "offsetHeight"] +
          parseFloat(
            i
              .getComputedStyle(e, null)
              .getPropertyValue("width" === t ? "margin-right" : "margin-top"),
          ) +
          parseFloat(
            i
              .getComputedStyle(e, null)
              .getPropertyValue(
                "width" === t ? "margin-left" : "margin-bottom",
              ),
          )
      : e.offsetWidth;
  }
  let A, O, k;
  function I() {
    return (
      A ||
        (A = (function () {
          const e = g(),
            t = m();
          return {
            smoothScroll:
              t.documentElement &&
              t.documentElement.style &&
              "scrollBehavior" in t.documentElement.style,
            touch: !!(
              "ontouchstart" in e ||
              (e.DocumentTouch && t instanceof e.DocumentTouch)
            ),
          };
        })()),
      A
    );
  }
  function z(e) {
    return (
      void 0 === e && (e = {}),
      O ||
        (O = (function (e) {
          let { userAgent: t } = void 0 === e ? {} : e;
          const s = I(),
            i = g(),
            r = i.navigator.platform,
            n = t || i.navigator.userAgent,
            a = { ios: !1, android: !1 },
            o = i.screen.width,
            l = i.screen.height,
            d = n.match(/(Android);?[\s\/]+([\d.]+)?/);
          let c = n.match(/(iPad).*OS\s([\d_]+)/);
          const p = n.match(/(iPod)(.*OS\s([\d_]+))?/),
            u = !c && n.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
            h = "Win32" === r;
          let m = "MacIntel" === r;
          return (
            !c &&
              m &&
              s.touch &&
              [
                "1024x1366",
                "1366x1024",
                "834x1194",
                "1194x834",
                "834x1112",
                "1112x834",
                "768x1024",
                "1024x768",
                "820x1180",
                "1180x820",
                "810x1080",
                "1080x810",
              ].indexOf(`${o}x${l}`) >= 0 &&
              ((c = n.match(/(Version)\/([\d.]+)/)),
              c || (c = [0, 1, "13_0_0"]),
              (m = !1)),
            d && !h && ((a.os = "android"), (a.android = !0)),
            (c || u || p) && ((a.os = "ios"), (a.ios = !0)),
            a
          );
        })(e)),
      O
    );
  }
  function $() {
    return (
      k ||
        (k = (function () {
          const e = g();
          let t = !1;
          function s() {
            const t = e.navigator.userAgent.toLowerCase();
            return (
              t.indexOf("safari") >= 0 &&
              t.indexOf("chrome") < 0 &&
              t.indexOf("android") < 0
            );
          }
          if (s()) {
            const s = String(e.navigator.userAgent);
            if (s.includes("Version/")) {
              const [e, i] = s
                .split("Version/")[1]
                .split(" ")[0]
                .split(".")
                .map((e) => Number(e));
              t = e < 16 || (16 === e && i < 2);
            }
          }
          return {
            isSafari: t || s(),
            needPerspectiveFix: t,
            isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
              e.navigator.userAgent,
            ),
          };
        })()),
      k
    );
  }
  var D = {
    on(e, t, s) {
      const i = this;
      if (!i.eventsListeners || i.destroyed) return i;
      if ("function" != typeof t) return i;
      const r = s ? "unshift" : "push";
      return (
        e.split(" ").forEach((e) => {
          i.eventsListeners[e] || (i.eventsListeners[e] = []),
            i.eventsListeners[e][r](t);
        }),
        i
      );
    },
    once(e, t, s) {
      const i = this;
      if (!i.eventsListeners || i.destroyed) return i;
      if ("function" != typeof t) return i;
      function r() {
        i.off(e, r), r.__emitterProxy && delete r.__emitterProxy;
        for (var s = arguments.length, n = new Array(s), a = 0; a < s; a++)
          n[a] = arguments[a];
        t.apply(i, n);
      }
      return (r.__emitterProxy = t), i.on(e, r, s);
    },
    onAny(e, t) {
      const s = this;
      if (!s.eventsListeners || s.destroyed) return s;
      if ("function" != typeof e) return s;
      const i = t ? "unshift" : "push";
      return (
        s.eventsAnyListeners.indexOf(e) < 0 && s.eventsAnyListeners[i](e), s
      );
    },
    offAny(e) {
      const t = this;
      if (!t.eventsListeners || t.destroyed) return t;
      if (!t.eventsAnyListeners) return t;
      const s = t.eventsAnyListeners.indexOf(e);
      return s >= 0 && t.eventsAnyListeners.splice(s, 1), t;
    },
    off(e, t) {
      const s = this;
      return !s.eventsListeners || s.destroyed
        ? s
        : s.eventsListeners
        ? (e.split(" ").forEach((e) => {
            void 0 === t
              ? (s.eventsListeners[e] = [])
              : s.eventsListeners[e] &&
                s.eventsListeners[e].forEach((i, r) => {
                  (i === t || (i.__emitterProxy && i.__emitterProxy === t)) &&
                    s.eventsListeners[e].splice(r, 1);
                });
          }),
          s)
        : s;
    },
    emit() {
      const e = this;
      if (!e.eventsListeners || e.destroyed) return e;
      if (!e.eventsListeners) return e;
      let t, s, i;
      for (var r = arguments.length, n = new Array(r), a = 0; a < r; a++)
        n[a] = arguments[a];
      "string" == typeof n[0] || Array.isArray(n[0])
        ? ((t = n[0]), (s = n.slice(1, n.length)), (i = e))
        : ((t = n[0].events), (s = n[0].data), (i = n[0].context || e)),
        s.unshift(i);
      return (
        (Array.isArray(t) ? t : t.split(" ")).forEach((t) => {
          e.eventsAnyListeners &&
            e.eventsAnyListeners.length &&
            e.eventsAnyListeners.forEach((e) => {
              e.apply(i, [t, ...s]);
            }),
            e.eventsListeners &&
              e.eventsListeners[t] &&
              e.eventsListeners[t].forEach((e) => {
                e.apply(i, s);
              });
        }),
        e
      );
    },
  };
  const G = (e, t) => {
      if (!e || e.destroyed || !e.params) return;
      const s = t.closest(
        e.isElement ? "swiper-slide" : `.${e.params.slideClass}`,
      );
      if (s) {
        let t = s.querySelector(`.${e.params.lazyPreloaderClass}`);
        !t &&
          e.isElement &&
          (s.shadowRoot
            ? (t = s.shadowRoot.querySelector(
                `.${e.params.lazyPreloaderClass}`,
              ))
            : requestAnimationFrame(() => {
                s.shadowRoot &&
                  ((t = s.shadowRoot.querySelector(
                    `.${e.params.lazyPreloaderClass}`,
                  )),
                  t && t.remove());
              })),
          t && t.remove();
      }
    },
    B = (e, t) => {
      if (!e.slides[t]) return;
      const s = e.slides[t].querySelector('[loading="lazy"]');
      s && s.removeAttribute("loading");
    },
    q = (e) => {
      if (!e || e.destroyed || !e.params) return;
      let t = e.params.lazyPreloadPrevNext;
      const s = e.slides.length;
      if (!s || !t || t < 0) return;
      t = Math.min(t, s);
      const i =
          "auto" === e.params.slidesPerView
            ? e.slidesPerViewDynamic()
            : Math.ceil(e.params.slidesPerView),
        r = e.activeIndex;
      if (e.params.grid && e.params.grid.rows > 1) {
        const s = r,
          n = [s - t];
        return (
          n.push(...Array.from({ length: t }).map((e, t) => s + i + t)),
          void e.slides.forEach((t, s) => {
            n.includes(t.column) && B(e, s);
          })
        );
      }
      const n = r + i - 1;
      if (e.params.rewind || e.params.loop)
        for (let i = r - t; i <= n + t; i += 1) {
          const t = ((i % s) + s) % s;
          (t < r || t > n) && B(e, t);
        }
      else
        for (let i = Math.max(r - t, 0); i <= Math.min(n + t, s - 1); i += 1)
          i !== r && (i > n || i < r) && B(e, i);
    };
  var H = {
    updateSize: function () {
      const e = this;
      let t, s;
      const i = e.el;
      (t =
        void 0 !== e.params.width && null !== e.params.width
          ? e.params.width
          : i.clientWidth),
        (s =
          void 0 !== e.params.height && null !== e.params.height
            ? e.params.height
            : i.clientHeight),
        (0 === t && e.isHorizontal()) ||
          (0 === s && e.isVertical()) ||
          ((t =
            t -
            parseInt(L(i, "padding-left") || 0, 10) -
            parseInt(L(i, "padding-right") || 0, 10)),
          (s =
            s -
            parseInt(L(i, "padding-top") || 0, 10) -
            parseInt(L(i, "padding-bottom") || 0, 10)),
          Number.isNaN(t) && (t = 0),
          Number.isNaN(s) && (s = 0),
          Object.assign(e, {
            width: t,
            height: s,
            size: e.isHorizontal() ? t : s,
          }));
    },
    updateSlides: function () {
      const e = this;
      function t(t) {
        return e.isHorizontal()
          ? t
          : {
              width: "height",
              "margin-top": "margin-left",
              "margin-bottom ": "margin-right",
              "margin-left": "margin-top",
              "margin-right": "margin-bottom",
              "padding-left": "padding-top",
              "padding-right": "padding-bottom",
              marginRight: "marginBottom",
            }[t];
      }
      function s(e, s) {
        return parseFloat(e.getPropertyValue(t(s)) || 0);
      }
      const i = e.params,
        {
          wrapperEl: r,
          slidesEl: n,
          size: a,
          rtlTranslate: o,
          wrongRTL: l,
        } = e,
        d = e.virtual && i.virtual.enabled,
        c = d ? e.virtual.slides.length : e.slides.length,
        p = x(n, `.${e.params.slideClass}, swiper-slide`),
        u = d ? e.virtual.slides.length : p.length;
      let h = [];
      const m = [],
        f = [];
      let g = i.slidesOffsetBefore;
      "function" == typeof g && (g = i.slidesOffsetBefore.call(e));
      let v = i.slidesOffsetAfter;
      "function" == typeof v && (v = i.slidesOffsetAfter.call(e));
      const w = e.snapGrid.length,
        b = e.slidesGrid.length;
      let y = i.spaceBetween,
        S = -g,
        T = 0,
        C = 0;
      if (void 0 === a) return;
      "string" == typeof y && y.indexOf("%") >= 0
        ? (y = (parseFloat(y.replace("%", "")) / 100) * a)
        : "string" == typeof y && (y = parseFloat(y)),
        (e.virtualSize = -y),
        p.forEach((e) => {
          o ? (e.style.marginLeft = "") : (e.style.marginRight = ""),
            (e.style.marginBottom = ""),
            (e.style.marginTop = "");
        }),
        i.centeredSlides &&
          i.cssMode &&
          (E(r, "--swiper-centered-offset-before", ""),
          E(r, "--swiper-centered-offset-after", ""));
      const P = i.grid && i.grid.rows > 1 && e.grid;
      let M;
      P && e.grid.initSlides(u);
      const A =
        "auto" === i.slidesPerView &&
        i.breakpoints &&
        Object.keys(i.breakpoints).filter(
          (e) => void 0 !== i.breakpoints[e].slidesPerView,
        ).length > 0;
      for (let r = 0; r < u; r += 1) {
        let n;
        if (
          ((M = 0),
          p[r] && (n = p[r]),
          P && e.grid.updateSlide(r, n, u, t),
          !p[r] || "none" !== L(n, "display"))
        ) {
          if ("auto" === i.slidesPerView) {
            A && (p[r].style[t("width")] = "");
            const a = getComputedStyle(n),
              o = n.style.transform,
              l = n.style.webkitTransform;
            if (
              (o && (n.style.transform = "none"),
              l && (n.style.webkitTransform = "none"),
              i.roundLengths)
            )
              M = e.isHorizontal() ? _(n, "width", !0) : _(n, "height", !0);
            else {
              const e = s(a, "width"),
                t = s(a, "padding-left"),
                i = s(a, "padding-right"),
                r = s(a, "margin-left"),
                o = s(a, "margin-right"),
                l = a.getPropertyValue("box-sizing");
              if (l && "border-box" === l) M = e + r + o;
              else {
                const { clientWidth: s, offsetWidth: a } = n;
                M = e + t + i + r + o + (a - s);
              }
            }
            o && (n.style.transform = o),
              l && (n.style.webkitTransform = l),
              i.roundLengths && (M = Math.floor(M));
          } else
            (M = (a - (i.slidesPerView - 1) * y) / i.slidesPerView),
              i.roundLengths && (M = Math.floor(M)),
              p[r] && (p[r].style[t("width")] = `${M}px`);
          p[r] && (p[r].swiperSlideSize = M),
            f.push(M),
            i.centeredSlides
              ? ((S = S + M / 2 + T / 2 + y),
                0 === T && 0 !== r && (S = S - a / 2 - y),
                0 === r && (S = S - a / 2 - y),
                Math.abs(S) < 0.001 && (S = 0),
                i.roundLengths && (S = Math.floor(S)),
                C % i.slidesPerGroup == 0 && h.push(S),
                m.push(S))
              : (i.roundLengths && (S = Math.floor(S)),
                (C - Math.min(e.params.slidesPerGroupSkip, C)) %
                  e.params.slidesPerGroup ==
                  0 && h.push(S),
                m.push(S),
                (S = S + M + y)),
            (e.virtualSize += M + y),
            (T = M),
            (C += 1);
        }
      }
      if (
        ((e.virtualSize = Math.max(e.virtualSize, a) + v),
        o &&
          l &&
          ("slide" === i.effect || "coverflow" === i.effect) &&
          (r.style.width = `${e.virtualSize + y}px`),
        i.setWrapperSize && (r.style[t("width")] = `${e.virtualSize + y}px`),
        P && e.grid.updateWrapperSize(M, h, t),
        !i.centeredSlides)
      ) {
        const t = [];
        for (let s = 0; s < h.length; s += 1) {
          let r = h[s];
          i.roundLengths && (r = Math.floor(r)),
            h[s] <= e.virtualSize - a && t.push(r);
        }
        (h = t),
          Math.floor(e.virtualSize - a) - Math.floor(h[h.length - 1]) > 1 &&
            h.push(e.virtualSize - a);
      }
      if (d && i.loop) {
        const t = f[0] + y;
        if (i.slidesPerGroup > 1) {
          const s = Math.ceil(
              (e.virtual.slidesBefore + e.virtual.slidesAfter) /
                i.slidesPerGroup,
            ),
            r = t * i.slidesPerGroup;
          for (let e = 0; e < s; e += 1) h.push(h[h.length - 1] + r);
        }
        for (
          let s = 0;
          s < e.virtual.slidesBefore + e.virtual.slidesAfter;
          s += 1
        )
          1 === i.slidesPerGroup && h.push(h[h.length - 1] + t),
            m.push(m[m.length - 1] + t),
            (e.virtualSize += t);
      }
      if ((0 === h.length && (h = [0]), 0 !== y)) {
        const s = e.isHorizontal() && o ? "marginLeft" : t("marginRight");
        p.filter(
          (e, t) => !(i.cssMode && !i.loop) || t !== p.length - 1,
        ).forEach((e) => {
          e.style[s] = `${y}px`;
        });
      }
      if (i.centeredSlides && i.centeredSlidesBounds) {
        let e = 0;
        f.forEach((t) => {
          e += t + (y || 0);
        }),
          (e -= y);
        const t = e - a;
        h = h.map((e) => (e <= 0 ? -g : e > t ? t + v : e));
      }
      if (i.centerInsufficientSlides) {
        let e = 0;
        if (
          (f.forEach((t) => {
            e += t + (y || 0);
          }),
          (e -= y),
          e < a)
        ) {
          const t = (a - e) / 2;
          h.forEach((e, s) => {
            h[s] = e - t;
          }),
            m.forEach((e, s) => {
              m[s] = e + t;
            });
        }
      }
      if (
        (Object.assign(e, {
          slides: p,
          snapGrid: h,
          slidesGrid: m,
          slidesSizesGrid: f,
        }),
        i.centeredSlides && i.cssMode && !i.centeredSlidesBounds)
      ) {
        E(r, "--swiper-centered-offset-before", -h[0] + "px"),
          E(
            r,
            "--swiper-centered-offset-after",
            e.size / 2 - f[f.length - 1] / 2 + "px",
          );
        const t = -e.snapGrid[0],
          s = -e.slidesGrid[0];
        (e.snapGrid = e.snapGrid.map((e) => e + t)),
          (e.slidesGrid = e.slidesGrid.map((e) => e + s));
      }
      if (
        (u !== c && e.emit("slidesLengthChange"),
        h.length !== w &&
          (e.params.watchOverflow && e.checkOverflow(),
          e.emit("snapGridLengthChange")),
        m.length !== b && e.emit("slidesGridLengthChange"),
        i.watchSlidesProgress && e.updateSlidesOffset(),
        !(d || i.cssMode || ("slide" !== i.effect && "fade" !== i.effect)))
      ) {
        const t = `${i.containerModifierClass}backface-hidden`,
          s = e.el.classList.contains(t);
        u <= i.maxBackfaceHiddenSlides
          ? s || e.el.classList.add(t)
          : s && e.el.classList.remove(t);
      }
    },
    updateAutoHeight: function (e) {
      const t = this,
        s = [],
        i = t.virtual && t.params.virtual.enabled;
      let r,
        n = 0;
      "number" == typeof e
        ? t.setTransition(e)
        : !0 === e && t.setTransition(t.params.speed);
      const a = (e) => (i ? t.slides[t.getSlideIndexByData(e)] : t.slides[e]);
      if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
        if (t.params.centeredSlides)
          (t.visibleSlides || []).forEach((e) => {
            s.push(e);
          });
        else
          for (r = 0; r < Math.ceil(t.params.slidesPerView); r += 1) {
            const e = t.activeIndex + r;
            if (e > t.slides.length && !i) break;
            s.push(a(e));
          }
      else s.push(a(t.activeIndex));
      for (r = 0; r < s.length; r += 1)
        if (void 0 !== s[r]) {
          const e = s[r].offsetHeight;
          n = e > n ? e : n;
        }
      (n || 0 === n) && (t.wrapperEl.style.height = `${n}px`);
    },
    updateSlidesOffset: function () {
      const e = this,
        t = e.slides,
        s = e.isElement
          ? e.isHorizontal()
            ? e.wrapperEl.offsetLeft
            : e.wrapperEl.offsetTop
          : 0;
      for (let i = 0; i < t.length; i += 1)
        t[i].swiperSlideOffset =
          (e.isHorizontal() ? t[i].offsetLeft : t[i].offsetTop) -
          s -
          e.cssOverflowAdjustment();
    },
    updateSlidesProgress: function (e) {
      void 0 === e && (e = (this && this.translate) || 0);
      const t = this,
        s = t.params,
        { slides: i, rtlTranslate: r, snapGrid: n } = t;
      if (0 === i.length) return;
      void 0 === i[0].swiperSlideOffset && t.updateSlidesOffset();
      let a = -e;
      r && (a = e),
        i.forEach((e) => {
          e.classList.remove(s.slideVisibleClass);
        }),
        (t.visibleSlidesIndexes = []),
        (t.visibleSlides = []);
      let o = s.spaceBetween;
      "string" == typeof o && o.indexOf("%") >= 0
        ? (o = (parseFloat(o.replace("%", "")) / 100) * t.size)
        : "string" == typeof o && (o = parseFloat(o));
      for (let e = 0; e < i.length; e += 1) {
        const l = i[e];
        let d = l.swiperSlideOffset;
        s.cssMode && s.centeredSlides && (d -= i[0].swiperSlideOffset);
        const c =
            (a + (s.centeredSlides ? t.minTranslate() : 0) - d) /
            (l.swiperSlideSize + o),
          p =
            (a - n[0] + (s.centeredSlides ? t.minTranslate() : 0) - d) /
            (l.swiperSlideSize + o),
          u = -(a - d),
          h = u + t.slidesSizesGrid[e];
        ((u >= 0 && u < t.size - 1) ||
          (h > 1 && h <= t.size) ||
          (u <= 0 && h >= t.size)) &&
          (t.visibleSlides.push(l),
          t.visibleSlidesIndexes.push(e),
          i[e].classList.add(s.slideVisibleClass)),
          (l.progress = r ? -c : c),
          (l.originalProgress = r ? -p : p);
      }
    },
    updateProgress: function (e) {
      const t = this;
      if (void 0 === e) {
        const s = t.rtlTranslate ? -1 : 1;
        e = (t && t.translate && t.translate * s) || 0;
      }
      const s = t.params,
        i = t.maxTranslate() - t.minTranslate();
      let { progress: r, isBeginning: n, isEnd: a, progressLoop: o } = t;
      const l = n,
        d = a;
      if (0 === i) (r = 0), (n = !0), (a = !0);
      else {
        r = (e - t.minTranslate()) / i;
        const s = Math.abs(e - t.minTranslate()) < 1,
          o = Math.abs(e - t.maxTranslate()) < 1;
        (n = s || r <= 0), (a = o || r >= 1), s && (r = 0), o && (r = 1);
      }
      if (s.loop) {
        const s = t.getSlideIndexByData(0),
          i = t.getSlideIndexByData(t.slides.length - 1),
          r = t.slidesGrid[s],
          n = t.slidesGrid[i],
          a = t.slidesGrid[t.slidesGrid.length - 1],
          l = Math.abs(e);
        (o = l >= r ? (l - r) / a : (l + a - n) / a), o > 1 && (o -= 1);
      }
      Object.assign(t, {
        progress: r,
        progressLoop: o,
        isBeginning: n,
        isEnd: a,
      }),
        (s.watchSlidesProgress || (s.centeredSlides && s.autoHeight)) &&
          t.updateSlidesProgress(e),
        n && !l && t.emit("reachBeginning toEdge"),
        a && !d && t.emit("reachEnd toEdge"),
        ((l && !n) || (d && !a)) && t.emit("fromEdge"),
        t.emit("progress", r);
    },
    updateSlidesClasses: function () {
      const e = this,
        { slides: t, params: s, slidesEl: i, activeIndex: r } = e,
        n = e.virtual && s.virtual.enabled,
        a = (e) => x(i, `.${s.slideClass}${e}, swiper-slide${e}`)[0];
      let o;
      if (
        (t.forEach((e) => {
          e.classList.remove(
            s.slideActiveClass,
            s.slideNextClass,
            s.slidePrevClass,
          );
        }),
        n)
      )
        if (s.loop) {
          let t = r - e.virtual.slidesBefore;
          t < 0 && (t = e.virtual.slides.length + t),
            t >= e.virtual.slides.length && (t -= e.virtual.slides.length),
            (o = a(`[data-swiper-slide-index="${t}"]`));
        } else o = a(`[data-swiper-slide-index="${r}"]`);
      else o = t[r];
      if (o) {
        o.classList.add(s.slideActiveClass);
        let e = (function (e, t) {
          const s = [];
          for (; e.nextElementSibling; ) {
            const i = e.nextElementSibling;
            t ? i.matches(t) && s.push(i) : s.push(i), (e = i);
          }
          return s;
        })(o, `.${s.slideClass}, swiper-slide`)[0];
        s.loop && !e && (e = t[0]), e && e.classList.add(s.slideNextClass);
        let i = (function (e, t) {
          const s = [];
          for (; e.previousElementSibling; ) {
            const i = e.previousElementSibling;
            t ? i.matches(t) && s.push(i) : s.push(i), (e = i);
          }
          return s;
        })(o, `.${s.slideClass}, swiper-slide`)[0];
        s.loop && 0 === !i && (i = t[t.length - 1]),
          i && i.classList.add(s.slidePrevClass);
      }
      e.emitSlidesClasses();
    },
    updateActiveIndex: function (e) {
      const t = this,
        s = t.rtlTranslate ? t.translate : -t.translate,
        {
          snapGrid: i,
          params: r,
          activeIndex: n,
          realIndex: a,
          snapIndex: o,
        } = t;
      let l,
        d = e;
      const c = (e) => {
        let s = e - t.virtual.slidesBefore;
        return (
          s < 0 && (s = t.virtual.slides.length + s),
          s >= t.virtual.slides.length && (s -= t.virtual.slides.length),
          s
        );
      };
      if (
        (void 0 === d &&
          (d = (function (e) {
            const { slidesGrid: t, params: s } = e,
              i = e.rtlTranslate ? e.translate : -e.translate;
            let r;
            for (let e = 0; e < t.length; e += 1)
              void 0 !== t[e + 1]
                ? i >= t[e] && i < t[e + 1] - (t[e + 1] - t[e]) / 2
                  ? (r = e)
                  : i >= t[e] && i < t[e + 1] && (r = e + 1)
                : i >= t[e] && (r = e);
            return (
              s.normalizeSlideIndex && (r < 0 || void 0 === r) && (r = 0), r
            );
          })(t)),
        i.indexOf(s) >= 0)
      )
        l = i.indexOf(s);
      else {
        const e = Math.min(r.slidesPerGroupSkip, d);
        l = e + Math.floor((d - e) / r.slidesPerGroup);
      }
      if ((l >= i.length && (l = i.length - 1), d === n))
        return (
          l !== o && ((t.snapIndex = l), t.emit("snapIndexChange")),
          void (
            t.params.loop &&
            t.virtual &&
            t.params.virtual.enabled &&
            (t.realIndex = c(d))
          )
        );
      let p;
      (p =
        t.virtual && r.virtual.enabled && r.loop
          ? c(d)
          : t.slides[d]
          ? parseInt(
              t.slides[d].getAttribute("data-swiper-slide-index") || d,
              10,
            )
          : d),
        Object.assign(t, {
          previousSnapIndex: o,
          snapIndex: l,
          previousRealIndex: a,
          realIndex: p,
          previousIndex: n,
          activeIndex: d,
        }),
        t.initialized && q(t),
        t.emit("activeIndexChange"),
        t.emit("snapIndexChange"),
        (t.initialized || t.params.runCallbacksOnInit) &&
          (a !== p && t.emit("realIndexChange"), t.emit("slideChange"));
    },
    updateClickedSlide: function (e, t) {
      const s = this,
        i = s.params;
      let r = e.closest(`.${i.slideClass}, swiper-slide`);
      !r &&
        s.isElement &&
        t &&
        t.length > 1 &&
        t.includes(e) &&
        [...t.slice(t.indexOf(e) + 1, t.length)].forEach((e) => {
          !r &&
            e.matches &&
            e.matches(`.${i.slideClass}, swiper-slide`) &&
            (r = e);
        });
      let n,
        a = !1;
      if (r)
        for (let e = 0; e < s.slides.length; e += 1)
          if (s.slides[e] === r) {
            (a = !0), (n = e);
            break;
          }
      if (!r || !a)
        return (s.clickedSlide = void 0), void (s.clickedIndex = void 0);
      (s.clickedSlide = r),
        s.virtual && s.params.virtual.enabled
          ? (s.clickedIndex = parseInt(
              r.getAttribute("data-swiper-slide-index"),
              10,
            ))
          : (s.clickedIndex = n),
        i.slideToClickedSlide &&
          void 0 !== s.clickedIndex &&
          s.clickedIndex !== s.activeIndex &&
          s.slideToClickedSlide();
    },
  };
  var V = {
    getTranslate: function (e) {
      void 0 === e && (e = this.isHorizontal() ? "x" : "y");
      const { params: t, rtlTranslate: s, translate: i, wrapperEl: r } = this;
      if (t.virtualTranslate) return s ? -i : i;
      if (t.cssMode) return i;
      let n = b(r, e);
      return (n += this.cssOverflowAdjustment()), s && (n = -n), n || 0;
    },
    setTranslate: function (e, t) {
      const s = this,
        { rtlTranslate: i, params: r, wrapperEl: n, progress: a } = s;
      let o,
        l = 0,
        d = 0;
      s.isHorizontal() ? (l = i ? -e : e) : (d = e),
        r.roundLengths && ((l = Math.floor(l)), (d = Math.floor(d))),
        (s.previousTranslate = s.translate),
        (s.translate = s.isHorizontal() ? l : d),
        r.cssMode
          ? (n[s.isHorizontal() ? "scrollLeft" : "scrollTop"] = s.isHorizontal()
              ? -l
              : -d)
          : r.virtualTranslate ||
            (s.isHorizontal()
              ? (l -= s.cssOverflowAdjustment())
              : (d -= s.cssOverflowAdjustment()),
            (n.style.transform = `translate3d(${l}px, ${d}px, 0px)`));
      const c = s.maxTranslate() - s.minTranslate();
      (o = 0 === c ? 0 : (e - s.minTranslate()) / c),
        o !== a && s.updateProgress(e),
        s.emit("setTranslate", s.translate, t);
    },
    minTranslate: function () {
      return -this.snapGrid[0];
    },
    maxTranslate: function () {
      return -this.snapGrid[this.snapGrid.length - 1];
    },
    translateTo: function (e, t, s, i, r) {
      void 0 === e && (e = 0),
        void 0 === t && (t = this.params.speed),
        void 0 === s && (s = !0),
        void 0 === i && (i = !0);
      const n = this,
        { params: a, wrapperEl: o } = n;
      if (n.animating && a.preventInteractionOnTransition) return !1;
      const l = n.minTranslate(),
        d = n.maxTranslate();
      let c;
      if (
        ((c = i && e > l ? l : i && e < d ? d : e),
        n.updateProgress(c),
        a.cssMode)
      ) {
        const e = n.isHorizontal();
        if (0 === t) o[e ? "scrollLeft" : "scrollTop"] = -c;
        else {
          if (!n.support.smoothScroll)
            return (
              T({ swiper: n, targetPosition: -c, side: e ? "left" : "top" }), !0
            );
          o.scrollTo({ [e ? "left" : "top"]: -c, behavior: "smooth" });
        }
        return !0;
      }
      return (
        0 === t
          ? (n.setTransition(0),
            n.setTranslate(c),
            s &&
              (n.emit("beforeTransitionStart", t, r), n.emit("transitionEnd")))
          : (n.setTransition(t),
            n.setTranslate(c),
            s &&
              (n.emit("beforeTransitionStart", t, r),
              n.emit("transitionStart")),
            n.animating ||
              ((n.animating = !0),
              n.onTranslateToWrapperTransitionEnd ||
                (n.onTranslateToWrapperTransitionEnd = function (e) {
                  n &&
                    !n.destroyed &&
                    e.target === this &&
                    (n.wrapperEl.removeEventListener(
                      "transitionend",
                      n.onTranslateToWrapperTransitionEnd,
                    ),
                    (n.onTranslateToWrapperTransitionEnd = null),
                    delete n.onTranslateToWrapperTransitionEnd,
                    s && n.emit("transitionEnd"));
                }),
              n.wrapperEl.addEventListener(
                "transitionend",
                n.onTranslateToWrapperTransitionEnd,
              ))),
        !0
      );
    },
  };
  function F(e) {
    let { swiper: t, runCallbacks: s, direction: i, step: r } = e;
    const { activeIndex: n, previousIndex: a } = t;
    let o = i;
    if (
      (o || (o = n > a ? "next" : n < a ? "prev" : "reset"),
      t.emit(`transition${r}`),
      s && n !== a)
    ) {
      if ("reset" === o) return void t.emit(`slideResetTransition${r}`);
      t.emit(`slideChangeTransition${r}`),
        "next" === o
          ? t.emit(`slideNextTransition${r}`)
          : t.emit(`slidePrevTransition${r}`);
    }
  }
  var N = {
    slideTo: function (e, t, s, i, r) {
      void 0 === e && (e = 0),
        void 0 === t && (t = this.params.speed),
        void 0 === s && (s = !0),
        "string" == typeof e && (e = parseInt(e, 10));
      const n = this;
      let a = e;
      a < 0 && (a = 0);
      const {
        params: o,
        snapGrid: l,
        slidesGrid: d,
        previousIndex: c,
        activeIndex: p,
        rtlTranslate: u,
        wrapperEl: h,
        enabled: m,
      } = n;
      if ((n.animating && o.preventInteractionOnTransition) || (!m && !i && !r))
        return !1;
      const f = Math.min(n.params.slidesPerGroupSkip, a);
      let g = f + Math.floor((a - f) / n.params.slidesPerGroup);
      g >= l.length && (g = l.length - 1);
      const v = -l[g];
      if (o.normalizeSlideIndex)
        for (let e = 0; e < d.length; e += 1) {
          const t = -Math.floor(100 * v),
            s = Math.floor(100 * d[e]),
            i = Math.floor(100 * d[e + 1]);
          void 0 !== d[e + 1]
            ? t >= s && t < i - (i - s) / 2
              ? (a = e)
              : t >= s && t < i && (a = e + 1)
            : t >= s && (a = e);
        }
      if (n.initialized && a !== p) {
        if (
          !n.allowSlideNext &&
          (u
            ? v > n.translate && v > n.minTranslate()
            : v < n.translate && v < n.minTranslate())
        )
          return !1;
        if (
          !n.allowSlidePrev &&
          v > n.translate &&
          v > n.maxTranslate() &&
          (p || 0) !== a
        )
          return !1;
      }
      let w;
      if (
        (a !== (c || 0) && s && n.emit("beforeSlideChangeStart"),
        n.updateProgress(v),
        (w = a > p ? "next" : a < p ? "prev" : "reset"),
        (u && -v === n.translate) || (!u && v === n.translate))
      )
        return (
          n.updateActiveIndex(a),
          o.autoHeight && n.updateAutoHeight(),
          n.updateSlidesClasses(),
          "slide" !== o.effect && n.setTranslate(v),
          "reset" !== w && (n.transitionStart(s, w), n.transitionEnd(s, w)),
          !1
        );
      if (o.cssMode) {
        const e = n.isHorizontal(),
          s = u ? v : -v;
        if (0 === t) {
          const t = n.virtual && n.params.virtual.enabled;
          t &&
            ((n.wrapperEl.style.scrollSnapType = "none"),
            (n._immediateVirtual = !0)),
            t && !n._cssModeVirtualInitialSet && n.params.initialSlide > 0
              ? ((n._cssModeVirtualInitialSet = !0),
                requestAnimationFrame(() => {
                  h[e ? "scrollLeft" : "scrollTop"] = s;
                }))
              : (h[e ? "scrollLeft" : "scrollTop"] = s),
            t &&
              requestAnimationFrame(() => {
                (n.wrapperEl.style.scrollSnapType = ""),
                  (n._immediateVirtual = !1);
              });
        } else {
          if (!n.support.smoothScroll)
            return (
              T({ swiper: n, targetPosition: s, side: e ? "left" : "top" }), !0
            );
          h.scrollTo({ [e ? "left" : "top"]: s, behavior: "smooth" });
        }
        return !0;
      }
      return (
        n.setTransition(t),
        n.setTranslate(v),
        n.updateActiveIndex(a),
        n.updateSlidesClasses(),
        n.emit("beforeTransitionStart", t, i),
        n.transitionStart(s, w),
        0 === t
          ? n.transitionEnd(s, w)
          : n.animating ||
            ((n.animating = !0),
            n.onSlideToWrapperTransitionEnd ||
              (n.onSlideToWrapperTransitionEnd = function (e) {
                n &&
                  !n.destroyed &&
                  e.target === this &&
                  (n.wrapperEl.removeEventListener(
                    "transitionend",
                    n.onSlideToWrapperTransitionEnd,
                  ),
                  (n.onSlideToWrapperTransitionEnd = null),
                  delete n.onSlideToWrapperTransitionEnd,
                  n.transitionEnd(s, w));
              }),
            n.wrapperEl.addEventListener(
              "transitionend",
              n.onSlideToWrapperTransitionEnd,
            )),
        !0
      );
    },
    slideToLoop: function (e, t, s, i) {
      if (
        (void 0 === e && (e = 0),
        void 0 === t && (t = this.params.speed),
        void 0 === s && (s = !0),
        "string" == typeof e)
      ) {
        e = parseInt(e, 10);
      }
      const r = this;
      let n = e;
      return (
        r.params.loop &&
          (r.virtual && r.params.virtual.enabled
            ? (n += r.virtual.slidesBefore)
            : (n = r.getSlideIndexByData(n))),
        r.slideTo(n, t, s, i)
      );
    },
    slideNext: function (e, t, s) {
      void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
      const i = this,
        { enabled: r, params: n, animating: a } = i;
      if (!r) return i;
      let o = n.slidesPerGroup;
      "auto" === n.slidesPerView &&
        1 === n.slidesPerGroup &&
        n.slidesPerGroupAuto &&
        (o = Math.max(i.slidesPerViewDynamic("current", !0), 1));
      const l = i.activeIndex < n.slidesPerGroupSkip ? 1 : o,
        d = i.virtual && n.virtual.enabled;
      if (n.loop) {
        if (a && !d && n.loopPreventsSliding) return !1;
        if (
          (i.loopFix({ direction: "next" }),
          (i._clientLeft = i.wrapperEl.clientLeft),
          i.activeIndex === i.slides.length - 1 && n.cssMode)
        )
          return (
            requestAnimationFrame(() => {
              i.slideTo(i.activeIndex + l, e, t, s);
            }),
            !0
          );
      }
      return n.rewind && i.isEnd
        ? i.slideTo(0, e, t, s)
        : i.slideTo(i.activeIndex + l, e, t, s);
    },
    slidePrev: function (e, t, s) {
      void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
      const i = this,
        {
          params: r,
          snapGrid: n,
          slidesGrid: a,
          rtlTranslate: o,
          enabled: l,
          animating: d,
        } = i;
      if (!l) return i;
      const c = i.virtual && r.virtual.enabled;
      if (r.loop) {
        if (d && !c && r.loopPreventsSliding) return !1;
        i.loopFix({ direction: "prev" }),
          (i._clientLeft = i.wrapperEl.clientLeft);
      }
      function p(e) {
        return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
      }
      const u = p(o ? i.translate : -i.translate),
        h = n.map((e) => p(e));
      let m = n[h.indexOf(u) - 1];
      if (void 0 === m && r.cssMode) {
        let e;
        n.forEach((t, s) => {
          u >= t && (e = s);
        }),
          void 0 !== e && (m = n[e > 0 ? e - 1 : e]);
      }
      let f = 0;
      if (
        (void 0 !== m &&
          ((f = a.indexOf(m)),
          f < 0 && (f = i.activeIndex - 1),
          "auto" === r.slidesPerView &&
            1 === r.slidesPerGroup &&
            r.slidesPerGroupAuto &&
            ((f = f - i.slidesPerViewDynamic("previous", !0) + 1),
            (f = Math.max(f, 0)))),
        r.rewind && i.isBeginning)
      ) {
        const r =
          i.params.virtual && i.params.virtual.enabled && i.virtual
            ? i.virtual.slides.length - 1
            : i.slides.length - 1;
        return i.slideTo(r, e, t, s);
      }
      return r.loop && 0 === i.activeIndex && r.cssMode
        ? (requestAnimationFrame(() => {
            i.slideTo(f, e, t, s);
          }),
          !0)
        : i.slideTo(f, e, t, s);
    },
    slideReset: function (e, t, s) {
      return (
        void 0 === e && (e = this.params.speed),
        void 0 === t && (t = !0),
        this.slideTo(this.activeIndex, e, t, s)
      );
    },
    slideToClosest: function (e, t, s, i) {
      void 0 === e && (e = this.params.speed),
        void 0 === t && (t = !0),
        void 0 === i && (i = 0.5);
      const r = this;
      let n = r.activeIndex;
      const a = Math.min(r.params.slidesPerGroupSkip, n),
        o = a + Math.floor((n - a) / r.params.slidesPerGroup),
        l = r.rtlTranslate ? r.translate : -r.translate;
      if (l >= r.snapGrid[o]) {
        const e = r.snapGrid[o];
        l - e > (r.snapGrid[o + 1] - e) * i && (n += r.params.slidesPerGroup);
      } else {
        const e = r.snapGrid[o - 1];
        l - e <= (r.snapGrid[o] - e) * i && (n -= r.params.slidesPerGroup);
      }
      return (
        (n = Math.max(n, 0)),
        (n = Math.min(n, r.slidesGrid.length - 1)),
        r.slideTo(n, e, t, s)
      );
    },
    slideToClickedSlide: function () {
      const e = this,
        { params: t, slidesEl: s } = e,
        i =
          "auto" === t.slidesPerView
            ? e.slidesPerViewDynamic()
            : t.slidesPerView;
      let r,
        n = e.clickedIndex;
      const a = e.isElement ? "swiper-slide" : `.${t.slideClass}`;
      if (t.loop) {
        if (e.animating) return;
        (r = parseInt(
          e.clickedSlide.getAttribute("data-swiper-slide-index"),
          10,
        )),
          t.centeredSlides
            ? n < e.loopedSlides - i / 2 ||
              n > e.slides.length - e.loopedSlides + i / 2
              ? (e.loopFix(),
                (n = e.getSlideIndex(
                  x(s, `${a}[data-swiper-slide-index="${r}"]`)[0],
                )),
                v(() => {
                  e.slideTo(n);
                }))
              : e.slideTo(n)
            : n > e.slides.length - i
            ? (e.loopFix(),
              (n = e.getSlideIndex(
                x(s, `${a}[data-swiper-slide-index="${r}"]`)[0],
              )),
              v(() => {
                e.slideTo(n);
              }))
            : e.slideTo(n);
      } else e.slideTo(n);
    },
  };
  var j = {
    loopCreate: function (e) {
      const t = this,
        { params: s, slidesEl: i } = t;
      if (!s.loop || (t.virtual && t.params.virtual.enabled)) return;
      x(i, `.${s.slideClass}, swiper-slide`).forEach((e, t) => {
        e.setAttribute("data-swiper-slide-index", t);
      }),
        t.loopFix({
          slideRealIndex: e,
          direction: s.centeredSlides ? void 0 : "next",
        });
    },
    loopFix: function (e) {
      let {
        slideRealIndex: t,
        slideTo: s = !0,
        direction: i,
        setTranslate: r,
        activeSlideIndex: n,
        byController: a,
        byMousewheel: o,
      } = void 0 === e ? {} : e;
      const l = this;
      if (!l.params.loop) return;
      l.emit("beforeLoopFix");
      const {
        slides: d,
        allowSlidePrev: c,
        allowSlideNext: p,
        slidesEl: u,
        params: h,
      } = l;
      if (
        ((l.allowSlidePrev = !0),
        (l.allowSlideNext = !0),
        l.virtual && h.virtual.enabled)
      )
        return (
          s &&
            (h.centeredSlides || 0 !== l.snapIndex
              ? h.centeredSlides && l.snapIndex < h.slidesPerView
                ? l.slideTo(l.virtual.slides.length + l.snapIndex, 0, !1, !0)
                : l.snapIndex === l.snapGrid.length - 1 &&
                  l.slideTo(l.virtual.slidesBefore, 0, !1, !0)
              : l.slideTo(l.virtual.slides.length, 0, !1, !0)),
          (l.allowSlidePrev = c),
          (l.allowSlideNext = p),
          void l.emit("loopFix")
        );
      const m =
        "auto" === h.slidesPerView
          ? l.slidesPerViewDynamic()
          : Math.ceil(parseFloat(h.slidesPerView, 10));
      let f = h.loopedSlides || m;
      f % h.slidesPerGroup != 0 &&
        (f += h.slidesPerGroup - (f % h.slidesPerGroup)),
        (l.loopedSlides = f);
      const g = [],
        v = [];
      let w = l.activeIndex;
      void 0 === n
        ? (n = l.getSlideIndex(
            l.slides.filter((e) => e.classList.contains(h.slideActiveClass))[0],
          ))
        : (w = n);
      const b = "next" === i || !i,
        y = "prev" === i || !i;
      let S = 0,
        E = 0;
      if (n < f) {
        S = Math.max(f - n, h.slidesPerGroup);
        for (let e = 0; e < f - n; e += 1) {
          const t = e - Math.floor(e / d.length) * d.length;
          g.push(d.length - t - 1);
        }
      } else if (n > l.slides.length - 2 * f) {
        E = Math.max(n - (l.slides.length - 2 * f), h.slidesPerGroup);
        for (let e = 0; e < E; e += 1) {
          const t = e - Math.floor(e / d.length) * d.length;
          v.push(t);
        }
      }
      if (
        (y &&
          g.forEach((e) => {
            (l.slides[e].swiperLoopMoveDOM = !0),
              u.prepend(l.slides[e]),
              (l.slides[e].swiperLoopMoveDOM = !1);
          }),
        b &&
          v.forEach((e) => {
            (l.slides[e].swiperLoopMoveDOM = !0),
              u.append(l.slides[e]),
              (l.slides[e].swiperLoopMoveDOM = !1);
          }),
        l.recalcSlides(),
        "auto" === h.slidesPerView && l.updateSlides(),
        h.watchSlidesProgress && l.updateSlidesOffset(),
        s)
      )
        if (g.length > 0 && y)
          if (void 0 === t) {
            const e = l.slidesGrid[w],
              t = l.slidesGrid[w + S] - e;
            o
              ? l.setTranslate(l.translate - t)
              : (l.slideTo(w + S, 0, !1, !0),
                r &&
                  ((l.touches[l.isHorizontal() ? "startX" : "startY"] += t),
                  (l.touchEventsData.currentTranslate = l.translate)));
          } else
            r &&
              (l.slideToLoop(t, 0, !1, !0),
              (l.touchEventsData.currentTranslate = l.translate));
        else if (v.length > 0 && b)
          if (void 0 === t) {
            const e = l.slidesGrid[w],
              t = l.slidesGrid[w - E] - e;
            o
              ? l.setTranslate(l.translate - t)
              : (l.slideTo(w - E, 0, !1, !0),
                r &&
                  ((l.touches[l.isHorizontal() ? "startX" : "startY"] += t),
                  (l.touchEventsData.currentTranslate = l.translate)));
          } else l.slideToLoop(t, 0, !1, !0);
      if (
        ((l.allowSlidePrev = c),
        (l.allowSlideNext = p),
        l.controller && l.controller.control && !a)
      ) {
        const e = {
          slideRealIndex: t,
          direction: i,
          setTranslate: r,
          activeSlideIndex: n,
          byController: !0,
        };
        Array.isArray(l.controller.control)
          ? l.controller.control.forEach((t) => {
              !t.destroyed &&
                t.params.loop &&
                t.loopFix({
                  ...e,
                  slideTo: t.params.slidesPerView === h.slidesPerView && s,
                });
            })
          : l.controller.control instanceof l.constructor &&
            l.controller.control.params.loop &&
            l.controller.control.loopFix({
              ...e,
              slideTo:
                l.controller.control.params.slidesPerView === h.slidesPerView &&
                s,
            });
      }
      l.emit("loopFix");
    },
    loopDestroy: function () {
      const e = this,
        { params: t, slidesEl: s } = e;
      if (!t.loop || (e.virtual && e.params.virtual.enabled)) return;
      e.recalcSlides();
      const i = [];
      e.slides.forEach((e) => {
        const t =
          void 0 === e.swiperSlideIndex
            ? 1 * e.getAttribute("data-swiper-slide-index")
            : e.swiperSlideIndex;
        i[t] = e;
      }),
        e.slides.forEach((e) => {
          e.removeAttribute("data-swiper-slide-index");
        }),
        i.forEach((e) => {
          s.append(e);
        }),
        e.recalcSlides(),
        e.slideTo(e.realIndex, 0);
    },
  };
  function R(e) {
    const t = this,
      s = m(),
      i = g(),
      r = t.touchEventsData;
    r.evCache.push(e);
    const { params: n, touches: a, enabled: o } = t;
    if (!o) return;
    if (!n.simulateTouch && "mouse" === e.pointerType) return;
    if (t.animating && n.preventInteractionOnTransition) return;
    !t.animating && n.cssMode && n.loop && t.loopFix();
    let l = e;
    l.originalEvent && (l = l.originalEvent);
    let d = l.target;
    if ("wrapper" === n.touchEventsTarget && !t.wrapperEl.contains(d)) return;
    if ("which" in l && 3 === l.which) return;
    if ("button" in l && l.button > 0) return;
    if (r.isTouched && r.isMoved) return;
    const c = !!n.noSwipingClass && "" !== n.noSwipingClass,
      p = e.composedPath ? e.composedPath() : e.path;
    c && l.target && l.target.shadowRoot && p && (d = p[0]);
    const u = n.noSwipingSelector
        ? n.noSwipingSelector
        : `.${n.noSwipingClass}`,
      h = !(!l.target || !l.target.shadowRoot);
    if (
      n.noSwiping &&
      (h
        ? (function (e, t) {
            return (
              void 0 === t && (t = this),
              (function t(s) {
                if (!s || s === m() || s === g()) return null;
                s.assignedSlot && (s = s.assignedSlot);
                const i = s.closest(e);
                return i || s.getRootNode ? i || t(s.getRootNode().host) : null;
              })(t)
            );
          })(u, d)
        : d.closest(u))
    )
      return void (t.allowClick = !0);
    if (n.swipeHandler && !d.closest(n.swipeHandler)) return;
    (a.currentX = l.pageX), (a.currentY = l.pageY);
    const f = a.currentX,
      v = a.currentY,
      b = n.edgeSwipeDetection || n.iOSEdgeSwipeDetection,
      y = n.edgeSwipeThreshold || n.iOSEdgeSwipeThreshold;
    if (b && (f <= y || f >= i.innerWidth - y)) {
      if ("prevent" !== b) return;
      e.preventDefault();
    }
    Object.assign(r, {
      isTouched: !0,
      isMoved: !1,
      allowTouchCallbacks: !0,
      isScrolling: void 0,
      startMoving: void 0,
    }),
      (a.startX = f),
      (a.startY = v),
      (r.touchStartTime = w()),
      (t.allowClick = !0),
      t.updateSize(),
      (t.swipeDirection = void 0),
      n.threshold > 0 && (r.allowThresholdMove = !1);
    let S = !0;
    d.matches(r.focusableElements) &&
      ((S = !1), "SELECT" === d.nodeName && (r.isTouched = !1)),
      s.activeElement &&
        s.activeElement.matches(r.focusableElements) &&
        s.activeElement !== d &&
        s.activeElement.blur();
    const E = S && t.allowTouchMove && n.touchStartPreventDefault;
    (!n.touchStartForcePreventDefault && !E) ||
      d.isContentEditable ||
      l.preventDefault(),
      n.freeMode &&
        n.freeMode.enabled &&
        t.freeMode &&
        t.animating &&
        !n.cssMode &&
        t.freeMode.onTouchStart(),
      t.emit("touchStart", l);
  }
  function W(e) {
    const t = m(),
      s = this,
      i = s.touchEventsData,
      { params: r, touches: n, rtlTranslate: a, enabled: o } = s;
    if (!o) return;
    if (!r.simulateTouch && "mouse" === e.pointerType) return;
    let l = e;
    if ((l.originalEvent && (l = l.originalEvent), !i.isTouched))
      return void (
        i.startMoving &&
        i.isScrolling &&
        s.emit("touchMoveOpposite", l)
      );
    const d = i.evCache.findIndex((e) => e.pointerId === l.pointerId);
    d >= 0 && (i.evCache[d] = l);
    const c = i.evCache.length > 1 ? i.evCache[0] : l,
      p = c.pageX,
      u = c.pageY;
    if (l.preventedByNestedSwiper) return (n.startX = p), void (n.startY = u);
    if (!s.allowTouchMove)
      return (
        l.target.matches(i.focusableElements) || (s.allowClick = !1),
        void (
          i.isTouched &&
          (Object.assign(n, {
            startX: p,
            startY: u,
            prevX: s.touches.currentX,
            prevY: s.touches.currentY,
            currentX: p,
            currentY: u,
          }),
          (i.touchStartTime = w()))
        )
      );
    if (r.touchReleaseOnEdges && !r.loop)
      if (s.isVertical()) {
        if (
          (u < n.startY && s.translate <= s.maxTranslate()) ||
          (u > n.startY && s.translate >= s.minTranslate())
        )
          return (i.isTouched = !1), void (i.isMoved = !1);
      } else if (
        (p < n.startX && s.translate <= s.maxTranslate()) ||
        (p > n.startX && s.translate >= s.minTranslate())
      )
        return;
    if (
      t.activeElement &&
      l.target === t.activeElement &&
      l.target.matches(i.focusableElements)
    )
      return (i.isMoved = !0), void (s.allowClick = !1);
    if (
      (i.allowTouchCallbacks && s.emit("touchMove", l),
      l.targetTouches && l.targetTouches.length > 1)
    )
      return;
    (n.currentX = p), (n.currentY = u);
    const h = n.currentX - n.startX,
      f = n.currentY - n.startY;
    if (s.params.threshold && Math.sqrt(h ** 2 + f ** 2) < s.params.threshold)
      return;
    if (void 0 === i.isScrolling) {
      let e;
      (s.isHorizontal() && n.currentY === n.startY) ||
      (s.isVertical() && n.currentX === n.startX)
        ? (i.isScrolling = !1)
        : h * h + f * f >= 25 &&
          ((e = (180 * Math.atan2(Math.abs(f), Math.abs(h))) / Math.PI),
          (i.isScrolling = s.isHorizontal()
            ? e > r.touchAngle
            : 90 - e > r.touchAngle));
    }
    if (
      (i.isScrolling && s.emit("touchMoveOpposite", l),
      void 0 === i.startMoving &&
        ((n.currentX === n.startX && n.currentY === n.startY) ||
          (i.startMoving = !0)),
      i.isScrolling ||
        (s.zoom &&
          s.params.zoom &&
          s.params.zoom.enabled &&
          i.evCache.length > 1))
    )
      return void (i.isTouched = !1);
    if (!i.startMoving) return;
    (s.allowClick = !1),
      !r.cssMode && l.cancelable && l.preventDefault(),
      r.touchMoveStopPropagation && !r.nested && l.stopPropagation();
    let g = s.isHorizontal() ? h : f,
      v = s.isHorizontal()
        ? n.currentX - n.previousX
        : n.currentY - n.previousY;
    r.oneWayMovement &&
      ((g = Math.abs(g) * (a ? 1 : -1)), (v = Math.abs(v) * (a ? 1 : -1))),
      (n.diff = g),
      (g *= r.touchRatio),
      a && ((g = -g), (v = -v));
    const b = s.touchesDirection;
    (s.swipeDirection = g > 0 ? "prev" : "next"),
      (s.touchesDirection = v > 0 ? "prev" : "next");
    const y = s.params.loop && !r.cssMode,
      S =
        ("next" === s.swipeDirection && s.allowSlideNext) ||
        ("prev" === s.swipeDirection && s.allowSlidePrev);
    if (!i.isMoved) {
      if (
        (y && S && s.loopFix({ direction: s.swipeDirection }),
        (i.startTranslate = s.getTranslate()),
        s.setTransition(0),
        s.animating)
      ) {
        const e = new window.CustomEvent("transitionend", {
          bubbles: !0,
          cancelable: !0,
        });
        s.wrapperEl.dispatchEvent(e);
      }
      (i.allowMomentumBounce = !1),
        !r.grabCursor ||
          (!0 !== s.allowSlideNext && !0 !== s.allowSlidePrev) ||
          s.setGrabCursor(!0),
        s.emit("sliderFirstMove", l);
    }
    let E;
    i.isMoved &&
      b !== s.touchesDirection &&
      y &&
      S &&
      Math.abs(g) >= 1 &&
      (s.loopFix({ direction: s.swipeDirection, setTranslate: !0 }), (E = !0)),
      s.emit("sliderMove", l),
      (i.isMoved = !0),
      (i.currentTranslate = g + i.startTranslate);
    let T = !0,
      x = r.resistanceRatio;
    if (
      (r.touchReleaseOnEdges && (x = 0),
      g > 0
        ? (y &&
            S &&
            !E &&
            i.currentTranslate >
              (r.centeredSlides
                ? s.minTranslate() - s.size / 2
                : s.minTranslate()) &&
            s.loopFix({
              direction: "prev",
              setTranslate: !0,
              activeSlideIndex: 0,
            }),
          i.currentTranslate > s.minTranslate() &&
            ((T = !1),
            r.resistance &&
              (i.currentTranslate =
                s.minTranslate() -
                1 +
                (-s.minTranslate() + i.startTranslate + g) ** x)))
        : g < 0 &&
          (y &&
            S &&
            !E &&
            i.currentTranslate <
              (r.centeredSlides
                ? s.maxTranslate() + s.size / 2
                : s.maxTranslate()) &&
            s.loopFix({
              direction: "next",
              setTranslate: !0,
              activeSlideIndex:
                s.slides.length -
                ("auto" === r.slidesPerView
                  ? s.slidesPerViewDynamic()
                  : Math.ceil(parseFloat(r.slidesPerView, 10))),
            }),
          i.currentTranslate < s.maxTranslate() &&
            ((T = !1),
            r.resistance &&
              (i.currentTranslate =
                s.maxTranslate() +
                1 -
                (s.maxTranslate() - i.startTranslate - g) ** x))),
      T && (l.preventedByNestedSwiper = !0),
      !s.allowSlideNext &&
        "next" === s.swipeDirection &&
        i.currentTranslate < i.startTranslate &&
        (i.currentTranslate = i.startTranslate),
      !s.allowSlidePrev &&
        "prev" === s.swipeDirection &&
        i.currentTranslate > i.startTranslate &&
        (i.currentTranslate = i.startTranslate),
      s.allowSlidePrev ||
        s.allowSlideNext ||
        (i.currentTranslate = i.startTranslate),
      r.threshold > 0)
    ) {
      if (!(Math.abs(g) > r.threshold || i.allowThresholdMove))
        return void (i.currentTranslate = i.startTranslate);
      if (!i.allowThresholdMove)
        return (
          (i.allowThresholdMove = !0),
          (n.startX = n.currentX),
          (n.startY = n.currentY),
          (i.currentTranslate = i.startTranslate),
          void (n.diff = s.isHorizontal()
            ? n.currentX - n.startX
            : n.currentY - n.startY)
        );
    }
    r.followFinger &&
      !r.cssMode &&
      (((r.freeMode && r.freeMode.enabled && s.freeMode) ||
        r.watchSlidesProgress) &&
        (s.updateActiveIndex(), s.updateSlidesClasses()),
      r.freeMode &&
        r.freeMode.enabled &&
        s.freeMode &&
        s.freeMode.onTouchMove(),
      s.updateProgress(i.currentTranslate),
      s.setTranslate(i.currentTranslate));
  }
  function Y(e) {
    const t = this,
      s = t.touchEventsData,
      i = s.evCache.findIndex((t) => t.pointerId === e.pointerId);
    if (
      (i >= 0 && s.evCache.splice(i, 1),
      ["pointercancel", "pointerout", "pointerleave", "contextmenu"].includes(
        e.type,
      ))
    ) {
      if (
        !(
          ["pointercancel", "contextmenu"].includes(e.type) &&
          (t.browser.isSafari || t.browser.isWebView)
        )
      )
        return;
    }
    const {
      params: r,
      touches: n,
      rtlTranslate: a,
      slidesGrid: o,
      enabled: l,
    } = t;
    if (!l) return;
    if (!r.simulateTouch && "mouse" === e.pointerType) return;
    let d = e;
    if (
      (d.originalEvent && (d = d.originalEvent),
      s.allowTouchCallbacks && t.emit("touchEnd", d),
      (s.allowTouchCallbacks = !1),
      !s.isTouched)
    )
      return (
        s.isMoved && r.grabCursor && t.setGrabCursor(!1),
        (s.isMoved = !1),
        void (s.startMoving = !1)
      );
    r.grabCursor &&
      s.isMoved &&
      s.isTouched &&
      (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
      t.setGrabCursor(!1);
    const c = w(),
      p = c - s.touchStartTime;
    if (t.allowClick) {
      const e = d.path || (d.composedPath && d.composedPath());
      t.updateClickedSlide((e && e[0]) || d.target, e),
        t.emit("tap click", d),
        p < 300 &&
          c - s.lastClickTime < 300 &&
          t.emit("doubleTap doubleClick", d);
    }
    if (
      ((s.lastClickTime = w()),
      v(() => {
        t.destroyed || (t.allowClick = !0);
      }),
      !s.isTouched ||
        !s.isMoved ||
        !t.swipeDirection ||
        0 === n.diff ||
        s.currentTranslate === s.startTranslate)
    )
      return (s.isTouched = !1), (s.isMoved = !1), void (s.startMoving = !1);
    let u;
    if (
      ((s.isTouched = !1),
      (s.isMoved = !1),
      (s.startMoving = !1),
      (u = r.followFinger
        ? a
          ? t.translate
          : -t.translate
        : -s.currentTranslate),
      r.cssMode)
    )
      return;
    if (r.freeMode && r.freeMode.enabled)
      return void t.freeMode.onTouchEnd({ currentPos: u });
    let h = 0,
      m = t.slidesSizesGrid[0];
    for (
      let e = 0;
      e < o.length;
      e += e < r.slidesPerGroupSkip ? 1 : r.slidesPerGroup
    ) {
      const t = e < r.slidesPerGroupSkip - 1 ? 1 : r.slidesPerGroup;
      void 0 !== o[e + t]
        ? u >= o[e] && u < o[e + t] && ((h = e), (m = o[e + t] - o[e]))
        : u >= o[e] && ((h = e), (m = o[o.length - 1] - o[o.length - 2]));
    }
    let f = null,
      g = null;
    r.rewind &&
      (t.isBeginning
        ? (g =
            r.virtual && r.virtual.enabled && t.virtual
              ? t.virtual.slides.length - 1
              : t.slides.length - 1)
        : t.isEnd && (f = 0));
    const b = (u - o[h]) / m,
      y = h < r.slidesPerGroupSkip - 1 ? 1 : r.slidesPerGroup;
    if (p > r.longSwipesMs) {
      if (!r.longSwipes) return void t.slideTo(t.activeIndex);
      "next" === t.swipeDirection &&
        (b >= r.longSwipesRatio
          ? t.slideTo(r.rewind && t.isEnd ? f : h + y)
          : t.slideTo(h)),
        "prev" === t.swipeDirection &&
          (b > 1 - r.longSwipesRatio
            ? t.slideTo(h + y)
            : null !== g && b < 0 && Math.abs(b) > r.longSwipesRatio
            ? t.slideTo(g)
            : t.slideTo(h));
    } else {
      if (!r.shortSwipes) return void t.slideTo(t.activeIndex);
      t.navigation &&
      (d.target === t.navigation.nextEl || d.target === t.navigation.prevEl)
        ? d.target === t.navigation.nextEl
          ? t.slideTo(h + y)
          : t.slideTo(h)
        : ("next" === t.swipeDirection && t.slideTo(null !== f ? f : h + y),
          "prev" === t.swipeDirection && t.slideTo(null !== g ? g : h));
    }
  }
  function X() {
    const e = this,
      { params: t, el: s } = e;
    if (s && 0 === s.offsetWidth) return;
    t.breakpoints && e.setBreakpoint();
    const { allowSlideNext: i, allowSlidePrev: r, snapGrid: n } = e,
      a = e.virtual && e.params.virtual.enabled;
    (e.allowSlideNext = !0),
      (e.allowSlidePrev = !0),
      e.updateSize(),
      e.updateSlides(),
      e.updateSlidesClasses();
    const o = a && t.loop;
    !("auto" === t.slidesPerView || t.slidesPerView > 1) ||
    !e.isEnd ||
    e.isBeginning ||
    e.params.centeredSlides ||
    o
      ? e.params.loop && !a
        ? e.slideToLoop(e.realIndex, 0, !1, !0)
        : e.slideTo(e.activeIndex, 0, !1, !0)
      : e.slideTo(e.slides.length - 1, 0, !1, !0),
      e.autoplay &&
        e.autoplay.running &&
        e.autoplay.paused &&
        (clearTimeout(e.autoplay.resizeTimeout),
        (e.autoplay.resizeTimeout = setTimeout(() => {
          e.autoplay &&
            e.autoplay.running &&
            e.autoplay.paused &&
            e.autoplay.resume();
        }, 500))),
      (e.allowSlidePrev = r),
      (e.allowSlideNext = i),
      e.params.watchOverflow && n !== e.snapGrid && e.checkOverflow();
  }
  function U(e) {
    const t = this;
    t.enabled &&
      (t.allowClick ||
        (t.params.preventClicks && e.preventDefault(),
        t.params.preventClicksPropagation &&
          t.animating &&
          (e.stopPropagation(), e.stopImmediatePropagation())));
  }
  function K() {
    const e = this,
      { wrapperEl: t, rtlTranslate: s, enabled: i } = e;
    if (!i) return;
    let r;
    (e.previousTranslate = e.translate),
      e.isHorizontal()
        ? (e.translate = -t.scrollLeft)
        : (e.translate = -t.scrollTop),
      0 === e.translate && (e.translate = 0),
      e.updateActiveIndex(),
      e.updateSlidesClasses();
    const n = e.maxTranslate() - e.minTranslate();
    (r = 0 === n ? 0 : (e.translate - e.minTranslate()) / n),
      r !== e.progress && e.updateProgress(s ? -e.translate : e.translate),
      e.emit("setTranslate", e.translate, !1);
  }
  function Q(e) {
    const t = this;
    G(t, e.target),
      t.params.cssMode ||
        ("auto" !== t.params.slidesPerView && !t.params.autoHeight) ||
        t.update();
  }
  let J = !1;
  function Z() {}
  const ee = (e, t) => {
    const s = m(),
      { params: i, el: r, wrapperEl: n, device: a } = e,
      o = !!i.nested,
      l = "on" === t ? "addEventListener" : "removeEventListener",
      d = t;
    r[l]("pointerdown", e.onTouchStart, { passive: !1 }),
      s[l]("pointermove", e.onTouchMove, { passive: !1, capture: o }),
      s[l]("pointerup", e.onTouchEnd, { passive: !0 }),
      s[l]("pointercancel", e.onTouchEnd, { passive: !0 }),
      s[l]("pointerout", e.onTouchEnd, { passive: !0 }),
      s[l]("pointerleave", e.onTouchEnd, { passive: !0 }),
      s[l]("contextmenu", e.onTouchEnd, { passive: !0 }),
      (i.preventClicks || i.preventClicksPropagation) &&
        r[l]("click", e.onClick, !0),
      i.cssMode && n[l]("scroll", e.onScroll),
      i.updateOnWindowResize
        ? e[d](
            a.ios || a.android
              ? "resize orientationchange observerUpdate"
              : "resize observerUpdate",
            X,
            !0,
          )
        : e[d]("observerUpdate", X, !0),
      r[l]("load", e.onLoad, { capture: !0 });
  };
  const te = (e, t) => e.grid && t.grid && t.grid.rows > 1;
  var se = {
    init: !0,
    direction: "horizontal",
    oneWayMovement: !1,
    touchEventsTarget: "wrapper",
    initialSlide: 0,
    speed: 300,
    cssMode: !1,
    updateOnWindowResize: !0,
    resizeObserver: !0,
    nested: !1,
    createElements: !1,
    enabled: !0,
    focusableElements: "input, select, option, textarea, button, video, label",
    width: null,
    height: null,
    preventInteractionOnTransition: !1,
    userAgent: null,
    url: null,
    edgeSwipeDetection: !1,
    edgeSwipeThreshold: 20,
    autoHeight: !1,
    setWrapperSize: !1,
    virtualTranslate: !1,
    effect: "slide",
    breakpoints: void 0,
    breakpointsBase: "window",
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: !1,
    centeredSlides: !1,
    centeredSlidesBounds: !1,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    normalizeSlideIndex: !0,
    centerInsufficientSlides: !1,
    watchOverflow: !0,
    roundLengths: !1,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: !0,
    shortSwipes: !0,
    longSwipes: !0,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: !0,
    allowTouchMove: !0,
    threshold: 5,
    touchMoveStopPropagation: !1,
    touchStartPreventDefault: !0,
    touchStartForcePreventDefault: !1,
    touchReleaseOnEdges: !1,
    uniqueNavElements: !0,
    resistance: !0,
    resistanceRatio: 0.85,
    watchSlidesProgress: !1,
    grabCursor: !1,
    preventClicks: !0,
    preventClicksPropagation: !0,
    slideToClickedSlide: !1,
    loop: !1,
    loopedSlides: null,
    loopPreventsSliding: !0,
    rewind: !1,
    allowSlidePrev: !0,
    allowSlideNext: !0,
    swipeHandler: null,
    noSwiping: !0,
    noSwipingClass: "swiper-no-swiping",
    noSwipingSelector: null,
    passiveListeners: !0,
    maxBackfaceHiddenSlides: 10,
    containerModifierClass: "swiper-",
    slideClass: "swiper-slide",
    slideActiveClass: "swiper-slide-active",
    slideVisibleClass: "swiper-slide-visible",
    slideNextClass: "swiper-slide-next",
    slidePrevClass: "swiper-slide-prev",
    wrapperClass: "swiper-wrapper",
    lazyPreloaderClass: "swiper-lazy-preloader",
    lazyPreloadPrevNext: 0,
    runCallbacksOnInit: !0,
    _emitClasses: !1,
  };
  function ie(e, t) {
    return function (s) {
      void 0 === s && (s = {});
      const i = Object.keys(s)[0],
        r = s[i];
      "object" == typeof r && null !== r
        ? (!0 === e[i] && (e[i] = { enabled: !0 }),
          "navigation" === i &&
            e[i] &&
            e[i].enabled &&
            !e[i].prevEl &&
            !e[i].nextEl &&
            (e[i].auto = !0),
          ["pagination", "scrollbar"].indexOf(i) >= 0 &&
            e[i] &&
            e[i].enabled &&
            !e[i].el &&
            (e[i].auto = !0),
          i in e && "enabled" in r
            ? ("object" != typeof e[i] ||
                "enabled" in e[i] ||
                (e[i].enabled = !0),
              e[i] || (e[i] = { enabled: !1 }),
              S(t, s))
            : S(t, s))
        : S(t, s);
    };
  }
  const re = {
      eventsEmitter: D,
      update: H,
      translate: V,
      transition: {
        setTransition: function (e, t) {
          const s = this;
          s.params.cssMode ||
            ((s.wrapperEl.style.transitionDuration = `${e}ms`),
            (s.wrapperEl.style.transitionDelay = 0 === e ? "0ms" : "")),
            s.emit("setTransition", e, t);
        },
        transitionStart: function (e, t) {
          void 0 === e && (e = !0);
          const s = this,
            { params: i } = s;
          i.cssMode ||
            (i.autoHeight && s.updateAutoHeight(),
            F({ swiper: s, runCallbacks: e, direction: t, step: "Start" }));
        },
        transitionEnd: function (e, t) {
          void 0 === e && (e = !0);
          const s = this,
            { params: i } = s;
          (s.animating = !1),
            i.cssMode ||
              (s.setTransition(0),
              F({ swiper: s, runCallbacks: e, direction: t, step: "End" }));
        },
      },
      slide: N,
      loop: j,
      grabCursor: {
        setGrabCursor: function (e) {
          const t = this;
          if (
            !t.params.simulateTouch ||
            (t.params.watchOverflow && t.isLocked) ||
            t.params.cssMode
          )
            return;
          const s =
            "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
          t.isElement && (t.__preventObserver__ = !0),
            (s.style.cursor = "move"),
            (s.style.cursor = e ? "grabbing" : "grab"),
            t.isElement &&
              requestAnimationFrame(() => {
                t.__preventObserver__ = !1;
              });
        },
        unsetGrabCursor: function () {
          const e = this;
          (e.params.watchOverflow && e.isLocked) ||
            e.params.cssMode ||
            (e.isElement && (e.__preventObserver__ = !0),
            (e[
              "container" === e.params.touchEventsTarget ? "el" : "wrapperEl"
            ].style.cursor = ""),
            e.isElement &&
              requestAnimationFrame(() => {
                e.__preventObserver__ = !1;
              }));
        },
      },
      events: {
        attachEvents: function () {
          const e = this,
            t = m(),
            { params: s } = e;
          (e.onTouchStart = R.bind(e)),
            (e.onTouchMove = W.bind(e)),
            (e.onTouchEnd = Y.bind(e)),
            s.cssMode && (e.onScroll = K.bind(e)),
            (e.onClick = U.bind(e)),
            (e.onLoad = Q.bind(e)),
            J || (t.addEventListener("touchstart", Z), (J = !0)),
            ee(e, "on");
        },
        detachEvents: function () {
          ee(this, "off");
        },
      },
      breakpoints: {
        setBreakpoint: function () {
          const e = this,
            { realIndex: t, initialized: s, params: i, el: r } = e,
            n = i.breakpoints;
          if (!n || (n && 0 === Object.keys(n).length)) return;
          const a = e.getBreakpoint(n, e.params.breakpointsBase, e.el);
          if (!a || e.currentBreakpoint === a) return;
          const o = (a in n ? n[a] : void 0) || e.originalParams,
            l = te(e, i),
            d = te(e, o),
            c = i.enabled;
          l && !d
            ? (r.classList.remove(
                `${i.containerModifierClass}grid`,
                `${i.containerModifierClass}grid-column`,
              ),
              e.emitContainerClasses())
            : !l &&
              d &&
              (r.classList.add(`${i.containerModifierClass}grid`),
              ((o.grid.fill && "column" === o.grid.fill) ||
                (!o.grid.fill && "column" === i.grid.fill)) &&
                r.classList.add(`${i.containerModifierClass}grid-column`),
              e.emitContainerClasses()),
            ["navigation", "pagination", "scrollbar"].forEach((t) => {
              if (void 0 === o[t]) return;
              const s = i[t] && i[t].enabled,
                r = o[t] && o[t].enabled;
              s && !r && e[t].disable(), !s && r && e[t].enable();
            });
          const p = o.direction && o.direction !== i.direction,
            u = i.loop && (o.slidesPerView !== i.slidesPerView || p),
            h = i.loop;
          p && s && e.changeDirection(), S(e.params, o);
          const m = e.params.enabled,
            f = e.params.loop;
          Object.assign(e, {
            allowTouchMove: e.params.allowTouchMove,
            allowSlideNext: e.params.allowSlideNext,
            allowSlidePrev: e.params.allowSlidePrev,
          }),
            c && !m ? e.disable() : !c && m && e.enable(),
            (e.currentBreakpoint = a),
            e.emit("_beforeBreakpoint", o),
            s &&
              (u
                ? (e.loopDestroy(), e.loopCreate(t), e.updateSlides())
                : !h && f
                ? (e.loopCreate(t), e.updateSlides())
                : h && !f && e.loopDestroy()),
            e.emit("breakpoint", o);
        },
        getBreakpoint: function (e, t, s) {
          if ((void 0 === t && (t = "window"), !e || ("container" === t && !s)))
            return;
          let i = !1;
          const r = g(),
            n = "window" === t ? r.innerHeight : s.clientHeight,
            a = Object.keys(e).map((e) => {
              if ("string" == typeof e && 0 === e.indexOf("@")) {
                const t = parseFloat(e.substr(1));
                return { value: n * t, point: e };
              }
              return { value: e, point: e };
            });
          a.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
          for (let e = 0; e < a.length; e += 1) {
            const { point: n, value: o } = a[e];
            "window" === t
              ? r.matchMedia(`(min-width: ${o}px)`).matches && (i = n)
              : o <= s.clientWidth && (i = n);
          }
          return i || "max";
        },
      },
      checkOverflow: {
        checkOverflow: function () {
          const e = this,
            { isLocked: t, params: s } = e,
            { slidesOffsetBefore: i } = s;
          if (i) {
            const t = e.slides.length - 1,
              s = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * i;
            e.isLocked = e.size > s;
          } else e.isLocked = 1 === e.snapGrid.length;
          !0 === s.allowSlideNext && (e.allowSlideNext = !e.isLocked),
            !0 === s.allowSlidePrev && (e.allowSlidePrev = !e.isLocked),
            t && t !== e.isLocked && (e.isEnd = !1),
            t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
        },
      },
      classes: {
        addClasses: function () {
          const e = this,
            { classNames: t, params: s, rtl: i, el: r, device: n } = e,
            a = (function (e, t) {
              const s = [];
              return (
                e.forEach((e) => {
                  "object" == typeof e
                    ? Object.keys(e).forEach((i) => {
                        e[i] && s.push(t + i);
                      })
                    : "string" == typeof e && s.push(t + e);
                }),
                s
              );
            })(
              [
                "initialized",
                s.direction,
                { "free-mode": e.params.freeMode && s.freeMode.enabled },
                { autoheight: s.autoHeight },
                { rtl: i },
                { grid: s.grid && s.grid.rows > 1 },
                {
                  "grid-column":
                    s.grid && s.grid.rows > 1 && "column" === s.grid.fill,
                },
                { android: n.android },
                { ios: n.ios },
                { "css-mode": s.cssMode },
                { centered: s.cssMode && s.centeredSlides },
                { "watch-progress": s.watchSlidesProgress },
              ],
              s.containerModifierClass,
            );
          t.push(...a), r.classList.add(...t), e.emitContainerClasses();
        },
        removeClasses: function () {
          const { el: e, classNames: t } = this;
          e.classList.remove(...t), this.emitContainerClasses();
        },
      },
    },
    ne = {};
  class ae {
    constructor() {
      let e, t;
      for (var s = arguments.length, i = new Array(s), r = 0; r < s; r++)
        i[r] = arguments[r];
      1 === i.length &&
      i[0].constructor &&
      "Object" === Object.prototype.toString.call(i[0]).slice(8, -1)
        ? (t = i[0])
        : ([e, t] = i),
        t || (t = {}),
        (t = S({}, t)),
        e && !t.el && (t.el = e);
      const n = m();
      if (
        t.el &&
        "string" == typeof t.el &&
        n.querySelectorAll(t.el).length > 1
      ) {
        const e = [];
        return (
          n.querySelectorAll(t.el).forEach((s) => {
            const i = S({}, t, { el: s });
            e.push(new ae(i));
          }),
          e
        );
      }
      const a = this;
      (a.__swiper__ = !0),
        (a.support = I()),
        (a.device = z({ userAgent: t.userAgent })),
        (a.browser = $()),
        (a.eventsListeners = {}),
        (a.eventsAnyListeners = []),
        (a.modules = [...a.__modules__]),
        t.modules && Array.isArray(t.modules) && a.modules.push(...t.modules);
      const o = {};
      a.modules.forEach((e) => {
        e({
          params: t,
          swiper: a,
          extendParams: ie(t, o),
          on: a.on.bind(a),
          once: a.once.bind(a),
          off: a.off.bind(a),
          emit: a.emit.bind(a),
        });
      });
      const l = S({}, se, o);
      return (
        (a.params = S({}, l, ne, t)),
        (a.originalParams = S({}, a.params)),
        (a.passedParams = S({}, t)),
        a.params &&
          a.params.on &&
          Object.keys(a.params.on).forEach((e) => {
            a.on(e, a.params.on[e]);
          }),
        a.params && a.params.onAny && a.onAny(a.params.onAny),
        Object.assign(a, {
          enabled: a.params.enabled,
          el: e,
          classNames: [],
          slides: [],
          slidesGrid: [],
          snapGrid: [],
          slidesSizesGrid: [],
          isHorizontal: () => "horizontal" === a.params.direction,
          isVertical: () => "vertical" === a.params.direction,
          activeIndex: 0,
          realIndex: 0,
          isBeginning: !0,
          isEnd: !1,
          translate: 0,
          previousTranslate: 0,
          progress: 0,
          velocity: 0,
          animating: !1,
          cssOverflowAdjustment() {
            return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
          },
          allowSlideNext: a.params.allowSlideNext,
          allowSlidePrev: a.params.allowSlidePrev,
          touchEventsData: {
            isTouched: void 0,
            isMoved: void 0,
            allowTouchCallbacks: void 0,
            touchStartTime: void 0,
            isScrolling: void 0,
            currentTranslate: void 0,
            startTranslate: void 0,
            allowThresholdMove: void 0,
            focusableElements: a.params.focusableElements,
            lastClickTime: 0,
            clickTimeout: void 0,
            velocities: [],
            allowMomentumBounce: void 0,
            startMoving: void 0,
            evCache: [],
          },
          allowClick: !0,
          allowTouchMove: a.params.allowTouchMove,
          touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
          imagesToLoad: [],
          imagesLoaded: 0,
        }),
        a.emit("_swiper"),
        a.params.init && a.init(),
        a
      );
    }
    getSlideIndex(e) {
      const { slidesEl: t, params: s } = this,
        i = P(x(t, `.${s.slideClass}, swiper-slide`)[0]);
      return P(e) - i;
    }
    getSlideIndexByData(e) {
      return this.getSlideIndex(
        this.slides.filter(
          (t) => 1 * t.getAttribute("data-swiper-slide-index") === e,
        )[0],
      );
    }
    recalcSlides() {
      const { slidesEl: e, params: t } = this;
      this.slides = x(e, `.${t.slideClass}, swiper-slide`);
    }
    enable() {
      const e = this;
      e.enabled ||
        ((e.enabled = !0),
        e.params.grabCursor && e.setGrabCursor(),
        e.emit("enable"));
    }
    disable() {
      const e = this;
      e.enabled &&
        ((e.enabled = !1),
        e.params.grabCursor && e.unsetGrabCursor(),
        e.emit("disable"));
    }
    setProgress(e, t) {
      const s = this;
      e = Math.min(Math.max(e, 0), 1);
      const i = s.minTranslate(),
        r = (s.maxTranslate() - i) * e + i;
      s.translateTo(r, void 0 === t ? 0 : t),
        s.updateActiveIndex(),
        s.updateSlidesClasses();
    }
    emitContainerClasses() {
      const e = this;
      if (!e.params._emitClasses || !e.el) return;
      const t = e.el.className
        .split(" ")
        .filter(
          (t) =>
            0 === t.indexOf("swiper") ||
            0 === t.indexOf(e.params.containerModifierClass),
        );
      e.emit("_containerClasses", t.join(" "));
    }
    getSlideClasses(e) {
      const t = this;
      return t.destroyed
        ? ""
        : e.className
            .split(" ")
            .filter(
              (e) =>
                0 === e.indexOf("swiper-slide") ||
                0 === e.indexOf(t.params.slideClass),
            )
            .join(" ");
    }
    emitSlidesClasses() {
      const e = this;
      if (!e.params._emitClasses || !e.el) return;
      const t = [];
      e.slides.forEach((s) => {
        const i = e.getSlideClasses(s);
        t.push({ slideEl: s, classNames: i }), e.emit("_slideClass", s, i);
      }),
        e.emit("_slideClasses", t);
    }
    slidesPerViewDynamic(e, t) {
      void 0 === e && (e = "current"), void 0 === t && (t = !1);
      const {
        params: s,
        slides: i,
        slidesGrid: r,
        slidesSizesGrid: n,
        size: a,
        activeIndex: o,
      } = this;
      let l = 1;
      if ("number" == typeof s.slidesPerView) return s.slidesPerView;
      if (s.centeredSlides) {
        let e,
          t = i[o] ? i[o].swiperSlideSize : 0;
        for (let s = o + 1; s < i.length; s += 1)
          i[s] &&
            !e &&
            ((t += i[s].swiperSlideSize), (l += 1), t > a && (e = !0));
        for (let s = o - 1; s >= 0; s -= 1)
          i[s] &&
            !e &&
            ((t += i[s].swiperSlideSize), (l += 1), t > a && (e = !0));
      } else if ("current" === e)
        for (let e = o + 1; e < i.length; e += 1) {
          (t ? r[e] + n[e] - r[o] < a : r[e] - r[o] < a) && (l += 1);
        }
      else
        for (let e = o - 1; e >= 0; e -= 1) {
          r[o] - r[e] < a && (l += 1);
        }
      return l;
    }
    update() {
      const e = this;
      if (!e || e.destroyed) return;
      const { snapGrid: t, params: s } = e;
      function i() {
        const t = e.rtlTranslate ? -1 * e.translate : e.translate,
          s = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
        e.setTranslate(s), e.updateActiveIndex(), e.updateSlidesClasses();
      }
      let r;
      if (
        (s.breakpoints && e.setBreakpoint(),
        [...e.el.querySelectorAll('[loading="lazy"]')].forEach((t) => {
          t.complete && G(e, t);
        }),
        e.updateSize(),
        e.updateSlides(),
        e.updateProgress(),
        e.updateSlidesClasses(),
        s.freeMode && s.freeMode.enabled && !s.cssMode)
      )
        i(), s.autoHeight && e.updateAutoHeight();
      else {
        if (
          ("auto" === s.slidesPerView || s.slidesPerView > 1) &&
          e.isEnd &&
          !s.centeredSlides
        ) {
          const t =
            e.virtual && s.virtual.enabled ? e.virtual.slides : e.slides;
          r = e.slideTo(t.length - 1, 0, !1, !0);
        } else r = e.slideTo(e.activeIndex, 0, !1, !0);
        r || i();
      }
      s.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
        e.emit("update");
    }
    changeDirection(e, t) {
      void 0 === t && (t = !0);
      const s = this,
        i = s.params.direction;
      return (
        e || (e = "horizontal" === i ? "vertical" : "horizontal"),
        e === i ||
          ("horizontal" !== e && "vertical" !== e) ||
          (s.el.classList.remove(`${s.params.containerModifierClass}${i}`),
          s.el.classList.add(`${s.params.containerModifierClass}${e}`),
          s.emitContainerClasses(),
          (s.params.direction = e),
          s.slides.forEach((t) => {
            "vertical" === e ? (t.style.width = "") : (t.style.height = "");
          }),
          s.emit("changeDirection"),
          t && s.update()),
        s
      );
    }
    changeLanguageDirection(e) {
      const t = this;
      (t.rtl && "rtl" === e) ||
        (!t.rtl && "ltr" === e) ||
        ((t.rtl = "rtl" === e),
        (t.rtlTranslate = "horizontal" === t.params.direction && t.rtl),
        t.rtl
          ? (t.el.classList.add(`${t.params.containerModifierClass}rtl`),
            (t.el.dir = "rtl"))
          : (t.el.classList.remove(`${t.params.containerModifierClass}rtl`),
            (t.el.dir = "ltr")),
        t.update());
    }
    mount(e) {
      const t = this;
      if (t.mounted) return !0;
      let s = e || t.params.el;
      if (("string" == typeof s && (s = document.querySelector(s)), !s))
        return !1;
      (s.swiper = t),
        s.parentNode &&
          s.parentNode.host &&
          "SWIPER-CONTAINER" === s.parentNode.host.nodeName &&
          (t.isElement = !0);
      const i = () =>
        `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
      let r = (() => {
        if (s && s.shadowRoot && s.shadowRoot.querySelector) {
          return s.shadowRoot.querySelector(i());
        }
        return x(s, i())[0];
      })();
      return (
        !r &&
          t.params.createElements &&
          ((r = C("div", t.params.wrapperClass)),
          s.append(r),
          x(s, `.${t.params.slideClass}`).forEach((e) => {
            r.append(e);
          })),
        Object.assign(t, {
          el: s,
          wrapperEl: r,
          slidesEl:
            t.isElement && !s.parentNode.host.slideSlots
              ? s.parentNode.host
              : r,
          hostEl: t.isElement ? s.parentNode.host : s,
          mounted: !0,
          rtl: "rtl" === s.dir.toLowerCase() || "rtl" === L(s, "direction"),
          rtlTranslate:
            "horizontal" === t.params.direction &&
            ("rtl" === s.dir.toLowerCase() || "rtl" === L(s, "direction")),
          wrongRTL: "-webkit-box" === L(r, "display"),
        }),
        !0
      );
    }
    init(e) {
      const t = this;
      if (t.initialized) return t;
      if (!1 === t.mount(e)) return t;
      t.emit("beforeInit"),
        t.params.breakpoints && t.setBreakpoint(),
        t.addClasses(),
        t.updateSize(),
        t.updateSlides(),
        t.params.watchOverflow && t.checkOverflow(),
        t.params.grabCursor && t.enabled && t.setGrabCursor(),
        t.params.loop && t.virtual && t.params.virtual.enabled
          ? t.slideTo(
              t.params.initialSlide + t.virtual.slidesBefore,
              0,
              t.params.runCallbacksOnInit,
              !1,
              !0,
            )
          : t.slideTo(
              t.params.initialSlide,
              0,
              t.params.runCallbacksOnInit,
              !1,
              !0,
            ),
        t.params.loop && t.loopCreate(),
        t.attachEvents();
      const s = [...t.el.querySelectorAll('[loading="lazy"]')];
      return (
        t.isElement && s.push(...t.hostEl.querySelectorAll('[loading="lazy"]')),
        s.forEach((e) => {
          e.complete
            ? G(t, e)
            : e.addEventListener("load", (e) => {
                G(t, e.target);
              });
        }),
        q(t),
        (t.initialized = !0),
        q(t),
        t.emit("init"),
        t.emit("afterInit"),
        t
      );
    }
    destroy(e, t) {
      void 0 === e && (e = !0), void 0 === t && (t = !0);
      const s = this,
        { params: i, el: r, wrapperEl: n, slides: a } = s;
      return (
        void 0 === s.params ||
          s.destroyed ||
          (s.emit("beforeDestroy"),
          (s.initialized = !1),
          s.detachEvents(),
          i.loop && s.loopDestroy(),
          t &&
            (s.removeClasses(),
            r.removeAttribute("style"),
            n.removeAttribute("style"),
            a &&
              a.length &&
              a.forEach((e) => {
                e.classList.remove(
                  i.slideVisibleClass,
                  i.slideActiveClass,
                  i.slideNextClass,
                  i.slidePrevClass,
                ),
                  e.removeAttribute("style"),
                  e.removeAttribute("data-swiper-slide-index");
              })),
          s.emit("destroy"),
          Object.keys(s.eventsListeners).forEach((e) => {
            s.off(e);
          }),
          !1 !== e &&
            ((s.el.swiper = null),
            (function (e) {
              const t = e;
              Object.keys(t).forEach((e) => {
                try {
                  t[e] = null;
                } catch (e) {}
                try {
                  delete t[e];
                } catch (e) {}
              });
            })(s)),
          (s.destroyed = !0)),
        null
      );
    }
    static extendDefaults(e) {
      S(ne, e);
    }
    static get extendedDefaults() {
      return ne;
    }
    static get defaults() {
      return se;
    }
    static installModule(e) {
      ae.prototype.__modules__ || (ae.prototype.__modules__ = []);
      const t = ae.prototype.__modules__;
      "function" == typeof e && t.indexOf(e) < 0 && t.push(e);
    }
    static use(e) {
      return Array.isArray(e)
        ? (e.forEach((e) => ae.installModule(e)), ae)
        : (ae.installModule(e), ae);
    }
  }
  function oe(e, t, s, i) {
    return (
      e.params.createElements &&
        Object.keys(i).forEach((r) => {
          if (!s[r] && !0 === s.auto) {
            let n = x(e.el, `.${i[r]}`)[0];
            n || ((n = C("div", i[r])), (n.className = i[r]), e.el.append(n)),
              (s[r] = n),
              (t[r] = n);
          }
        }),
      s
    );
  }
  function le(e) {
    let { swiper: t, extendParams: s, on: i, emit: r } = e;
    s({
      navigation: {
        nextEl: null,
        prevEl: null,
        hideOnClick: !1,
        disabledClass: "swiper-button-disabled",
        hiddenClass: "swiper-button-hidden",
        lockClass: "swiper-button-lock",
        navigationDisabledClass: "swiper-navigation-disabled",
      },
    }),
      (t.navigation = { nextEl: null, prevEl: null });
    const n = (e) => (Array.isArray(e) ? e : [e]).filter((e) => !!e);
    function a(e) {
      let s;
      return e &&
        "string" == typeof e &&
        t.isElement &&
        ((s = t.el.querySelector(e)), s)
        ? s
        : (e &&
            ("string" == typeof e && (s = [...document.querySelectorAll(e)]),
            t.params.uniqueNavElements &&
              "string" == typeof e &&
              s.length > 1 &&
              1 === t.el.querySelectorAll(e).length &&
              (s = t.el.querySelector(e))),
          e && !s ? e : s);
    }
    function o(e, s) {
      const i = t.params.navigation;
      (e = n(e)).forEach((e) => {
        e &&
          (e.classList[s ? "add" : "remove"](...i.disabledClass.split(" ")),
          "BUTTON" === e.tagName && (e.disabled = s),
          t.params.watchOverflow &&
            t.enabled &&
            e.classList[t.isLocked ? "add" : "remove"](i.lockClass));
      });
    }
    function l() {
      const { nextEl: e, prevEl: s } = t.navigation;
      if (t.params.loop) return o(s, !1), void o(e, !1);
      o(s, t.isBeginning && !t.params.rewind),
        o(e, t.isEnd && !t.params.rewind);
    }
    function d(e) {
      e.preventDefault(),
        (!t.isBeginning || t.params.loop || t.params.rewind) &&
          (t.slidePrev(), r("navigationPrev"));
    }
    function c(e) {
      e.preventDefault(),
        (!t.isEnd || t.params.loop || t.params.rewind) &&
          (t.slideNext(), r("navigationNext"));
    }
    function p() {
      const e = t.params.navigation;
      if (
        ((t.params.navigation = oe(
          t,
          t.originalParams.navigation,
          t.params.navigation,
          { nextEl: "swiper-button-next", prevEl: "swiper-button-prev" },
        )),
        !e.nextEl && !e.prevEl)
      )
        return;
      let s = a(e.nextEl),
        i = a(e.prevEl);
      Object.assign(t.navigation, { nextEl: s, prevEl: i }),
        (s = n(s)),
        (i = n(i));
      const r = (s, i) => {
        s && s.addEventListener("click", "next" === i ? c : d),
          !t.enabled && s && s.classList.add(...e.lockClass.split(" "));
      };
      s.forEach((e) => r(e, "next")), i.forEach((e) => r(e, "prev"));
    }
    function u() {
      let { nextEl: e, prevEl: s } = t.navigation;
      (e = n(e)), (s = n(s));
      const i = (e, s) => {
        e.removeEventListener("click", "next" === s ? c : d),
          e.classList.remove(...t.params.navigation.disabledClass.split(" "));
      };
      e.forEach((e) => i(e, "next")), s.forEach((e) => i(e, "prev"));
    }
    i("init", () => {
      !1 === t.params.navigation.enabled ? h() : (p(), l());
    }),
      i("toEdge fromEdge lock unlock", () => {
        l();
      }),
      i("destroy", () => {
        u();
      }),
      i("enable disable", () => {
        let { nextEl: e, prevEl: s } = t.navigation;
        (e = n(e)),
          (s = n(s)),
          t.enabled
            ? l()
            : [...e, ...s]
                .filter((e) => !!e)
                .forEach((e) => e.classList.add(t.params.navigation.lockClass));
      }),
      i("click", (e, s) => {
        let { nextEl: i, prevEl: a } = t.navigation;
        (i = n(i)), (a = n(a));
        const o = s.target;
        if (
          t.params.navigation.hideOnClick &&
          !a.includes(o) &&
          !i.includes(o)
        ) {
          if (
            t.pagination &&
            t.params.pagination &&
            t.params.pagination.clickable &&
            (t.pagination.el === o || t.pagination.el.contains(o))
          )
            return;
          let e;
          i.length
            ? (e = i[0].classList.contains(t.params.navigation.hiddenClass))
            : a.length &&
              (e = a[0].classList.contains(t.params.navigation.hiddenClass)),
            r(!0 === e ? "navigationShow" : "navigationHide"),
            [...i, ...a]
              .filter((e) => !!e)
              .forEach((e) =>
                e.classList.toggle(t.params.navigation.hiddenClass),
              );
        }
      });
    const h = () => {
      t.el.classList.add(
        ...t.params.navigation.navigationDisabledClass.split(" "),
      ),
        u();
    };
    Object.assign(t.navigation, {
      enable: () => {
        t.el.classList.remove(
          ...t.params.navigation.navigationDisabledClass.split(" "),
        ),
          p(),
          l();
      },
      disable: h,
      update: l,
      init: p,
      destroy: u,
    });
  }
  function de(e) {
    return (
      void 0 === e && (e = ""),
      `.${e
        .trim()
        .replace(/([\.:!+\/])/g, "\\$1")
        .replace(/ /g, ".")}`
    );
  }
  function ce(e) {
    let { swiper: t, extendParams: s, on: i, emit: r } = e;
    const n = "swiper-pagination";
    let a;
    s({
      pagination: {
        el: null,
        bulletElement: "span",
        clickable: !1,
        hideOnClick: !1,
        renderBullet: null,
        renderProgressbar: null,
        renderFraction: null,
        renderCustom: null,
        progressbarOpposite: !1,
        type: "bullets",
        dynamicBullets: !1,
        dynamicMainBullets: 1,
        formatFractionCurrent: (e) => e,
        formatFractionTotal: (e) => e,
        bulletClass: `${n}-bullet`,
        bulletActiveClass: `${n}-bullet-active`,
        modifierClass: `${n}-`,
        currentClass: `${n}-current`,
        totalClass: `${n}-total`,
        hiddenClass: `${n}-hidden`,
        progressbarFillClass: `${n}-progressbar-fill`,
        progressbarOppositeClass: `${n}-progressbar-opposite`,
        clickableClass: `${n}-clickable`,
        lockClass: `${n}-lock`,
        horizontalClass: `${n}-horizontal`,
        verticalClass: `${n}-vertical`,
        paginationDisabledClass: `${n}-disabled`,
      },
    }),
      (t.pagination = { el: null, bullets: [] });
    let o = 0;
    const l = (e) => (Array.isArray(e) ? e : [e]).filter((e) => !!e);
    function d() {
      return (
        !t.params.pagination.el ||
        !t.pagination.el ||
        (Array.isArray(t.pagination.el) && 0 === t.pagination.el.length)
      );
    }
    function c(e, s) {
      const { bulletActiveClass: i } = t.params.pagination;
      e &&
        (e = e[("prev" === s ? "previous" : "next") + "ElementSibling"]) &&
        (e.classList.add(`${i}-${s}`),
        (e = e[("prev" === s ? "previous" : "next") + "ElementSibling"]) &&
          e.classList.add(`${i}-${s}-${s}`));
    }
    function p(e) {
      const s = e.target.closest(de(t.params.pagination.bulletClass));
      if (!s) return;
      e.preventDefault();
      const i = P(s) * t.params.slidesPerGroup;
      if (t.params.loop) {
        if (t.realIndex === i) return;
        const e = t.realIndex,
          s = t.getSlideIndexByData(i),
          r = t.getSlideIndexByData(t.realIndex),
          n = (i) => {
            const r = t.activeIndex;
            t.loopFix({ direction: i, activeSlideIndex: s, slideTo: !1 });
            r === t.activeIndex && t.slideToLoop(e, 0, !1, !0);
          };
        if (s > t.slides.length - t.loopedSlides) n(s > r ? "next" : "prev");
        else if (t.params.centeredSlides) {
          const e =
            "auto" === t.params.slidesPerView
              ? t.slidesPerViewDynamic()
              : Math.ceil(parseFloat(t.params.slidesPerView, 10));
          s < Math.floor(e / 2) && n("prev");
        }
        t.slideToLoop(i);
      } else t.slideTo(i);
    }
    function u() {
      const e = t.rtl,
        s = t.params.pagination;
      if (d()) return;
      let i,
        n,
        p = t.pagination.el;
      p = l(p);
      const u =
          t.virtual && t.params.virtual.enabled
            ? t.virtual.slides.length
            : t.slides.length,
        h = t.params.loop
          ? Math.ceil(u / t.params.slidesPerGroup)
          : t.snapGrid.length;
      if (
        (t.params.loop
          ? ((n = t.previousRealIndex || 0),
            (i =
              t.params.slidesPerGroup > 1
                ? Math.floor(t.realIndex / t.params.slidesPerGroup)
                : t.realIndex))
          : void 0 !== t.snapIndex
          ? ((i = t.snapIndex), (n = t.previousSnapIndex))
          : ((n = t.previousIndex || 0), (i = t.activeIndex || 0)),
        "bullets" === s.type &&
          t.pagination.bullets &&
          t.pagination.bullets.length > 0)
      ) {
        const r = t.pagination.bullets;
        let l, d, u;
        if (
          (s.dynamicBullets &&
            ((a = _(r[0], t.isHorizontal() ? "width" : "height", !0)),
            p.forEach((e) => {
              e.style[t.isHorizontal() ? "width" : "height"] =
                a * (s.dynamicMainBullets + 4) + "px";
            }),
            s.dynamicMainBullets > 1 &&
              void 0 !== n &&
              ((o += i - (n || 0)),
              o > s.dynamicMainBullets - 1
                ? (o = s.dynamicMainBullets - 1)
                : o < 0 && (o = 0)),
            (l = Math.max(i - o, 0)),
            (d = l + (Math.min(r.length, s.dynamicMainBullets) - 1)),
            (u = (d + l) / 2)),
          r.forEach((e) => {
            const t = [
              ...[
                "",
                "-next",
                "-next-next",
                "-prev",
                "-prev-prev",
                "-main",
              ].map((e) => `${s.bulletActiveClass}${e}`),
            ]
              .map((e) =>
                "string" == typeof e && e.includes(" ") ? e.split(" ") : e,
              )
              .flat();
            e.classList.remove(...t);
          }),
          p.length > 1)
        )
          r.forEach((e) => {
            const r = P(e);
            r === i
              ? e.classList.add(...s.bulletActiveClass.split(" "))
              : t.isElement && e.setAttribute("part", "bullet"),
              s.dynamicBullets &&
                (r >= l &&
                  r <= d &&
                  e.classList.add(...`${s.bulletActiveClass}-main`.split(" ")),
                r === l && c(e, "prev"),
                r === d && c(e, "next"));
          });
        else {
          const e = r[i];
          if (
            (e && e.classList.add(...s.bulletActiveClass.split(" ")),
            t.isElement &&
              r.forEach((e, t) => {
                e.setAttribute("part", t === i ? "bullet-active" : "bullet");
              }),
            s.dynamicBullets)
          ) {
            const e = r[l],
              t = r[d];
            for (let e = l; e <= d; e += 1)
              r[e] &&
                r[e].classList.add(...`${s.bulletActiveClass}-main`.split(" "));
            c(e, "prev"), c(t, "next");
          }
        }
        if (s.dynamicBullets) {
          const i = Math.min(r.length, s.dynamicMainBullets + 4),
            n = (a * i - a) / 2 - u * a,
            o = e ? "right" : "left";
          r.forEach((e) => {
            e.style[t.isHorizontal() ? o : "top"] = `${n}px`;
          });
        }
      }
      p.forEach((e, n) => {
        if (
          ("fraction" === s.type &&
            (e.querySelectorAll(de(s.currentClass)).forEach((e) => {
              e.textContent = s.formatFractionCurrent(i + 1);
            }),
            e.querySelectorAll(de(s.totalClass)).forEach((e) => {
              e.textContent = s.formatFractionTotal(h);
            })),
          "progressbar" === s.type)
        ) {
          let r;
          r = s.progressbarOpposite
            ? t.isHorizontal()
              ? "vertical"
              : "horizontal"
            : t.isHorizontal()
            ? "horizontal"
            : "vertical";
          const n = (i + 1) / h;
          let a = 1,
            o = 1;
          "horizontal" === r ? (a = n) : (o = n),
            e.querySelectorAll(de(s.progressbarFillClass)).forEach((e) => {
              (e.style.transform = `translate3d(0,0,0) scaleX(${a}) scaleY(${o})`),
                (e.style.transitionDuration = `${t.params.speed}ms`);
            });
        }
        "custom" === s.type && s.renderCustom
          ? ((e.innerHTML = s.renderCustom(t, i + 1, h)),
            0 === n && r("paginationRender", e))
          : (0 === n && r("paginationRender", e), r("paginationUpdate", e)),
          t.params.watchOverflow &&
            t.enabled &&
            e.classList[t.isLocked ? "add" : "remove"](s.lockClass);
      });
    }
    function h() {
      const e = t.params.pagination;
      if (d()) return;
      const s =
        t.virtual && t.params.virtual.enabled
          ? t.virtual.slides.length
          : t.slides.length;
      let i = t.pagination.el;
      i = l(i);
      let n = "";
      if ("bullets" === e.type) {
        let i = t.params.loop
          ? Math.ceil(s / t.params.slidesPerGroup)
          : t.snapGrid.length;
        t.params.freeMode && t.params.freeMode.enabled && i > s && (i = s);
        for (let s = 0; s < i; s += 1)
          e.renderBullet
            ? (n += e.renderBullet.call(t, s, e.bulletClass))
            : (n += `<${e.bulletElement} ${
                t.isElement ? 'part="bullet"' : ""
              } class="${e.bulletClass}"></${e.bulletElement}>`);
      }
      "fraction" === e.type &&
        (n = e.renderFraction
          ? e.renderFraction.call(t, e.currentClass, e.totalClass)
          : `<span class="${e.currentClass}"></span> / <span class="${e.totalClass}"></span>`),
        "progressbar" === e.type &&
          (n = e.renderProgressbar
            ? e.renderProgressbar.call(t, e.progressbarFillClass)
            : `<span class="${e.progressbarFillClass}"></span>`),
        (t.pagination.bullets = []),
        i.forEach((s) => {
          "custom" !== e.type && (s.innerHTML = n || ""),
            "bullets" === e.type &&
              t.pagination.bullets.push(
                ...s.querySelectorAll(de(e.bulletClass)),
              );
        }),
        "custom" !== e.type && r("paginationRender", i[0]);
    }
    function m() {
      t.params.pagination = oe(
        t,
        t.originalParams.pagination,
        t.params.pagination,
        { el: "swiper-pagination" },
      );
      const e = t.params.pagination;
      if (!e.el) return;
      let s;
      "string" == typeof e.el && t.isElement && (s = t.el.querySelector(e.el)),
        s ||
          "string" != typeof e.el ||
          (s = [...document.querySelectorAll(e.el)]),
        s || (s = e.el),
        s &&
          0 !== s.length &&
          (t.params.uniqueNavElements &&
            "string" == typeof e.el &&
            Array.isArray(s) &&
            s.length > 1 &&
            ((s = [...t.el.querySelectorAll(e.el)]),
            s.length > 1 &&
              (s = s.filter((e) => M(e, ".swiper")[0] === t.el)[0])),
          Array.isArray(s) && 1 === s.length && (s = s[0]),
          Object.assign(t.pagination, { el: s }),
          (s = l(s)),
          s.forEach((s) => {
            "bullets" === e.type &&
              e.clickable &&
              s.classList.add(...(e.clickableClass || "").split(" ")),
              s.classList.add(e.modifierClass + e.type),
              s.classList.add(
                t.isHorizontal() ? e.horizontalClass : e.verticalClass,
              ),
              "bullets" === e.type &&
                e.dynamicBullets &&
                (s.classList.add(`${e.modifierClass}${e.type}-dynamic`),
                (o = 0),
                e.dynamicMainBullets < 1 && (e.dynamicMainBullets = 1)),
              "progressbar" === e.type &&
                e.progressbarOpposite &&
                s.classList.add(e.progressbarOppositeClass),
              e.clickable && s.addEventListener("click", p),
              t.enabled || s.classList.add(e.lockClass);
          }));
    }
    function f() {
      const e = t.params.pagination;
      if (d()) return;
      let s = t.pagination.el;
      s &&
        ((s = l(s)),
        s.forEach((s) => {
          s.classList.remove(e.hiddenClass),
            s.classList.remove(e.modifierClass + e.type),
            s.classList.remove(
              t.isHorizontal() ? e.horizontalClass : e.verticalClass,
            ),
            e.clickable &&
              (s.classList.remove(...(e.clickableClass || "").split(" ")),
              s.removeEventListener("click", p));
        })),
        t.pagination.bullets &&
          t.pagination.bullets.forEach((t) =>
            t.classList.remove(...e.bulletActiveClass.split(" ")),
          );
    }
    i("changeDirection", () => {
      if (!t.pagination || !t.pagination.el) return;
      const e = t.params.pagination;
      let { el: s } = t.pagination;
      (s = l(s)),
        s.forEach((s) => {
          s.classList.remove(e.horizontalClass, e.verticalClass),
            s.classList.add(
              t.isHorizontal() ? e.horizontalClass : e.verticalClass,
            );
        });
    }),
      i("init", () => {
        !1 === t.params.pagination.enabled ? g() : (m(), h(), u());
      }),
      i("activeIndexChange", () => {
        void 0 === t.snapIndex && u();
      }),
      i("snapIndexChange", () => {
        u();
      }),
      i("snapGridLengthChange", () => {
        h(), u();
      }),
      i("destroy", () => {
        f();
      }),
      i("enable disable", () => {
        let { el: e } = t.pagination;
        e &&
          ((e = l(e)),
          e.forEach((e) =>
            e.classList[t.enabled ? "remove" : "add"](
              t.params.pagination.lockClass,
            ),
          ));
      }),
      i("lock unlock", () => {
        u();
      }),
      i("click", (e, s) => {
        const i = s.target,
          n = l(t.pagination.el);
        if (
          t.params.pagination.el &&
          t.params.pagination.hideOnClick &&
          n &&
          n.length > 0 &&
          !i.classList.contains(t.params.pagination.bulletClass)
        ) {
          if (
            t.navigation &&
            ((t.navigation.nextEl && i === t.navigation.nextEl) ||
              (t.navigation.prevEl && i === t.navigation.prevEl))
          )
            return;
          const e = n[0].classList.contains(t.params.pagination.hiddenClass);
          r(!0 === e ? "paginationShow" : "paginationHide"),
            n.forEach((e) =>
              e.classList.toggle(t.params.pagination.hiddenClass),
            );
        }
      });
    const g = () => {
      t.el.classList.add(t.params.pagination.paginationDisabledClass);
      let { el: e } = t.pagination;
      e &&
        ((e = l(e)),
        e.forEach((e) =>
          e.classList.add(t.params.pagination.paginationDisabledClass),
        )),
        f();
    };
    Object.assign(t.pagination, {
      enable: () => {
        t.el.classList.remove(t.params.pagination.paginationDisabledClass);
        let { el: e } = t.pagination;
        e &&
          ((e = l(e)),
          e.forEach((e) =>
            e.classList.remove(t.params.pagination.paginationDisabledClass),
          )),
          m(),
          h(),
          u();
      },
      disable: g,
      render: h,
      update: u,
      init: m,
      destroy: f,
    });
  }
  function pe() {
    let e = document.querySelectorAll(
      '[class*="__swiper"]:not(.swiper-wrapper)',
    );
    e &&
      e.forEach((e) => {
        e.parentElement.classList.add("swiper"),
          e.classList.add("swiper-wrapper");
        for (const t of e.children) t.classList.add("swiper-slide");
      });
  }
  Object.keys(re).forEach((e) => {
    Object.keys(re[e]).forEach((t) => {
      ae.prototype[t] = re[e][t];
    });
  }),
    ae.use([
      function (e) {
        let { swiper: t, on: s, emit: i } = e;
        const r = g();
        let n = null,
          a = null;
        const o = () => {
            t &&
              !t.destroyed &&
              t.initialized &&
              (i("beforeResize"), i("resize"));
          },
          l = () => {
            t && !t.destroyed && t.initialized && i("orientationchange");
          };
        s("init", () => {
          t.params.resizeObserver && void 0 !== r.ResizeObserver
            ? t &&
              !t.destroyed &&
              t.initialized &&
              ((n = new ResizeObserver((e) => {
                a = r.requestAnimationFrame(() => {
                  const { width: s, height: i } = t;
                  let r = s,
                    n = i;
                  e.forEach((e) => {
                    let { contentBoxSize: s, contentRect: i, target: a } = e;
                    (a && a !== t.el) ||
                      ((r = i ? i.width : (s[0] || s).inlineSize),
                      (n = i ? i.height : (s[0] || s).blockSize));
                  }),
                    (r === s && n === i) || o();
                });
              })),
              n.observe(t.el))
            : (r.addEventListener("resize", o),
              r.addEventListener("orientationchange", l));
        }),
          s("destroy", () => {
            a && r.cancelAnimationFrame(a),
              n && n.unobserve && t.el && (n.unobserve(t.el), (n = null)),
              r.removeEventListener("resize", o),
              r.removeEventListener("orientationchange", l);
          });
      },
      function (e) {
        let { swiper: t, extendParams: s, on: i, emit: r } = e;
        const n = [],
          a = g(),
          o = function (e, s) {
            void 0 === s && (s = {});
            const i = new (a.MutationObserver || a.WebkitMutationObserver)(
              (e) => {
                if (t.__preventObserver__) return;
                if (1 === e.length) return void r("observerUpdate", e[0]);
                const s = function () {
                  r("observerUpdate", e[0]);
                };
                a.requestAnimationFrame
                  ? a.requestAnimationFrame(s)
                  : a.setTimeout(s, 0);
              },
            );
            i.observe(e, {
              attributes: void 0 === s.attributes || s.attributes,
              childList: void 0 === s.childList || s.childList,
              characterData: void 0 === s.characterData || s.characterData,
            }),
              n.push(i);
          };
        s({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
          i("init", () => {
            if (t.params.observer) {
              if (t.params.observeParents) {
                const e = M(t.hostEl);
                for (let t = 0; t < e.length; t += 1) o(e[t]);
              }
              o(t.hostEl, { childList: t.params.observeSlideChildren }),
                o(t.wrapperEl, { attributes: !1 });
            }
          }),
          i("destroy", () => {
            n.forEach((e) => {
              e.disconnect();
            }),
              n.splice(0, n.length);
          });
      },
    ]),
    window.addEventListener("load", function (e) {
      pe(),
        document.querySelector(".typical-breakdowns__swiper") &&
          document.documentElement.clientWidth > 768 &&
          new ae(".typical-breakdowns__slider", {
            modules: [ce],
            speed: 800,
            pagination: { el: ".typical-breakdowns__pagging", clickable: !0 },
            breakpoints: {
              768: { slidesPerView: 3, spaceBetween: 44 },
              1268: { slidesPerView: 5, spaceBetween: 44 },
            },
            on: {},
          }),
        document.querySelector(".testimonials__swiper") &&
          new ae(".testimonials__slider", {
            modules: [le, ce],
            autoHeight: !0,
            speed: 800,
            pagination: { el: ".testimonials__pagging", clickable: !0 },
            navigation: {
              prevEl: ".testimonials__arrows .testimonials__arrow_prev",
              nextEl: ".testimonials__arrows .testimonials__arrow_next",
            },
            breakpoints: {
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2, spaceBetween: 20 },
              992: { slidesPerView: 3, spaceBetween: 10 },
              1268: { slidesPerView: 4, spaceBetween: 10 },
            },
            on: {},
          }),
        document.querySelector(".how-we-work__swiper") &&
          document.documentElement.clientWidth < 1280 &&
          new ae(".how-we-work__slider", {
            modules: [ce],
            autoHeight: !0,
            speed: 800,
            pagination: { el: ".how-we-work__pagging", clickable: !0 },
            breakpoints: {
              0: { slidesPerView: 1, spaceBetween: 5 },
              768: { slidesPerView: 2, spaceBetween: 20 },
              1268: { slidesPerView: "auto", spaceBetween: 10 },
            },
            on: {},
          });
    });
  const ue = document.querySelector(".services__body"),
    he = document.querySelector("#services-more");
  if (he) {
    let e = document.querySelector(".services__list");
    he.addEventListener("click", (t) => {
      ue.classList.toggle("_show"), e.classList.toggle("_hidden");
    });
  }
  const me = document.querySelector(".typical-breakdowns__mob"),
    fe = document.querySelector("#typical-breakdowns-more");
  if (fe) {
    let e = document.querySelector(".typical-breakdowns__mob-grid");
    fe.addEventListener("click", (t) => {
      me.classList.toggle("_show"), e.classList.toggle("_hidden");
    });
  }
  const ge = document.querySelector(".prices__body"),
    ve = document.querySelector("#prices-more");
  if (ve) {
    let e = document.querySelector(".prices__body-grid");
    ve.addEventListener("click", (t) => {
      ge.classList.toggle("_show"), e.classList.toggle("_hidden");
    });
  }
  function we(e) {
    let t = e;
    for (let e = 0; e < t.length; e++)
      t[e].addEventListener("animationend", () => {
        t[e].classList.remove("_show"),
          e == t.length - 1
            ? t[0].classList.add("_show")
            : t[e + 1].classList.add("_show");
      });
  }
  const be = document.querySelectorAll(".promo__text p"),
    ye = document.querySelectorAll(".promo__monitor img");
  we(be), we(ye);
  document.querySelectorAll(".menu-item-has-children").forEach((e) => {
    e.insertAdjacentHTML("beforeend", '<span class="menu-item__arrow"></span>');
  }),
    document.addEventListener("click", function (e) {
      const t = e.target;
      if (t.classList.contains("menu-item__arrow")) {
        let e = t.closest(".menu-item-has-children"),
          s = document.querySelectorAll("._show-sub-menu");
        0 == s.length
          ? e.classList.add("_show-sub-menu")
          : 0 != s.length && t.closest("._show-sub-menu")
          ? e.classList.remove("_show-sub-menu")
          : 0 == s.length ||
            t.closest("._show-sub-menu") ||
            (s.forEach((e) => {
              e.classList.remove("_show-sub-menu");
            }),
            e.classList.add("_show-sub-menu"));
      }
      t.classList.contains("menu-item a") &&
        subMenusShow.forEach((e) => {
          e.classList.remove("_show-sub-menu");
        });
    }),
    (window.FLS = !0),
    (function () {
      let e = document.querySelector(".icon-burger");
      e &&
        e.addEventListener("click", function (e) {
          i && (r(), document.documentElement.classList.toggle("menu-open"));
        });
    })(),
    (function () {
      const e = document.querySelectorAll("[data-spollers]");
      if (e.length > 0) {
        const i = Array.from(e).filter(function (e, t, s) {
          return !e.dataset.spollers.split(",")[0];
        });
        i.length && n(i);
        let r = l(e, "spollers");
        function n(e, t = !1) {
          e.forEach((e) => {
            (e = t ? e.item : e),
              t.matches || !t
                ? (e.classList.add("_spoller-init"),
                  a(e),
                  e.addEventListener("click", o))
                : (e.classList.remove("_spoller-init"),
                  a(e, !1),
                  e.removeEventListener("click", o));
          });
        }
        function a(e, t = !0) {
          let s = e.querySelectorAll("[data-spoller]");
          s.length &&
            ((s = Array.from(s).filter(
              (t) => t.closest("[data-spollers]") === e,
            )),
            s.forEach((e) => {
              t
                ? (e.removeAttribute("tabindex"),
                  e.classList.contains("_spoller-active") ||
                    (e.nextElementSibling.hidden = !0))
                : (e.setAttribute("tabindex", "-1"),
                  (e.nextElementSibling.hidden = !1));
            }));
        }
        function o(e) {
          const i = e.target;
          if (i.closest("[data-spoller]")) {
            const r = i.closest("[data-spoller]"),
              n = r.closest("[data-spollers]"),
              a = !!n.hasAttribute("data-one-spoller");
            n.querySelectorAll("._slide").length ||
              (a && !r.classList.contains("_spoller-active") && d(n),
              r.classList.toggle("_spoller-active"),
              ((e, i = 500) => {
                e.hidden ? s(e, i) : t(e, i);
              })(r.nextElementSibling, 500)),
              e.preventDefault();
          }
        }
        function d(e) {
          const s = e.querySelector("[data-spoller]._spoller-active");
          s &&
            (s.classList.remove("_spoller-active"),
            t(s.nextElementSibling, 500));
        }
        r &&
          r.length &&
          r.forEach((e) => {
            e.matchMedia.addEventListener("change", function () {
              n(e.itemsArray, e.matchMedia);
            }),
              n(e.itemsArray, e.matchMedia);
          });
      }
    })(),
    window.addEventListener("load", function (e) {
      const i = document.querySelectorAll("[data-showmore]");
      let r, n;
      function a(e) {
        e.forEach((e) => {
          o(e.itemsArray, e.matchMedia);
        });
      }
      function o(e, i) {
        e.forEach((e) => {
          !(function (e, i = !1) {
            let r = (e = i ? e.item : e).querySelectorAll(
                "[data-showmore-content]",
              ),
              n = e.querySelectorAll("[data-showmore-button]");
            (r = Array.from(r).filter(
              (t) => t.closest("[data-showmore]") === e,
            )[0]),
              (n = Array.from(n).filter(
                (t) => t.closest("[data-showmore]") === e,
              )[0]);
            const a = d(e, r);
            (i.matches || !i) &&
            a <
              (function (e) {
                let t = e.offsetHeight;
                e.style.removeProperty("height");
                let s = e.offsetHeight;
                return (e.style.height = `${t}px`), s;
              })(r)
              ? (t(r, 0, a), (n.hidden = !1))
              : (s(r, 0, a), (n.hidden = !0));
          })(e, i);
        });
      }
      function d(e, t) {
        let s = 0;
        if ("items" === (e.dataset.showmore ? e.dataset.showmore : "size")) {
          const e = t.dataset.showmoreContent ? t.dataset.showmoreContent : 3,
            i = t.children;
          for (
            let t = 1;
            t < i.length && ((s += i[t - 1].offsetHeight), t != e);
            t++
          );
        } else s = t.dataset.showmoreContent ? t.dataset.showmoreContent : 150;
        return s;
      }
      function c(e) {
        const i = e.target,
          l = e.type;
        if ("click" === l) {
          if (i.closest("[data-showmore-button]")) {
            const e = i
                .closest("[data-showmore-button]")
                .closest("[data-showmore]"),
              r = e.querySelector("[data-showmore-content]"),
              n = e.dataset.showmoreButton ? e.dataset.showmoreButton : "500",
              a = d(e, r);
            r.classList.contains("_slide") ||
              (e.classList.contains("_showmore-active")
                ? t(r, n, a)
                : s(r, n, a),
              e.classList.toggle("_showmore-active"));
          }
        } else "resize" === l && (r && r.length && o(r), n && n.length && a(n));
      }
      i.length &&
        ((r = Array.from(i).filter(function (e, t, s) {
          return !e.dataset.showmoreMedia;
        })),
        r.length && o(r),
        document.addEventListener("click", c),
        window.addEventListener("resize", c),
        (n = l(i, "showmoreMedia")),
        n &&
          n.length &&
          (n.forEach((e) => {
            e.matchMedia.addEventListener("change", function () {
              o(e.itemsArray, e.matchMedia);
            });
          }),
          a(n)));
    }),
    (function () {
      const e = document.querySelectorAll(
        "input[placeholder],textarea[placeholder]",
      );
      e.length &&
        e.forEach((e) => {
          e.dataset.placeholder = e.placeholder;
        }),
        document.body.addEventListener("focusin", function (e) {
          const t = e.target;
          ("INPUT" !== t.tagName && "TEXTAREA" !== t.tagName) ||
            (t.dataset.placeholder && (t.placeholder = ""),
            t.classList.add("_form-focus"),
            t.parentElement.classList.add("_form-focus"),
            c.removeError(t));
        }),
        document.body.addEventListener("focusout", function (e) {
          const t = e.target;
          ("INPUT" !== t.tagName && "TEXTAREA" !== t.tagName) ||
            (t.dataset.placeholder && (t.placeholder = t.dataset.placeholder),
            t.classList.remove("_form-focus"),
            t.parentElement.classList.remove("_form-focus"),
            t.hasAttribute("data-validate") && c.validateInput(t));
        });
    })(),
    (function (t) {
      e.popup && e.popup.open("some");
      const s = document.forms;
      if (s.length)
        for (const e of s)
          e.addEventListener("submit", function (e) {
            i(e.target, e);
          }),
            e.addEventListener("reset", function (e) {
              const t = e.target;
              c.formClean(t);
            });
      async function i(e, s) {
        if (0 === (t ? c.getErrors(e) : 0)) {
          if (e.hasAttribute("data-ajax")) {
            s.preventDefault();
            const t = e.getAttribute("action")
                ? e.getAttribute("action").trim()
                : "#",
              i = e.getAttribute("method")
                ? e.getAttribute("method").trim()
                : "GET",
              n = new FormData(e);
            e.classList.add("_sending");
            const a = await fetch(t, { method: i, body: n });
            if (a.ok) {
              await a.json();
              e.classList.remove("_sending"), r(e);
            } else alert("Ошибка"), e.classList.remove("_sending");
          } else e.hasAttribute("data-dev") && (s.preventDefault(), r(e));
        } else {
          s.preventDefault();
          const t = e.querySelector("._form-error");
          t && e.hasAttribute("data-goto-error") && d(t, !0, 1e3);
        }
      }
      function r(t) {
        document.dispatchEvent(
          new CustomEvent("formSent", { detail: { form: t } }),
        ),
          setTimeout(() => {
            if (e.popup) {
              const s = t.dataset.popupMessage;
              s && e.popup.open(s);
            }
          }, 0),
          c.formClean(t),
          o(`[Формы]: ${"Форма отправлена!"}`);
      }
    })(!0);
})();
