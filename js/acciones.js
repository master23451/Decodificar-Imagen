const uploads = []
var datos = [];
var hex = "";

const fileSelector = document.getElementById('file-selector')
fileSelector.addEventListener('change', (event) => {
    const file = event.target.files[0]
    const filereader = new FileReader()

    filereader.onloadend = function (evt) {
        if (evt.target.readyState === FileReader.DONE) {
            const uint = new Uint8Array(evt.target.result)
            let bytes = []
            uint.forEach((byte) => {
                bytes.push(byte.toString(16))
            })

            hex = bytes.join('').toUpperCase()

            uploads.push({
                tipo: file.type ? file.type : 'Formato desconocido.',
                //filename: file.name,
                //binaryFileType: getMimetype(hex),
                //hex: hex
            })

            datos = hex
            render()
        }

    }

    //const blob = file.slice(0, 3);
    filereader.readAsArrayBuffer(file);
})


const render = () => {
    const uploadedFiles = uploads.map((file) => {

        inicio = 0;
        contador = 0;
        var im = [];


        while ((inicio = datos.indexOf('FFD8FF', inicio) + 1) > 0) {
            contador++;
            //im[contador] = inicio;
            //console.log(im[contador]);
        }

        /* var ex="";
         ex=datos.lastIndexOf('FFD8FF');
         console.log(ex);

         img1 = datos.substr(0,ex);
         console.log(img1);

         img2 = datos.substr(ex,datos.length);
         console.log(img2); */

        console.log('¡Imagen decodificada con exito!')
        console.log('Cantidad de imagenes encontradas: '+ contador)
        console.log('Tipo de formato encontrado: '+ file.tipo)


        return Swal.fire({
            icon: 'success',
            title: '¡Imagen decodificada con exito!',
            html: '<h5>Información</h5>' +
                '<p>Cantidad de imagenes encontradas: ' + `${contador}` + ' imagenes.<p/>' +
                '<p>Tipo de formato encontrado: ' + `${file.tipo}` + '</p>',

        })
    })
}

/*const getMimetype = (signature) => {
    switch (signature) {
        case 'FFD8FF':
            return 'image/jpg'
        default:
            return 'Tipo de archivo desconocido'
    }
}*/


function readImage(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#imgPreview').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

$("#file-selector").change(function () {
    readImage(this);
});