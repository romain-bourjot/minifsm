import{_ as a,c as n,o as s,V as t}from"./chunks/framework.BqX6ZQZG.js";const S=JSON.parse('{"title":"Interface: FSMTransition<FSMState, FSMContext, FSMInput>","description":"","frontmatter":{},"headers":[],"relativePath":"typedoc/interfaces/FSMTransition.md","filePath":"typedoc/interfaces/FSMTransition.md"}'),e={name:"typedoc/interfaces/FSMTransition.md"},p=t(`<p><a href="./../">@minifsm/core</a> / FSMTransition</p><h1 id="interface-fsmtransition-fsmstate-fsmcontext-fsminput" tabindex="-1">Interface: FSMTransition&lt;FSMState, FSMContext, FSMInput&gt; <a class="header-anchor" href="#interface-fsmtransition-fsmstate-fsmcontext-fsminput" aria-label="Permalink to &quot;Interface: FSMTransition\\&lt;FSMState, FSMContext, FSMInput\\&gt;&quot;">​</a></h1><p>Represents a transition in a Finite State Machine (FSM). Transitions define the movement from one state to another in response to specific conditions and actions. They encapsulate the next state and the action to be performed upon transitioning. Transitions are the building blocks of FSM behavior and logic.</p><h3 id="example" tabindex="-1">Example <a class="header-anchor" href="#example" aria-label="Permalink to &quot;Example&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>// npm run snippet:fsm-transition</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import &#39;module-alias/register&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import { type FSMTransition } from &#39;@minifsm/core&#39;</span></span>
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
<span class="line"><span>// Define a transition function</span></span>
<span class="line"><span>const transitionFunction: FSMTransition&lt;MyState, MyContext, MyInput&gt; = {</span></span>
<span class="line"><span>  nextState: &#39;STATE_B&#39;,</span></span>
<span class="line"><span>  action: ({ context }) =&gt; ({ ...context, data: &#39;Transition occurred&#39; })</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Simulate the transition</span></span>
<span class="line"><span>// eslint-disable-next-line @typescript-eslint/no-unused-vars</span></span>
<span class="line"><span>const currentState: MyState = &#39;STATE_A&#39;</span></span>
<span class="line"><span>const currentContext: MyContext = { data: &#39;Initial data&#39; }</span></span>
<span class="line"><span>const input: MyInput = { action: &#39;perform_transition&#39; }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Apply the transition function</span></span>
<span class="line"><span>const updatedContext = transitionFunction.action({ context: currentContext, input })</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Log the updated context</span></span>
<span class="line"><span>console.log(&#39;Updated Context:&#39;, updatedContext)</span></span></code></pre></div><h2 id="typeparam" tabindex="-1">Typeparam <a class="header-anchor" href="#typeparam" aria-label="Permalink to &quot;Typeparam&quot;">​</a></h2><p>FSMState - Type of the FSM state.</p><h2 id="typeparam-1" tabindex="-1">Typeparam <a class="header-anchor" href="#typeparam-1" aria-label="Permalink to &quot;Typeparam&quot;">​</a></h2><p>FSMContext - Type of the FSM context.</p><h2 id="typeparam-2" tabindex="-1">Typeparam <a class="header-anchor" href="#typeparam-2" aria-label="Permalink to &quot;Typeparam&quot;">​</a></h2><p>FSMInput - Type of the FSM input.</p><h2 id="type-parameters" tabindex="-1">Type parameters <a class="header-anchor" href="#type-parameters" aria-label="Permalink to &quot;Type parameters&quot;">​</a></h2><p>• <strong>FSMState</strong></p><p>• <strong>FSMContext</strong></p><p>• <strong>FSMInput</strong></p><h2 id="properties" tabindex="-1">Properties <a class="header-anchor" href="#properties" aria-label="Permalink to &quot;Properties&quot;">​</a></h2><h3 id="action" tabindex="-1">action <a class="header-anchor" href="#action" aria-label="Permalink to &quot;action&quot;">​</a></h3><blockquote><p><strong>action</strong>: <a href="./../type-aliases/FSMAction.html"><code>FSMAction</code></a>&lt;<code>FSMContext</code>, <code>FSMInput</code>&gt;</p></blockquote><h4 id="source" tabindex="-1">Source <a class="header-anchor" href="#source" aria-label="Permalink to &quot;Source&quot;">​</a></h4><p><a href="https://github.com/romain-bourjot/minifsm/blob/bbcb6a4/src/index.ts#L77" target="_blank" rel="noreferrer">index.ts:77</a></p><hr><h3 id="nextstate" tabindex="-1">nextState <a class="header-anchor" href="#nextstate" aria-label="Permalink to &quot;nextState&quot;">​</a></h3><blockquote><p><strong>nextState</strong>: <code>FSMState</code></p></blockquote><h4 id="source-1" tabindex="-1">Source <a class="header-anchor" href="#source-1" aria-label="Permalink to &quot;Source&quot;">​</a></h4><p><a href="https://github.com/romain-bourjot/minifsm/blob/bbcb6a4/src/index.ts#L76" target="_blank" rel="noreferrer">index.ts:76</a></p>`,25),i=[p];function o(r,c,l,d,h,u){return s(),n("div",null,i)}const f=a(e,[["render",o]]);export{S as __pageData,f as default};
