$(document).ready(function(){

//EFECTO MENU SLIDE 
var btnShowMenu = $('#btnShowMenu');
var menu = $('#menu');

btnShowMenu.click((e) => {
    e.preventDefault();
    menu.toggle('slide');
});
// ------ //

// EFECTO PARA EL BOTÓN DESCARGAR
var btnDownload = $('.btnDownload');
var alertDowloaded = $('#alert');

btnDownload.click(function(){
    var that = $(this);
    that.animate({
        fontSize: "22px"
    }, 100)
        .animate({
            color: '#FF4646',
            fontSize: "18px"
        }, 50);

    // Concatenar en las descargas
    var textBook = that.parent().parent().find('.card-text').text();
    var bookId = that.parent().find('.book-id').text();
    $('#downloadedBooks').prepend(`
        <div class="book">
            <i class="fas fa-download red"></i>
            <span class="name"> ${textBook}</span>
            <span class="book-id-download text-mutet float-right">${bookId}</span>
            <span class="icon-trash float-right " ><i class="fas fa-trash"></i></span>
        </div>
    `);    
    
    function showAlert(){
        alertDowloaded.slideUp();
        clearInterval(showInterval);
    }

    function hideAlert(){
        alertDowloaded.slideDown();
        clearInterval(hideInterval);
    }
    var showInterval = setInterval(showAlert, 4000);
    var hideInterval = setInterval(hideAlert, 1000);
    

});
// ----- //


var btnSubmit = $('#btnSubmit');
var closeBtnUpload = $('.close-b-screen');
var blackScreenUpload = $('#upload-book');
var uploadBookLink = $('#uploadBookLink');
var booksList = $('#books');
var alertUploadedBook = $('#alertBookUploaded');

uploadBookLink.click(function(e){
    e.preventDefault();
    blackScreenUpload.fadeIn();
});

function getImageName(){
    var btnRedBook = $('#redBook');
    var btnGreenBook = $('#greenBook');
    var btnPurpleBook = $('#purpleBook');
    var btnYellowBook = $('#yellowBook');
    var btnGreenBook2 = $('#greenBook2');
    var btnBlueBook = $('#blueBook');

    btnRedBook.click(function(){
        var imageName = 'bookRed.png';
        localStorage.setItem('book-image', imageName);

        $('.image-book').each(function(){
            if($(this).hasClass('image-selected')) $(this).removeClass('image-selected');
        });
        $(this).addClass('image-selected');
            
       
    });
    btnGreenBook.click(function(){
        var imageName = 'bookGreen.png';
        localStorage.setItem('book-image', imageName);

        $('.image-book').each(function(){
            if($(this).hasClass('image-selected')) $(this).removeClass('image-selected');
        });
        $(this).addClass('image-selected');
        
    });
    btnPurpleBook.click(function(){
        var imageName = 'bookPurple.png';
        localStorage.setItem('book-image', imageName);

        $('.image-book').each(function(){
            if($(this).hasClass('image-selected')) $(this).removeClass('image-selected');
        });
        $(this).addClass('image-selected');
    });
    btnYellowBook.click(function(){
        var imageName = 'bookYellow.png';
        localStorage.setItem('book-image', imageName);

        $('.image-book').each(function(){
            if($(this).hasClass('image-selected')) $(this).removeClass('image-selected');
        });
        $(this).addClass('image-selected');
    });
    btnGreenBook2.click(function(){
        var imageName = 'bookGreen2.png';
        localStorage.setItem('book-image', imageName);

        $('.image-book').each(function(){
            if($(this).hasClass('image-selected')) $(this).removeClass('image-selected');
        });
        $(this).addClass('image-selected');
    });
    btnBlueBook.click(function(){
        var imageName = 'bookBlue.png';
        localStorage.setItem('book-image', imageName);

        $('.image-book').each(function(){
            if($(this).hasClass('image-selected')) $(this).removeClass('image-selected');
        });
        $(this).addClass('image-selected');
    });
}

getImageName();

function uploadBook(){
    btnSubmit.click(function(e){
        e.preventDefault();
        $(this).animate({
            fontSize: '15px'
        }, 100)
                .animate({
                    fontSize: '18px'
                }, 'fast');
        let name = $('#name').val();
        let content = $('#content').val();
        let id = randomId();

        getImageName();
        if(localStorage.getItem('book-image') != 'undefined'){
            var imageName = localStorage.getItem('book-image');
            localStorage.clear();
        } else {
            var imageName = 'bookRed.png';
            localStorage.clear();
        }
        /*
        let image = $('#image').val(); 
        let imageSplit = image.split('\\');
        let imageName = imageSplit[2];        
        */

        var book = saveBook(name, content, imageName, id);
        if(book.name != '' && book.content != '' && book.image != null){
            booksList.prepend(`
            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-3 card" style="width: 18rem;">
                        <img class="card-img-top" src="img/${book.image}" alt="Card image cap">
                        <div class="card-body">
                          <p class="card-text">${book.name}</p>
                        </div>
                        <div class="btns">
                            <span class="text-muted book-id" id="book-id">${book._id}</span>
                            <span class="float-right icon btnDownload2 btnDownload"><i class="fas fa-download"></i></span>
                        </div>
                     </div>
            `);
            blackScreenUpload.fadeOut(500);
            if($('#alert-form').css('display', 'inline-block')){
                $('#alert-form').css('display', 'none');
            }
            function showAlert(){
                alertUploadedBook.slideUp();
                clearInterval(showInterval);
            }
        
            function hideAlert(){
                alertUploadedBook.slideDown();
                clearInterval(hideInterval);
            }

            var showInterval = setInterval(showAlert, 4000);
            var hideInterval = setInterval(hideAlert, 1000);
            
            // Volver a descargar
            let btnDownload2 =  $('.btnDownload2');
            btnDownload2.click(function(){
                var that = $(this);
                that.animate({
                    fontSize: "22px"
                }, 100)
                    .animate({
                        color: '#FF4646',
                        fontSize: "18px"
                    }, 50);
            
                // Concatenar en las descargas
                var textBook = that.parent().parent().find('.card-text').text();
                var bookId = that.parent().find('.book-id').text();
                
                // Panel de descarga para los libros que fueron subidos
                $('#downloadedBooks').prepend(`
                    <div class="book book-2">
                        <i class="fas fa-download red"></i>
                        <span class="name"> ${textBook}</span>
                        <span class="book-id-download text-mute float-right">${bookId}</span>
                        <span class="icon-trash float-right " ><i class="fas fa-trash"></i></span>
                    </div>
                `);
                
                
                function showAlert(){
                    alertDowloaded.slideUp();
                    clearInterval(showInterval);
                }
            
                function hideAlert(){
                    alertDowloaded.slideDown();
                    clearInterval(hideInterval);
                }

                var showInterval = setInterval(showAlert, 4000);
                var hideInterval = setInterval(hideAlert, 1000);

            
                
            });

            // Resetear campos
           cleanForm();
           

        } else {
            $('#alert-form').css('display', 'inline-block');
        }
        
        

    });
}

uploadBook();


closeBtnUpload.click(function(){
    let alertForm =  $('#alert-form');
    blackScreenUpload.fadeOut();
    alertForm.css('display', 'none');
});


var btnMyDownloads = $('#btnMydownloads');
var blackScreenDownloads = $('#myDownloads');
var closeBtnDownload = $('.close-b-screen-download');

btnMyDownloads.click(function(e){
    e.preventDefault();
    blackScreenDownloads.fadeIn();
});

closeBtnDownload.click(function(){
    blackScreenDownloads.fadeOut();
});

var btnEditDownload = $('#btnOptions');
btnEditDownload.click(function(){
    $('#downloadedBooks').find('.icon-trash').fadeToggle();
    // Eliminar descargas
    removeDownloadV1();
    
});

function saveBook(name, content, image, _id){
    const book = {
        name,
        content,
        image,
        _id
    }

  return book;

}
/*
function removeDownloadV2(){
    $('.book .book-2').each(function(index){
        var that = $(this);
        // Click en el boton de borrar
        that.find('.icon-trash').click(function(){
            var id = parseInt($(this).parent().find('.book-id-download-2').text());
            $('.book-id').each(function(){
                var idRandom = parseInt($(this).text());
                if(id == idRandom){
                    console.log('Coinicdencia para post recien subido');
                    $(this).parent().find('.btnDownload2').css('color', 'black');
                } else {
                    console.log('No hubo coincidencias');
                }
            });

            // Efecto para eliminar 
            $(this).parent().effect('drop');
        });
    });
}
*/

function removeDownloadV1(){
    $('.book').each(function(index){
        var that = $(this);

        // Click en el boton de borrar
        that.find('.icon-trash').click(function(){
            // console.log($(this).parent().find('.name').text());
            var id = parseInt($(this).parent().find('.book-id-download').text());

            // Recorrer cada uno de los textos de los libros subidos
            $('.book-id').each(function(){
                var idRandom = parseInt($(this).text());
                console.log(idRandom);
                console.log(id);
                if(id == idRandom){
                    console.log('Coinicdencia');
                    $(this).parent().find('.btnDownload').css('color', 'black'); // +++ Cambian datos
                } else {
                    console.log('No coincidencia');
                }
            });
            console.log('Eliminado .. ');
            $(this).parent().effect('drop');
        });

        
    });
}

function cleanForm(){
    $('.image-book').each(function(){
        if($(this).hasClass('image-selected')) $(this).removeClass('image-selected');
    });
    $('#content').val(" ");
    $('#content').attr("placeholder", "Nombre del Libro");

    $('#name').val(" ");
    $('#name').attr("placeholder", "Descripsión");
}

function randomId() {
    var random = Math.round(Math.random()*100000);
    return random;
}






});