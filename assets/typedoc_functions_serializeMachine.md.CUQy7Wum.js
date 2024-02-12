import{_ as a,c as n,o as s,V as e}from"./chunks/framework.Bled7NFg.js";const u=JSON.parse('{"title":"Function: serializeMachine()","description":"","frontmatter":{},"headers":[],"relativePath":"typedoc/functions/serializeMachine.md","filePath":"typedoc/functions/serializeMachine.md"}'),i={name:"typedoc/functions/serializeMachine.md"},t=e(`<p><a href="./../">@minifsm/core</a> / serializeMachine</p><h1 id="function-serializemachine" tabindex="-1">Function: serializeMachine() <a class="header-anchor" href="#function-serializemachine" aria-label="Permalink to &quot;Function: serializeMachine()&quot;">​</a></h1><blockquote><p><strong>serializeMachine</strong>&lt;<code>FSMState</code>, <code>FSMContext</code>&gt;(<code>machine</code>): <a href="./../interfaces/FSMSerializedMachine.html"><code>FSMSerializedMachine</code></a>&lt;<code>FSMContext</code>&gt;</p></blockquote><p>Serializes a Finite State Machine (FSM) to a plain object representation. Serialization converts an FSM instance into a format that can be stored, transmitted, or persisted. Serialized FSMs typically include the current state and context of the FSM, allowing for reconstruction of the FSM state. Serialization is useful for persistence, communication, and debugging purposes.</p><h3 id="example" tabindex="-1">Example <a class="header-anchor" href="#example" aria-label="Permalink to &quot;Example&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>// npm run snippet:serialize-machine</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import &#39;module-alias/register&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import { type FSMMachine, serializeMachine } from &#39;@minifsm/core&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Define types for state, context, and input</span></span>
<span class="line"><span>enum MyStateEnum {</span></span>
<span class="line"><span>  STATE_A = &#39;STATE_A&#39;,</span></span>
<span class="line"><span>  STATE_B = &#39;STATE_B&#39;,</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>type MyStateUnion = &#39;STATE_A&#39; | &#39;STATE_B&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>enum MyStateNumeric {</span></span>
<span class="line"><span>  STATE_A,</span></span>
<span class="line"><span>  STATE_B,</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>interface MyContext {</span></span>
<span class="line"><span>  data: string</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Define an FSM machine instance with State as a string enum</span></span>
<span class="line"><span>const machineEnum: FSMMachine&lt;MyStateEnum, MyContext&gt; = {</span></span>
<span class="line"><span>  currentState: MyStateEnum.STATE_A,</span></span>
<span class="line"><span>  context: { data: &#39;Serialized data&#39; }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Serialize the FSM machine with State as a string enum</span></span>
<span class="line"><span>const serializedMachineEnum = serializeMachine(machineEnum)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Log the serialized machine with State as a string enum</span></span>
<span class="line"><span>console.log(&#39;Serialized Machine with State as string enum:&#39;, serializedMachineEnum)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Define an FSM machine instance with State as a string constant union</span></span>
<span class="line"><span>const machineUnion: FSMMachine&lt;MyStateUnion, MyContext&gt; = {</span></span>
<span class="line"><span>  currentState: &#39;STATE_A&#39;,</span></span>
<span class="line"><span>  context: { data: &#39;Serialized data&#39; }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Serialize the FSM machine with State as a string constant union</span></span>
<span class="line"><span>const serializedMachineUnion = serializeMachine(machineUnion)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Log the serialized machine with State as a string constant union</span></span>
<span class="line"><span>console.log(&#39;Serialized Machine with State as string constant union:&#39;, serializedMachineUnion)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Define an FSM machine instance with State as a numeric enum</span></span>
<span class="line"><span>const machineNumeric: FSMMachine&lt;MyStateNumeric, MyContext&gt; = {</span></span>
<span class="line"><span>  currentState: MyStateNumeric.STATE_A,</span></span>
<span class="line"><span>  context: { data: &#39;Serialized data&#39; }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Serialize the FSM machine with State as a numeric enum</span></span>
<span class="line"><span>const serializedMachineNumeric = serializeMachine(machineNumeric)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Log the serialized machine with State as a numeric enum</span></span>
<span class="line"><span>console.log(&#39;Serialized Machine with State as numeric enum:&#39;, serializedMachineNumeric)</span></span></code></pre></div><h2 id="type-parameters" tabindex="-1">Type parameters <a class="header-anchor" href="#type-parameters" aria-label="Permalink to &quot;Type parameters&quot;">​</a></h2><p>• <strong>FSMState</strong> extends <code>string</code> | <code>number</code></p><p>• <strong>FSMContext</strong></p><h2 id="parameters" tabindex="-1">Parameters <a class="header-anchor" href="#parameters" aria-label="Permalink to &quot;Parameters&quot;">​</a></h2><p>• <strong>machine</strong>: <a href="./../interfaces/FSMMachine.html"><code>FSMMachine</code></a>&lt;<code>FSMState</code>, <code>FSMContext</code>&gt;</p><p>The FSM to serialize.</p><h2 id="returns" tabindex="-1">Returns <a class="header-anchor" href="#returns" aria-label="Permalink to &quot;Returns&quot;">​</a></h2><p><a href="./../interfaces/FSMSerializedMachine.html"><code>FSMSerializedMachine</code></a>&lt;<code>FSMContext</code>&gt;</p><p>The serialized form of the FSM.</p><h2 id="typeparam" tabindex="-1">Typeparam <a class="header-anchor" href="#typeparam" aria-label="Permalink to &quot;Typeparam&quot;">​</a></h2><p>FSMState - Type of the FSM state.</p><h2 id="typeparam-1" tabindex="-1">Typeparam <a class="header-anchor" href="#typeparam-1" aria-label="Permalink to &quot;Typeparam&quot;">​</a></h2><p>FSMContext - Type of the FSM context.</p><h2 id="source" tabindex="-1">Source <a class="header-anchor" href="#source" aria-label="Permalink to &quot;Source&quot;">​</a></h2><p><a href="https://github.com/romain-bourjot/minifsm/blob/562a758/src/index.ts#L320" target="_blank" rel="noreferrer">index.ts:320</a></p>`,21),p=[t];function c(l,r,o,h,d,m){return s(),n("div",null,p)}const M=a(i,[["render",c]]);export{u as __pageData,M as default};
