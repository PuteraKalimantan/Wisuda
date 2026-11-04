
// =========================================
// HAPPY GRADUATION
// RESPONSIVE ANIMATION - GSAP 3
// =========================================

// Memulai pengalaman setelah halaman selesai dimuat
window.addEventListener("load", async () => {

    const audio = document.querySelector(".song");

    const result = await Swal.fire({
        title: "Do you want to play music in the background?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
    });

    // Putar musik jika pengguna menyetujui
    if (result.isConfirmed && audio) {
        try {
            await audio.play();
        } catch (error) {
            console.log("Audio tidak dapat diputar:", error);
        }
    }

    // Jalankan animasi
    animationTimeline();
});


// =========================================
// MEMECAH TEKS MENJADI KARAKTER
// =========================================

function splitText(element) {

    if (!element || element.dataset.split === "true") return;

    const originalText = element.textContent;
    element.textContent = "";

    Array.from(originalText).forEach(char => {

        const span = document.createElement("span");

        span.textContent = char;
        span.style.whiteSpace = "pre";

        element.appendChild(span);

    });

    element.dataset.split = "true";
}


// =========================================
// ANIMATION TIMELINE
// =========================================

const animationTimeline = () => {

    // Pastikan GSAP tersedia
    if (typeof gsap === "undefined") {
        console.error("GSAP belum berhasil dimuat.");
        document.querySelector(".container").style.visibility = "visible";
        return;
    }

    // Elemen teks
    const textBox = document.querySelector(".hbd-chatbox");
    const hbd = document.querySelector(".wish-hbd");

    // Pecah teks menjadi karakter
    splitText(textBox);
    splitText(hbd);

    // Deteksi ukuran layar
    const isMobile = window.matchMedia("(max-width: 500px)").matches;

    // Penyesuaian animasi berdasarkan layar
    const photoScale = isMobile ? 1.8 : 3.5;

    const screenHeight = window.innerHeight;

    const balloonStart = screenHeight + 500;
    const balloonEnd = -(screenHeight + 500);

    // Transisi teks
    const ideaTextTrans = {
        opacity: 0,
        y: -20,
        rotationX: 5,
        skewX: "15deg"
    };

    const ideaTextTransLeave = {
        opacity: 0,
        y: 20,
        rotationY: 5,
        skewX: "-15deg"
    };


    // =====================================
    // TIMELINE GSAP 3
    // =====================================

    const tl = gsap.timeline();

    // BAGIAN 1 - PEMBUKAAN

    tl.to(".container", {
        duration: 0.6,
        autoAlpha: 1
    })

    .from(".one", {
        duration: 0.7,
        opacity: 0,
        y: 10
    })

    .from(".two", {
        duration: 0.4,
        opacity: 0,
        y: 10
    })

    .to(".one", {
        duration: 0.7,
        opacity: 0,
        y: 10
    }, "+=3.5")

    .to(".two", {
        duration: 0.7,
        opacity: 0,
        y: 10
    }, "-=1")


    // BAGIAN 2 - UCAPAN

    .from(".three", {
        duration: 0.7,
        opacity: 0,
        y: 10
    })

    .to(".three", {
        duration: 0.7,
        opacity: 0,
        y: 10
    }, "+=3")

    .from(".four", {
        duration: 0.7,
        scale: 0.2,
        opacity: 0
    })

    .from(".fake-btn", {
        duration: 0.3,
        scale: 0.2,
        opacity: 0
    })

    .to(".hbd-chatbox span", {
        duration: 1.5,
        visibility: "visible",
        stagger: 0.05
    })

    .to(".fake-btn", {
        duration: 0.1,
        backgroundColor: "rgb(127, 206, 248)"
    }, "+=4")

    .to(".four", {
        duration: 0.5,
        scale: 0.2,
        opacity: 0,
        y: -150
    }, "+=1")


    // BAGIAN 3 - PESAN SPESIAL

    .from(".idea-1", {
        duration: 0.7,
        ...ideaTextTrans
    })

    .to(".idea-1", {
        duration: 0.7,
        ...ideaTextTransLeave
    }, "+=2.5")

    .from(".idea-2", {
        duration: 0.7,
        ...ideaTextTrans
    })

    .to(".idea-2", {
        duration: 0.7,
        ...ideaTextTransLeave
    }, "+=2.5")

    .from(".idea-3", {
        duration: 0.7,
        ...ideaTextTrans
    })

    .to(".idea-3 strong", {
        duration: 0.5,
        scale: 1.2,
        x: isMobile ? 0 : 10,
        backgroundColor: "rgb(21, 161, 237)",
        color: "#fff"
    })

    .to(".idea-3", {
        duration: 0.7,
        ...ideaTextTransLeave
    }, "+=2.5")

    .from(".idea-4", {
        duration: 0.7,
        ...ideaTextTrans
    })

    .to(".idea-4", {
        duration: 0.7,
        ...ideaTextTransLeave
    }, "+=2.5")


    // BAGIAN 4 - YOU ARE SPECIAL

    .from(".idea-5", {
        duration: 0.7,
        rotationX: 15,
        rotationZ: -10,
        skewY: "-5deg",
        y: 50,
        z: 10,
        opacity: 0
    }, "+=1.5")

    .to(".idea-5 span", {
        duration: 0.7,
        rotation: 90,
        x: 8
    }, "+=1.4")

    .to(".idea-5", {
        duration: 0.7,
        scale: 0.2,
        opacity: 0
    }, "+=2")


    // BAGIAN 5 - ANIMASI SO

    .from(".idea-6 span", {
        duration: 0.8,
        scale: 3,
        opacity: 0,
        rotation: 15,
        ease: "expo.out",
        stagger: 0.2
    })

    .to(".idea-6 span", {
        duration: 0.8,
        scale: 3,
        opacity: 0,
        rotation: -15,
        ease: "expo.out",
        stagger: 0.2
    }, "+=1.5")


    // BAGIAN 6 - BALON TERBANG

    .fromTo(".baloons img", {
        opacity: 0.9,
        y: balloonStart
    }, {
        duration: 2.5,
        opacity: 1,
        y: balloonEnd,
        stagger: 0.2,
        ease: "power1.out"
    })


    // BAGIAN 7 - FOTO WISUDA

    .from(".profile-picture", {
        duration: 0.5,
        scale: photoScale,
        opacity: 0,
        x: isMobile ? 0 : 25,
        y: -25,
        rotationZ: -45,
        stagger: 0.15
    }, "-=2")

    .from(".hat", {
        duration: 0.5,
        x: -100,
        y: 350,
        rotation: -180,
        opacity: 0
    })


    // BAGIAN 8 - UCAPAN SELAMAT WISUDA

    .addLabel("party")

    .from(".wish-hbd span", {
        duration: 0.7,
        opacity: 0,
        y: -50,
        rotation: 150,
        skewX: "30deg",
        ease: "elastic.out(1, 0.5)",
        stagger: 0.1
    }, "party")

    .fromTo(".wish-hbd span", {
        scale: 1.4,
        rotationY: 150
    }, {
        duration: 0.7,
        scale: 1,
        rotationY: 0,
        color: "#ff69b4",
        ease: "expo.out",
        stagger: 0.1
    }, "party")

    .from(".wish h5", {
        duration: 0.5,
        opacity: 0,
        y: 10,
        skewX: "-15deg"
    }, "party")


    // BAGIAN 9 - ANIMASI LINGKARAN

    .to(".eight svg", {
        duration: 1.5,
        visibility: "visible",
        opacity: 0,
        scale: 80,
        repeat: 3,
        repeatDelay: 1.4,
        stagger: 0.3
    })


    // BAGIAN 10 - PENUTUP

    .to(".six", {
        duration: 0.5,
        opacity: 0,
        y: 30,
        zIndex: -1
    })

    .from(".nine p", {
        duration: 1,
        ...ideaTextTrans,
        stagger: 1.2
    })

    .to(".last-smile", {
        duration: 0.5,
        rotation: 90
    }, "+=1");


    // =====================================
    // TOMBOL REPLAY
    // =====================================

    const replyBtn = document.getElementById("replay");

    if (replyBtn) {

        replyBtn.addEventListener("click", () => {
            tl.restart();
        });

    }

};
