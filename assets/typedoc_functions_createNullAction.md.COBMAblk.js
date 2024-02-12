import{_ as n,c as a,o as e,V as t}from"./chunks/framework.Bled7NFg.js";const f=JSON.parse('{"title":"Function: createNullAction()","description":"","frontmatter":{},"headers":[],"relativePath":"typedoc/functions/createNullAction.md","filePath":"typedoc/functions/createNullAction.md"}'),s={name:"typedoc/functions/createNullAction.md"},p=t(`<p><a href="./../">@minifsm/core</a> / createNullAction</p><h1 id="function-createnullaction" tabindex="-1">Function: createNullAction() <a class="header-anchor" href="#function-createnullaction" aria-label="Permalink to &quot;Function: createNullAction()&quot;">​</a></h1><blockquote><p><strong>createNullAction</strong>&lt;<code>FSMContext</code>, <code>FSMInput</code>&gt;(): <a href="./../type-aliases/FSMAction.html"><code>FSMAction</code></a>&lt;<code>FSMContext</code>, <code>FSMInput</code>&gt;</p></blockquote><p>Creates a null action function that returns the context unchanged. Null actions are placeholder functions that do not modify the FSM context. They are useful for defining default actions when no specific action is required for a transition. Null actions provide a convenient way to handle transitions that do not involve context modifications.</p><h3 id="example" tabindex="-1">Example <a class="header-anchor" href="#example" aria-label="Permalink to &quot;Example&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>// npm run snippet:create-null-action</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import &#39;module-alias/register&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import { createNullAction } from &#39;@minifsm/core&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Define types for context and input</span></span>
<span class="line"><span>interface MyContext {</span></span>
<span class="line"><span>  data: string</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>interface MyInput {</span></span>
<span class="line"><span>  action: string</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Create a null action function</span></span>
<span class="line"><span>const nullAction = createNullAction&lt;MyContext, MyInput&gt;()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Simulate applying the null action</span></span>
<span class="line"><span>const initialContext: MyContext = { data: &#39;Initial data&#39; }</span></span>
<span class="line"><span>const input: MyInput = { action: &#39;some_action&#39; }</span></span>
<span class="line"><span>const updatedContext = nullAction({ context: initialContext, input })</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Log the updated context</span></span>
<span class="line"><span>console.log(&#39;Updated Context after Null Action:&#39;, updatedContext)</span></span></code></pre></div><h2 id="type-parameters" tabindex="-1">Type parameters <a class="header-anchor" href="#type-parameters" aria-label="Permalink to &quot;Type parameters&quot;">​</a></h2><p>• <strong>FSMContext</strong></p><p>• <strong>FSMInput</strong></p><h2 id="returns" tabindex="-1">Returns <a class="header-anchor" href="#returns" aria-label="Permalink to &quot;Returns&quot;">​</a></h2><p><a href="./../type-aliases/FSMAction.html"><code>FSMAction</code></a>&lt;<code>FSMContext</code>, <code>FSMInput</code>&gt;</p><p>A null action function.</p><h2 id="typeparam" tabindex="-1">Typeparam <a class="header-anchor" href="#typeparam" aria-label="Permalink to &quot;Typeparam&quot;">​</a></h2><p>FSMContext - Type of the FSM context.</p><h2 id="typeparam-1" tabindex="-1">Typeparam <a class="header-anchor" href="#typeparam-1" aria-label="Permalink to &quot;Typeparam&quot;">​</a></h2><p>FSMInput - Type of the FSM input.</p><h2 id="source" tabindex="-1">Source <a class="header-anchor" href="#source" aria-label="Permalink to &quot;Source&quot;">​</a></h2><p><a href="https://github.com/romain-bourjot/minifsm/blob/562a758/src/index.ts#L223" target="_blank" rel="noreferrer">index.ts:223</a></p>`,18),o=[p];function i(l,c,r,u,d,h){return e(),a("div",null,o)}const x=n(s,[["render",i]]);export{f as __pageData,x as default};
