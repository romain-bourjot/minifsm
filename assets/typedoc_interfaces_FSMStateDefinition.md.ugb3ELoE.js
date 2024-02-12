import{_ as a,c as n,o as s,V as e}from"./chunks/framework.Bled7NFg.js";const u=JSON.parse('{"title":"Interface: FSMStateDefinition<FSMState, FSMContext, FSMInput>","description":"","frontmatter":{},"headers":[],"relativePath":"typedoc/interfaces/FSMStateDefinition.md","filePath":"typedoc/interfaces/FSMStateDefinition.md"}'),t={name:"typedoc/interfaces/FSMStateDefinition.md"},i=e(`<p><a href="./../">@minifsm/core</a> / FSMStateDefinition</p><h1 id="interface-fsmstatedefinition-fsmstate-fsmcontext-fsminput" tabindex="-1">Interface: FSMStateDefinition&lt;FSMState, FSMContext, FSMInput&gt; <a class="header-anchor" href="#interface-fsmstatedefinition-fsmstate-fsmcontext-fsminput" aria-label="Permalink to &quot;Interface: FSMStateDefinition\\&lt;FSMState, FSMContext, FSMInput\\&gt;&quot;">​</a></h1><p>Represents the definition of a state in a Finite State Machine (FSM). State definitions encapsulate the transitions available from a particular state and the default transition when no conditions are met. They provide a structured way to organize and manage the behavior of individual states within an FSM. State definitions are essential for specifying the behavior and transitions of FSM states.</p><h3 id="example" tabindex="-1">Example <a class="header-anchor" href="#example" aria-label="Permalink to &quot;Example&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>// npm run snippet:fsm-state-definition</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import &#39;module-alias/register&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import { type FSMStateDefinition } from &#39;@minifsm/core&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Define a string enum for the state</span></span>
<span class="line"><span>enum MyState {</span></span>
<span class="line"><span>  START = &#39;START&#39;,</span></span>
<span class="line"><span>  IN_PROGRESS = &#39;IN_PROGRESS&#39;,</span></span>
<span class="line"><span>  COMPLETE = &#39;COMPLETE&#39;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Define types for context and input</span></span>
<span class="line"><span>interface MyContext {</span></span>
<span class="line"><span>  progress: number</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>interface MyInput {</span></span>
<span class="line"><span>  action: string</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Define a state definition for a specific state</span></span>
<span class="line"><span>const startStateDefinition: FSMStateDefinition&lt;MyState, MyContext, MyInput&gt; = {</span></span>
<span class="line"><span>  transitions: [</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>      condition: ({ input }) =&gt; input.action === &#39;start&#39;,</span></span>
<span class="line"><span>      nextState: MyState.IN_PROGRESS,</span></span>
<span class="line"><span>      action: ({ context }) =&gt; ({ ...context, progress: 25 })</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  ],</span></span>
<span class="line"><span>  defaultTransition: {</span></span>
<span class="line"><span>    nextState: MyState.START,</span></span>
<span class="line"><span>    action: ({ context }) =&gt; ({ ...context }) // No action for the default transition</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Log the state definition</span></span>
<span class="line"><span>console.log(&#39;Start State Definition:&#39;, startStateDefinition)</span></span></code></pre></div><h2 id="typeparam" tabindex="-1">Typeparam <a class="header-anchor" href="#typeparam" aria-label="Permalink to &quot;Typeparam&quot;">​</a></h2><p>FSMState - Type of the FSM state.</p><h2 id="typeparam-1" tabindex="-1">Typeparam <a class="header-anchor" href="#typeparam-1" aria-label="Permalink to &quot;Typeparam&quot;">​</a></h2><p>FSMContext - Type of the FSM context.</p><h2 id="typeparam-2" tabindex="-1">Typeparam <a class="header-anchor" href="#typeparam-2" aria-label="Permalink to &quot;Typeparam&quot;">​</a></h2><p>FSMInput - Type of the FSM input.</p><h2 id="type-parameters" tabindex="-1">Type parameters <a class="header-anchor" href="#type-parameters" aria-label="Permalink to &quot;Type parameters&quot;">​</a></h2><p>• <strong>FSMState</strong></p><p>• <strong>FSMContext</strong></p><p>• <strong>FSMInput</strong></p><h2 id="properties" tabindex="-1">Properties <a class="header-anchor" href="#properties" aria-label="Permalink to &quot;Properties&quot;">​</a></h2><h3 id="defaulttransition" tabindex="-1">defaultTransition <a class="header-anchor" href="#defaulttransition" aria-label="Permalink to &quot;defaultTransition&quot;">​</a></h3><blockquote><p><strong>defaultTransition</strong>: <a href="./FSMTransition.html"><code>FSMTransition</code></a>&lt;<code>FSMState</code>, <code>FSMContext</code>, <code>FSMInput</code>&gt;</p></blockquote><h4 id="source" tabindex="-1">Source <a class="header-anchor" href="#source" aria-label="Permalink to &quot;Source&quot;">​</a></h4><p><a href="https://github.com/romain-bourjot/minifsm/blob/562a758/src/index.ts#L112" target="_blank" rel="noreferrer">index.ts:112</a></p><hr><h3 id="transitions" tabindex="-1">transitions <a class="header-anchor" href="#transitions" aria-label="Permalink to &quot;transitions&quot;">​</a></h3><blockquote><p><strong>transitions</strong>: <a href="./../type-aliases/FSMConditionalTransition.html"><code>FSMConditionalTransition</code></a>&lt;<code>FSMState</code>, <code>FSMContext</code>, <code>FSMInput</code>&gt;[]</p></blockquote><h4 id="source-1" tabindex="-1">Source <a class="header-anchor" href="#source-1" aria-label="Permalink to &quot;Source&quot;">​</a></h4><p><a href="https://github.com/romain-bourjot/minifsm/blob/562a758/src/index.ts#L111" target="_blank" rel="noreferrer">index.ts:111</a></p>`,25),p=[i];function o(r,l,c,d,h,f){return s(),n("div",null,p)}const m=a(t,[["render",o]]);export{u as __pageData,m as default};
