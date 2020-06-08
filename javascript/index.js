
/* This function opens the modal and show the datatables */
function expand() {
    //Create a new httprequest to get de json
    const xhttp = new XMLHttpRequest();

    xhttp.open('GET', 'JsonTest.json', true)

    xhttp.send();

    //Verify state is ready  for show data
    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {

            //Convert to json
            let datos = JSON.parse(this.responseText)
            let data = datos.articles;

            //put the data into the datatable
            $('#example').DataTable({
                data: data,
                destroy: true,
                columns: [
                    {
                        data: 'urlToImage',
                        "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).html("<img src='" + oData.urlToImage + "' class='imgNotice'>" + "</img>");
                        }
                    },
                    { data: 'title' },
                    { data: 'description' },
                    { data: 'content' },
                    { data: 'publishedAt' },
                    { data: 'source.name' },
                    { data: 'author' },
                    { data: 'url' }
                ]
            });
        }
    }
}
/*call the funciton to get the data from json */
getData();

function getData() {
    const xhttp = new XMLHttpRequest();

    xhttp.open('GET', 'JsonTest.json', true)

    xhttp.send();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let datos = JSON.parse(this.responseText)
            let data = datos.articles;
            let info = document.querySelector('#notices')
            info.innerHTML = '';

            /* this for loop print the data into section productos*/
            for (i = 0; i < 3; i++) {
                info.innerHTML += `<div class="col-sm-4 pb-3"><div ><h6 class='text-center' style='height:70px;'>${data[i].title}</h6></div><div><img src='${data[i].urlToImage}' class='imgNoticeResp'></img></div>
                <div style='padding-top:20px'><p class='text-justify'>${data[i].description}</p></div></div>`;
            }
        }
    }
}

/* Search  */
const paragraph = [
    { content: 'Somos un equipo de personas que se ha unido como familia para apoyar la gestión de  abastecimiento, como proveedores y distribuidores de insumos, para el canal Food Service, Institucional, y HORECA   (hoteles,    restaurantes, catering, colegios, clubes, casinos).' },
    { content: 'Lo que nos mueve es construir relaciones de confianza entre nuestros clientes, nuestros colaboradores, y nuestros proveedores. Y lo hacemos bajo el principio de innovación: buscamos nuevas oportunidades en el mercado, nos adelantamos a las tendencias de consumo, y nos apoyamos en una plataforma tecnológica de vanguardia.' },
    { content: 'En DIEZ EQUIS nos orientamos a la calidad de nuestro servicio y al compromiso con nuestros clientes, es por eso que ofrecemos al mercado diferentes beneficios en pro de construir y brindar un servicio de calidad.' },
    { content: 'Actualmente contamos con alcance a nivel nacional, en las principales ciudades del país.' },
    { content: 'Estamos aquí para apoyarte a cumplir tus objetivos, y estamos comprometidos al éxito de tu negocio.' },
    { content: 'En Diez Equis, “Crecemos Contigo”.' }
]

const formulary = document.querySelector('#searchInput');
const btn = document.querySelector('#searchBtn');
const result = document.querySelector('#result');
const boxSearch = document.querySelector('#box-search')

const filter = () => {
    result.innerHTML = '';

    const text = formulary.value.toLowerCase();
    if (text !== '') {
        boxSearch.style.display = 'block';
        for (let txt of paragraph) {
            let name = txt.content.toLowerCase();

            if (name.indexOf(text) !== -1) {
                result.innerHTML += `<li href='#Empresa class='pt-3'><a class="nav-link white-color" href="#Empresa">${txt.content}</a></li>`
                
            }
        }
        if (result.innerHTML === '') {
            result.innerHTML += `<li'>Producto no encontrado...</li>`
        }
    }
    else{
        boxSearch.style.display = 'none';
    }
}

btn.addEventListener('click', filter);
formulary.addEventListener('keyup', filter)
/*End Search */
