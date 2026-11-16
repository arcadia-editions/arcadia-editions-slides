<script setup lang="ts">
// Place-order graph; an agent's path lights up one step per click.
// Pass the slide's $clicks as `step`.
defineProps<{ step: number }>()

type Kind = 'event' | 'command'
const W = 148, H = 44
const col = (i: number) => i * 178
const row = (j: number) => 10 + j * 100

const nodes: { id: string; label: string; sys?: string; kind: Kind; x: number; y: number; at?: number }[] = [
  { id: 'created', label: 'OrderCreated', kind: 'event', x: col(0), y: row(0), at: 1 },
  { id: 'authorize', label: 'authorizePayment', sys: 'Payments', kind: 'command', x: col(1), y: row(0), at: 1 },
  { id: 'authorized', label: 'PaymentAuthorized', kind: 'event', x: col(2), y: row(0) },
  { id: 'confirm', label: 'confirmOrder', sys: 'Orders', kind: 'command', x: col(3), y: row(0) },
  { id: 'confirmed', label: 'OrderConfirmed', kind: 'event', x: col(4), y: row(0) },
  { id: 'declined', label: 'PaymentDeclined', kind: 'event', x: col(1), y: row(1), at: 2 },
  { id: 'release', label: 'releaseStock', sys: 'Inventory', kind: 'command', x: col(2), y: row(1), at: 3 },
  { id: 'released', label: 'StockReleased', kind: 'event', x: col(3), y: row(1), at: 4 },
  { id: 'cancel', label: 'cancelOrder', sys: 'Orders', kind: 'command', x: col(4), y: row(1), at: 4 },
  { id: 'expired', label: 'ReservationExpired', kind: 'event', x: col(2), y: row(2) },
  { id: 'failed', label: 'PaymentFailed', kind: 'event', x: col(0), y: row(1) },
  { id: 'cancelled', label: 'OrderCancelled', kind: 'event', x: col(4), y: row(2), at: 5 },
]
const byId = Object.fromEntries(nodes.map(n => [n.id, n]))

// edges: from → to, lit at step `at` (undefined = never lit)
const edges: { from: string; to: string; at?: number }[] = [
  { from: 'created', to: 'authorize', at: 1 },
  { from: 'authorize', to: 'authorized' },
  { from: 'authorized', to: 'confirm' },
  { from: 'confirm', to: 'confirmed' },
  { from: 'authorize', to: 'declined', at: 2 },
  { from: 'authorize', to: 'failed' },
  { from: 'declined', to: 'release', at: 3 },
  { from: 'expired', to: 'release' },
  { from: 'release', to: 'released', at: 4 },
  { from: 'released', to: 'cancel', at: 4 },
  { from: 'cancel', to: 'cancelled', at: 5 },
]

// connect the closest sides of two boxes
function line(e: { from: string; to: string }) {
  const a = byId[e.from], b = byId[e.to]
  const ax = a.x + W / 2, ay = a.y + H / 2, bx = b.x + W / 2, by = b.y + H / 2
  if (Math.abs(ay - by) < 1) return { x1: Math.min(ax, bx) === ax ? a.x + W : a.x, y1: ay, x2: bx > ax ? b.x : b.x + W, y2: by }
  if (Math.abs(ax - bx) < 1) return { x1: ax, y1: by > ay ? a.y + H : a.y, x2: bx, y2: by > ay ? b.y : b.y + H }
  // diagonal: bottom-left corner area of a to top-right of b
  return { x1: a.x + 20, y1: a.y + H, x2: b.x + W - 20, y2: b.y }
}
</script>

<template>
  <svg class="gt" viewBox="0 0 860 260" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="gt-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="12" markerHeight="12" markerUnits="userSpaceOnUse" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#9aa5b1" />
      </marker>
      <marker id="gt-a-on" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="12" markerHeight="12" markerUnits="userSpaceOnUse" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#f7a81b" />
      </marker>
    </defs>
    <line v-for="(e, i) in edges" :key="i" v-bind="line(e)"
      :class="['edge', { on: e.at && step >= e.at }]"
      :marker-end="e.at && step >= e.at ? 'url(#gt-a-on)' : 'url(#gt-a)'" />
    <g v-for="n in nodes" :key="n.id" :class="['node', n.kind, { on: n.at && step >= n.at }]"
      :transform="`translate(${n.x},${n.y})`">
      <rect :width="W" :height="H" rx="6" />
      <text :x="W / 2" :y="n.sys ? 19 : 27" text-anchor="middle" class="lbl">{{ n.label }}</text>
      <text v-if="n.sys" :x="W / 2" y="35" text-anchor="middle" class="sys">{{ n.sys }}</text>
    </g>
  </svg>
</template>

<style scoped>
.gt { width: 100%; height: auto; display: block; overflow: visible; }
.edge { stroke: #c9d1d9; stroke-width: 2; transition: stroke .4s; }
.edge.on { stroke: #f7a81b; stroke-width: 4; }
.node rect { fill: #f1f3f5; stroke: #c9d1d9; stroke-width: 1.5; transition: all .4s; }
.node .lbl { font-size: 14px; font-weight: 600; fill: #9aa5b1; transition: fill .4s; }
.node .sys { font-size: 11px; fill: #b0b8c1; }
.node.on.event rect { fill: #f7a81b; stroke: #d98f0a; }
.node.on.command rect { fill: #00abc5; stroke: #008ba1; }
.node.on .lbl { fill: #31394d; }
.node.on.command .lbl, .node.on.command .sys { fill: #fff; }
.node.on rect { filter: drop-shadow(0 0 6px rgba(247, 168, 27, .55)); }
</style>
