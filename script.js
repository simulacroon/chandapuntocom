/* =========================================================
   CHANDAPUNTOCOM
   SCROLL EXPERIENCE
========================================================= */


/* =========================================================
   ELEMENTOS
========================================================= */

const materialSection =
    document.querySelector(
        ".material-section"
    );

const materialVideo1 =
    document.querySelector(
        ".material-video-1"
    );

const materialVideo2 =
    document.querySelector(
        ".material-video-2"
    );

const materialVideo3 =
    document.querySelector(
        ".material-video-3"
    );


/* =========================================================
   FUNCIÓN DE LIMITAR VALORES
========================================================= */

function clamp(
    value,
    min,
    max
) {

    return Math.min(
        Math.max(
            value,
            min
        ),
        max
    );

}


/* =========================================================
   PROGRESO DE SCROLL
========================================================= */

function updateMaterialScroll() {


    if (
        !materialSection ||
        !materialVideo1 ||
        !materialVideo2 ||
        !materialVideo3
    ) {

        return;

    }


    const sectionRect =
        materialSection.getBoundingClientRect();


    const sectionHeight =
        materialSection.offsetHeight;


    const viewportHeight =
        window.innerHeight;


    /*
     * Cuánto hemos avanzado dentro
     * de la sección.
     */

    const scrollDistance =
        sectionHeight -
        viewportHeight;


    let progress =
        -sectionRect.top /
        scrollDistance;


    progress =
        clamp(
            progress,
            0,
            1
        );



    /* =====================================================
       ETAPA 1
       VIDEO CUADRADO
       0 → 0.30
    ====================================================== */

    const phaseOne =
        clamp(
            progress / 0.30,
            0,
            1
        );


    /*
     * El primer video empieza cuadrado
     * y poco a poco se expande.
     */

    const firstWidth =
        360 +
        phaseOne * 550;


    const firstHeight =
        360 +
        phaseOne * 300;


    materialVideo1.style.width =
        `${firstWidth}px`;


    materialVideo1.style.height =
        `${firstHeight}px`;


    /*
     * Pequeño movimiento vertical.
     */

    materialVideo1.style.transform =
        `
        translate(
            -50%,
            calc(-50% + ${phaseOne * -20}px)
        )
        `;



    /* =====================================================
       ETAPA 2
       APARECE VIDEO 02
       0.20 → 0.65
    ====================================================== */

    const phaseTwo =
        clamp(
            (progress - 0.20) /
            0.45,
            0,
            1
        );


    materialVideo2.style.opacity =
        phaseTwo;


    /*
     * El segundo video entra
     * ligeramente más pequeño.
     */

    const secondScale =
        0.65 +
        phaseTwo * 0.35;


    materialVideo2.style.transform =
        `
        translate(
            calc(-50% + ${phaseTwo * 120}px),
            calc(-50% + ${phaseTwo * 80}px)
        )
        scale(${secondScale})
        `;



    /* =====================================================
       ETAPA 3
       APARECE VIDEO 03
       0.50 → 1.00
    ====================================================== */

    const phaseThree =
        clamp(
            (progress - 0.50) /
            0.50,
            0,
            1
        );


    materialVideo3.style.opacity =
        phaseThree;


    const thirdScale =
        0.55 +
        phaseThree * 0.45;


    materialVideo3.style.transform =
        `
        translate(
            calc(-50% + ${phaseThree * -150}px),
            calc(-50% + ${phaseThree * -100}px)
        )
        scale(${thirdScale})
        `;



    /* =====================================================
       VIDEO 01 SE VUELVE DOMINANTE
    ====================================================== */

    if (progress > 0.65) {

        const finalPhase =
            clamp(
                (progress - 0.65) /
                0.35,
                0,
                1
            );


        /*
         * A medida que nos acercamos
         * al final, el primer video
         * ocupa más espacio.
         */

        const finalWidth =
            910 +
            finalPhase * 250;


        const finalHeight =
            660 +
            finalPhase * 80;


        materialVideo1.style.width =
            `${finalWidth}px`;


        materialVideo1.style.height =
            `${finalHeight}px`;

    }


}


