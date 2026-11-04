// =========================================
// HAPPY GRADUATION
// FINAL ANIMATION - GSAP 3
// =========================================

window.addEventListener("load", async () => {

    const container = document.querySelector(".container");
    const audio = document.querySelector(".song");

    // Pastikan library tersedia
    if (typeof gsap === "undefined") {
        console.error("GSAP gagal dimuat.");
        if (container) container.style.visibility = "visible";
        return;
    }

    // Jalankan animasi terlebih dahulu
    animationTimeline();

    // Popup musik
    if (typeof Swal !== "undefined" && audio) {

        try {
            const result = await Swal.fire({
                title: "Do you want to play music in the background?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes",
                cancelButtonText: "No"
            });

            if (result.isConfirmed) {
                try {
                    await audio.play();
                } catch (error) {
                    console.error("Musik gagal diputar:", error);
                }
            }

        } catch (error) {
            console.error("SweetAlert error:", error);
        }

    } else {
        console.warn("SweetAlert atau audio tidak tersedia.");
    }

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
        span.style.whiteSpace = "pre-wrap";
        span.style.display = "inline";

        element.appendChild(span);

    });

    element.dataset.split = "true";

}


// =========================================
// ANIMATION TIMELINE
// =========================================

const animationTimeline = () => {

    if (typeof gsap === "undefined") {
        console.error("GSAP belum tersedia.");
        document.querySelector(".container").style.visibility = "visible";
        return;
    }

    const textBox = document.querySelector(".hbd-chatbox");
    const hbd = document.querySelector(".wish-hbd");

    const container = document.querySelector(".container");

    if (!container) {
        console.error("Container tidak ditemukan.");
        return;
    }

    // Pecah teks
    splitText(textBox);
    splitText(hbd);

    // Deteksi layar
    const isMobile = window.matchMedia("(max-width: 500px)").matches;

    const photoScale = isMobile ? 1.3 : 2.5;

    const screenHeight = window.innerHeight;

    const balloonStart = screenHeight + 500;
    const balloonEnd = -(screenHeight + 500);

    // Pengaturan transisi teks
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

    // Timeline
    const tl = gsap.timeline({
        paused: true,
        onStart: () => {
            gsap.set(".container", {
                visibility: "visible"
            });
        }
    });

    // Pastikan foto tersembunyi
    gsap.set(".six", {
        autoAlpha: 0
    });

    gsap.set(".eight svg", {
        visibility: "hidden"
    });

    // =====================================
    // BAGIAN 1 - PEMBUKAAN
    // =====================================

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


    // =====================================
    // BAGIAN 2 - UCAPAN
    // =====================================

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

    

    // Setelah pesan selesai, tunggu 0,3 detik
    .to(".fake-btn", {
        duration: 0.1,
        backgroundColor: "rgb(127, 206, 248)"
    }, "+=0.3")

    // Kotak pesan langsung mengecil dan menghilang
    .to(".four", {
        duration: 0.4,
        scale: 0.2,
        opacity: 0,
        y: -150
    }, ">")


    // =====================================
    // BAGIAN 3 - PESAN SPESIAL
    // =====================================

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


    // =====================================
    // BAGIAN 4 - YOU ARE SPECIAL
    // =====================================

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


    // =====================================
    // BAGIAN 5 - ANIMASI SO
    // =====================================

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


    // =====================================
    // BAGIAN 6 - BALON TERBANG
    // =====================================

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


    // =====================================
    // BAGIAN 7 - FOTO WISUDA
    // =====================================

    .to(".six", {
        duration: 0.6,
        autoAlpha: 1
    })

    .from(".profile-picture", {
        duration: 0.5,
        scale: photoScale,
        opacity: 0,
        x: isMobile ? 0 : 25,
        y: -25,
        rotationZ: -45,
        stagger: 0.15
    })

    .from(".hat", {
        duration: 0.5,
        x: -100,
        y: 350,
        rotation: -180,
        opacity: 0
    })


 
    // =====================================
    // BAGIAN 8 - UCAPAN WISUDA
    // =====================================

    .addLabel("party")

    // ANIMASI JUDUL WISUDA
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

    // TUNGGU JUDUL SELESAI, BARU TAMPILKAN UCAPAN
    .from(".wish h5", {
        duration: 1,
        opacity: 0,
        y: 25,
        ease: "power2.out"
    }, ">+=0.5")



    // =====================================
    // BAGIAN 9 - LINGKARAN
    // =====================================

    .to(".eight svg", {
        duration: 1.5,
        visibility: "visible",
        opacity: 0,
        scale: 80,
        repeat: 3,
        repeatDelay: 1.4,
        stagger: 0.3
    })


    // =====================================
    // BAGIAN 10 - PENUTUP
    // =====================================

    .to(".six", {
        duration: 0.5,
        autoAlpha: 0,
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

    const replayButton = document.getElementById("replay");

    if (replayButton) {

        replayButton.addEventListener("click", () => {

            // Reset posisi seluruh animasi
            tl.restart();

        });

    }

    // Mulai animasi setelah timeline siap
    tl.play();

};
