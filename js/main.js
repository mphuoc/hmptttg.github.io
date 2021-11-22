$(document).ready(function() {
    // process bar
    setTimeout(function() {
        firstQuestion();
        $('.spinner').fadeOut();
        $('#preloader').delay(350).fadeOut('slow');
        $('body').delay(350).css({
            'overflow': 'visible'
        });
    }, 600);
})

function init(){
    $('#title').text(CONFIG.title)
    $('#desc').text(CONFIG.desc)
    $('#yes').text(CONFIG.btnYes)
    $('#no').text(CONFIG.btnNo)
}

function firstQuestion(){
    $('.content').hide();
    Swal.fire({
        title: CONFIG.introTitle,
        text: CONFIG.introDesc,
        imageUrl: 'img/lookMe.jpg',
        imageWidth: 200,
        imageHeight: 200,
        background: '#fff url("img/iput-bg.jpg")',
        imageAlt: 'Custom image',
        confirmButtonText: CONFIG.btnIntro
      }).then(function(){
        $('.content').show(200);
      })
}



// generate text in input
function textGenerate() {
    var n = "";
    var text = " " + CONFIG.reply;
    var a = Array.from(text);
    var textVal = $('#txtReason').val() ? $('#txtReason').val() : "";
    var count = textVal.length;
    if (count > 0) {
        for (let i = 1; i <= count; i++) {
            n = n + a[i];
            if (i == text.length + 1) {
                $('#txtReason').val("");
                n = "";
                break;
            }
        }
    }
    $('#txtReason').val(n);
    setTimeout("textGenerate()", 1);
}

// show popup
$('#yes').click(function() {
    var audio = new Audio('sound/tick.mp3');
    audio.play();
    Swal.fire({
        title: CONFIG.question,
        html: true,
        width: 900,
        padding: '3em',
        html: "<input type='text' class='form-control' id='txtReason' onmousemove=textGenerate()  placeholder='Whyyy'>",
        background: '#fff url("img/iput-bg.jpg")',
        backdrop: `
              rgba(0,0,123,0.4)
              url("img/giphy2.gif")
              left top
              no-repeat
            `,
        confirmButtonColor: '#3085d6',
        confirmButtonColor: '#fe8a71',
        confirmButtonText: CONFIG.btnReply
    }).then((result) => {
        if (result.value) {
            Swal.fire({
                width: 900,
                confirmButtonText: CONFIG.btnAccept,
                background: '#fff url("img/iput-bg.jpg")',
                title: CONFIG.mess,
                text: CONFIG.messDesc,
                confirmButtonColor: '#83d0c9',
                onClose: () => {
                    window.location = CONFIG.messLink;
                  }
            })
        }
    })
})
//gửi form submit
document.querySelector('#submit_Form').onsubmit = function(e){
    e.preventDefault();
    //truy cập
    let answer = document.querySelector('input[name="ans"]');
    //lấy giá trị người dùng  nhập vào
    let a= answer.value;
    let data = {
        'entry.1865730090' : a
    }
    //chuyển sang string
    let queryString =new URLSearchParams(data);
    queryString = queryString.toString();
    //gửi thông báo 
    let msgOj = document.querySelector('.msg');
    //gửi
    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSe1qvkptmp0gd_ILF2E2cdeI6ty4wIpdIclGzxXAKT-u4lpUA/formResponse', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    msgOj.innerHTML = '<div class="aler alert-success text-center">Cảm ơn cục dàng của anh đã trả lời. Thấy anh làm hay hem</div>';
    xhr.send(queryString);
}
