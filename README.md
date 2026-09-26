# Visual Components Library 🎨

![Portada](img/img1.jpg)

**Visual Components Library** es una biblioteca de JavaScript puro (Vanilla JS) que provee componentes visuales interactivos y reutilizables, diseñados con una estética premium, moderna (glassmorphism) y soporte nativo para dark mode. No requiere dependencias externas como React, Vue o jQuery.

## Componentes Incluidos y Problemas que Resuelven

### 1. Lightbox Gallery (Visor Inmersivo de Imágenes)
* **Problema que resuelve:** Los usuarios a menudo necesitan ver los detalles de una imagen que se muestra en miniatura, pero salir de la página actual rompe la experiencia de usuario.
* **Solución:** Un visor en pantalla completa que oscurece el fondo (con un elegante efecto de desenfoque), centrando la imagen en grande.
* **Comportamiento:** Permite navegar por agrupaciones de imágenes usando controles en pantalla, clics, o el teclado (flechas para navegar, `ESC` para cerrar).

### 2. Skeleton Loader Dinámico
* **Problema que resuelve:** La "ansiedad del usuario" cuando una pantalla se queda en blanco esperando datos de un servidor o API.
* **Solución:** Muestra bloques animados que simulan la estructura del contenido final (imágenes, textos, avatares), manteniendo al usuario enganchado y reduciendo la tasa de rebote.
* **Comportamiento:** Altamente configurable. Permite generar formas circulares, rectangulares o tarjetas completas dinámicamente mediante JS mientras el estado sea `loading`.

---

## 🚀 Instalación

No se requiere NPM. Simplemente incluye los archivos CSS y JS en tu proyecto HTML.

1. Copia la carpeta `css` y `js` a tu proyecto.
2. Enlaza los archivos en tu documento `index.html`:

```html
<!-- Dentro de tu <head> -->
<link rel="stylesheet" href="css/componente.css">

<!-- Justo antes de cerrar el <body> -->
<script src="js/componente.js"></script>
```

---

## 💻 Uso y Ejemplos de Código

### Usando el Lightbox Gallery

Agrega la clase `vg-gallery-item` a cualquier etiqueta `<img>` que desees incluir en la galería. Opcionalmente, usa `data-highres` para cargar una versión de mayor calidad al abrir el visor.

**HTML:**
```html
<div class="mi-galeria">
    <img src="thumb1.jpg" data-highres="full1.jpg" alt="Foto 1" class="vg-gallery-item">
    <img src="thumb2.jpg" data-highres="full2.jpg" alt="Foto 2" class="vg-gallery-item">
</div>
```

**JavaScript:**
```javascript
// Inicializa la galería cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const gallery = new LightboxGallery({
        selector: '.vg-gallery-item' // Clase CSS de tus imágenes
    });
});
```

### Usando el Skeleton Loader

Define un contenedor en tu HTML donde se inyectará la animación de carga.

**HTML:**
```html
<!-- Contenedor vacío donde se mostrará la carga y luego los datos -->
<div id="contenedor-usuarios"></div>
```

**JavaScript:**
```javascript
// Instanciar el Loader indicando el selector del contenedor
const loader = new SkeletonLoader('#contenedor-usuarios');

// 1. Mostrar el Skeleton (Ejemplo: tipo 'profile' y 3 elementos)
loader.type = 'profile'; 
loader.count = 3;
loader.show();

// 2. Simular carga de datos (fetch a una API)
setTimeout(() => {
    // Ocultar el skeleton
    loader.hide();
    
    // Renderizar tu contenido real aquí...
    document.getElementById('contenedor-usuarios').innerHTML = '<p>¡Datos cargados!</p>';
}, 3000);
```
*Tipos disponibles para Skeleton:* `'card'`, `'profile'`, `'text'`.

---

## 📸 Capturas de Pantalla

**Skeleton Loader en Acción:**
*(Se renderizan tarjetas de esqueleto con animación de brillo)*
![Skeleton Loader Demo](img/img2.jpg)

**Lightbox Gallery Abierto:**
*(Efecto Glassmorphism de fondo)*
![Lightbox Gallery Demo](img/img3.jpg)

---

## 🎬 Video Demostrativo
*(Graba un video de 1 minuto mostrando el componente, súbelo a YouTube/Loom y pon el enlace aquí)*
▶️ [Ver Demo en Video (Ejemplo)]()

---

## 🌐 Enlaces del Proyecto

*(Reemplazar con tus links reales una vez subido)*
* **Repositorio en GitHub:** [https://github.com/TU-USUARIO/componente-visual](https://github.com/TU-USUARIO/componente-visual)
* **Demo en Vivo (GitHub Pages):** [https://TU-USUARIO.github.io/componente-visual](https://TU-USUARIO.github.io/componente-visual)
