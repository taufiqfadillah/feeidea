(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [185],
  {
    5786: function (e, t, n) {
      (Promise.resolve().then(n.bind(n, 3461)),
        Promise.resolve().then(n.bind(n, 2539)),
        Promise.resolve().then(n.bind(n, 6917)),
        Promise.resolve().then(n.bind(n, 2026)),
        Promise.resolve().then(n.t.bind(n, 185, 23)),
        Promise.resolve().then(n.t.bind(n, 4144, 23)),
        Promise.resolve().then(n.t.bind(n, 2289, 23)),
        Promise.resolve().then(n.t.bind(n, 418, 23)),
        Promise.resolve().then(n.t.bind(n, 4610, 23)),
        Promise.resolve().then(n.t.bind(n, 976, 23)),
        Promise.resolve().then(n.bind(n, 9501)),
        Promise.resolve().then(n.bind(n, 6661)),
        Promise.resolve().then(n.bind(n, 4317)),
        Promise.resolve().then(n.bind(n, 3937)),
        Promise.resolve().then(n.bind(n, 6605)),
        Promise.resolve().then(n.t.bind(n, 6262, 23)),
        Promise.resolve().then(n.t.bind(n, 4793, 23)));
    },
    3911: function (e, t, n) {
      'use strict';
      n.d(t, {
        B: function () {
          return r;
        },
      });
      let r = {
        NEWS: 'https://maintenance.cretivox.com/',
        JOBS: 'https://career.cretivox.com/',
        CONTACT: '/work#contact',
        PHONE: '+6285121502019',
        ARTICLES: 'https://maintenance.cretivox.com/',
        BRAND_ASSETS: 'https://imagekit.io/public/share/df125g9cz/a01cc049a6db58f714077cbdb90e2e8ba23834e7ae3316cd5939dce83e89b9f4a5b56f9a8b405285e4e018e1018bccc4185526fbbbc6ab01e7383aec31d84339ad5938fde4b50b6fd9d6d15b06b10330',
      };
    },
    9501: function (e, t, n) {
      'use strict';
      n.d(t, {
        AnimationInit: function () {
          return d;
        },
      });
      var r = n(7628),
        o = n(8245),
        i = n.n(o),
        l = n(526),
        a = n.n(l),
        s = n(5525),
        c = n(3693);
      r.ZP.registerPlugin(a(), i());
      let d = () => (
        (0, s.usePathname)(),
        (0, c.useLayoutEffect)(() => {
          window.exportRoot = r.ZP.exportRoot();
        }, []),
        null
      );
    },
    6661: function (e, t, n) {
      'use strict';
      n.d(t, {
        SmoothWrapper: function () {
          return d;
        },
      });
      var r = n(5581),
        o = n(7628),
        i = n(2498),
        l = n.n(i),
        a = n(508),
        s = n(5525),
        c = n(3693);
      o.ZP.registerPlugin(l());
      let d = (e) => {
        let { children: t } = e,
          n = (0, s.usePathname)(),
          o = (0, a.LZ)(),
          i = c.useRef();
        return (
          (0, c.useEffect)(() => {
            let e = window.location.hash,
              t = 0;
            ('#network' == e && window.innerWidth > 768 && (t = 3 * window.innerWidth), null == o || o.scrollTo(e || 0, { duration: 0, offset: t }));
            let n = document.querySelector('#header');
            (null == n || n.removeAttribute('data-hidden'),
              null == o ||
                o.on('scroll', (e) => {
                  let t = e.direction;
                  e.progress > 0.99 ? null == n || n.removeAttribute('data-hidden') : 1 === t ? null == n || n.setAttribute('data-hidden', 'true') : -1 === t && (null == n || n.removeAttribute('data-hidden'));
                }));
          }, [n, o]),
          (0, r.jsx)(a.pi, { root: !0, ref: i, options: { duration: 3, easing: (e) => Math.min(1, 1.001 - Math.pow(2, -11 * e)), orientation: 'vertical', gestureOrientation: 'vertical' }, children: t })
        );
      };
    },
    4317: function (e, t, n) {
      'use strict';
      n.d(t, {
        CookieConsent: function () {
          return c;
        },
      });
      var r = n(5581),
        o = n(3693),
        i = n(1766),
        l = n.n(i),
        a = n(2134),
        s = n(4900);
      let c = () => {
        let [e, t] = (0, o.useState)(!1);
        return ((0, o.useEffect)(() => {
          localStorage.getItem('cookieConsent') || t(!0);
        }, []),
        e)
          ? (0, r.jsx)('div', {
              className: l().cookieConsent,
              children: (0, r.jsxs)('div', {
                className: l().flex,
                children: [
                  (0, r.jsxs)('div', {
                    className: l().flex2,
                    children: [
                      (0, r.jsx)(s.default, { src: '/icons/cookie.svg', width: 48, height: 48, alt: '' }),
                      (0, r.jsxs)('p', { children: ['This website use cookies to improve your experience on the site.', ' ', (0, r.jsx)(a.default, { href: '/privacy-policy', children: 'Privacy Policy' })] }),
                    ],
                  }),
                  (0, r.jsx)('button', {
                    id: 'accept-cookie',
                    onClick: () => {
                      (localStorage.setItem('cookieConsent', 'true'), t(!1));
                    },
                    children: 'I Understand',
                  }),
                ],
              }),
            })
          : null;
      };
    },
    3937: function (e, t, n) {
      'use strict';
      n.d(t, {
        default: function () {
          return P;
        },
      });
      var r,
        o,
        i,
        l,
        a = n(5581),
        s = n(2134),
        c = n(2949),
        d = n.n(c),
        h = n(3693),
        u = n(5525),
        f = n(8049);
      function m() {
        return (m = Object.assign
          ? Object.assign.bind()
          : function (e) {
              for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
              }
              return e;
            }).apply(null, arguments);
      }
      var v = (e) =>
          f.createElement(
            'svg',
            m({ xmlns: 'http://www.w3.org/2000/svg', width: 255, height: 24, fill: 'none', viewBox: '0 0 255 24' }, e),
            r ||
              (r = f.createElement(
                'g',
                { fill: 'currentColor', clipPath: 'url(#a)' },
                f.createElement('path', {
                  d: 'M13.507 19.526c-5.377 0-5.411-5.816-5.411-7.223 0-4.218 1.283-7.766 5.48-7.766 1.976 0 3.746.864 4.057 3.196h7.145c-.034-.862-.069-2.94-2.081-4.922C20.72.895 17.633 0 13.576 0 9.934 0 6.639.703 4.073 3.387 1.713 5.847.917 9.013.917 12.177c0 2.396.485 6.072 3.225 8.756C6.917 23.617 11.218 24 13.645 24c3.26 0 11.237-.607 11.272-7.83h-7.215c-.138.896-.52 3.356-4.195 3.356M53.027 0v19.052h-.039L48.708 0h-3.2190000000000003v24h2.145V4.945h.039L51.955 24V24h3.217V0zM43.774 13.715v8.571H42.06V24H26.632V0h13.714v1.714h1.714v8.573h-1.714v1.714h1.714v1.713z',
                }),
              )),
            o || (o = f.createElement('path', { stroke: 'currentColor', d: 'M67.672 4v16' })),
            i ||
              (i = f.createElement(
                'g',
                { fill: 'currentColor', clipPath: 'url(#b)' },
                f.createElement('path', {
                  d: 'M95.727 7.809c.221-2.31-1.232-3.163-3.034-3.163-3.825 0-5.723 3.508-6.61 7.683-.316 1.39-1.486 7.147 3.413 7.147 3.351 0 4.205-2.435 4.521-3.322h6.577c-1.549 7.147-8.95 7.747-11.921 7.747-2.215 0-6.04-.38-8.034-3.035-1.923-2.652-1.577-6.29-1.07-8.662.666-3.13 2.056-6.26 4.712-8.695C87.19.853 90.35.159 93.67.159c3.7 0 6.323.886 7.717 2.78 1.423 1.96 1.012 4.016.853 4.87zM107.269.633h10.56c4.113 0 5.628.253 6.673 1.644.57.695 1.169 1.96.665 4.428-.537 2.498-1.769 3.572-3.005 4.238-1.644.915-3.067 1.074-3.729 1.17l-.034.124c4.429.125 4.238 2.086 4.017 5.598-.125 1.549-.316 4.017-.125 5.628h-6.86c-.095-1.39.125-3.13.35-5.153.283-2.751.412-3.763-2.435-3.763h-2.656l-1.898 8.916h-6.356zm4.3 9.802h2.373c1.39 0 2.085 0 2.655-.191 1.486-.442 2.056-1.865 2.214-2.593.6-2.814-1.864-2.814-3.7-2.814h-2.372zM130.225.695h17.136l-.916 4.362h-10.876l-1.011 4.745h10.243l-.949 4.363h-10.243l-1.012 4.87h11.13l-.949 4.428h-17.39zM155.457 5.153h-6.956l.949-4.52h20.458l-.949 4.52h-7.113l-3.888 18.31h-6.389zM172.123.633h6.514l-4.837 22.83h-6.514zM181.039.633h6.988l1.677 16.537L198.683.633h6.293l-13.153 22.83h-7.559zM207.948 3.163C211.457.253 215.885 0 217.559 0c9.107 0 10.181 6.547 8.982 12.112C224.614 21.22 217.559 24 212.123 24c-6.073 0-11.005-3.35-9.203-11.858.316-1.52 1.548-6.073 5.028-8.982zm5.249 16.188c4.52 0 6.164-4.175 6.83-7.334.662-3.193.254-4.775-.221-5.786-.662-1.265-2.056-1.644-3.446-1.644-4.175 0-6.073 3.604-6.926 7.525-.758 3.638-.441 7.243 3.763 7.243zM231.503 23.463h-7.4l11.192-11.888L229.572.636h8.158l2.972 7.084 6.102-7.084h7.272L243.674 11.45l5.977 12.017h-8.096l-3.258-8.125-6.798 8.125z',
                }),
              )),
            l ||
              (l = f.createElement(
                'defs',
                null,
                f.createElement('clipPath', { id: 'a' }, f.createElement('path', { fill: '#fff', d: 'M.917 0h54.255v24H.917z' })),
                f.createElement('clipPath', { id: 'b' }, f.createElement('path', { fill: '#fff', d: 'M79.172 0h174.91v24H79.173z' })),
              )),
          ),
        p = n(9770),
        x = n(8634),
        b = n(546),
        _ = n.n(b),
        j = n(3911);
      let g = () => {
        let e = (0, u.usePathname)(),
          [t, n] = h.useState(!1);
        return (
          h.useEffect(() => {
            n(!1);
          }, [e]),
          (0, a.jsxs)('div', {
            className: _().menu,
            'data-open': t,
            children: [
              (0, a.jsxs)('div', {
                className: _().top,
                children: [(0, a.jsx)(s.default, { href: '/', children: (0, a.jsx)(v, { className: _().logo }) }), (0, a.jsx)('button', { onClick: () => n(!t), children: t ? (0, a.jsx)(p.Z, {}) : (0, a.jsx)(x.Z, {}) })],
              }),
              (0, a.jsxs)('div', {
                className: _().content,
                children: [
                  (0, a.jsx)(s.default, { onClick: () => n(!1), 'data-active': '/about' === e, href: '/about', children: 'ABOUT' }),
                  (0, a.jsx)(s.default, { onClick: () => n(!1), 'data-active': '/work' === e, href: '/work', children: 'WORK' }),
                  (0, a.jsx)(s.default, { onClick: () => n(!1), 'data-active': '/platform' === e, href: '/platform', children: 'PLATFORM' }),
                  (0, a.jsx)('a', { href: j.B.NEWS, children: 'NEWS' }),
                  (0, a.jsx)('a', { href: j.B.JOBS, children: 'JOBS' }),
                  (0, a.jsx)('a', { href: j.B.CONTACT, children: 'CONTACT' }),
                  (0, a.jsx)('div', { className: _().fill }),
                  (0, a.jsxs)('div', { onClick: () => console.log(navigator.userAgent), className: _().copyright, children: ['\xa9 ', new Date().getFullYear(), ' Cretivox Broadcasting Network'] }),
                ],
              }),
            ],
          })
        );
      };
      function P() {
        let e = (0, h.useRef)(null),
          t = (0, u.usePathname)();
        return (0, a.jsxs)(a.Fragment, {
          children: [
            (0, a.jsx)(g, {}),
            (0, a.jsx)('header', {
              id: 'header',
              'data-transparent': 'false',
              ref: e,
              className: d().header,
              children: (0, a.jsxs)('nav', {
                id: 'header-desktop',
                className: d().container,
                children: [
                  (0, a.jsxs)('div', {
                    className: d().links,
                    children: [
                      (0, a.jsx)(s.default, { 'data-active': '/about' === t, href: '/about', children: 'ABOUT' }),
                      (0, a.jsx)(s.default, { 'data-active': '/work' === t, href: '/work', children: 'WORK' }),
                      (0, a.jsx)(s.default, { 'data-active': '/platform' === t, href: '/platform', children: 'PLATFORM' }),
                    ],
                  }),
                  (0, a.jsx)(s.default, { className: d().logo, href: '/', children: (0, a.jsx)(v, {}) }),
                  (0, a.jsxs)('div', {
                    className: d().links,
                    children: [(0, a.jsx)(s.default, { href: j.B.NEWS, children: 'NEWS' }), (0, a.jsx)(s.default, { href: j.B.JOBS, children: 'JOBS' }), (0, a.jsx)(s.default, { href: j.B.CONTACT, children: 'CONTACT' })],
                  }),
                ],
              }),
            }),
          ],
        });
      }
    },
    6605: function (e, t, n) {
      'use strict';
      n.d(t, {
        Transition: function () {
          return d;
        },
      });
      var r = n(5581),
        o = n(3693),
        i = n(6276),
        l = n.n(i),
        a = n(5525),
        s = n(3722),
        c = n(7628);
      let d = () => {
        let e = o.useRef(null),
          t = (0, a.usePathname)();
        return (
          (0, s.V)(
            () => {
              try {
                let t = c.ZP.timeline();
                (t.fromTo(
                  e.current,
                  {
                    opacity: 1,
                    onStart: () => {
                      var e;
                      (null === (e = window.exportRoot) || void 0 === e ? void 0 : e.pause) && window.exportRoot.pause();
                    },
                  },
                  { opacity: 0, duration: 1, ease: 'power3.inOut' },
                ),
                  t.to(
                    {},
                    {
                      duration: 0.3,
                      onComplete: () => {
                        var e;
                        (null === (e = window.exportRoot) || void 0 === e ? void 0 : e.play) && window.exportRoot.play();
                      },
                    },
                  ));
              } catch (t) {
                (console.error('Error in GSAP transition:', t), e.current && (e.current.style.opacity = '0'));
              }
            },
            { dependencies: [t] },
          ),
          (0, r.jsx)('div', { ref: e, className: l().transition })
        );
      };
    },
    6262: function () {},
    4793: function () {},
    1766: function (e) {
      e.exports = { cookieConsent: 'cookie_cookieConsent__Zc6nx', flex: 'cookie_flex__navQg', flex2: 'cookie_flex2__RAnJz' };
    },
    2949: function (e) {
      e.exports = { header: 'header_header__ICuOj', container: 'header_container__TaBoH', logo: 'header_logo__xJyg_', links: 'header_links__tUrXG' };
    },
    546: function (e) {
      e.exports = { menu: 'menu_menu__e6Hl2', top: 'menu_top__NfZTy', logo: 'menu_logo__LfgJa', content: 'menu_content__Xlp5V', fill: 'menu_fill__Rpnz3', copyright: 'menu_copyright__mFNNF' };
    },
    6276: function (e) {
      e.exports = { transition: 'transition_transition__sqfp1' };
    },
  },
  function (e) {
    (e.O(0, [7, 364, 582, 312, 144, 526, 226, 33, 852, 883, 744], function () {
      return e((e.s = 5786));
    }),
      (_N_E = e.O()));
  },
]);
