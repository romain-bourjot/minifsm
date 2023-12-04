---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "miniFSM"
  text: "WHATever!"
  tagline: "Empowering Stateful Efficiency tagline"
  image:
    src: /miniFSM.webp
    alt: miniFSM
  actions:
    - theme: brand
      text: Quick Start
      link: /quick-start.md
    - theme: alt
      text: API Reference
      link: /typedoc/globals.md

features:
  - icon: 🎨
    title: Simplified State Configuration
    details: Easily define states and behaviors, simplifying application design and maintenance.
  - icon: 🔄
    title: Enhanced State Management
    details: Streamline state handling and transitions for smoother application flow and enhanced performance.
  - icon: 🤖
    title: Boost Development Speed
    details: Use ChatGPT to turbocharge your workflow, reducing development time and effort.
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
