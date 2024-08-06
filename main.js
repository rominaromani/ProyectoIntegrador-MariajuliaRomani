import './sass/main.scss';
import Handlebars from 'handlebars';

const fetchTemplate = async (url) => {
    const respuesta = await fetch(url);
    if (!respuesta.ok) {
        throw new Error('No se pudo obtener la plantilla');
    }
    return await respuesta.text();
};

const fetchProductos = async (url) => {
    const respuesta = await fetch(url);
    if (!respuesta.ok) {
        throw new Error(`Algo pasó con los productos: ${respuesta.status}`);
    }
    return await respuesta.json();
};

const renderTemplate = (templateSource, data) => {
    const template = Handlebars.compile(templateSource);
    return template(data);
};

const start = async () => {
    try {
        const plantilla = await fetchTemplate('templates/card.hbs');
        const productos = await fetchProductos('https://66b295a67fba54a5b7ea0942.mockapi.io/productos/');
        const html = renderTemplate(plantilla, { productos });

        document.querySelector('#contenedor-cards').innerHTML = html;
    } catch (error) {
        console.log('[start]:', error);
    }
};

window.addEventListener('DOMContentLoaded', start);