/* =========================================================
   SCROLL
========================================================= */

let ticking = false;


window.addEventListener(
    "scroll",
    () => {


        if (!ticking) {

            window.requestAnimationFrame(
                () => {

                    updateMaterialScroll();

                    ticking = false;

                }
            );


            ticking = true;

        }

    },
    {
        passive: true
    }
);


/* =========================================================
   RESIZE
========================================================= */

window.addEventListener(
    "resize",
    () => {

        updateMaterialScroll();

    }
);


/* =========================================================
   INICIALIZAR
========================================================= */

updateMaterialScroll();

/* =========================================================
   SHOP SCROLL EXPERIENCE
========================================================= */

const shopSection =
    document.querySelector(".shop-section");

const shopVideo1 =
    document.querySelector(".shop-video-1");

const shopVideo2 =
    document.querySelector(".shop-video-2");


/* =========================================================
   HELPERS
========================================================= */

function shopLerp(start, end, amount) {

    return start +
        (end - start) *
        amount;

}


/* =========================================================
   SHOP
========================================================= */

function updateShopScroll() {

    if (
        !shopSection ||
        !shopVideo1 ||
        !shopVideo2
    ) {
        return;
    }


    /* =====================================================
       CALCULAR PROGRESO
    ===================================================== */

    const rect =
        shopSection.getBoundingClientRect();


    const sectionHeight =
        shopSection.offsetHeight;


    const viewportHeight =
        window.innerHeight;


    const scrollDistance =
        sectionHeight -
        viewportHeight;


    let progress =
        -rect.top /
        scrollDistance;


    progress =
        Math.max(
            0,
            Math.min(
                1,
                progress
            )
        );



    /* =====================================================
       01 — VERTICAL
       0 → 0.25
    ===================================================== */

    if (progress <= 0.25) {

        const p =
            progress / 0.25;


        /*
         * VIDEO 01
         *
         * 220 × 390
         * ↓
         * 290 × 290
         */

        const width1 =
            shopLerp(
                220,
                290,
                p
            );


        const height1 =
            shopLerp(
                390,
                290,
                p
            );


        /*
         * VIDEO 02
         */

        const width2 =
            shopLerp(
                220,
                290,
                p
            );


        const height2 =
            shopLerp(
                390,
                290,
                p
            );


        shopVideo1.style.width =
            `${width1}px`;

        shopVideo1.style.height =
            `${height1}px`;


        shopVideo2.style.width =
            `${width2}px`;

        shopVideo2.style.height =
            `${height2}px`;


        /*
         * POSICIÓN
         *
         * Primera y tercera zona
         */

        shopVideo1.style.transform =
            `
            translate(
                calc(-50% - 300px),
                calc(-50% - ${p * 15}px)
            )
            `;


        shopVideo2.style.transform =
            `
            translate(
                calc(-50% + 300px),
                calc(-50% + ${p * 15}px)
            )
            `;

    }



    /* =====================================================
       02 — CUADRADO
       0.25 → 0.55
    ===================================================== */

    else if (progress <= 0.55) {

        const p =
            (progress - 0.25) /
            0.30;


        /*
         * Primero permanecen cuadrados.
         *
         * Después empiezan a abrirse.
         */

        const width1 =
            shopLerp(
                290,
                500,
                p
            );


        const height1 =
            shopLerp(
                290,
                240,
                p
            );


        const width2 =
            shopLerp(
                290,
                420,
                p
            );


        const height2 =
            shopLerp(
                290,
                240,
                p
            );


        shopVideo1.style.width =
            `${width1}px`;

        shopVideo1.style.height =
            `${height1}px`;


        shopVideo2.style.width =
            `${width2}px`;

        shopVideo2.style.height =
            `${height2}px`;


        /*
         * Se mantienen en columnas
         * pero empiezan a separarse.
         */

        const x1 =
            shopLerp(
                300,
                380,
                p
            );


        const x2 =
            shopLerp(
                300,
                380,
                p
            );


        shopVideo1.style.transform =
            `
            translate(
                calc(-50% - ${x1}px),
                calc(-50% - ${20 + p * 35}px)
            )
            `;


        shopVideo2.style.transform =
            `
            translate(
                calc(-50% + ${x2}px),
                calc(-50% + ${20 + p * 35}px)
            )
            `;

    }



    /* =====================================================
       03 — RECTÁNGULOS
       0.55 → 0.78
    ===================================================== */

    else if (progress <= 0.78) {

        const p =
            (progress - 0.55) /
            0.23;


        /*
         * VIDEO 01
         *
         * Rectángulo horizontal
         */

        const width1 =
            shopLerp(
                500,
                560,
                p
            );


        const height1 =
            shopLerp(
                240,
                190,
                p
            );


        /*
         * VIDEO 02
         *
         * Otro rectángulo,
         * diferente proporción.
         */

        const width2 =
            shopLerp(
                420,
                330,
                p
            );


        const height2 =
            shopLerp(
                240,
                200,
                p
            );


        shopVideo1.style.width =
            `${width1}px`;

        shopVideo1.style.height =
            `${height1}px`;


        shopVideo2.style.width =
            `${width2}px`;

        shopVideo2.style.height =
            `${height2}px`;


        /*
         * Ahora realmente ocupan
         * diferentes zonas del grid.
         */

        const x1 =
            shopLerp(
                380,
                430,
                p
            );


        const x2 =
            shopLerp(
                380,
                300,
                p
            );


        const y1 =
            shopLerp(
                55,
                -90,
                p
            );


        const y2 =
            shopLerp(
                55,
                110,
                p
            );


        shopVideo1.style.transform =
            `
            translate(
                calc(-50% - ${x1}px),
                calc(-50% + ${y1}px)
            )
            `;


        shopVideo2.style.transform =
            `
            translate(
                calc(-50% + ${x2}px),
                calc(-50% + ${y2}px)
            )
            `;

    }



    /* =====================================================
       04 — SUPERPOSICIÓN
       0.78 → 1
    ===================================================== */

    else {

        const p =
            (progress - 0.78) /
            0.22;


        /*
         * VIDEO 01
         */

        const width1 =
            shopLerp(
                560,
                500,
                p
            );


        const height1 =
            shopLerp(
                190,
                260,
                p
            );


        /*
         * VIDEO 02
         */

        const width2 =
            shopLerp(
                330,
                300,
                p
            );


        const height2 =
            shopLerp(
                200,
                220,
                p
            );


        shopVideo1.style.width =
            `${width1}px`;

        shopVideo1.style.height =
            `${height1}px`;


        shopVideo2.style.width =
            `${width2}px`;

        shopVideo2.style.height =
            `${height2}px`;


        /*
         * VIDEO 01
         *
         * Va hacia el centro.
         */

        const x1 =
            shopLerp(
                430,
                110,
                p
            );


        const y1 =
            shopLerp(
                -90,
                -20,
                p
            );


        /*
         * VIDEO 02
         *
         * Entra desde la derecha.
         */

        const x2 =
            shopLerp(
                300,
                -30,
                p
            );


        const y2 =
            shopLerp(
                110,
                25,
                p
            );


        shopVideo1.style.transform =
            `
            translate(
                calc(-50% - ${x1}px),
                calc(-50% + ${y1}px)
            )
            `;


        shopVideo2.style.transform =
            `
            translate(
                calc(-50% + ${x2}px),
                calc(-50% + ${y2}px)
            )
            `;

    }

}


/* =========================================================
   SCROLL
========================================================= */

let shopTicking =
    false;


window.addEventListener(
    "scroll",
    () => {

        if (!shopTicking) {

            window.requestAnimationFrame(
                () => {

                    updateShopScroll();

                    shopTicking =
                        false;

                }
            );

            shopTicking =
                true;

        }

    },
    {
        passive: true
    }
);


/* =========================================================
   RESIZE
========================================================= */

window.addEventListener(
    "resize",
    () => {

        updateShopScroll();

    }
);


/* =========================================================
   INITIALIZE
========================================================= */

updateShopScroll();