import{_ as n,c as a,o as s,V as e}from"./chunks/framework.Bled7NFg.js";const M=JSON.parse('{"title":"Type alias: FSMDefinition<FSMState, FSMContext, FSMInput>","description":"","frontmatter":{},"headers":[],"relativePath":"typedoc/type-aliases/FSMDefinition.md","filePath":"typedoc/type-aliases/FSMDefinition.md"}'),t={name:"typedoc/type-aliases/FSMDefinition.md"},p=e(`<p><a href="./../">@minifsm/core</a> / FSMDefinition</p><h1 id="type-alias-fsmdefinition-fsmstate-fsmcontext-fsminput" tabindex="-1">Type alias: FSMDefinition&lt;FSMState, FSMContext, FSMInput&gt; <a class="header-anchor" href="#type-alias-fsmdefinition-fsmstate-fsmcontext-fsminput" aria-label="Permalink to &quot;Type alias: FSMDefinition\\&lt;FSMState, FSMContext, FSMInput\\&gt;&quot;">​</a></h1><blockquote><p><strong>FSMDefinition</strong>&lt;<code>FSMState</code>, <code>FSMContext</code>, <code>FSMInput</code>&gt;: <code>Record</code>&lt;<code>FSMState</code>, <a href="./../interfaces/FSMStateDefinition.html"><code>FSMStateDefinition</code></a>&lt;<code>FSMState</code>, <code>FSMContext</code>, <code>FSMInput</code>&gt;&gt;</p></blockquote><p>Represents the definition of a Finite State Machine (FSM). FSM definitions define the states and their corresponding state definitions in an FSM. They provide a high-level overview of the FSM structure and behavior, allowing developers to specify the states and transitions of the FSM. FSM definitions serve as blueprints for constructing FSM instances.</p><h3 id="example" tabindex="-1">Example <a class="header-anchor" href="#example" aria-label="Permalink to &quot;Example&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>// npm run snippet:fsm-definition</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import &#39;module-alias/register&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import { type FSMDefinition, type FSMStateDefinition } from &#39;@minifsm/core&#39;</span></span>
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
<span class="line"><span>// Define a state definition for each state</span></span>
<span class="line"><span>const stateADefinition: FSMStateDefinition&lt;MyState, MyContext, MyInput&gt; = {</span></span>
<span class="line"><span>  transitions: [],</span></span>
<span class="line"><span>  defaultTransition: { nextState: &#39;STATE_A&#39;, action: ({ context }) =&gt; ({ ...context }) } // No-op default transition</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>const stateBDefinition: FSMStateDefinition&lt;MyState, MyContext, MyInput&gt; = {</span></span>
<span class="line"><span>  transitions: [],</span></span>
<span class="line"><span>  defaultTransition: { nextState: &#39;STATE_B&#39;, action: ({ context }) =&gt; ({ ...context }) } // No-op default transition</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Define the FSM definition</span></span>
<span class="line"><span>const fsmDefinition: FSMDefinition&lt;MyState, MyContext, MyInput&gt; = {</span></span>
<span class="line"><span>  STATE_A: stateADefinition,</span></span>
<span class="line"><span>  STATE_B: stateBDefinition</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Log the FSM definition</span></span>
<span class="line"><span>console.log(&#39;FSM Definition:&#39;, fsmDefinition)</span></span></code></pre></div><h2 id="typeparam" tabindex="-1">Typeparam <a class="header-anchor" href="#typeparam" aria-label="Permalink to &quot;Typeparam&quot;">​</a></h2><p>FSMState - Type of the FSM state.</p><h2 id="typeparam-1" tabindex="-1">Typeparam <a class="header-anchor" href="#typeparam-1" aria-label="Permalink to &quot;Typeparam&quot;">​</a></h2><p>FSMContext - Type of the FSM context.</p><h2 id="typeparam-2" tabindex="-1">Typeparam <a class="header-anchor" href="#typeparam-2" aria-label="Permalink to &quot;Typeparam&quot;">​</a></h2><p>FSMInput - Type of the FSM input.</p><h2 id="type-parameters" tabindex="-1">Type parameters <a class="header-anchor" href="#type-parameters" aria-label="Permalink to &quot;Type parameters&quot;">​</a></h2><p>• <strong>FSMState</strong> extends <code>string</code></p><p>• <strong>FSMContext</strong></p><p>• <strong>FSMInput</strong></p><h2 id="source" tabindex="-1">Source <a class="header-anchor" href="#source" aria-label="Permalink to &quot;Source&quot;">​</a></h2><p><a href="https://github.com/romain-bourjot/minifsm/blob/562a758/src/index.ts#L128" target="_blank" rel="noreferrer">index.ts:128</a></p>`,18),i=[p];function o(l,r,c,d,f,S){return s(),a("div",null,i)}const m=n(t,[["render",o]]);export{M as __pageData,m as default};
