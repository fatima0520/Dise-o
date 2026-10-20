// Menú hamburguesa: el JS solo alterna la clase `menu-open` en el <body>
// y actualiza atributos de accesibilidad. Toda la animación la hace el CSS.
(function () {
    "use strict";

    // Botón hamburguesa (tres <span>) y el panel de navegación.
    var toggle = document.getElementById("nav-icon");
    var nav = document.getElementById("primary-navigation");

    // Si falta cualquiera de los dos, no hay nada que hacer.
    if (!toggle || !nav) return;

    // Todos los enlaces del menú (para cerrarlo al hacer clic en uno).
    var links = nav.querySelectorAll("a");

    // Media query que representa "estoy en pantalla de escritorio" (≥ 901px).
    var desktopQuery = window.matchMedia("(min-width: 901px)");

    // Devuelve true si el menú está abierto (la clase vive en el <body>).
    function isOpen() {
        return document.body.classList.contains("menu-open");
    }

    // Abre (open=true) o cierra (open=false) el menú.
    // La clase `menu-open` es la que dispara la animación definida en el CSS.
    function setOpen(open) {
        document.body.classList.toggle("menu-open", open);
        // Accesibilidad: indicar el estado y qué hace el botón.
        toggle.setAttribute("aria-expanded", String(open));
        toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }

    // Cierra el menú solo si estaba abierto (evita trabajo innecesario).
    function closeMenu() {
        if (isOpen()) setOpen(false);
    }

    // Clic en el botón: conmuta abierto/cerrado.
    toggle.addEventListener("click", function () {
        setOpen(!isOpen());
    });

    // Clic en cualquier enlace del menú: cerrarlo (p. ej. al ir a una sección).
    links.forEach(function (link) {
        link.addEventListener("click", closeMenu);
    });

    // Tecla Escape: cierra el menú.
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") closeMenu();
    });

    // Al pasar a escritorio con el menú abierto, cerrarlo para no dejarlo colgado.
    // addEventListener es la API moderna; addListener es el fallback antiguo.
    if (typeof desktopQuery.addEventListener === "function") {
        desktopQuery.addEventListener("change", function (event) {
            if (event.matches) closeMenu();
        });
    } else {
        desktopQuery.addListener(function (event) {
            if (event.matches) closeMenu();
        });
    }
})();
