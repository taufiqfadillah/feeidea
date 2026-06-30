/**
 * animation.js
 * ============
 * Pure GSAP animation functions — vanilla JS, no React, no Next.js.
 * Langsung bisa dipakai di HTML statis dengan <script src="js/animation.js"></script>
 *
 * Cara pakai di HTML:
 *   1. Load GSAP terlebih dahulu (CDN atau file lokal)
 *   2. Load file ini: <script src="js/animation.js" defer></script>
 *   3. Tambahkan data-anim attribute pada elemen HTML:
 *      <p data-anim="fade">...</p>
 *      <h2 data-anim="lines" data-reveal-delay="0.3">...</h2>
 *      <span data-anim="chars">...</span>
 *
 * GSAP CDN (taruh di <head> sebelum animation.js):
 *   <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
 *   <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
 *   <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>
 *   SplitText adalah plugin GSAP Club — load dari lisensi kamu sendiri.
 */

(function () {
  'use strict';

  // ─── Tunggu DOM siap ─────────────────────────────────────────────────────────
  function ready(fn) {
    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  // ─── Guard: pastikan GSAP tersedia ───────────────────────────────────────────
  function checkGSAP() {
    if (typeof gsap === 'undefined') {
      console.warn('[animation.js] GSAP tidak ditemukan. Pastikan GSAP sudah di-load sebelum animation.js.');
      return false;
    }
    return true;
  }

  // ─── Register Plugins ─────────────────────────────────────────────────────────
  function registerPlugins() {
    var plugins = [];
    if (typeof ScrollTrigger !== 'undefined') plugins.push(ScrollTrigger);
    if (typeof ScrollToPlugin !== 'undefined') plugins.push(ScrollToPlugin);
    if (typeof SplitText !== 'undefined') plugins.push(SplitText);
    if (plugins.length) gsap.registerPlugin.apply(gsap, plugins);
  }


  // ═══════════════════════════════════════════════════════════════════════════════
  // 1. EXPORT ROOT — wadah semua timeline agar bisa di-pause/play saat transisi
  // ═══════════════════════════════════════════════════════════════════════════════
  function initExportRoot() {
    window.exportRoot = gsap.exportRoot();
  }


  // ═══════════════════════════════════════════════════════════════════════════════
  // 2. PAGE TRANSITION — overlay fade saat pindah halaman
  //    Gunakan pada elemen .transition (div overlay fullscreen)
  // ═══════════════════════════════════════════════════════════════════════════════
  function animatePageTransition(overlayEl) {
    if (!overlayEl) return;
    try {
      var tl = gsap.timeline();
      tl.fromTo(overlayEl,
        {
          opacity: 1,
          onStart: function () {
            if (window.exportRoot && window.exportRoot.pause) window.exportRoot.pause();
          }
        },
        { opacity: 0, duration: 1, ease: 'power3.inOut' }
      );
      tl.to({}, {
        duration: 0.3,
        onComplete: function () {
          if (window.exportRoot && window.exportRoot.play) window.exportRoot.play();
        }
      });
    } catch (err) {
      console.error('[animation.js] Page transition error:', err);
      if (overlayEl) overlayEl.style.opacity = '0';
    }
  }


  // ═══════════════════════════════════════════════════════════════════════════════
  // 3. HEADER SCROLL BEHAVIOR — sembunyikan header saat scroll ke bawah
  //    Otomatis aktif jika ada elemen #header di halaman
  // ═══════════════════════════════════════════════════════════════════════════════
  function initHeaderScrollBehavior() {
    var header = document.querySelector('#header');
    if (!header || typeof ScrollTrigger === 'undefined') return;

    header.removeAttribute('data-hidden');

    // Gunakan ScrollTrigger onUpdate sebagai scroll listener
    ScrollTrigger.create({
      start: 'top top',
      end: 'max',
      onUpdate: function (self) {
        if (self.progress > 0.99) {
          header.removeAttribute('data-hidden');
        } else if (self.direction === 1) {
          header.setAttribute('data-hidden', 'true');
        } else if (self.direction === -1) {
          header.removeAttribute('data-hidden');
        }
      }
    });
  }


  // ═══════════════════════════════════════════════════════════════════════════════
  // 4. SCROLL TO TARGET — smooth scroll ke elemen atau hash
  //    Contoh: scrollTo('#summary')
  // ═══════════════════════════════════════════════════════════════════════════════
  function scrollTo(target) {
    if (typeof ScrollToPlugin === 'undefined') {
      var el = document.querySelector(target);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    gsap.to(window, { scrollTo: target, duration: 2, ease: 'power3.inOut' });
  }


  // ═══════════════════════════════════════════════════════════════════════════════
  // 5. REVEAL FADE — elemen muncul dari bawah dengan fade
  //    Pakai: <div data-anim="fade" data-reveal-delay="0.3">
  // ═══════════════════════════════════════════════════════════════════════════════
  function revealFade(el, overrides) {
    if (!el || typeof ScrollTrigger === 'undefined') return;
    var delay = parseFloat(el.getAttribute('data-reveal-delay') || 0);
    var props = Object.assign(
      { y: 0, opacity: 1, duration: 1, ease: 'power2.inOut', rotation: 0, delay: delay },
      overrides || {}
    );
    var tl = gsap.timeline({
      scrollTrigger: { trigger: el, start: 'top 92%' }
    }).fromTo(el,
      { y: 10, opacity: 0, rotation: 0.5 },
      props
    );
    if (window.exportRoot) window.exportRoot.add(tl);
  }


  // ═══════════════════════════════════════════════════════════════════════════════
  // 6. REVEAL CHARS — teks muncul karakter per karakter
  //    Pakai: <h2 data-anim="chars" data-reveal-delay="0.2">
  //    Butuh: SplitText (GSAP Club plugin)
  // ═══════════════════════════════════════════════════════════════════════════════
  function revealChars(el) {
    if (!el || typeof SplitText === 'undefined' || typeof ScrollTrigger === 'undefined') {
      // Fallback tanpa SplitText: pakai fade biasa
      revealFade(el);
      return;
    }
    el.style.opacity = '0';
    var delay = parseFloat(el.getAttribute('data-reveal-delay') || 0);

    var splitLines = new SplitText(el, { type: 'lines' });
    splitLines.lines.forEach(function (line) {
      new SplitText(line, { type: 'chars', charsClass: 'nested-lines' });
      line.style.overflow = 'hidden';
    });

    var tl = gsap.timeline({
      scrollTrigger: { trigger: el, start: 'top 85%', end: 'bottom top' }
    })
      .to(el, { opacity: 1, duration: 0 })
      .fromTo(el.querySelectorAll('.nested-lines'),
        { opacity: 1, y: '150%', rotation: 4 },
        { opacity: 1, y: 0, duration: 2, ease: 'expo.out', stagger: 0.02, rotation: 0, delay: delay },
        0
      );
    if (window.exportRoot) window.exportRoot.add(tl);
  }


  // ═══════════════════════════════════════════════════════════════════════════════
  // 7. REVEAL LINES — teks muncul baris per baris
  //    Pakai: <p data-anim="lines" data-reveal-delay="0.5">
  //    Butuh: SplitText (GSAP Club plugin)
  // ═══════════════════════════════════════════════════════════════════════════════
  function revealLines(el) {
    if (!el || typeof SplitText === 'undefined' || typeof ScrollTrigger === 'undefined') {
      revealFade(el);
      return;
    }
    el.style.opacity = '0';
    var delay = parseFloat(el.getAttribute('data-reveal-delay') || 0);

    var splitLines = new SplitText(el, { type: 'lines' });
    splitLines.lines.forEach(function (line) {
      new SplitText(line, { type: 'lines', linesClass: 'nested-lines' });
      line.style.overflow = 'hidden';
    });

    var tl = gsap.timeline({
      scrollTrigger: { trigger: el, start: 'top 85%', end: 'bottom top' }
    })
      .to(el, { opacity: 1, duration: 0 })
      .fromTo(el.querySelectorAll('.nested-lines'),
        { opacity: 1, y: '150%', rotation: 4 },
        { opacity: 1, y: 0, duration: 2, ease: 'expo.out', stagger: 0.02, rotation: 0, delay: delay },
        0
      );
    if (window.exportRoot) window.exportRoot.add(tl);
  }


  // ═══════════════════════════════════════════════════════════════════════════════
  // 8. HERO SECTION — parallax globe + pin + stats stagger
  //    Refs diambil otomatis dari data-section="hero"
  // ═══════════════════════════════════════════════════════════════════════════════
  function animateHeroSection(sectionEl, globeEl, containerEl, statsEl) {
    if (!sectionEl || typeof ScrollTrigger === 'undefined') return;
    gsap.matchMedia().add('(min-width: 768px)', function () {
      if (globeEl) {
        gsap.timeline({
          scrollTrigger: { trigger: sectionEl, start: 'top bottom', end: 'bottom top', scrub: true }
        }).fromTo(globeEl, { y: '-80vh' }, { y: '350vh', ease: 'none' });
      }
      if (containerEl) {
        gsap.timeline({
          scrollTrigger: { trigger: sectionEl, start: 'top top', end: 'bottom top', scrub: true, pin: containerEl }
        });
      }
      if (statsEl) {
        gsap.timeline({
          scrollTrigger: { trigger: sectionEl, start: 'top top', end: '+=2400px', toggleActions: 'play none reverse none', scrub: true }
        }).from(statsEl.querySelectorAll('div'), { y: '10px', opacity: 0, duration: 2, stagger: 0.3 });
      }
    });
  }


  // ═══════════════════════════════════════════════════════════════════════════════
  // 9. HERO TITLE — parallax container + span stagger fade-in
  // ═══════════════════════════════════════════════════════════════════════════════
  function animateHeroTitle(sectionEl, containerEl, titleEl) {
    if (!sectionEl) return;
    gsap.matchMedia().add('(min-width: 768px)', function () {
      if (containerEl) {
        gsap.timeline({
          scrollTrigger: { trigger: sectionEl, start: '2px top', end: 'bottom top', scrub: true }
        }).to(containerEl, { y: '90vh', ease: 'none' });
      }
    });
    if (titleEl) {
      titleEl.querySelectorAll('span').forEach(function (span, i) {
        gsap.from(span, { opacity: 0, duration: 2, delay: 0.6 * i, ease: 'power3.in' });
      });
    }
  }


  // ═══════════════════════════════════════════════════════════════════════════════
  // 10. SUMMARY SECTION — parallax image/gif
  // ═══════════════════════════════════════════════════════════════════════════════
  function animateSummarySection(sectionEl, imageEl) {
    if (!sectionEl || !imageEl || typeof ScrollTrigger === 'undefined') return;
    gsap.matchMedia().add('(min-width: 768px)', function () {
      gsap.timeline({
        scrollTrigger: { trigger: sectionEl, start: 'top bottom', end: 'bottom top', scrub: true }
      }).fromTo(imageEl, { y: '-90vh' }, { y: '80vh', ease: 'none' });
    });
  }


  // ═══════════════════════════════════════════════════════════════════════════════
  // 11. VIDEO SECTION — clipPath reveal teks + video
  // ═══════════════════════════════════════════════════════════════════════════════
  function animateVideoSection(sectionEl, textSpanEl, videoEl) {
    if (!sectionEl || typeof ScrollTrigger === 'undefined') return;
    gsap.matchMedia().add('(min-width: 768px)', function () {
      var vw = window.innerWidth;
      var tl = gsap.timeline({
        scrollTrigger: { trigger: sectionEl, start: 'top top', end: '+=' + (5 * vw) + 'px', pin: true, scrub: 1 }
      });
      if (textSpanEl) {
        tl.fromTo(textSpanEl,
          { clipPath: 'inset(0 100% 0 0)' },
          { clipPath: 'inset(0 0% 0 0)', duration: 2, ease: 'none' },
          1
        );
      }
      if (videoEl) {
        tl.fromTo(videoEl,
          { clipPath: 'inset(10vw)', y: 0 },
          { clipPath: 'inset(0vw)', y: '-100vh', duration: 4, ease: 'none' },
          1.5
        );
      }
      tl.to({}, { duration: 3 });
    });
  }


  // ═══════════════════════════════════════════════════════════════════════════════
  // 12. NETWORK SECTION — mask reveal + pin + bars expand
  // ═══════════════════════════════════════════════════════════════════════════════
  function animateNetworkSection(sectionEl, maskEl, barsContainerEl) {
    if (!sectionEl || typeof ScrollTrigger === 'undefined') return;
    gsap.matchMedia().add('(min-width: 768px)', function () {
      var vh = window.innerHeight;
      var tl = gsap.timeline({
        scrollTrigger: { trigger: sectionEl, pin: true, scrub: 0.3, start: 'top top', end: '+=' + (10 * vh) + 'px' },
        ease: 'none'
      });

      if (maskEl) tl.from(maskEl, { scaleX: 10, scaleY: 5, duration: 4 });

      if (barsContainerEl) {
        var bars = barsContainerEl.querySelectorAll(':scope > div');
        var barsTl = gsap.timeline({ paused: true });
        bars.forEach(function (bar) {
          barsTl.fromTo(bar, { height: 0 }, { height: '100%', duration: 0.7, ease: 'power4.inOut' }, '>-0.5');
        });

        var prevTime = 0;
        var reversed = false;
        tl.to({}, {
          duration: 1,
          onUpdate: function () {
            var now = this.time();
            var isReverse = now < prevTime;
            if (isReverse && !reversed && prevTime === this.duration()) barsTl.reverse();
            prevTime = now;
            reversed = isReverse;
          }
        });
        tl.to({}, { duration: 2, onStart: function () { barsTl.play(); } });
        tl.to({}, { duration: 1 });
      }
    });
  }


  // ═══════════════════════════════════════════════════════════════════════════════
  // 13. NETWORK BAR HOVER — expand/collapse tiap bar pada hover
  //    Returns: { play, reverse } — panggil saat onmouseenter/onmouseleave
  // ═══════════════════════════════════════════════════════════════════════════════
  function createNetworkBarHover(logoEl, bottomEl, detailEl) {
    var tl = gsap.timeline({ paused: true })
      .to(logoEl, { y: 20, autoAlpha: 0, duration: 0.4 }, 0)
      .to(bottomEl, { maxHeight: '40%', duration: 0.5, ease: 'power3.out' }, 0.3)
      .fromTo(detailEl, { y: -20, autoAlpha: 0 }, { autoAlpha: 1, y: 0, duration: 0.4 }, 0.5);

    return {
      play: function () { tl.timeScale(1); tl.play(); },
      reverse: function () { tl.timeScale(1.5); tl.reverse(); }
    };
  }


  // ═══════════════════════════════════════════════════════════════════════════════
  // 14. CULTURE SECTION — folder/card stack scroll-driven
  // ═══════════════════════════════════════════════════════════════════════════════
  function animateCultureSection(sectionEl, foldersEl, onActiveChange) {
    if (!sectionEl || !foldersEl || typeof ScrollTrigger === 'undefined') return;
    gsap.matchMedia().add('(min-width: 768px)', function () {
      var images = foldersEl.querySelectorAll('[data-image]');
      var tl = gsap.timeline({
        scrollTrigger: { trigger: sectionEl, start: 'top top', pin: true, end: '+=4000px', scrub: 1 }
      });
      images.forEach(function (img, i) {
        tl.fromTo(img,
          { yPercent: 120 },
          { yPercent: 5 * i - 5 * images.length, opacity: 1, rotation: 0, duration: 4, ease: 'expo.out' },
          '>-2'
        );
        tl.to(img, {
          scale: 0.7 + 0.05 * i,
          duration: 3,
          ease: 'power3.out',
          onStart: function () { if (onActiveChange) onActiveChange(i); }
        }, '>-3');
      });
    });
  }


  // ═══════════════════════════════════════════════════════════════════════════════
  // 15. HISTORY SECTION — horizontal scroll + panel image reveal (about page)
  // ═══════════════════════════════════════════════════════════════════════════════
  function animateHistorySection(wrapperEl, pinEl, trackEl, panelEls) {
    if (!wrapperEl || typeof ScrollTrigger === 'undefined') return;
    gsap.matchMedia().add('(min-width: 768px)', function () {
      var vw = window.innerWidth;
      var header = document.querySelector('#header');

      var mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperEl,
          start: 'top top',
          end: '+=' + (vw * panelEls.length) + 'px',
          scrub: 1,
          pin: pinEl,
          invalidateOnRefresh: true,
          onUpdate: function () { if (header) header.removeAttribute('data-hidden'); }
        }
      });

      mainTl.to(trackEl, { x: -vw * panelEls.length, ease: 'none', duration: 5 });
      mainTl.to({}, { duration: 1 });

      panelEls.forEach(function (panel) {
        var imageEl = panel.querySelector('[data-mid-image]');
        if (!imageEl) return;
        gsap.timeline({
          scrollTrigger: { trigger: panel, containerAnimation: mainTl, start: 'left 75%' }
        }).fromTo(imageEl,
          { clipPath: 'inset(0% 100% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', ease: 'power3.inOut', duration: 1.2 }
        );
      });

      if (window.exportRoot) window.exportRoot.add(mainTl);
    });
  }


  // ═══════════════════════════════════════════════════════════════════════════════
  // 16. PORTFOLIO GRID — gambar muncul acak (mobile)
  // ═══════════════════════════════════════════════════════════════════════════════
  function animatePortfolioGrid(gridEl) {
    if (!gridEl) return;
    var images = Array.from(gridEl.querySelectorAll('img'));
    gsap.to(images, { autoAlpha: 0, duration: 0.5 });

    var tl = gsap.timeline({ delay: 0.5 });
    var shuffled = gsap.utils.shuffle(images.slice());

    gsap.matchMedia().add('(max-width: 768px)', function () {
      shuffled.forEach(function (img, i) {
        if (i > 3) return;
        var tops  = [0, 50, 0, 50];
        var lefts = [0, 0, 50, 50];
        tl.fromTo(img,
          { scale: 0.5, autoAlpha: 0, top: tops[i] + '%', left: lefts[i] + '%' },
          { autoAlpha: 1, scale: 1, duration: 1, ease: 'power2.out', delay: 0.03,
            top: tops[i] + '%', left: lefts[i] + '%' },
          '<'
        );
      });
    });
  }


  // ═══════════════════════════════════════════════════════════════════════════════
  // 17. GENERIC PARALLAX — helper untuk parallax vertikal
  // ═══════════════════════════════════════════════════════════════════════════════
  function animateParallax(triggerEl, targetEl, fromY, toY) {
    if (!triggerEl || !targetEl || typeof ScrollTrigger === 'undefined') return;
    fromY = fromY || '-50vh';
    toY   = toY   || '50vh';
    gsap.matchMedia().add('(min-width: 768px)', function () {
      gsap.timeline({
        scrollTrigger: { trigger: triggerEl, start: 'top bottom', end: 'bottom top', scrub: true }
      }).fromTo(targetEl, { y: fromY }, { y: toY, ease: 'none' });
    });
  }


  // ═══════════════════════════════════════════════════════════════════════════════
  // 18. AUTO-INIT — scan DOM dan jalankan animasi sesuai data-anim attribute
  //
  //    Tambahkan attribute ini ke elemen HTML kamu:
  //      data-anim="fade"   → revealFade
  //      data-anim="chars"  → revealChars (butuh SplitText)
  //      data-anim="lines"  → revealLines (butuh SplitText)
  //
  //    Untuk section-level animations, tambahkan:
  //      data-section="hero"      → animateHeroSection
  //      data-section="summary"   → animateSummarySection
  //      data-section="video"     → animateVideoSection
  //      data-section="network"   → animateNetworkSection
  //      data-section="culture"   → animateCultureSection
  // ═══════════════════════════════════════════════════════════════════════════════
  function initAnimations() {
    if (!checkGSAP()) return;
    registerPlugins();
    initExportRoot();
    initHeaderScrollBehavior();

    // ── Reveal animations (data-anim) ──────────────────────────────────────────
    document.querySelectorAll('[data-anim="fade"]').forEach(function (el) {
      revealFade(el);
    });
    document.querySelectorAll('[data-anim="chars"]').forEach(function (el) {
      revealChars(el);
    });
    document.querySelectorAll('[data-anim="lines"]').forEach(function (el) {
      revealLines(el);
    });

    // ── Section animations (data-section) ──────────────────────────────────────
    var heroSection = document.querySelector('[data-section="hero"]');
    if (heroSection) {
      animateHeroSection(
        heroSection,
        heroSection.querySelector('[data-hero-globe]'),
        heroSection.querySelector('[data-hero-container]'),
        heroSection.querySelector('[data-hero-stats]')
      );
      animateHeroTitle(
        heroSection,
        heroSection.querySelector('[data-hero-title-container]'),
        heroSection.querySelector('[data-hero-title]')
      );
    }

    var summarySection = document.querySelector('[data-section="summary"]');
    if (summarySection) {
      animateSummarySection(summarySection, summarySection.querySelector('img, .gif'));
    }

    var videoSection = document.querySelector('[data-section="video"]');
    if (videoSection) {
      animateVideoSection(
        videoSection,
        videoSection.querySelector('[data-text-reveal]'),
        videoSection.querySelector('[data-video-reveal]')
      );
    }

    var networkSection = document.querySelector('[data-section="network"]');
    if (networkSection) {
      animateNetworkSection(
        networkSection,
        networkSection.querySelector('[data-mask]'),
        networkSection.querySelector('[data-bars]')
      );
      // Bar hover
      networkSection.querySelectorAll('[data-bar]').forEach(function (bar) {
        var hover = createNetworkBarHover(
          bar.querySelector('[data-bar-logo]'),
          bar.querySelector('[data-bar-bottom]'),
          bar.querySelector('[data-bar-detail]')
        );
        bar.addEventListener('mouseenter', function () { hover.play(); });
        bar.addEventListener('mouseleave', function () { hover.reverse(); });
      });
    }

    var cultureSection = document.querySelector('[data-section="culture"]');
    if (cultureSection) {
      animateCultureSection(
        cultureSection,
        cultureSection.querySelector('[data-folders]')
      );
    }

    var historyWrapper = document.querySelector('[data-section="history"]');
    if (historyWrapper) {
      animateHistorySection(
        historyWrapper,
        historyWrapper.querySelector('[data-history-pin]'),
        historyWrapper.querySelector('[data-history-track]'),
        Array.from(historyWrapper.querySelectorAll('[data-container]'))
      );
    }

    var portfolioGrid = document.querySelector('[data-section="portfolio"]');
    if (portfolioGrid) {
      animatePortfolioGrid(portfolioGrid);
    }

    // ── Transition overlay ──────────────────────────────────────────────────────
    var transitionEl = document.querySelector('.transition, [data-transition]');
    if (transitionEl) {
      animatePageTransition(transitionEl);
    }

    // ── CTA scroll buttons ──────────────────────────────────────────────────────
    document.querySelectorAll('[data-scroll-to]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        scrollTo(btn.getAttribute('data-scroll-to'));
      });
    });
  }


  // ─── Jalankan setelah DOM ready ──────────────────────────────────────────────
  ready(initAnimations);

  // ─── Expose ke global jika dibutuhkan ────────────────────────────────────────
  window.CretivoxAnim = {
    init: initAnimations,
    revealFade: revealFade,
    revealChars: revealChars,
    revealLines: revealLines,
    scrollTo: scrollTo,
    animateHeroSection: animateHeroSection,
    animateHeroTitle: animateHeroTitle,
    animateSummarySection: animateSummarySection,
    animateVideoSection: animateVideoSection,
    animateNetworkSection: animateNetworkSection,
    createNetworkBarHover: createNetworkBarHover,
    animateCultureSection: animateCultureSection,
    animateHistorySection: animateHistorySection,
    animatePortfolioGrid: animatePortfolioGrid,
    animateParallax: animateParallax,
    animatePageTransition: animatePageTransition
  };

})();
