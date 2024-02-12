import{_ as a,c as n,o as e,V as s}from"./chunks/framework.Bled7NFg.js";const S=JSON.parse('{"title":"Interface: FSMMachine<FSMState, FSMContext>","description":"","frontmatter":{},"headers":[],"relativePath":"typedoc/interfaces/FSMMachine.md","filePath":"typedoc/interfaces/FSMMachine.md"}'),t={name:"typedoc/interfaces/FSMMachine.md"},p=s(`<p><a href="./../">@minifsm/core</a> / FSMMachine</p><h1 id="interface-fsmmachine-fsmstate-fsmcontext" tabindex="-1">Interface: FSMMachine&lt;FSMState, FSMContext&gt; <a class="header-anchor" href="#interface-fsmmachine-fsmstate-fsmcontext" aria-label="Permalink to &quot;Interface: FSMMachine\\&lt;FSMState, FSMContext\\&gt;&quot;">​</a></h1><p>A <strong>Machine</strong> is an instance of an object encapsulating a current state and a context. It is the object that serves as input and output to doTransition.</p><p>The <strong>Context</strong> in MiniFSM is an object that is accessible from the machine. It can also be read from outside, as we will see further.</p><p>The <strong>State</strong> in MiniFSM is a label pointing to one of a finite number of states the machine can be in.</p><h3 id="example" tabindex="-1">Example <a class="header-anchor" href="#example" aria-label="Permalink to &quot;Example&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>// npm run snippet:fsm-machine</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import &#39;module-alias/register&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import { type FSMMachine } from &#39;@minifsm/core&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Define types for state and context</span></span>
<span class="line"><span>type MyState = &#39;START&#39; | &#39;IN_PROGRESS&#39; | &#39;COMPLETE&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>interface MyContext {</span></span>
<span class="line"><span>  progress: number</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Define an initial machine state</span></span>
<span class="line"><span>const initialMachineState: FSMMachine&lt;MyState, MyContext&gt; = {</span></span>
<span class="line"><span>  currentState: &#39;START&#39;,</span></span>
<span class="line"><span>  context: { progress: 0 }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Log initial machine state</span></span>
<span class="line"><span>console.log(&#39;Initial Machine State:&#39;, initialMachineState)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Simulate a transition</span></span>
<span class="line"><span>const updatedMachineState: FSMMachine&lt;MyState, MyContext&gt; = {</span></span>
<span class="line"><span>  currentState: &#39;IN_PROGRESS&#39;,</span></span>
<span class="line"><span>  context: { progress: 50 }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Log updated machine state after transition</span></span>
<span class="line"><span>console.log(&#39;Updated Machine State:&#39;, updatedMachineState)</span></span></code></pre></div><h2 id="typeparam" tabindex="-1">Typeparam <a class="header-anchor" href="#typeparam" aria-label="Permalink to &quot;Typeparam&quot;">​</a></h2><p>FSMState - Type of the state for this machine.</p><h2 id="typeparam-1" tabindex="-1">Typeparam <a class="header-anchor" href="#typeparam-1" aria-label="Permalink to &quot;Typeparam&quot;">​</a></h2><p>FSMContext - Type of the data encapsulated in the machine.</p><h2 id="type-parameters" tabindex="-1">Type parameters <a class="header-anchor" href="#type-parameters" aria-label="Permalink to &quot;Type parameters&quot;">​</a></h2><p>• <strong>FSMState</strong></p><p>• <strong>FSMContext</strong></p><h2 id="properties" tabindex="-1">Properties <a class="header-anchor" href="#properties" aria-label="Permalink to &quot;Properties&quot;">​</a></h2><h3 id="context" tabindex="-1">context <a class="header-anchor" href="#context" aria-label="Permalink to &quot;context&quot;">​</a></h3><blockquote><p><strong>context</strong>: <code>FSMContext</code></p></blockquote><h4 id="source" tabindex="-1">Source <a class="header-anchor" href="#source" aria-label="Permalink to &quot;Source&quot;">​</a></h4><p><a href="https://github.com/romain-bourjot/minifsm/blob/4218d81/src/index.ts#L150" target="_blank" rel="noreferrer">index.ts:150</a></p><hr><h3 id="currentstate" tabindex="-1">currentState <a class="header-anchor" href="#currentstate" aria-label="Permalink to &quot;currentState&quot;">​</a></h3><blockquote><p><strong>currentState</strong>: <code>FSMState</code></p></blockquote><h4 id="source-1" tabindex="-1">Source <a class="header-anchor" href="#source-1" aria-label="Permalink to &quot;Source&quot;">​</a></h4><p><a href="https://github.com/romain-bourjot/minifsm/blob/4218d81/src/index.ts#L149" target="_blank" rel="noreferrer">index.ts:149</a></p>`,24),i=[p];function r(o,c,l,h,d,m){return e(),n("div",null,i)}const f=a(t,[["render",r]]);export{S as __pageData,f as default};
