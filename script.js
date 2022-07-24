//Фон header
window.addEventListener("scroll", scrollHeader);
function scrollHeader() {
    let header = document.querySelector(".header");
    let personImg = document.querySelector(".intro__img");
    if (window.pageYOffset + header.offsetHeight > personImg.offsetTop) {
        header.classList.add("headermodif");
    };
    if (window.pageYOffset + header.offsetHeight < personImg.offsetTop) {
        header.classList.remove("headermodif");
    };
}
//Кнопки навигации (через делегирование)
let navigation = document.querySelector("nav");
navigation.addEventListener("click", scrollNavigation);
function scrollNavigation(event) {
    if (event.target.className !== "nav__item") return;
    let link = event.target.dataset.link;
    if (document.querySelector("#ru").classList.contains("hidden")) {
        let elemLink = document.querySelectorAll("." + link)[1];
        elemLink.scrollIntoView({block: "start", behavior: "smooth"});
        burgerSlaider();
    } else {
        let elemLink = document.querySelectorAll("." + link)[0];
        elemLink.scrollIntoView({block: "start", behavior: "smooth"});
        burgerSlaider();
    };
}
//Бургер меню
let btnBurger = document.querySelector(".nav-toggle");
btnBurger.addEventListener("click", burgerSlaider);
function burgerSlaider() {
    let navBox = document.querySelector(".nav-wrapper");
    let headerLogo = document.querySelector(".header__logo");
    navBox.classList.toggle("burger");
    headerLogo.classList.toggle("header__logo-trans");
    btnBurger.classList.toggle("active");
}
//Переключение между person
let btnRu = document.querySelectorAll(".intro__img")[0];    
let btnRi = document.querySelectorAll(".intro__img")[1];
function infoRu() {
    let imgRu = document.querySelectorAll(".intro__img")[0];
    let imgRi = document.querySelectorAll(".intro__img")[1];
    let ru = document.getElementById("ru");
    let ri = document.getElementById("ri");
    imgRu.classList.add("scale");
    ru.classList.remove("hidden");
    imgRi.classList.remove("scale");
    ri.classList.add("hidden");
}
function infoRi() {
    let imgRu = document.querySelectorAll(".intro__img")[0];
    let imgRi = document.querySelectorAll(".intro__img")[1];
    let ru = document.getElementById("ru");
    let ri = document.getElementById("ri");
    imgRu.classList.remove("scale");
    ru.classList.add("hidden");
    imgRi.classList.add("scale");
    ri.classList.remove("hidden");
}
btnRu.addEventListener("click", infoRu);
btnRi.addEventListener("click", infoRi);
//Заполнение прогресса
window.addEventListener("scroll", scrollProgress);
let toggle = 0;
function scrollProgress() {
    let elem;
    if (document.getElementById("ru").classList.contains("hidden")) {
        elem = document.querySelector("#ri-skills");
    } else {
        elem = document.querySelector(".section__skills");
    }
    if (document.documentElement.clientHeight < elem.getBoundingClientRect().y) {
        toggle = 0;
    }
    if (document.documentElement.clientHeight > elem.getBoundingClientRect().y) {
        if (toggle == 0) {
            let percentCollection = elem.querySelectorAll(".skills__percent");
            let progressCollection = elem.getElementsByTagName("progress");
            for (let i = 0; i < percentCollection.length; i++) {
                function func(percent, progress) {
                    let primaryValuePerc = +percent.firstElementChild.innerHTML;
                    percent.firstElementChild.innerHTML = 0;
                    let primaryValueProg = progress.value;
                    progress.value = 0;
                    let intervalPerc = setInterval(() => {
                        percent.firstElementChild.innerHTML = +percent.firstElementChild.innerHTML + 1;
                        if (percent.firstElementChild.innerHTML >= primaryValuePerc) {
                            clearInterval(intervalPerc);
                        }
                    }, 480/primaryValuePerc);
                    let intervalProg = setInterval(() => {
                        progress.value += 1;
                        if (progress.value >= primaryValueProg) {
                            clearInterval(intervalProg);
                        }
                    }, 480/primaryValueProg);            
                }
                func(percentCollection[i], progressCollection[i]);
            }
            toggle = 1;
        }
    }
}
//Анимация box
window.addEventListener("scroll", scrollTransform);
function scrollTransform() {
    let collection = document.querySelectorAll(".trans");
    for (let prop of collection) {
        transform(prop);
    }
}
function transform(elem) {
    if (document.documentElement.clientHeight > elem.getBoundingClientRect().y) {
        elem.firstElementChild.classList.add("transform");
        elem.lastElementChild.classList.add("transform");
    };
    if (window.pageYOffset + document.documentElement.clientHeight < elem.offsetTop) {
        elem.firstElementChild.classList.remove("transform");
        elem.lastElementChild.classList.remove("transform");
    };
}
//Подсветка border родителя input и textarea
let inputList = document.querySelectorAll(".input");
function lightBorder(event) {
    let target = event.target.tagName;
    switch (target) {
        case "INPUT":
            event.target.closest("div").classList.add("borderParentInput");
            break;
        case "TEXTAREA":
            event.target.closest("div").classList.add("borderParentText");
            break;
        default:
            return;
    }
}
function defaultBorder(event) {
    let target = event.target.tagName;
    switch (target) {
        case "INPUT":
            event.target.closest("div").classList.remove("borderParentInput");
            break;
        case "TEXTAREA":
            event.target.closest("div").classList.remove("borderParentText");
            break;
        default:
            return;
    }
}
for (let prop of inputList) {
    prop.addEventListener("focus", lightBorder);
    prop.addEventListener("blur", defaultBorder);
}