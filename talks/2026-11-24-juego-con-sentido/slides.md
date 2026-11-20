---
theme: ../../packages/theme-arcadia
title: ''
routerMode: hash
layout: section
---

<!-- Juego con Sentido · 24 Nov 2026. Event Storming details, projections and skills shown live, no slides. -->

<p style="font-size:26px;line-height:1.2;text-align:center;margin:0">AI-Assisted Domain Driven Design</p>
<p style="font-size:34px;line-height:1.2;font-weight:700;text-align:center;margin-top:16px">From Event Storming to an Event-Driven modular monolith with Kotlin & Spring Boot</p>

<p style="position:absolute;left:24px;bottom:12px;font-size:18px;color:#6b7785;margin:0">Ivan Garcia Sainz-Aja</p>
<p style="position:absolute;right:24px;bottom:12px;font-size:18px;color:#6b7785;margin:0">Juego con Sentido · 24 November 2026</p>

---
layout: section
title: 'Software Engineering in 2026'
---

<h1 style="font-size:64px !important;text-align:center">Spec Driven Development</h1>

---
layout: section
title: 'Software Engineering in 2026'
---

<ul class="opening-list">
  <li v-click="1"><ph-code-bold class="ic code" />Generating <span class="code">code</span> becomes cheap</li>
  <li v-click="2"><ph-magnifying-glass-bold class="ic verify" /><span class="verify">Design and verification</span> still not
    <ul>
      <li v-click="3" class="p1"><ph-compass-bold class="ic" />Understanding the domain <span v-click="6" class="pillar">DDD as Code</span></li>
      <li v-click="4" class="p2"><ph-seal-check-bold class="ic" />Proving the design is correct <span v-click="7" class="pillar">Formal Verification</span></li>
      <li v-click="5" class="p3"><ph-flask-bold class="ic" />Validating the result <span v-click="8" class="pillar">Behaviour Validation</span></li>
    </ul>
  </li>
</ul>

<!-- Answer to the Markdown problem: when code is cheap, what remains are the three pillars of software engineering. Clicks 3-5: the three problems; 6-8: the technique for each (DDD, FV, SbE). All three happen BEFORE handing the spec to the agent. -->

