import{_ as n,c as a,o as e,V as s}from"./chunks/framework.BqX6ZQZG.js";const f=JSON.parse('{"title":"Type alias: FSMCondition<FSMContext, FSMInput>","description":"","frontmatter":{},"headers":[],"relativePath":"typedoc/type-aliases/FSMCondition.md","filePath":"typedoc/type-aliases/FSMCondition.md"}'),t={name:"typedoc/type-aliases/FSMCondition.md"},p=s(`<p><a href="./../">@minifsm/core</a> / FSMCondition</p><h1 id="type-alias-fsmcondition-fsmcontext-fsminput" tabindex="-1">Type alias: FSMCondition&lt;FSMContext, FSMInput&gt; <a class="header-anchor" href="#type-alias-fsmcondition-fsmcontext-fsminput" aria-label="Permalink to &quot;Type alias: FSMCondition\\&lt;FSMContext, FSMInput\\&gt;&quot;">​</a></h1><blockquote><p><strong>FSMCondition</strong>&lt;<code>FSMContext</code>, <code>FSMInput</code>&gt;: (<code>_</code>) =&gt; <code>boolean</code></p></blockquote><p>Represents a condition function used in Finite State Machine (FSM) transitions. Conditions are predicates that evaluate to true or false based on the FSM context and input. They determine whether a transition should occur from the current state to a new state. Conditions play a critical role in defining the behavior and logic of FSMs.</p><h3 id="example" tabindex="-1">Example <a class="header-anchor" href="#example" aria-label="Permalink to &quot;Example&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>// npm run snippet:fsm-condition</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import &#39;module-alias/register&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import { type FSMCondition } from &#39;@minifsm/core&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Define types for context and input</span></span>
<span class="line"><span>interface MyContext {</span></span>
<span class="line"><span>  temperature: number</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>interface MyInput {</span></span>
<span class="line"><span>  command: &#39;increase&#39; | &#39;decrease&#39;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Define a condition function</span></span>
<span class="line"><span>const conditionFunction: FSMCondition&lt;MyContext, MyInput&gt; = ({ context, input }) =&gt; {</span></span>
<span class="line"><span>  if (input.command === &#39;increase&#39;) {</span></span>
<span class="line"><span>    return context.temperature &lt; 100 // Can only increase temperature if it&#39;s below 100</span></span>
<span class="line"><span>  } else if (input.command === &#39;decrease&#39;) {</span></span>
<span class="line"><span>    return context.temperature &gt; 0 // Can only decrease temperature if it&#39;s above 0</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  return false // Unknown commands are always invalid</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Simulate the condition check with different inputs</span></span>
<span class="line"><span>const initialContext: MyContext = { temperature: 50 }</span></span>
<span class="line"><span>const increaseInput: MyInput = { command: &#39;increase&#39; }</span></span>
<span class="line"><span>const decreaseInput: MyInput = { command: &#39;decrease&#39; }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Check conditions with different inputs</span></span>
<span class="line"><span>const canIncreaseTemperature = conditionFunction({ context: initialContext, input: increaseInput })</span></span>
<span class="line"><span>const canDecreaseTemperature = conditionFunction({ context: initialContext, input: decreaseInput })</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Log the condition results</span></span>
<span class="line"><span>console.log(&#39;Can increase temperature?&#39;, canIncreaseTemperature)</span></span>
<span class="line"><span>console.log(&#39;Can decrease temperature?&#39;, canDecreaseTemperature)</span></span></code></pre></div><h2 id="typeparam" tabindex="-1">Typeparam <a class="header-anchor" href="#typeparam" aria-label="Permalink to &quot;Typeparam&quot;">​</a></h2><p>FSMContext - Type of the FSM context.</p><h2 id="typeparam-1" tabindex="-1">Typeparam <a class="header-anchor" href="#typeparam-1" aria-label="Permalink to &quot;Typeparam&quot;">​</a></h2><p>FSMInput - Type of the FSM input.</p><h2 id="type-parameters" tabindex="-1">Type parameters <a class="header-anchor" href="#type-parameters" aria-label="Permalink to &quot;Type parameters&quot;">​</a></h2><p>• <strong>FSMContext</strong></p><p>• <strong>FSMInput</strong></p><h2 id="parameters" tabindex="-1">Parameters <a class="header-anchor" href="#parameters" aria-label="Permalink to &quot;Parameters&quot;">​</a></h2><p>• <strong>_</strong></p><p>• <strong>_.context</strong>: <code>FSMContext</code></p><p>• <strong>_.input</strong>: <code>FSMInput</code></p><h2 id="returns" tabindex="-1">Returns <a class="header-anchor" href="#returns" aria-label="Permalink to &quot;Returns&quot;">​</a></h2><p><code>boolean</code></p><h2 id="source" tabindex="-1">Source <a class="header-anchor" href="#source" aria-label="Permalink to &quot;Source&quot;">​</a></h2><p><a href="https://github.com/romain-bourjot/minifsm/blob/bbcb6a4/src/index.ts#L46" target="_blank" rel="noreferrer">index.ts:46</a></p>`,21),i=[p];function o(r,c,l,d,u,m){return e(),a("div",null,i)}const x=n(t,[["render",o]]);export{f as __pageData,x as default};
