import{_ as n,c as a,o as s,V as e}from"./chunks/framework.BqX6ZQZG.js";const m=JSON.parse('{"title":"Function: doTransition()","description":"","frontmatter":{},"headers":[],"relativePath":"typedoc/functions/doTransition.md","filePath":"typedoc/functions/doTransition.md"}'),t={name:"typedoc/functions/doTransition.md"},p=e(`<p><a href="./../">@minifsm/core</a> / doTransition</p><h1 id="function-dotransition" tabindex="-1">Function: doTransition() <a class="header-anchor" href="#function-dotransition" aria-label="Permalink to &quot;Function: doTransition()&quot;">​</a></h1><blockquote><p><strong>doTransition</strong>&lt;<code>FSMState</code>, <code>FSMContext</code>, <code>FSMInput</code>&gt;(<code>config</code>): <a href="./../interfaces/FSMMachine.html"><code>FSMMachine</code></a>&lt;<code>FSMState</code>, <code>FSMContext</code>&gt;</p></blockquote><p>Performs a transition in a Finite State Machine (FSM) based on the given input. The <code>doTransition</code> function is the primary mechanism for driving FSM behavior by transitioning between states. It evaluates the available transitions from the current state based on the input and executes the appropriate transition. <code>doTransition</code> encapsulates the core logic of FSM state changes and is crucial for implementing FSM-based systems.</p><h3 id="example" tabindex="-1">Example <a class="header-anchor" href="#example" aria-label="Permalink to &quot;Example&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>// npm run snippet:do-transition</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import &#39;module-alias/register&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import { doTransition, type FSMDefinition, type FSMMachine } from &#39;@minifsm/core&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Define types for state, context, and input</span></span>
<span class="line"><span>type MyState = &#39;STATE_A&#39; | &#39;STATE_B&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>interface MyContext {</span></span>
<span class="line"><span>  data: string</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>interface MyInput {</span></span>
<span class="line"><span>  action: string</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Define an FSM definition</span></span>
<span class="line"><span>const fsmDefinition: FSMDefinition&lt;MyState, MyContext, MyInput&gt; = {</span></span>
<span class="line"><span>  STATE_A: {</span></span>
<span class="line"><span>    transitions: [</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        condition: ({ input }) =&gt; input.action === &#39;go_to_B&#39;,</span></span>
<span class="line"><span>        nextState: &#39;STATE_B&#39;,</span></span>
<span class="line"><span>        action: ({ context }) =&gt; ({ ...context, data: &#39;Transitioned to STATE_B&#39; })</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    ],</span></span>
<span class="line"><span>    defaultTransition: { nextState: &#39;STATE_A&#39;, action: ({ context }) =&gt; context }</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  STATE_B: {</span></span>
<span class="line"><span>    transitions: [],</span></span>
<span class="line"><span>    defaultTransition: { nextState: &#39;STATE_B&#39;, action: ({ context }) =&gt; context }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Define an FSM machine instance</span></span>
<span class="line"><span>const machine: FSMMachine&lt;MyState, MyContext&gt; = {</span></span>
<span class="line"><span>  currentState: &#39;STATE_A&#39;,</span></span>
<span class="line"><span>  context: { data: &#39;Initial data&#39; }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Define an input triggering transition to STATE_B</span></span>
<span class="line"><span>const inputToStateB: MyInput = { action: &#39;go_to_B&#39; }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Perform the transition based on the input</span></span>
<span class="line"><span>const updatedMachine = doTransition({</span></span>
<span class="line"><span>  definition: fsmDefinition,</span></span>
<span class="line"><span>  input: inputToStateB,</span></span>
<span class="line"><span>  machine</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Log the updated machine after transition</span></span>
<span class="line"><span>console.log(&#39;Updated Machine after transition:&#39;, updatedMachine)</span></span></code></pre></div><h2 id="type-parameters" tabindex="-1">Type parameters <a class="header-anchor" href="#type-parameters" aria-label="Permalink to &quot;Type parameters&quot;">​</a></h2><p>• <strong>FSMState</strong> extends <code>string</code></p><p>• <strong>FSMContext</strong></p><p>• <strong>FSMInput</strong></p><h2 id="parameters" tabindex="-1">Parameters <a class="header-anchor" href="#parameters" aria-label="Permalink to &quot;Parameters&quot;">​</a></h2><p>• <strong>config</strong></p><p>• <strong>config.definition</strong>: <a href="./../type-aliases/FSMDefinition.html"><code>FSMDefinition</code></a>&lt;<code>FSMState</code>, <code>FSMContext</code>, <code>FSMInput</code>&gt;</p><p>The definition of the FSM.</p><p>• <strong>config.input</strong>: <code>FSMInput</code></p><p>The input to trigger the transition.</p><p>• <strong>config.machine</strong>: <a href="./../interfaces/FSMMachine.html"><code>FSMMachine</code></a>&lt;<code>FSMState</code>, <code>FSMContext</code>&gt;</p><p>The current state and context of the FSM.</p><h2 id="returns" tabindex="-1">Returns <a class="header-anchor" href="#returns" aria-label="Permalink to &quot;Returns&quot;">​</a></h2><p><a href="./../interfaces/FSMMachine.html"><code>FSMMachine</code></a>&lt;<code>FSMState</code>, <code>FSMContext</code>&gt;</p><p>The updated state and context of the FSM after the transition.</p><h2 id="typeparam" tabindex="-1">Typeparam <a class="header-anchor" href="#typeparam" aria-label="Permalink to &quot;Typeparam&quot;">​</a></h2><p>FSMState - Type of the FSM state.</p><h2 id="typeparam-1" tabindex="-1">Typeparam <a class="header-anchor" href="#typeparam-1" aria-label="Permalink to &quot;Typeparam&quot;">​</a></h2><p>FSMContext - Type of the FSM context.</p><h2 id="typeparam-2" tabindex="-1">Typeparam <a class="header-anchor" href="#typeparam-2" aria-label="Permalink to &quot;Typeparam&quot;">​</a></h2><p>FSMInput - Type of the FSM input.</p><h2 id="source" tabindex="-1">Source <a class="header-anchor" href="#source" aria-label="Permalink to &quot;Source&quot;">​</a></h2><p><a href="https://github.com/romain-bourjot/minifsm/blob/bbcb6a4/src/index.ts#L189" target="_blank" rel="noreferrer">index.ts:189</a></p>`,29),i=[p];function o(c,r,l,d,h,u){return s(),a("div",null,i)}const S=n(t,[["render",o]]);export{m as __pageData,S as default};
