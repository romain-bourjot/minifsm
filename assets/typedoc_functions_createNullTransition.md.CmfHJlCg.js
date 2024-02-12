import{_ as a,c as n,o as e,V as s}from"./chunks/framework.Bled7NFg.js";const T=JSON.parse('{"title":"Function: createNullTransition()","description":"","frontmatter":{},"headers":[],"relativePath":"typedoc/functions/createNullTransition.md","filePath":"typedoc/functions/createNullTransition.md"}'),t={name:"typedoc/functions/createNullTransition.md"},p=s(`<p><a href="./../">@minifsm/core</a> / createNullTransition</p><h1 id="function-createnulltransition" tabindex="-1">Function: createNullTransition() <a class="header-anchor" href="#function-createnulltransition" aria-label="Permalink to &quot;Function: createNullTransition()&quot;">​</a></h1><blockquote><p><strong>createNullTransition</strong>&lt;<code>FSMState</code>, <code>FSMContext</code>, <code>FSMInput</code>&gt;(<code>nextState</code>): <a href="./../interfaces/FSMTransition.html"><code>FSMTransition</code></a>&lt;<code>FSMState</code>, <code>FSMContext</code>, <code>FSMInput</code>&gt;</p></blockquote><p>Creates a null transition that transitions to the specified next state and performs a null action. Null transitions represent transitions that do not involve any state changes or context modifications. They are placeholders used when no specific transition logic is required for a given state. Null transitions simplify FSM definition by providing default behavior for state transitions.</p><h3 id="example" tabindex="-1">Example <a class="header-anchor" href="#example" aria-label="Permalink to &quot;Example&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>// npm run snippet:create-null-transition</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import &#39;module-alias/register&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import { createNullTransition } from &#39;@minifsm/core&#39;</span></span>
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
<span class="line"><span>// Create a null transition for STATE_A</span></span>
<span class="line"><span>const nullTransitionA = createNullTransition&lt;MyState, MyContext, MyInput&gt;(&#39;STATE_A&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Create a null transition for STATE_B</span></span>
<span class="line"><span>const nullTransitionB = createNullTransition&lt;MyState, MyContext, MyInput&gt;(&#39;STATE_B&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Log the null transitions</span></span>
<span class="line"><span>console.log(&#39;Null Transition for STATE_A:&#39;, nullTransitionA)</span></span>
<span class="line"><span>console.log(&#39;Null Transition for STATE_B:&#39;, nullTransitionB)</span></span></code></pre></div><h2 id="type-parameters" tabindex="-1">Type parameters <a class="header-anchor" href="#type-parameters" aria-label="Permalink to &quot;Type parameters&quot;">​</a></h2><p>• <strong>FSMState</strong></p><p>• <strong>FSMContext</strong></p><p>• <strong>FSMInput</strong></p><h2 id="parameters" tabindex="-1">Parameters <a class="header-anchor" href="#parameters" aria-label="Permalink to &quot;Parameters&quot;">​</a></h2><p>• <strong>nextState</strong>: <code>FSMState</code></p><p>The next state after the transition.</p><h2 id="returns" tabindex="-1">Returns <a class="header-anchor" href="#returns" aria-label="Permalink to &quot;Returns&quot;">​</a></h2><p><a href="./../interfaces/FSMTransition.html"><code>FSMTransition</code></a>&lt;<code>FSMState</code>, <code>FSMContext</code>, <code>FSMInput</code>&gt;</p><p>A null transition.</p><h2 id="typeparam" tabindex="-1">Typeparam <a class="header-anchor" href="#typeparam" aria-label="Permalink to &quot;Typeparam&quot;">​</a></h2><p>FSMState - Type of the FSM state.</p><h2 id="typeparam-1" tabindex="-1">Typeparam <a class="header-anchor" href="#typeparam-1" aria-label="Permalink to &quot;Typeparam&quot;">​</a></h2><p>FSMContext - Type of the FSM context.</p><h2 id="typeparam-2" tabindex="-1">Typeparam <a class="header-anchor" href="#typeparam-2" aria-label="Permalink to &quot;Typeparam&quot;">​</a></h2><p>FSMInput - Type of the FSM input.</p><h2 id="source" tabindex="-1">Source <a class="header-anchor" href="#source" aria-label="Permalink to &quot;Source&quot;">​</a></h2><p><a href="https://github.com/romain-bourjot/minifsm/blob/562a758/src/index.ts#L244" target="_blank" rel="noreferrer">index.ts:244</a></p>`,24),o=[p];function r(i,l,c,d,u,h){return e(),n("div",null,o)}const f=a(t,[["render",r]]);export{T as __pageData,f as default};
