// v-reveal: fades/lifts an element in once it enters the viewport.
// Optional value = stagger delay in ms (`v-reveal="120"`).
//
// Registered as a universal plugin (not `.client.ts`) on purpose: Vue's
// server renderer needs the directive to exist in the app's directive map
// even though it does nothing during SSR, otherwise it throws trying to
// read SSR props off an unregistered directive. All the real work happens
// in `mounted`, which never runs during SSR anyway — so this stays
// progressive-enhancement-safe: elements are only hidden *after* mount,
// meaning a JS failure never leaves content invisible.
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', {
    mounted(el: HTMLElement, binding: { value?: number }) {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      // Already on screen at load: hiding it now would only make it flash.
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return

      if (binding.value) el.style.setProperty('--reveal-delay', `${binding.value}ms`)
      el.classList.add('reveal', 'reveal-pending')

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue
            el.classList.remove('reveal-pending')
            observer.unobserve(el)
            // Once the entrance is done, drop the transition (and its delay)
            // so it can't interfere with the element's own hover states.
            const onEnd = (e: TransitionEvent) => {
              // transitionend bubbles — ignore the ones from descendants.
              if (e.target !== el) return
              el.classList.remove('reveal')
              el.style.removeProperty('--reveal-delay')
              el.removeEventListener('transitionend', onEnd)
            }
            el.addEventListener('transitionend', onEnd)
          }
        },
        { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
      )

      observer.observe(el)
    }
  })
})
