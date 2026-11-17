<script setup lang="ts">
// Place-order flow drawn as a metro map: each branch of the flow is a line,
// events are stations, end states are termini, shared events are transfers.
type St = { x: number; y: number; label: string; pos?: 'above' | 'below' | 'right' | 'left'; transfer?: boolean; terminus?: boolean }

const lines = [
  { name: 'completed', color: '#00abc5', d: 'M40,120 H820' },
  { name: 'stockGone', color: '#31394d', d: 'M40,120 L100,60 H330' },
  { name: 'orderCancelled', color: '#f7a81b', d: 'M170,120 L250,200 H800' },
  { name: 'compensation', color: '#d6457a', d: 'M560,120 V260 H500 L470,230 V200' },
]

const stations: St[] = [
  { x: 40, y: 120, label: 'StartOrderCheckout', pos: 'below', transfer: true },
  { x: 170, y: 120, label: 'OrderCreated', pos: 'above', transfer: true },
  { x: 300, y: 120, label: 'PaymentAuthorized', pos: 'below' },
  { x: 430, y: 120, label: 'OrderConfirmed', pos: 'below' },
  { x: 560, y: 120, label: 'FulfillmentScheduled', pos: 'above', transfer: true },
  { x: 690, y: 120, label: 'PaymentCaptured', pos: 'below' },
  { x: 820, y: 120, label: 'completed', pos: 'above', terminus: true },
  { x: 190, y: 60, label: 'StockUnavailable', pos: 'above' },
  { x: 330, y: 60, label: 'stockGone', pos: 'right', terminus: true },
  { x: 310, y: 200, label: 'PaymentDeclined', pos: 'below' },
  { x: 470, y: 200, label: 'StockReleased', pos: 'above', transfer: true },
  { x: 640, y: 200, label: 'OrderCancelled', pos: 'above' },
  { x: 800, y: 200, label: 'orderCancelled', pos: 'above', terminus: true },
  { x: 560, y: 230, label: 'FulfillmentFailed', pos: 'right' },
  { x: 530, y: 260, label: 'PaymentVoided', pos: 'below' },
]

function lbl(s: St) {
  const o = { above: [0, -16, 'middle'], below: [0, 26, 'middle'], right: [14, 5, 'start'], left: [-14, 5, 'end'] }[s.pos || 'below']
  return { x: s.x + (o[0] as number), y: s.y + (o[1] as number), 'text-anchor': o[2] as string }
}
</script>

<template>
  <svg class="metro" viewBox="0 0 860 300" xmlns="http://www.w3.org/2000/svg">
    <path v-for="l in lines" :key="l.name" :d="l.d" :stroke="l.color" class="track" />
    <g v-for="s in stations" :key="s.label">
      <rect v-if="s.terminus" :x="s.x - 9" :y="s.y - 9" width="18" height="18" rx="3" class="term" />
      <circle v-else :cx="s.x" :cy="s.y" :r="s.transfer ? 10 : 7" :class="s.transfer ? 'xfer' : 'stop'" />
      <text v-bind="lbl(s)" :class="s.terminus ? 'tlabel' : 'slabel'">{{ s.label }}</text>
    </g>
  </svg>
</template>

<style scoped>
.metro { width: 100%; height: auto; display: block; overflow: visible; }
.track { fill: none; stroke-width: 9; stroke-linecap: round; stroke-linejoin: round; }
.stop { fill: #fff; stroke: #31394d; stroke-width: 3; }
.xfer { fill: #fff; stroke: #31394d; stroke-width: 4.5; }
.term { fill: #31394d; }
.slabel { font-size: 13px; font-weight: 600; fill: #31394d; }
.tlabel { font-size: 14px; font-weight: 800; fill: #31394d; font-style: italic; }
</style>
