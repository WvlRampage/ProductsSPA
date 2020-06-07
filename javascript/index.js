
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


$(document).ready(function () {

    getData();

})

function getData() {
    const xhttp = new XMLHttpRequest();

    xhttp.open('GET', 'JsonTest.json', true)

    xhttp.send();

    xhttp.onreadystatechange = function () {


        if (this.readyState == 4 && this.status == 200) {
            let datos = JSON.parse(this.responseText)
            let data = datos.articles;
            console.log(data)
            let info = document.querySelector('#notices')
            info.innerHTML = '';

            for (i = 0; i < 3; i++) {
                info.innerHTML += `<div class="col-sm-4 pb-3"><div ><h6 class='text-center' style='height:70px;'>${data[i].title}</h6></div><div><img src='${data[i].urlToImage}' class='imgNoticeResp'></img></div>
                <div style='padding-top:20px'><p class='text-justify'>${data[i].description}</p></div></div>`;
            }
        }
    }
}