<style>
.opening-list { list-style: none; margin: 0; padding: 0; text-align: left; }
.opening-list li { font-size: 40px !important; font-weight: 700; line-height: 1.3 !important; margin: 0.5em 0 !important; color: #31394d; }
.opening-list .ic { display: inline-block; width: 1.1em; height: 1.1em; margin-right: 0.5em; vertical-align: -0.2em; color: #6b7785; }
.opening-list ul { list-style: none; margin: 0.5em 0 0 1.6em; padding: 0; }
.opening-list ul li { font-size: 32px !important; font-weight: 700; margin: 0.45em 0 !important; }
.opening-list .pillar { margin-left: 0.4em; padding: 0 0.35em; border-radius: 6px; font-size: 0.8em; color: #fff; }
.opening-list .p1 .pillar { background: #00abc5; }
.opening-list .p2 .pillar { background: #f7a81b; color: #31394d; }
.opening-list .p3 .pillar { background: #3fb27f; }
.opening-list .code { color: #00abc5; }
.opening-list .verify { color: #f7a81b; }
</style>

---
layout: default
title: 'The three pillars of agentic engineering'
---

<div style="margin:-34px -55px -38px;height:457px;box-sizing:border-box;padding:10px;display:flex;align-items:center;justify-content:center">
<Shot src="/three-pillars-of-agentic-engineering-comic.webp" todo="Three pillars comic" h="437px" />
</div>

<!-- Architect (DDD), scientist (FV), site inspector (SbE) feed the robot; its fast stream of code is filtered by the examples gate. Today: mostly pillar 1, a first look at pillar 2. -->

---
layout: section
title: 'Software Engineering in 2026'
---

<h1 style="font-size:64px !important;text-align:center">The problem</h1>

---
layout: default
title: 'Markdown is the bottleneck'
---

<div style="margin:-34px -55px -38px;height:457px;box-sizing:border-box;padding:10px;display:flex;align-items:center;justify-content:center">
<Shot src="/Markdown-Mayhem_%20LLM-Paper-Flood.png" todo="LLM flooding a developer with Markdown" h="437px" />
</div>

<!-- Only the problem: LLMs generate Markdown faster than anyone can read it. The developer drowns. Leads into "Markdown is the bottleneck". -->

---
layout: default
title: 'The problem: Markdown is the bottleneck'
hide: true
---

<div style="margin:-34px -55px -38px;height:457px;box-sizing:border-box;padding:10px;display:flex;align-items:center;justify-content:center">
<Shot src="/markdown-is-the-bottleneck-featured.webp" todo="Markdown is the bottleneck (blog featured image)" h="437px" />
</div>

<!-- The problem. LLMs write Markdown faster than any human can read it. Nobody reads it all; decisions slip in as "approved". Reading Markdown is the bottleneck. -->

---
layout: section
title: ''
---

<h1 style="font-size:64px !important;text-align:center">The proposal</h1>

---
layout: section
title: 'The proposal'
---

<h1 class="ddd-title">Domain Driven Design</h1>

<h1 v-click="1" class="ddd-ascode">as code</h1>

<!-- The proposal: DDD. Click: as code. Next slide shows what "as code" means. -->

<style>
.ddd-title { font-size: 48px !important; }
.ddd-ascode { color: #00abc5 !important; font-size: 76px !important; margin-top: -4px !important; }
</style>

---
layout: section
title: 'Domain Driven Design'
titleAccent: ' as code'
---

<div class="p2-row">

<img v-click="1" class="p2-blueprints" src="/Layered-EventStorming-Blueprint-Stack.png" alt="Event Storming, state machine and class diagram blueprints" />

<div v-click="2" class="p2-models">
<span class="p2-arrow">→</span>
<div class="p2-files">
<div class="p2-file zfl">
<b>place-order.zfl <small>Process Level</small></b>

```zfl
when OrderCreated do authorizePayment {
    service PaymentsProcessing
    emits PaymentAuthorized
    emits PaymentDeclined
}
```

</div>
<div class="p2-file zdl">
<b>payments-processing.zdl <small>Design Level</small></b>

```zfl
service PaymentsProcessingService {
  @asyncapi(channel: "order-created")
  authorizePayment(AuthorizePaymentInput)
    withEvents [PaymentAuthorized |
                         PaymentDeclined]
}
```

</div>
</div>
</div>

</div>

<!-- Variant B: ZDL shows a service (command + events) instead of the aggregate, to connect with Event Storming. What "as code" means. Clicks: 1 the blueprints (Event Storming, state machines, class diagrams), 2 they become real code: ZFL (process level) + ZDL (design level). -->

<style>
.p2-row { display: flex; align-items: center; justify-content: center; gap: 28px; }
.p2-blueprints { height: 235px; width: auto; flex: none; transform: rotate(-9deg); }
.p2-models { display: flex; align-items: center; gap: 18px; }
.p2-arrow { font-size: 48px; color: #31394d; }
.p2-files { display: flex; flex-direction: column; gap: 12px; text-align: left; }
.p2-file { border-left: 6px solid #31394d; border-radius: 6px; box-shadow: 0 4px 14px rgba(49,57,77,.18); background: #fff; padding: 6px 10px 2px; }
.p2-file.zfl { border-left-color: #f7a81b; }
.p2-file.zdl { border-left-color: #00abc5; }
.p2-file b { display: block; font-size: 16px; color: #31394d; margin-bottom: 4px; }
.p2-file b small { font-weight: 400; color: #6b7785; margin-left: 8px; }
.p2-file .slidev-code { margin: 0 !important; --slidev-code-font-size: 15px; --slidev-code-line-height: 1.4; }
</style>

---
layout: section
title: ''
---

<h1 style="font-size:64px !important;text-align:center">EventStorming as Code</h1>

---
layout: default
title: 'ZFL: Process Level Event Storming as Code'
hide: true
---

<div style="margin:-34px -55px -38px;height:457px;box-sizing:border-box;padding:10px;display:flex;align-items:center;justify-content:center">
<Shot src="/event-storming-zfl-eventflow-and-systems.webp" todo="ZFL editor + event flow + systems" h="437px" />
</div>

<!-- ZFL: Process Level as code. Built this year on top of the ZDL experience. Delivers what it promises so far, but not production-proven yet. -->

---
layout: default
title: 'ZDL: Design Level Event Storming as Code'
---

<div style="margin:-32px -55px -38px">
<Shot src="/EventStorming-ZDL-Mapping.png" todo="2023 image: Event Storming design level mapped to ZDL" h="455px" />
</div>

<!-- ZDL: Design Level as code. Built 2023, in production projects for 4 years. Gave me the experience building DSLs, parsers and IDE editors (highlighting, autocomplete, preview). -->

---
layout: cover
title: 'Arcadia Editions'
---

<Shot src="/arcadia-editions-logo.png" todo="Arcadia Editions logo (centered)"" />

---
layout: default
title: 'Arcadia Editions @ GitHub'
---

<p style="position:absolute;right:24px;bottom:12px;font-size:20px;color:#6b7785;margin:0">github.com/arcadia-editions</p>

<div style="margin:-22px -55px 0">
<Shot src="/arcadia-editions-github-screenshot.png" todo="Screenshot: Arcadia Editions GitHub org main page" h="405px" />
</div>


---
layout: default
title: 'Arcadia Editions in Miro'
---

<div style="margin:20px -55px 10px">
<Shot src="/003-event-storming-arcadia-editions.jpg" todo="First Miro Event Storming" />
</div>

---
layout: section
title: 'Arcadia Editions'
---

<img src="/magnifying-glass.png" alt="Magnifying glass" style="height:140px;margin:0 auto;display:block" />

# Discovering the domain

<!-- Event Storming live. -->

---
layout: default
title: 'Deterministic generation'
---

<div style="margin:-34px -55px -38px;height:457px;box-sizing:border-box;padding:10px 0;display:flex;align-items:center;justify-content:center">
<Shot src="/zenwave-website-light.png" todo="Screenshot: ZenWave website" h="437px" />
</div>

<!-- Flashback: ZenWave -->

---
layout: section
title: 'Formal Verification'
---

<h1 style="font-size:64px !important;text-align:center">Formal Verification</h1>

<!-- Pillar 2: proving the design is correct. Experiments with the models and TLA+. -->

---
layout: default
title: 'What is formal verification?'
hide: true
---

<div class="fv">
  <div class="fv-col tests">
    <small>Tests</small>
    <b>Check the cases you thought of</b>
    <span>A few paths, chosen by a human</span>
  </div>
  <div v-click="1" class="fv-col proof">
    <small>Formal verification</small>
    <b>Check every possible state</b>
    <span>All interleavings, all orderings, all failures</span>
  </div>
</div>

<div v-click="2" class="fv-props">
  <p><b>Safety</b> · something bad never happens <em>"never ship an unpaid order"</em></p>
  <p><b>Liveness</b> · something good eventually happens <em>"a declined payment always releases the stock"</em></p>
</div>

<!-- Define it before using it. Tests sample the behaviour; formal verification (model checking) explores every reachable state of a model and checks properties. Two kinds of property: safety and liveness. Reference tool: TLA+. -->

<style>
.fv { display: flex; gap: 28px; justify-content: center; margin-top: 6px; }
.fv-col { display: flex; flex-direction: column; gap: 6px; width: 380px; padding: 14px 20px; background: #fff; box-shadow: 0 4px 14px rgba(49,57,77,.18); }
.fv-col.tests { border-left: 6px solid #9aa5b1; }
.fv-col.proof { border-left: 6px solid #f7a81b; }
.fv-col small { font-size: 15px; color: #6b7785; text-transform: uppercase; letter-spacing: .05em; }
.fv-col b { font-size: 28px; line-height: 1.2; color: #31394d; }
.fv-col span { font-size: 18px; color: #31394d; }
.fv-props { margin-top: 30px; }
.fv-props p { margin: 0.4em 0 !important; font-size: 22px; color: #31394d; }
.fv-props em { color: #6b7785; }
</style>

---
layout: default
title: 'Why formal verification?'
hide: true
---

<div class="why">
  <p class="why-lead">In an event-driven flow, the bugs live <span class="hl">between</span> services</p>
  <ul class="why-list">
    <li v-click="1">Race conditions between events</li>
    <li v-click="2">Lost or missing compensations</li>
    <li v-click="3">Stuck states: orders that never finish</li>
  </ul>
  <p v-click="4" class="why-end">Tests rarely find them. Exploring every state does.</p>
</div>

<!-- DRAFT, content to review. Why, not how: the hard bugs in event-driven flows are in the interleavings between services, not inside one service. Tests sample a few paths; model checking explores all of them. -->

<style>
.why-lead { margin: 0 0 18px !important; font-size: 32px !important; font-weight: 700; color: #31394d; }
.why-lead .hl { color: #f7a81b; }
.why-list { list-style: none; margin: 0; padding: 0; }
.why-list li { font-size: 28px !important; font-weight: 600; margin: 0.4em 0 0 1em !important; color: #31394d; }
.why-list li::before { content: "⚠"; margin-right: 0.5em; color: #f7a81b; }
.why-end { margin-top: 26px !important; font-size: 28px !important; font-weight: 700; color: #00abc5; }
</style>

---
layout: default
title: 'Towards formal verification'
hide: true
---

# Towards formal verification?

<div style="height:300px;display:flex;align-items:center;justify-content:center">
  <ul class="tbd">
    <li v-click>ZFL links the state machines of each ZDL into one flow</li>
    <li v-click>Every action has its compensation</li>
    <li v-click>Each ZDL state machine is valid by itself</li>
    <li v-click>With discipline → verifiable business flows</li>
  </ul>
</div>

<!-- Pointer only, not a promise. Building blocks are in ZFL; needs discipline. Orange = not green yet, not red: still to be proven. -->

<style>
.tbd { list-style: none; margin: 0; padding: 0; text-align: left; }
.tbd li { display: flex; align-items: center; gap: 0.6em; font-size: 30px !important; font-weight: 700; line-height: 1.2 !important; margin: 0.35em 0 !important; color: #31394d; }
/* orange checkbox: checks we need to pass; not green yet, not red either */
.tbd li::before {
  content: "✓"; flex: none; width: 1.3em; height: 1.3em; box-sizing: border-box;
  border: 0.12em solid #f7a81b; border-radius: 0.2em;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.85em; font-weight: 900; line-height: 1; color: #f7a81b;
}
</style>

---
layout: default
title: 'When correct pieces behave incorrectly'
---

<div style="margin:-34px -55px -38px;height:457px;box-sizing:border-box;padding:10px;display:flex;align-items:center;justify-content:center">
<Shot src="/three-pillars-formal-verification-featured.webp" todo="FV featured: green services, one red path" h="437px" />
</div>

<p v-click class="cp-question">What about the scenarios we haven't thought of?</p>

<!-- Pillar 2. Easy: one endpoint, one topic. Hard: the system as a whole. Concurrent processes, events in any order, timers expire, operations fail, compensations fire. Each service correct in isolation, the system incorrect. We draw diagrams, walk scenarios, write tests... for the scenarios we thought of. Formal verification: describe pieces + interactions + what "correct" means (safety: bad never happens; liveness: good eventually happens). Model checker explores every reachable state and gives a counterexample. At design time, before any code. Reference: TLA+ (Lamport). -->

<style>
.cp-question {
  position: absolute; left: 55px; right: 55px; bottom: 18px; margin: 0 !important; padding: 10px 16px;
  background: #fff; border-left: 6px solid #f7a81b; box-shadow: 0 4px 14px rgba(49,57,77,.18);
  font-size: 26px; font-weight: 700; color: #31394d; text-align: center;
}
</style>

---
layout: default
title: 'What a formal specification describes'
---

<ul class="fspec">
  <li v-click><ph-circles-four-bold class="ic" />The <b>state</b> of the system and its possible initial states</li>
  <li v-click><ph-arrows-left-right-bold class="ic" />The <b>actions</b> that can change that state</li>
  <li v-click><ph-seal-check-bold class="ic" />The <b>properties</b> we want the system to satisfy</li>
  <li v-click><ph-warning-bold class="ic" />The <b>assumptions</b> under which the system operates</li>
</ul>

<!-- Properties: safety (something bad never happens) and liveness (something desired eventually happens). Model checking explores all reachable states of a finite model; on a violation it gives a counterexample: the sequence of actions that led to it. At design time, before code. Reference language: TLA+ (Lamport). -->

<style>
.fspec { list-style: none; margin: 20px 0 0; padding: 0; }
.fspec li { font-size: 32px !important; line-height: 1.3 !important; margin: 0.55em 0 !important; color: #31394d; }
.fspec li b { color: #d98f0a; }
.fspec .ic { display: inline-block; width: 1.1em; height: 1.1em; margin-right: 0.5em; vertical-align: -0.2em; color: #f7a81b; }
</style>

---
layout: default
title: "Don't we already have it in our domain models?"
---

<table class="fv-map">
  <thead><tr><th>ZFL</th><th>ZDL</th><th>What it tells us</th></tr></thead>
  <tbody>
    <tr v-click><td></td><td><code>@lifecycle</code>, <code>@transition</code></td><td>Aggregate states and transitions</td></tr>
    <tr v-click><td><code>emits</code></td><td><code>withEvents</code></td><td>Possible outcomes of a command</td></tr>
    <tr v-click><td><code>when Event do command</code></td><td><code>@listener</code></td><td>Async interactions between contexts</td></tr>
    <tr v-click><td><code>call</code></td><td><code>@calls</code></td><td>Sync interactions</td></tr>
    <tr v-click><td><code>@time</code></td><td><code>@timer</code></td><td>Time-triggered actions</td></tr>
    <tr v-click><td><code>@compensates</code></td><td></td><td>Compensation relationships</td></tr>
    <tr v-click><td><code>@outcome</code>, <code>end</code></td><td></td><td>Declared outcomes of a business flow</td></tr>
  </tbody>
</table>

<!-- First thought when learning TLA+: with DDD as code we already describe lifecycles, commands, events, transitions and interactions between BCs in a machine-readable language. Much of the structure of a state machine, distributed across aggregates and contexts. Open question: how much translates to a formal spec without inventing design decisions the modeller never made. -->

<style>
.fv-map { width: 100%; border-collapse: collapse; font-size: 20px; color: #31394d; }
.fv-map th { text-align: left; padding: 6px 12px; border-bottom: 3px solid #31394d; }
.fv-map th:nth-child(1) { color: #d98f0a; }
.fv-map th:nth-child(2) { color: #00abc5; }
.fv-map td { padding: 6px 12px; border-bottom: 1px solid #d6dbe1; }
.fv-map code { font-size: 18px; }
</style>

---
layout: two-columns
title: 'Formal verification with TLA+'
class: code-tla
---

::left::

```tla
---- MODULE PlaceOrder ----
EXTENDS Naturals
VARIABLES order, stock, payment
vars == <<order, stock, payment>>

Init ==
  /\ order   = "CREATED"
  /\ stock   = "RESERVED"
  /\ payment = "PENDING"

Authorize ==
  /\ payment  = "PENDING"
  /\ payment' = "AUTHORIZED"
  /\ UNCHANGED <<order, stock>>

Decline ==
  /\ payment  = "PENDING"
  /\ payment' = "DECLINED"
  /\ UNCHANGED <<order, stock>>
```

::right::

```tla
ReleaseStock ==   \* compensates reserveStock
  /\ payment = "DECLINED"
  /\ stock   = "RESERVED"
  /\ stock'  = "RELEASED"
  /\ UNCHANGED <<order, payment>>

CancelOrder ==
  /\ stock  = "RELEASED"
  /\ order  = "CREATED"
  /\ order' = "CANCELLED"
  /\ UNCHANGED <<stock, payment>>

Next == Authorize \/ Decline
          \/ ReleaseStock \/ CancelOrder
Spec == Init /\ [][Next]_vars /\ WF_vars(Next)

\* a declined payment never leaks stock
NoLeak == (payment = "DECLINED")
            ~> (stock = "RELEASED" /\ order = "CANCELLED")
===========================
```


<!-- TLA+ = the real thing for formal verification, but nobody on the team reads this. ZFL + ZDL: not 100% of what TLA+ checks, but user friendly. Same flow as the ZFL "when PaymentDeclined do releaseStock" lines. -->

<style>
.code-tla { --slidev-code-font-size: 13px; --slidev-code-line-height: 1.3; }
.tla-verdict {
  position: absolute; left: 55px; right: 55px; bottom: 18px; padding: 10px 16px;
  background: #fff; border-left: 6px solid #f7a81b; box-shadow: 0 4px 14px rgba(49,57,77,.18);
  font-size: 24px; font-weight: 700; color: #31394d;
}
</style>

---
layout: default
title: 'One policy: from the models to TLA+'
class: code-sm
hide: true
---

````md magic-move {lines: true}
```zfl
// ZFL: the policy, when StockReleased do cancelOrder
@compensates(startOrderCheckout)
when StockReleased do cancelOrder {
    service OrdersCheckout.OrdersCheckoutService
    emits OrderCancelled
}
```

```zfl {2-3}
// ZDL: who listens, and from which states
@listener(zdl: CatalogInventoryZdl, event: StockReleased)
@transition(from: [CREATED, CONFIRMED], to: CANCELLED)
cancelOrder(CancelOrderInput) Order withEvents OrderCancelled
```

```tla
\* TLA+: the same step as an action
CancelOrder ==
  /\ "StockReleased" \in pending
  /\ IF order \in {"CREATED", "CONFIRMED"}
     THEN /\ order' = "CANCELLED"
          /\ Emit("StockReleased", {"OrderCancelled"})
     ELSE /\ UNCHANGED order
          /\ Emit("StockReleased", {})
  /\ UNCHANGED <<reservation, payment>>
```

```tla {2-3}
\* TLA+: what the models don't say
\* the ELSE branch: what happens in an unexpected state?
\* `pending`: how events are delivered, in which order
NoHoldOnCancelledOrder ==
  Quiescent => ~(order = "CANCELLED" /\ payment = "AUTHORIZED")
```
````

<!-- Trigger, guard and target state come straight from the models. The ELSE branch, event delivery and the property itself do not: they come from prose or assumptions. -->

---
layout: default
title: 'An experiment: model-checking Arcadia Editions'
---

<div class="xp">
<div class="xp-col">
<b class="xp-h">Exploring every path · Place Order flow</b>
<table class="xp-t">
  <tbody>
    <tr><td>Parsing</td><td>7 of 7 files conform to their grammars</td></tr>
    <tr><td>Static checks ZFL ↔ ZDL</td><td><strong>19 errors</strong></td></tr>
    <tr><td>All paths, one order</td><td>220 states · 8 final states · <strong class="bad">3 incorrect</strong></td></tr>
    <tr><td>Repaired design</td><td>312 states · <strong class="ok">no incorrect final states</strong></td></tr>
  </tbody>
</table>
</div>
<div v-click class="xp-col">
<b class="xp-h">How far from TLA+? <small>0 = vocabulary · 100 = mechanical translation</small></b>
<table class="xp-t">
  <tbody>
    <tr><td>Current Arcadia domain models</td><td class="n">30–45</td></tr>
    <tr><td>With stricter modelling discipline</td><td class="n">45–58</td></tr>
    <tr><td>With five additional language conventions</td><td class="n">65–80</td></tr>
    <tr><td>Reference TLA+ specification</td><td class="n">100</td></tr>
  </tbody>
</table>
</div>
</div>

<!-- Independent agent run: only the two grammars, their docs and the Arcadia models (1 ZFL + 6 ZDLs). ~1,200 lines of Python, no TLA+ tooling. 19 errors from static analysis alone. 3 incorrect final states: customer charged for a cancelled order, orphaned payment hold, fulfillment scheduled on a cancelled order. First one: race between happy path and reservation timer. Catch: it had to assume event delivery, timers, unexpected states; properties came from prose. Scores: one agent's judgment, one slice of one flow, reference spec not reviewed nor run through TLC. Not verification coverage. Missing: execution semantics, outcome↔state link, explicit correct end states. Markdown SDD spec: ~5–10 (different scale). -->

<style>
.xp { display: flex; gap: 24px; margin-top: 4px; }
.xp-col { flex: 1; padding: 10px 14px; background: #fff; box-shadow: 0 4px 14px rgba(49,57,77,.18); border-top: 6px solid #f7a81b; border-radius: 6px; }
.xp-h { display: block; font-size: 18px; color: #31394d; margin-bottom: 6px; }
.xp-h small { display: block; font-weight: 400; font-size: 13px; color: #6b7785; }
.xp-t { width: 100%; border-collapse: collapse; font-size: 16px; color: #31394d; }
.xp-t td { padding: 7px 6px; border-bottom: 1px solid #d6dbe1; vertical-align: top; }
.xp-t td:first-child { color: #6b7785; }
.xp-t td.n { text-align: right; font-weight: 700; white-space: nowrap; }
.xp-t .bad { color: #d64545; }
.xp-t .ok { color: #3fb27f; }
</style>

---
layout: default
title: 'ZFL is not 100% of TLA+'
---

<div style="margin:-34px -55px -38px;height:457px;box-sizing:border-box;padding:10px;display:flex;align-items:center;justify-content:center">
<Shot src="/tla-vs-zfl-zdl.webp" todo="Same rule: TLA+ vs ZFL + ZDL" h="437px" />
</div>

<p v-click class="cp-question">ZFL is not 100% of TLA+ … but humans can read it.</p>

<!-- How many of us write a TLA+ spec for every business flow? I don't. But I do write domain models. If they give a useful subset of FV with a small extra modelling effort: a warning in the IDE, the same checks in CI. Doesn't replace TLA+ or an expert. Still a hypothesis: blog post on ivangsa.com. -->

<style>
.cp-question {
  position: absolute; left: 55px; right: 55px; bottom: 18px; margin: 0 !important; padding: 10px 16px;
  background: #fff; border-left: 6px solid #f7a81b; box-shadow: 0 4px 14px rgba(49,57,77,.18);
  font-size: 26px; font-weight: 700; color: #31394d; text-align: center;
}
</style>

---
layout: section
title: 'Behaviour Validation'
---

<h1 style="font-size:64px !important;text-align:center">Behaviour Validation</h1>

<!-- Pillar 3: validating the result. -->

---
layout: default
title: 'Behaviour Validation'
---

# Behaviour Validation

<ul class="bv">
  <li v-click>Specification by Example</li>
  <li v-click>Acceptance TDD</li>
  <li v-click>BDD</li>
</ul>

<!-- TODO: content. Examples agreed and approved BEFORE handing the spec to the agent; independent check of the code it produces. -->

<style>
.bv { list-style: none; margin: 30px 0 0; padding: 0; }
.bv li { font-size: 36px !important; font-weight: 700; margin: 0.5em 0 !important; color: #31394d; }
.bv li::before { content: "▸"; margin-right: 0.5em; color: #3fb27f; }
</style>

---
layout: section
title: 'Software Engineering in 2026'
---

<ul class="opening-list">
  <li><ph-code-bold class="ic code" />Generating <span class="code">code</span> becomes cheap</li>
  <li><ph-magnifying-glass-bold class="ic verify" /><span class="verify">Design and verification</span> still not
    <ul>
      <li class="p1"><ph-compass-bold class="ic" />Understanding the domain <span v-click="1" class="pillar">DDD as Code</span></li>
      <li class="p2"><ph-seal-check-bold class="ic" />Proving the design is correct <span v-click="2" class="pillar">Formal Verification</span></li>
      <li class="p3"><ph-flask-bold class="ic" />Validating the result <span v-click="3" class="pillar">Behaviour Validation</span></li>
    </ul>
  </li>
</ul>

<!-- Recap: same opening slide, now with the answers. DDD: fully answered today (DDD as code: ZFL + ZDL). FV: a first look, still a hypothesis (ZFL + ZDL → TLA+). SbE: examples agreed and approved BEFORE handing the spec to the agent; independent check of the code (acceptance tests in the demo). Series on ivangsa.com. -->

<style>
.opening-list { list-style: none; margin: 0; padding: 0; text-align: left; }
.opening-list li { font-size: 40px !important; font-weight: 700; line-height: 1.3 !important; margin: 0.5em 0 !important; color: #31394d; }
.opening-list .ic { display: inline-block; width: 1.1em; height: 1.1em; margin-right: 0.5em; vertical-align: -0.2em; color: #6b7785; }
.opening-list ul { list-style: none; margin: 0.5em 0 0 1.6em; padding: 0; }
.opening-list ul li { font-size: 32px !important; font-weight: 700; margin: 0.45em 0 !important; }
.opening-list .pillar { margin-left: 0.4em; padding: 0 0.35em; border-radius: 6px; font-size: 0.8em; color: #fff; }
.opening-list .p1 .pillar { background: #00abc5; }
.opening-list .p2 .pillar { background: #f7a81b; color: #31394d; }
.opening-list .p3 .pillar { background: #3fb27f; }
.opening-list .code { color: #00abc5; }
.opening-list .verify { color: #f7a81b; }
</style>

---
layout: default
title: 'Software Engineering in 2026'
hide: true
---

<div class="recap">
  <p class="recap-q">Code is cheap. <span class="verify">Design and verification</span> still not.</p>
  <div class="recap-row spec">
    <span class="q"><ph-compass-bold class="ic" />Understanding the domain</span>
    <span v-click="1" class="a">→ DDD as code: ZFL + ZDL</span>
  </div>
  <div class="recap-row prove">
    <span class="q"><ph-seal-check-bold class="ic" />Proving the design</span>
    <span v-click="2" class="a">→ towards Formal Verification</span>
  </div>
  <div class="recap-row sbe">
    <span class="q"><ph-flask-bold class="ic" />Validating the result</span>
    <span v-click="3" class="a">→ Specification by Example</span>
  </div>
</div>

<!-- Recap: the three pillars of agentic engineering. Pillar 1: fully answered today (DDD as code). Pillar 2: a first look, still a hypothesis (ZFL + ZDL → TLA+). Pillar 3: concrete examples agreed and approved BEFORE handing the spec to the agent; an independent check of the code it produces (acceptance tests in the demo). Series on ivangsa.com. -->

<style>
.recap { display: flex; flex-direction: column; gap: 22px; margin-top: 10px; }
.recap .ic { display: inline-block; width: 1.1em; height: 1.1em; margin-right: 0.5em; vertical-align: -0.2em; color: #6b7785; }
.recap-q { margin: 0 0 6px !important; font-size: 36px !important; font-weight: 700; color: #31394d; }
.recap-q .verify { color: #f7a81b; }
.recap-row { display: flex; align-items: baseline; gap: 18px; margin-left: 1.2em; font-size: 30px; font-weight: 700; color: #31394d; }
.recap-row .q { flex: none; width: 450px; }
.recap-row .a { font-weight: 700; color: #31394d; }
.recap-row.spec .q, .recap-row.spec .q .ic, .recap-row.spec .a { color: #00abc5; }
.recap-row.prove .a { color: #f7a81b; }
.recap-row.sbe .a { color: #3fb27f; }
</style>

---
title: 'Resources'
---

# Resources

<div class="res-grid">
<div>

**Arcadia Editions**

- [github.com/arcadia-editions](https://github.com/arcadia-editions)
- [arcadia-editions-architecture (ZFL flows)](https://github.com/arcadia-editions/arcadia-editions-architecture)
- [arcadia-editions-modulith-api (ZDLs)](https://github.com/arcadia-editions/arcadia-editions-modulith-api)
- [Modular monolith · Kotlin + Spring Boot](https://github.com/arcadia-editions/arcadia-editions-modulith-service-kotlin)
- [Arcadia blog series](https://ivangsa.com/articles/arcadia/)

**ZenWave**

- [zenwave360.io](https://www.zenwave360.io/)
- [ZenWave SDD skills](https://github.com/ZenWave360/zenwave-sdd)
- [ZenWave Platform · VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=ZenWave360.zenwave-platform)

**Formal verification**

- [TLA+: a high-level view (Leslie Lamport)](https://lamport.org/tla/high-level-view.html)

</div>
<div>

**Three pillars of agentic engineering**

- [When code is cheap: the three pillars of agentic engineering](https://ivangsa.com/articles/three-pillars-of-agentic-engineering/)
- [Three pillars: Domain-Driven Design as code](https://ivangsa.com/articles/three-pillars-domain-driven-design-as-code/)
- [Three pillars: Formal Verification in the age of agentic engineering](https://ivangsa.com/articles/three-pillars-formal-verification/)

**Spec-Driven Development**

- [Reading Markdown is the bottleneck](https://ivangsa.com/articles/sdd-markdown-is-the-bottleneck/)
- [From EventStorming to a model your agents can read](https://ivangsa.com/articles/sdd-from-event-storming-to-a-model-your-agents-can-read/)
- [Two loops: Model-Driven Human in the Loop](https://ivangsa.com/articles/sdd-two-loops-model-driven-human-in-the-loop/)
- [Two loops: Agentic Away from Keyboard](https://ivangsa.com/articles/sdd-two-loops-agentic-away-from-keyboard-loop/)
- [DM-SDD: use domain models instead of Markdown](https://ivangsa.com/articles/dm-sdd-domain-model-spec-driven-development/)
- [You can't design event-driven systems in Markdown specs](https://ivangsa.com/articles/whats-wrong-with-spec-driven-development-and-how-to-fix-it/)

</div>
</div>

<style>
.res-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0 36px; font-size: 13px; line-height: 1.35; }
.res-grid p { margin: 10px 0 2px !important; font-size: 13px !important; color: #00abc5; }
.res-grid ul { margin: 0; padding-left: 1.1em; }
.res-grid li { font-size: 13px !important; line-height: 1.35 !important; margin: 0 !important; }
.res-grid a { border-bottom: none; }
</style>

<!-- Not shown live: it's here for whoever opens the slides from the QR. -->
