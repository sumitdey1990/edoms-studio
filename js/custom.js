document.querySelectorAll(".nav_ul").forEach((ul) => {
    const follower = ul.querySelector(".animate_border");
    const items = ul.querySelectorAll("li");
    if (!follower || items.length === 0) return;
    const first = items[0];
    const last = items[items.length - 1];
    let targetX = 0, currentX = 0;
    let animationFrameId = null;
    const animate = () => {
        currentX += (targetX - currentX) * 0.05;

        if (Math.abs(targetX - currentX) > 0.01) {
            follower.style.transform = `translateX(${currentX}px)`;
            animationFrameId = requestAnimationFrame(animate);
        }
    };

    ul.addEventListener("mousemove", (e) => {
        const r = ul.getBoundingClientRect();
        targetX = e.clientX - r.left - follower.offsetWidth / 2;

        if (!animationFrameId) {
            animationFrameId = requestAnimationFrame(animate);
        }
    });

    ul.addEventListener("mouseenter", () => {
        follower.style.opacity = "1";
    });

    ul.addEventListener("mouseleave", () => {
        follower.style.opacity = "0";
        ul.style.borderLeftColor = "";
        ul.style.borderRightColor = "";

        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
    });

    ul.addEventListener("mouseover", (e) => {
        const li = e.target.closest("li");
        if (!li) return;

        ul.style.borderLeftColor = li === first ? "rgb(231 36 237)" : "transparent";
        ul.style.borderRightColor = li === last ? "rgb(231 36 237)" : "transparent";
    });
});

if (typeof gsap !== 'undefined' && gsap.registerPlugin && document.querySelector(".hero-section")) {
    gsap.registerPlugin(ScrollTrigger);
    const imageConfigs = [
        { selector: ".img1", left: "-15%", top: "-10%", right: null, bottom: null },
        { selector: ".img2", right: "-15%", top: "-10%", left: null, bottom: null },
        { selector: ".img3", left: "-15%", bottom: "-10%", right: null, top: null },
        { selector: ".img4", right: "-15%", bottom: "-10%", left: null, top: null },
        { selector: ".img5", left: "50%", top: "-35%", right: null, bottom: null }
    ];

    imageConfigs.forEach(config => {
        const props = { xPercent: 0, yPercent: 0, scale: 1.2 };

        if (config.left !== null) props.left = config.left;
        if (config.right !== null) props.right = config.right;
        if (config.top !== null) props.top = config.top;
        if (config.bottom !== null) props.bottom = config.bottom;

        if (config.selector === ".img5") {
            props.xPercent = -50;
        }

        gsap.set(config.selector, props);
    });

    gsap.set(".hero-heading", { scale: 1, opacity: 1 });
    gsap.set(".hero-copy", { y: "100vh", opacity: 1 });
    gsap.set(".copy-item", { opacity: 0, y: 30 });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "+=500%",
            scrub: 1,
            pin: true,
            anticipatePin: 1
        }
    });
    tl.to({}, { duration: 0.8 }, 0);

    tl.to(".hero-heading", {
        scale: 0.15,
        ease: "power2.inOut",
        duration: 1.2
    }, 0.8);
    const imageAnimations = [
        { selector: ".img1", x: -100, y: -100 },
        { selector: ".img2", x: 100, y: -100 },
        { selector: ".img3", x: -100, y: 100 },
        { selector: ".img4", x: 100, y: 100 },
        { selector: ".img5", x: 0, y: -10 }
    ];
    imageAnimations.forEach(({ selector, x, y }) => {
        tl.to(selector, {
            left: "50%",
            top: "50%",
            xPercent: -50,
            yPercent: -50,
            x: x,
            y: y,
            scale: 0.8,
            ease: "power2.inOut",
            duration: 1.2
        }, 0.8);
    });
    tl.to({}, { duration: 0.8 }, 2.0);

    tl.to(".float-img", {
        y: "-100vh",
        ease: "power2.inOut",
        duration: 0.8
    }, 2.8);

    tl.to(".hero-heading", {
        y: "-100vh",
        opacity: 0,
        ease: "power2.inOut",
        duration: 0.8
    }, 2.8);

    tl.to(".hero-copy", {
        y: 0,
        ease: "power2.inOut",
        duration: 0.8
    }, 1.8);
    const copyItems = [
        { selector: ".copy-1", start: 3.2, hold: 3.7 },
        { selector: ".copy-2", start: 4.3, hold: 5.0 },
        { selector: ".copy-3", start: 5.0, hold: 5.3 }
    ];
    copyItems.forEach(({ selector, start, hold }) => {
        tl.to(selector, {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out"
        }, start);

        if (selector !== ".copy-3") {
            tl.to({}, { duration: 0.4 }, start + 0.3);
            tl.to(selector, {
                opacity: 1,
                duration: 0.2,
                ease: "power2.in"
            }, hold);
        } else {
            tl.to({}, { duration: 0.4 }, hold);
        }
    });
}
const numberEl = document.getElementById("number");
const loader = document.getElementById("loader");
if (numberEl && loader) {
    let value = 4;
    let angle = -90;
    const radius = Math.min(window.innerWidth, window.innerHeight) / 2.5;
    function update() {
        numberEl.textContent = value;
        const rad = angle * (Math.PI / 180);
        const x = Math.cos(rad) * (radius * 2.1);
        const y = Math.sin(rad) * radius;
        numberEl.style.transform = `translate(${x}px, ${y}px)`;

        angle += 90;
        value--;

        if (value < 0) {
            clearInterval(timer);
            loader.classList.add("open");

            setTimeout(() => {
                loader.style.display = "none";
            }, 1300);
        }
    }
    update();
    const timer = setInterval(update, 1000);
}

if (typeof gsap !== 'undefined' && gsap.registerPlugin) {
    gsap.registerPlugin(ScrollTrigger);
    const edoms = document.querySelector(".edoms");
    const studio = document.querySelector(".studio");
    if (edoms && studio) {
        gsap.timeline({
            scrollTrigger: {
                trigger: ".banner",
                start: "95% bottom",
                end: "bottom 10%",
                scrub: 1.2,
            }
        })
            .to(edoms, {
                x: () => {
                    const center = window.innerWidth / 2;
                    const rect = edoms.getBoundingClientRect();
                    return center - rect.right;
                },
                ease: "power3.out"
            }, 0)
            .to(studio, {
                x: () => {
                    const center = window.innerWidth / 2;
                    const rect = studio.getBoundingClientRect();
                    return -(rect.left - center);
                },
                ease: "power3.out"
            }, 0);
    }
}

