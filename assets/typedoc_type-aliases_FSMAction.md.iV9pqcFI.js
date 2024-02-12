import{_ as n,c as a,o as s,V as t}from"./chunks/framework.Bled7NFg.js";const f=JSON.parse('{"title":"Type alias: FSMAction<FSMContext, FSMInput>","description":"","frontmatter":{},"headers":[],"relativePath":"typedoc/type-aliases/FSMAction.md","filePath":"typedoc/type-aliases/FSMAction.md"}'),e={name:"typedoc/type-aliases/FSMAction.md"},p=t(`<p><a href="./../">@minifsm/core</a> / FSMAction</p><h1 id="type-alias-fsmaction-fsmcontext-fsminput" tabindex="-1">Type alias: FSMAction&lt;FSMContext, FSMInput&gt; <a class="header-anchor" href="#type-alias-fsmaction-fsmcontext-fsminput" aria-label="Permalink to &quot;Type alias: FSMAction\\&lt;FSMContext, FSMInput\\&gt;&quot;">​</a></h1><blockquote><p><strong>FSMAction</strong>&lt;<code>FSMContext</code>, <code>FSMInput</code>&gt;: (<code>_</code>) =&gt; <code>FSMContext</code></p></blockquote><p>Represents an action function used in Finite State Machine (FSM) transitions. Actions are functions that transform the FSM context based on the current state and input. They modify the context to reflect the effects of transitioning to a new state. Actions are essential for updating the state of an FSM and performing side effects.</p><h3 id="example" tabindex="-1">Example <a class="header-anchor" href="#example" aria-label="Permalink to &quot;Example&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>// npm run snippet:fsm-action</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import &#39;module-alias/register&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import { type FSMAction } from &#39;@minifsm/core&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Define types for context and input</span></span>
<span class="line"><span>interface MyContext {</span></span>
<span class="line"><span>  count: number</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>interface MyInput {</span></span>
<span class="line"><span>  action: &#39;increment&#39; | &#39;decrement&#39;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Define an action function</span></span>
<span class="line"><span>const actionFunction: FSMAction&lt;MyContext, MyInput&gt; = ({ context, input }) =&gt; {</span></span>
<span class="line"><span>  if (input.action === &#39;increment&#39;) {</span></span>
<span class="line"><span>    return { ...context, count: context.count + 1 }</span></span>
<span class="line"><span>  } else if (input.action === &#39;decrement&#39;) {</span></span>
<span class="line"><span>    return { ...context, count: context.count - 1 }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  return context // No change for unknown actions</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Simulate the action with an input</span></span>
<span class="line"><span>const initialContext: MyContext = { count: 0 }</span></span>
<span class="line"><span>const input1: MyInput = { action: &#39;increment&#39; }</span></span>
<span class="line"><span>const input2: MyInput = { action: &#39;decrement&#39; }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Apply the action function with different inputs</span></span>
<span class="line"><span>const updatedContext1 = actionFunction({ context: initialContext, input: input1 })</span></span>
<span class="line"><span>const updatedContext2 = actionFunction({ context: updatedContext1, input: input2 })</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Log the updated contexts</span></span>
<span class="line"><span>console.log(&#39;Updated Context after increment:&#39;, updatedContext1)</span></span>
<span class="line"><span>console.log(&#39;Updated Context after decrement:&#39;, updatedContext2)</span></span></code></pre></div><h2 id="typeparam" tabindex="-1">Typeparam <a class="header-anchor" href="#typeparam" aria-label="Permalink to &quot;Typeparam&quot;">​</a></h2><p>FSMContext - Type of the FSM context.</p><h2 id="typeparam-1" tabindex="-1">Typeparam <a class="header-anchor" href="#typeparam-1" aria-label="Permalink to &quot;Typeparam&quot;">​</a></h2><p>FSMInput - Type of the FSM input.</p><h2 id="type-parameters" tabindex="-1">Type parameters <a class="header-anchor" href="#type-parameters" aria-label="Permalink to &quot;Type parameters&quot;">​</a></h2><p>• <strong>FSMContext</strong></p><p>• <strong>FSMInput</strong></p><h2 id="parameters" tabindex="-1">Parameters <a class="header-anchor" href="#parameters" aria-label="Permalink to &quot;Parameters&quot;">​</a></h2><p>• <strong>_</strong></p><p>• <strong>_.context</strong>: <code>FSMContext</code></p><p>• <strong>_.input</strong>: <code>FSMInput</code></p><h2 id="returns" tabindex="-1">Returns <a class="header-anchor" href="#returns" aria-label="Permalink to &quot;Returns&quot;">​</a></h2><p><code>FSMContext</code></p><h2 id="source" tabindex="-1">Source <a class="header-anchor" href="#source" aria-label="Permalink to &quot;Source&quot;">​</a></h2><p><a href="https://github.com/romain-bourjot/minifsm/blob/4218d81/src/index.ts#L60" target="_blank" rel="noreferrer">index.ts:60</a></p>`,21),o=[p];function i(c,r,l,u,d,h){return s(),a("div",null,o)}const x=n(e,[["render",i]]);export{f as __pageData,x as default};
