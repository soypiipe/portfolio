// v-reveal: fades/lifts an element in once it enters the viewport.
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
    mounted(el: HTMLElement) {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      el.classList.add('reveal', 'reveal-pending')

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              el.classList.remove('reveal-pending')
              observer.unobserve(el)
            }
          }
        },
        { threshold: 0.15, rootMargin: '0px 0px -80px 0px' }
      )

      observer.observe(el)
    }
  })
})
