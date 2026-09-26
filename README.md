# Componente Visual

**Nombre:** Alejandro Jimenez Victoria
**Numero de control:** 23160968


**Galería Expandible** es un componente visual interactivo y reutilizable construido con Vanilla JS y CSS puro, diseñado con una estética moderna, clara y cálida. No requiere dependencias externas como React, Vue o jQuery.

---

## Problema que resuelve

En el desarrollo web, los usuarios a menudo necesitan ver los detalles de una imagen que se muestra en miniatura. Sin embargo, abrir el archivo original en una pestaña nueva o salir de la página actual interrumpe el flujo de navegación y rompe la experiencia de usuario. 

**Galería Expandible** resuelve esto aislando la imagen en un plano principal (modal inmersivo), oscureciendo el fondo, y permitiendo al usuario recorrer la galería completa de manera fluida y sin salir de la vista actual.

## Instalación

Para usar **Galería Expandible** en tu proyecto, debes enlazar los archivos CSS y JS en tu documento HTML:

```html
<!-- En tu <head> -->
<link rel="stylesheet" href="css/componente.css">

<!-- Antes del cierre de tu </body> -->
<script src="js/componente.js"></script>
```

## Estructura del Proyecto

```text
/componente-visual
├── README.md
├── index.html
├── css/
│   ├── componente.css
│   └── demo.css
├── js/
│   └── componente.js
└── img/
```

---

## Uso y Documentación

Para utilizar la galería, solo necesitas agregar tus imágenes dentro de un contenedor HTML y asignarles la clase `vg-gallery-item`. Opcionalmente puedes usar el atributo `data-highres` para indicar una versión de mayor calidad.

### HTML

```html
<div class="mi-galeria">
    <!-- Imagen simple -->
    <img src="img/gato.jpg" class="vg-gallery-item" alt="Gato">
    
    <!-- Imagen con versión en alta resolución -->
    <img src="img/gatito.jpg" class="vg-gallery-item" data-highres="img/gatito-hd.jpg" alt="Gatito">
</div>
```

### Inicialización en JavaScript
 
```javascript
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar la Galería Expandible apuntando a la clase de las imágenes
    const galeria = new GaleriaExpandible({
        selector: '.vg-gallery-item'
    });
});
```

---

## Capturas de Pantalla

### Galería interactiva
![Vista de la galería en index](img/galeria.png)
*Figura 1: Vista de la galería en modo miniatura (Grid layout).*

### Visor Inmersivo
![Vista de la Galería Expandible](img/imagen_enfocada.png)
*Figura 2: Vista de una imagen ampliada dentro de la Galería Expandible.*

---

## Video Demostrativo

[Ver Video Demostrativo](#) 
