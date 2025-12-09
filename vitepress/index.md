---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "MiniFSM"
  text: "Type-Safe State Machines"
  tagline: "A lightweight TypeScript library for building finite state machines with zero dependencies"
  image:
    src: /miniFSM.webp
    alt: MiniFSM
  actions:
    - theme: brand
      text: Quick Start
      link: /quick-start
    - theme: alt
      text: API Reference
      link: /typedoc/

features:
  - icon: ⚡
    title: Minimal API
    details: One core function and a few types. Define states as handler functions—no complex configuration or boilerplate required.
  - icon: 🔒
    title: Type-Safe
    details: Full TypeScript support with strong typing for states, context, and inputs. Catch errors at compile time, not runtime.
  - icon: 🔄
    title: Immutable by Design
    details: Transitions return new state objects. Integrates seamlessly with React, Redux, or any immutable architecture.
  - icon: 📦
    title: Zero Dependencies
    details: Lightweight footprint with no external dependencies. Works in Node.js, browsers, Deno, Bun, and edge runtimes.
---


<style>
:root {
    --vp-home-hero-name-background: linear-gradient( -45deg, #22515C 30%, #00baf8 );
    --vp-home-hero-image-background-image: transparent; /* linear-gradient( -45deg, #22515C 50%, #00baf8 50% ); */
/* #bd34fe bd34fe */
}

.VPImage.image-src {
    transform: translate(-50%, -50%);
    animation: float 24s ease-in-out infinite alternate;
}

@keyframes float {
	0% {
		transform: translatey(calc(-50% + 3px)) translatex(calc(-50% - 8px));
	}
	14% {
		transform: translatey(calc(-50% - 3px)) translatex(calc(-50% - 1px));
	}
    28% {
		transform: translatey(calc(-50% + 3px)) translatex(calc(-50% + 2px));
	}
	42% {
		transform: translatey(calc(-50% - 4px)) translatex(calc(-50% + 4px));
	}
    57% {
		transform: translatey(calc(-50% + 4px)) translatex(calc(-50% - 4px));
	}
	71% {
		transform: translatey(calc(-50% - 4px)) translatex(calc(-50% - 1px));
	}
    85% {
		transform: translatey(calc(-50% + 4px)) translatex(calc(-50% + 2px));
	}
	100% {
		transform: translatey(calc(-50% - 6px)) translatex(calc(-50% + 3px));
	}

}
</style>
