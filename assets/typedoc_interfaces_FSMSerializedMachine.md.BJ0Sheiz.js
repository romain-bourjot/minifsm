import{_ as a,c as n,o as s,V as e}from"./chunks/framework.Bled7NFg.js";const u=JSON.parse('{"title":"Interface: FSMSerializedMachine<FSMContext>","description":"","frontmatter":{},"headers":[],"relativePath":"typedoc/interfaces/FSMSerializedMachine.md","filePath":"typedoc/interfaces/FSMSerializedMachine.md"}'),t={name:"typedoc/interfaces/FSMSerializedMachine.md"},p=e(`<p><a href="./../">@minifsm/core</a> / FSMSerializedMachine</p><h1 id="interface-fsmserializedmachine-fsmcontext" tabindex="-1">Interface: FSMSerializedMachine&lt;FSMContext&gt; <a class="header-anchor" href="#interface-fsmserializedmachine-fsmcontext" aria-label="Permalink to &quot;Interface: FSMSerializedMachine\\&lt;FSMContext\\&gt;&quot;">​</a></h1><p>Represents the serialized form of a Finite State Machine (FSM). Serialized FSMs provide a compact representation of FSM instances that can be stored or transmitted. They consist of the current state and context of the FSM, allowing for easy reconstruction of the FSM state. Serialized FSMs are useful for persistence, communication, and debugging purposes.</p><h3 id="example" tabindex="-1">Example <a class="header-anchor" href="#example" aria-label="Permalink to &quot;Example&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>// npm run snippet:fsm-serialized-machine</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import &#39;module-alias/register&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import { type FSMSerializedMachine } from &#39;@minifsm/core&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Define types for context</span></span>
<span class="line"><span>interface MyContext {</span></span>
<span class="line"><span>  progress: number</span></span>
<span class="line"><span>  message: string</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 1. State is a string enum</span></span>
<span class="line"><span>enum StringEnumState {</span></span>
<span class="line"><span>  START = &#39;START&#39;,</span></span>
<span class="line"><span>  IN_PROGRESS = &#39;IN_PROGRESS&#39;,</span></span>
<span class="line"><span>  COMPLETE = &#39;COMPLETE&#39;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Create a serialized machine with State as a string enum</span></span>
<span class="line"><span>const serializedMachineStringEnum: FSMSerializedMachine&lt;MyContext&gt; = {</span></span>
<span class="line"><span>  currentState: StringEnumState.IN_PROGRESS,</span></span>
<span class="line"><span>  context: { progress: 75, message: &#39;Processing...&#39; }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>console.log(&#39;Serialized Machine with String Enum State:&#39;, serializedMachineStringEnum)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 2. State is a string constant union</span></span>
<span class="line"><span>// eslint-disable-next-line @typescript-eslint/no-unused-vars</span></span>
<span class="line"><span>type StringConstantUnionState = &#39;START&#39; | &#39;IN_PROGRESS&#39; | &#39;COMPLETE&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Create a serialized machine with State as a string constant union</span></span>
<span class="line"><span>const serializedMachineStringUnion: FSMSerializedMachine&lt;MyContext&gt; = {</span></span>
<span class="line"><span>  currentState: &#39;IN_PROGRESS&#39;,</span></span>
<span class="line"><span>  context: { progress: 75, message: &#39;Processing...&#39; }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>console.log(&#39;Serialized Machine with String Constant Union State:&#39;, serializedMachineStringUnion)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 3. State is a numeric enum</span></span>
<span class="line"><span>enum NumericEnumState {</span></span>
<span class="line"><span>  START,</span></span>
<span class="line"><span>  IN_PROGRESS,</span></span>
<span class="line"><span>  COMPLETE</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Create a serialized machine with State as a numeric enum</span></span>
<span class="line"><span>const serializedMachineNumericEnum: FSMSerializedMachine&lt;MyContext&gt; = {</span></span>
<span class="line"><span>  currentState: NumericEnumState.IN_PROGRESS.toString(),</span></span>
<span class="line"><span>  context: { progress: 75, message: &#39;Processing...&#39; }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>console.log(&#39;Serialized Machine with Numeric Enum State:&#39;, serializedMachineNumericEnum)</span></span></code></pre></div><h2 id="typeparam" tabindex="-1">Typeparam <a class="header-anchor" href="#typeparam" aria-label="Permalink to &quot;Typeparam&quot;">​</a></h2><p>FSMContext - Type of the FSM context.</p><h2 id="type-parameters" tabindex="-1">Type parameters <a class="header-anchor" href="#type-parameters" aria-label="Permalink to &quot;Type parameters&quot;">​</a></h2><p>• <strong>FSMContext</strong></p><h2 id="properties" tabindex="-1">Properties <a class="header-anchor" href="#properties" aria-label="Permalink to &quot;Properties&quot;">​</a></h2><h3 id="context" tabindex="-1">context <a class="header-anchor" href="#context" aria-label="Permalink to &quot;context&quot;">​</a></h3><blockquote><p><strong>context</strong>: <code>FSMContext</code></p></blockquote><h4 id="source" tabindex="-1">Source <a class="header-anchor" href="#source" aria-label="Permalink to &quot;Source&quot;">​</a></h4><p><a href="https://github.com/romain-bourjot/minifsm/blob/4218d81/src/index.ts#L166" target="_blank" rel="noreferrer">index.ts:166</a></p><hr><h3 id="currentstate" tabindex="-1">currentState <a class="header-anchor" href="#currentstate" aria-label="Permalink to &quot;currentState&quot;">​</a></h3><blockquote><p><strong>currentState</strong>: <code>string</code></p></blockquote><h4 id="source-1" tabindex="-1">Source <a class="header-anchor" href="#source-1" aria-label="Permalink to &quot;Source&quot;">​</a></h4><p><a href="https://github.com/romain-bourjot/minifsm/blob/4218d81/src/index.ts#L165" target="_blank" rel="noreferrer">index.ts:165</a></p>`,19),i=[p];function r(l,c,o,h,d,S){return s(),n("div",null,i)}const g=a(t,[["render",r]]);export{u as __pageData,g as default};
