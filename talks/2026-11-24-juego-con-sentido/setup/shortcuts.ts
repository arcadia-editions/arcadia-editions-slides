import { defineShortcutsSetup } from '@slidev/types'

// Clicker sends ArrowDown/ArrowUp. Slidev maps those to nextSlide/prevSlide (skips clicks);
// remap them to next/prev so the clicker steps through v-clicks.
export default defineShortcutsSetup((nav, base) => [
  ...base.filter(s => !['next_down', 'prev_up'].includes(s.name ?? '')),
  { name: 'clicker_next', key: 'down', fn: nav.next, autoRepeat: false },
  { name: 'clicker_prev', key: 'up', fn: nav.prev, autoRepeat: false },
  // Tab (keyCode 9): next slide, skipping clicks
  { name: 'tab_next_slide', key: 'tab', fn: nav.nextSlide, autoRepeat: false },
])
