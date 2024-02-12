import{_ as n,c as a,o as s,V as t}from"./chunks/framework.Bled7NFg.js";const S=JSON.parse('{"title":"Type alias: FSMConditionalTransition<FSMState, FSMContext, FSMInput>","description":"","frontmatter":{},"headers":[],"relativePath":"typedoc/type-aliases/FSMConditionalTransition.md","filePath":"typedoc/type-aliases/FSMConditionalTransition.md"}'),e={name:"typedoc/type-aliases/FSMConditionalTransition.md"},i=t(`<p><a href="./../">@minifsm/core</a> / FSMConditionalTransition</p><h1 id="type-alias-fsmconditionaltransition-fsmstate-fsmcontext-fsminput" tabindex="-1">Type alias: FSMConditionalTransition&lt;FSMState, FSMContext, FSMInput&gt; <a class="header-anchor" href="#type-alias-fsmconditionaltransition-fsmstate-fsmcontext-fsminput" aria-label="Permalink to &quot;Type alias: FSMConditionalTransition\\&lt;FSMState, FSMContext, FSMInput\\&gt;&quot;">​</a></h1><blockquote><p><strong>FSMConditionalTransition</strong>&lt;<code>FSMState</code>, <code>FSMContext</code>, <code>FSMInput</code>&gt;: <code>Object</code> &amp; <a href="./../interfaces/FSMTransition.html"><code>FSMTransition</code></a>&lt;<code>FSMState</code>, <code>FSMContext</code>, <code>FSMInput</code>&gt;</p></blockquote><p>Represents a conditional transition in a Finite State Machine (FSM). Conditional transitions allow for more complex FSM behavior by introducing conditions that must be satisfied for a transition to occur. They combine a condition function with a transition, enabling dynamic state changes based on context and input. Conditional transitions provide flexibility and expressiveness in FSM design.</p><h3 id="example" tabindex="-1">Example <a class="header-anchor" href="#example" aria-label="Permalink to &quot;Example&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>// npm run snippet:fsm-conditional-transition</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import &#39;module-alias/register&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import { type FSMConditionalTransition } from &#39;@minifsm/core&#39;</span></span>
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
<span class="line"><span>// Define a conditional transition</span></span>
<span class="line"><span>const conditionalTransition: FSMConditionalTransition&lt;MyState, MyContext, MyInput&gt; = {</span></span>
<span class="line"><span>  condition: ({ input }) =&gt; input.action === &#39;perform_transition&#39;,</span></span>
<span class="line"><span>  nextState: &#39;STATE_B&#39;,</span></span>
<span class="line"><span>  action: ({ context }) =&gt; ({ ...context, data: &#39;Transition occurred&#39; })</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Simulate the conditional transition with an input</span></span>
<span class="line"><span>const currentContext: MyContext = { data: &#39;Initial data&#39; }</span></span>
<span class="line"><span>const input: MyInput = { action: &#39;perform_transition&#39; }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Check if the transition should occur based on the condition</span></span>
<span class="line"><span>const shouldTransition = conditionalTransition.condition({ context: currentContext, input })</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// If the condition is met, apply the transition action</span></span>
<span class="line"><span>const updatedContext = shouldTransition</span></span>
<span class="line"><span>  ? conditionalTransition.action({</span></span>
<span class="line"><span>    context: currentContext,</span></span>
<span class="line"><span>    input</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span>  : currentContext</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Log the updated context</span></span>
<span class="line"><span>console.log(&#39;Updated Context after conditional transition:&#39;, updatedContext)</span></span></code></pre></div><h2 id="typeparam" tabindex="-1">Typeparam <a class="header-anchor" href="#typeparam" aria-label="Permalink to &quot;Typeparam&quot;">​</a></h2><p>FSMState - Type of the FSM state.</p><h2 id="typeparam-1" tabindex="-1">Typeparam <a class="header-anchor" href="#typeparam-1" aria-label="Permalink to &quot;Typeparam&quot;">​</a></h2><p>FSMContext - Type of the FSM context.</p><h2 id="typeparam-2" tabindex="-1">Typeparam <a class="header-anchor" href="#typeparam-2" aria-label="Permalink to &quot;Typeparam&quot;">​</a></h2><p>FSMInput - Type of the FSM input.</p><h2 id="type-declaration" tabindex="-1">Type declaration <a class="header-anchor" href="#type-declaration" aria-label="Permalink to &quot;Type declaration&quot;">​</a></h2><h3 id="condition" tabindex="-1">condition <a class="header-anchor" href="#condition" aria-label="Permalink to &quot;condition&quot;">​</a></h3><blockquote><p><strong>condition</strong>: <a href="./FSMCondition.html"><code>FSMCondition</code></a>&lt;<code>FSMContext</code>, <code>FSMInput</code>&gt;</p></blockquote><h2 id="type-parameters" tabindex="-1">Type parameters <a class="header-anchor" href="#type-parameters" aria-label="Permalink to &quot;Type parameters&quot;">​</a></h2><p>• <strong>FSMState</strong></p><p>• <strong>FSMContext</strong></p><p>• <strong>FSMInput</strong></p><h2 id="source" tabindex="-1">Source <a class="header-anchor" href="#source" aria-label="Permalink to &quot;Source&quot;">​</a></h2><p><a href="https://github.com/romain-bourjot/minifsm/blob/4218d81/src/index.ts#L93" target="_blank" rel="noreferrer">index.ts:93</a></p>`,21),p=[i];function o(l,c,r,d,h,u){return s(),a("div",null,p)}const f=n(e,[["render",o]]);export{S as __pageData,f as default};
