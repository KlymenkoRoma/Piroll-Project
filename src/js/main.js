// HEADER SECTION

function myFunction(x) {
    x.classList.toggle("change");
};

var $page = $('html, body');
$('a[href*="#"]').click(function() {
    $page.animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 800);
    return false;
});

// SKILL SECTION

$('.skill_bars_sec').one('inview', function (event, visible) {
    if (visible === true) {
        move();
    }
});

function move() {
    var
        design = $(".designBar")[0],
        web = $(".webBar")[0],
        market = $(".marketingBar")[0],
        desCount = $('#designCounter'),
        webCount = $('#webCounter'),
        markCount = $('#marketCounter'),
        data = [
        {name: design, wid: 75, count: desCount},
        {name: web, wid: 90, count: webCount},
        {name: market, wid: 65, count: markCount}
        ];

    for (var i = 0; i < data.length; i++)(function() {
        var
            widthInit = 1,
            currElem = data[i].name,
            widthCurr = data[i].wid,
            counter = data[i].count,
            id = setInterval(frame, 20);
        function frame() {
            if (widthInit >= widthCurr) {
                clearInterval(id);
            } else {
                widthInit++;
                currElem.style.width = widthInit + '%';
                counter.text(widthInit);
            }
        }
    })();
};

// STATS SECTION

$('.stats_section').one('inview', function (event, visible) {
    if (visible === true) {
        projectsCount.start();
        hoursCount.start();
        feedbackCount.start();
        clientsCount.start();
    }
});

var
    options = {separator: ''},
    projectsCount = new CountUp('projects_count', 0, 548, 0, 2.5, options),
    hoursCount = new CountUp('hours_count', 0, 1465, 0, 2.5, options),
    feedbackCount = new CountUp('feedback_count', 0, 612, 0, 2.5, options),
    clientsCount = new CountUp('clients_count', 0, 735, 0, 2.5, options);

// WORKS SECTION

var
    $template = $(".template"),
    $worksRow = $(".worksRow"),
    imagesArr = [],
    currArr = [];

loadImages();

$(".load_work").on("click", function () {
    loadImages();
});

function loadImages() {
    var xhr = new XMLHttpRequest();
    xhr.open('get', 'images.json');
    xhr.responseType = 'json';
    xhr.send();
    xhr.addEventListener('readystatechange', function () {
        if (this.readyState !== this.DONE) {
            return;
        }

        for (var i = 0; i < this.response.length; i++) {
            imagesArr.push(this.response[i].image);
        }

        //$worksRow.empty();

        for (var x = 0; x < 8; x++) {
            var $clone = $template.clone();

            $clone.find('.img-responsive').attr("src", imagesArr[x]);
            $clone.find('a').attr("href", imagesArr[x]);
            $clone.find('a').attr("data-lightbox", "roadtrip");

            $clone.appendTo($worksRow);
            $clone.show();

            currArr.push(imagesArr[x]);
        }

        for (var ca = 0; ca < currArr.length; ca++) {
            for (var ia = 0; ia < imagesArr.length; ia++) {
                if (currArr[ca] === imagesArr[ia]) {
                    imagesArr.splice(ia, 1);
                }
            }
        }
    });
}

// VIDEO SECTION

function videoplay(button) {
    var par = button.parentNode;
    par.innerHTML = '<iframe src="https://www.youtube.com/embed/Eq1oSTCCRbI?autoplay=1" scrolling="no" style="width: 100%; height: 100%;" frameborder="0"></iframe>';
}

// CAROUSEL SECTION

$('.carousel_cradle').slick({
    dots: true,
    arrows: false
});

// CLIENT CAROUSEL SECTION

$('.clients_carousel_section').slick({
    arrows: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    infinite: true,
    responsive: [
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        }
    ],
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 2000
});

// FORM SECTION

var
    NAME_MIN_LEN = 2,
    EMAIL_MIN_LEN = 6,
    TITLE_MIN_LEN = 4,
    EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    form = document.forms.askForm,
    nameEl = form.name,
    emailEl = form.email,
    titleEl = form.title;

form.addEventListener('submit', function(e) {
    e.preventDefault();

    if (validateName() || validateEmail() || validateTitle()) {
        return;
    }

    var xhr = new XMLHttpRequest();
    xhr.open('post', '/');
    var data = {};
    data.name = $('#name').val();
    data.email = $('#email').val();
    data.title = $('#title').val();
    data.comment = $('#comment').val();

    var dataToSend = JSON.stringify(data);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(dataToSend);
    xhr.addEventListener('readystatechange', function () {
        if (this.readyState !== this.DONE) {
            return;
        }

        $('#name').val('');
        $('#email').val('');
        $('#title').val('');
        $('#comment').val('');

        toastr.success("Thank you!</br>We will reach you shortly");
    });
});

function validateName() {
    if (nameEl.value.trim().length < NAME_MIN_LEN) {
        toastr.error('Min length of "Name" is ' + NAME_MIN_LEN);
        return true;
    }
};

function validateEmail() {
    if (emailEl.value.trim().length < EMAIL_MIN_LEN) {
        toastr.error('Min length of "Email" is ' + EMAIL_MIN_LEN);
        return true;
    }
    if (!EMAIL_REGEX.test(emailEl.value.trim())) {
        toastr.error('Email is not valid');
        return true;
    }
};

function validateTitle() {
    if (titleEl.value.trim().length < TITLE_MIN_LEN) {
        toastr.error('Min length of "Title" is ' + TITLE_MIN_LEN);
        return true;
    }
};
