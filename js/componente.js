
class GaleriaExpandible {

    constructor(opciones = {}) {
        this.selector = opciones.selector || '.vg-gallery-item';
        this.imagenes = Array.from(document.querySelectorAll(this.selector));
        this.indiceActual = 0;
        this.estaAbierto = false;

        if (this.imagenes.length === 0) {
            console.warn('No se encontraron imagenes con el selector "' + this.selector + '"');
            return;
        }

        this.iniciar();
    }

    iniciar() {
        this.crearDOM();
        this.agregarEventos();
    }

    crearDOM() {
        // Crear capa oscura de fondo
        this.overlay = document.createElement('div');
        this.overlay.className = 'vg-lightbox-overlay';

        // Boton de cerrar
        this.btnCerrar = document.createElement('button');
        this.btnCerrar.className = 'vg-lightbox-btn vg-lightbox-close';
        this.btnCerrar.innerHTML = '&times;';
        this.btnCerrar.setAttribute('aria-label', 'Cerrar');

        // Boton anterior
        this.btnAnterior = document.createElement('button');
        this.btnAnterior.className = 'vg-lightbox-btn vg-lightbox-prev';
        this.btnAnterior.innerHTML = '&#10094;';
        this.btnAnterior.setAttribute('aria-label', 'Anterior');

        // Boton siguiente
        this.btnSiguiente = document.createElement('button');
        this.btnSiguiente.className = 'vg-lightbox-btn vg-lightbox-next';
        this.btnSiguiente.innerHTML = '&#10095;';
        this.btnSiguiente.setAttribute('aria-label', 'Siguiente');

        // Contenedor del contenido
        this.contenido = document.createElement('div');
        this.contenido.className = 'vg-lightbox-content';

        // Imagen principal
        this.imagenGrande = document.createElement('img');
        this.imagenGrande.className = 'vg-lightbox-image';

        // Ensamblar los elementos
        this.contenido.appendChild(this.imagenGrande);
        this.overlay.appendChild(this.btnCerrar);
        this.overlay.appendChild(this.btnAnterior);
        this.overlay.appendChild(this.btnSiguiente);
        this.overlay.appendChild(this.contenido);

        document.body.appendChild(this.overlay);
    }

    agregarEventos() {
        // Evento de clic en cada imagen de la galeria
        this.imagenes.forEach((img, indice) => {
            img.addEventListener('click', () => this.abrir(indice));
        });

        // Controles de navegacion
        this.btnCerrar.addEventListener('click', () => this.cerrar());
        this.btnAnterior.addEventListener('click', (e) => { e.stopPropagation(); this.navegar(-1); });
        this.btnSiguiente.addEventListener('click', (e) => { e.stopPropagation(); this.navegar(1); });

        // Cerrar al hacer clic en el fondo oscuro
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay || e.target === this.contenido) {
                this.cerrar();
            }
        });

    }

    abrir(indice) {
        this.indiceActual = indice;
        this.actualizarImagen();
        this.overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Evitar scroll del fondo
        this.estaAbierto = true;
    }

    cerrar() {
        this.overlay.classList.remove('active');
        document.body.style.overflow = '';
        this.estaAbierto = false;

        // Limpiar la imagen despues de la transicion
        setTimeout(() => {
            if (!this.estaAbierto) this.imagenGrande.src = '';
        }, 300);
    }

    navegar(direccion) {
        this.indiceActual += direccion;

        // Ciclo infinito: si llega al final vuelve al inicio y viceversa
        if (this.indiceActual >= this.imagenes.length) {
            this.indiceActual = 0;
        } else if (this.indiceActual < 0) {
            this.indiceActual = this.imagenes.length - 1;
        }

        this.actualizarImagen();
    }

    actualizarImagen() {
        const imagenOrigen = this.imagenes[this.indiceActual];
        // Usa data-highres si esta disponible, si no usa el src normal
        const srcAltaRes = imagenOrigen.getAttribute('data-highres') || imagenOrigen.src;
        this.imagenGrande.src = srcAltaRes;
        this.imagenGrande.alt = imagenOrigen.alt || 'Imagen ' + (this.indiceActual + 1);
    }
}

// Hacer la clase disponible globalmente
window.GaleriaExpandible = GaleriaExpandible;
