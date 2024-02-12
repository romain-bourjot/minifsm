import{_ as a,c as n,o as e,V as s}from"./chunks/framework.Bled7NFg.js";const M=JSON.parse('{"title":"Function: deserializeMachine()","description":"","frontmatter":{},"headers":[],"relativePath":"typedoc/functions/deserializeMachine.md","filePath":"typedoc/functions/deserializeMachine.md"}'),t={name:"typedoc/functions/deserializeMachine.md"},i=s(`<p><a href="./../">@minifsm/core</a> / deserializeMachine</p><h1 id="function-deserializemachine" tabindex="-1">Function: deserializeMachine() <a class="header-anchor" href="#function-deserializemachine" aria-label="Permalink to &quot;Function: deserializeMachine()&quot;">​</a></h1><blockquote><p><strong>deserializeMachine</strong>&lt;<code>FSMState</code>, <code>FSMContext</code>, <code>FSMInput</code>&gt;(<code>_</code>): <a href="./../interfaces/FSMMachine.html"><code>FSMMachine</code></a>&lt;<code>FSMState</code>, <code>FSMContext</code>&gt;</p></blockquote><p>Deserializes a plain object representation of a Finite State Machine (FSM) to an FSM instance. Deserialization reconstructs an FSM instance from its serialized form, restoring the FSM&#39;s state and context. It typically involves parsing the serialized data and creating a new FSM instance with the restored state and context. Deserialization is essential for restoring FSM instances from storage or communication channels.</p><h3 id="example" tabindex="-1">Example <a class="header-anchor" href="#example" aria-label="Permalink to &quot;Example&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>// npm run snippet:deserialize-machine</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import &#39;module-alias/register&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import { deserializeMachine, type FSMDefinition } from &#39;@minifsm/core&#39;</span></span>
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
<span class="line"><span>    transitions: [],</span></span>
<span class="line"><span>    defaultTransition: { nextState: &#39;STATE_A&#39;, action: ({ context }) =&gt; context }</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  STATE_B: {</span></span>
<span class="line"><span>    transitions: [],</span></span>
<span class="line"><span>    defaultTransition: { nextState: &#39;STATE_B&#39;, action: ({ context }) =&gt; context }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Define a serialized machine</span></span>
<span class="line"><span>const serializedMachine = {</span></span>
<span class="line"><span>  currentState: &#39;STATE_A&#39;,</span></span>
<span class="line"><span>  context: { data: &#39;Serialized data&#39; }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Deserialize the serialized machine</span></span>
<span class="line"><span>const deserializedMachine = deserializeMachine({</span></span>
<span class="line"><span>  serialized: serializedMachine,</span></span>
<span class="line"><span>  definition: fsmDefinition</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Log the deserialized machine</span></span>
<span class="line"><span>console.log(&#39;Deserialized Machine:&#39;, deserializedMachine)</span></span></code></pre></div><h2 id="type-parameters" tabindex="-1">Type parameters <a class="header-anchor" href="#type-parameters" aria-label="Permalink to &quot;Type parameters&quot;">​</a></h2><p>• <strong>FSMState</strong> extends <code>string</code></p><p>• <strong>FSMContext</strong></p><p>• <strong>FSMInput</strong></p><h2 id="parameters" tabindex="-1">Parameters <a class="header-anchor" href="#parameters" aria-label="Permalink to &quot;Parameters&quot;">​</a></h2><p>• <strong>_</strong></p><p>• <strong>_.definition</strong>: <a href="./../type-aliases/FSMDefinition.html"><code>FSMDefinition</code></a>&lt;<code>FSMState</code>, <code>FSMContext</code>, <code>FSMInput</code>&gt;</p><p>The definition of the FSM.</p><p>• <strong>_.serialized</strong>: <a href="./../interfaces/FSMSerializedMachine.html"><code>FSMSerializedMachine</code></a>&lt;<code>FSMContext</code>&gt;</p><p>The serialized form of the FSM.</p><h2 id="returns" tabindex="-1">Returns <a class="header-anchor" href="#returns" aria-label="Permalink to &quot;Returns&quot;">​</a></h2><p><a href="./../interfaces/FSMMachine.html"><code>FSMMachine</code></a>&lt;<code>FSMState</code>, <code>FSMContext</code>&gt;</p><p>The deserialized FSM instance.</p><h2 id="typeparam" tabindex="-1">Typeparam <a class="header-anchor" href="#typeparam" aria-label="Permalink to &quot;Typeparam&quot;">​</a></h2><p>FSMState - Type of the FSM state.</p><h2 id="typeparam-1" tabindex="-1">Typeparam <a class="header-anchor" href="#typeparam-1" aria-label="Permalink to &quot;Typeparam&quot;">​</a></h2><p>FSMContext - Type of the FSM context.</p><h2 id="typeparam-2" tabindex="-1">Typeparam <a class="header-anchor" href="#typeparam-2" aria-label="Permalink to &quot;Typeparam&quot;">​</a></h2><p>FSMInput - Type of the FSM input.</p><h2 id="throws" tabindex="-1">Throws <a class="header-anchor" href="#throws" aria-label="Permalink to &quot;Throws&quot;">​</a></h2><p>Error if the serialized state does not match any state in the FSM definition.</p><h2 id="source" tabindex="-1">Source <a class="header-anchor" href="#source" aria-label="Permalink to &quot;Source&quot;">​</a></h2><p><a href="https://github.com/romain-bourjot/minifsm/blob/4218d81/src/index.ts#L350" target="_blank" rel="noreferrer">index.ts:350</a></p>`,29),p=[i];function o(r,l,c,d,h,m){return e(),n("div",null,p)}const S=a(t,[["render",o]]);export{M as __pageData,S as default};
