<template>
  <div class="min-h-screen text-primary">
    <!-- No bg on this wrapper on purpose: the page background lives on <body>
         so the fixed TheBackground layer (z -10) sits between it and the content. -->
    <TheBackground />
    <TheNavigation />
    <main>
      <slot />
    </main>
    <TheFooter />
  </div>
</template>
