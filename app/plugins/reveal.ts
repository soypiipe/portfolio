// v-reveal: fades/lifts an element in when it enters the viewport.
// Optional value = stagger delay in ms (`v-reveal="120"`).
//
// The entrance can play again: once an element has left the viewport
// *completely* and comes back, it re-arms and enters again. Two observers
// give it hysteresis so it never flickers while scrolling:
//   - enter: fires when 10% of the element is inside the viewport (minus a
//     60px strip at the bottom, so it starts a beat after appearing);
//   - exit:  fires only once the element is completely off screen (32px past
//            the edge, see below).
// An element that is partly visible is therefore never hidden, and one that
// is hidden can only be re-armed off screen, where nobody sees it snap.
//
// Registered as a universal plugin (not `.client.ts`) on purpose: Vue's
// server renderer needs the directive to exist in the app's directive map
// even though it does nothing during SSR, otherwise it throws trying to
// read SSR props off an unregistered directive. All the real work happens
// in `mounted`, which never runs during SSR anyway — so this stays
// progressive-enhancement-safe: elements are only hidden *after* mount,
// meaning a JS failure never leaves content invisible.
export default defineNuxtPlugin((nuxtApp) => {
  const cleanups = new WeakMap<HTMLElement, () => void>()

  nuxtApp.vueApp.directive('reveal', {
    mounted(el: HTMLElement, binding: { value?: number }) {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const delay = binding.value ? `${binding.value}ms` : null

      // Already on screen at load: hiding it now would only make it flash.
      // It still gets the exit observer, so it re-arms once scrolled away.
      let shown = el.getBoundingClientRect().top < window.innerHeight * 0.9
      if (!shown) el.classList.add('reveal', 'reveal-pending')
      if (delay) el.style.setProperty('--reveal-delay', delay)

      function show() {
        shown = true
        el.classList.add('reveal')
        el.classList.remove('reveal-pending')
      }

      function hide() {
        shown = false
        el.classList.add('reveal-pending')
      }

      // Once the entrance is done, drop the transition (and its delay) so it
      // can't interfere with the element's own hover states. Not while
      // re-armed: then `reveal` has to stay for the next entrance.
      function onEnd(e: TransitionEvent) {
        // transitionend bubbles — ignore the ones from descendants.
        if (e.target !== el || !shown) return
        el.classList.remove('reveal')
      }

      const enter = new IntersectionObserver(
        (entries) => {
          if (entries[entries.length - 1]?.isIntersecting && !shown) show()
        },
        { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
      )
      // The hidden state sits 28px lower (see `.reveal-pending`). If an element
      // left through the top edge and re-armed right there, that shift would
      // push it back into view, it would re-enter, leave, re-arm… a flicker
      // loop. The 32px margin means it only re-arms once it is farther than
      // the shift away from the viewport, so the shift can never bring it back.
      const exit = new IntersectionObserver(
        (entries) => {
          if (entries[entries.length - 1]?.isIntersecting === false && shown) hide()
        },
        { threshold: 0, rootMargin: '32px 0px' }
      )

      el.addEventListener('transitionend', onEnd)
      enter.observe(el)
      exit.observe(el)

      cleanups.set(el, () => {
        enter.disconnect()
        exit.disconnect()
        el.removeEventListener('transitionend', onEnd)
      })
    },
    unmounted(el: HTMLElement) {
      cleanups.get(el)?.()
      cleanups.delete(el)
    }
  })
})
