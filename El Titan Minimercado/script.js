gsap.registerPlugin(ScrollTrigger);

gsap.from('.navbar', { duration: 0.75, y: '-100', delay: 0.15 })
gsap.from('.divTitulo', { duration: 0.75, x: '-100', })

gsap.to('.divTitulo', { y: -50, duration: 0.80, scrollTrigger: 'divTitulo', delay: 0.05 })

gsap.from(".subTitle3", { x: 50, duration: 2.5, ease: "expo.out", scrollTrigger: 'subTitle3', delay: 0.2 });

gsap.from(".imgCard", { x: 50, duration: 3, ease: "power3.out", scrollTrigger: 'imgCard', delay: 0.2 });

gsap.from(".teEsperamos", { x: -50, duration: 3, ease: "power2.out", scrollTrigger: 'teEsperamos', delay: 1.1 });

gsap.from(".subTitle2", { y: -50, duration: 2, ease: "expo.out", scrollTrigger: 'subTitle3', delay: 0.2 });

gsap.from(".formDiv", { y:-350, duration:4, ease: "bounce", scrollTrigger: 'formDiv'});