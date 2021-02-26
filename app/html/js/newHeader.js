document.addEventListener('DOMContentLoaded', () => {

    function expand() {
        let block = document.querySelector('.header__container')
        let but = document.querySelector('.header__topButtons span:first-child')
        let bot = document.querySelector('header')
        let hiddenHeight = document.querySelector('.header__hidden').scrollHeight
        let top = document.querySelector('.header__top')

        top.classList.remove('release')
        bot.style.marginTop = `${hiddenHeight + 30}px`;
        but.style.opacity = '0';
        setTimeout(() => but.style.display = 'none', 500)
        block.classList.add('expanded')
    }

    let expandBut = document.querySelector('.header__topButtons > span:first-child')

    if (expandBut !== null) {
        expandBut.addEventListener('mouseup', expand)
    }

    function collapse() {
        let block = document.querySelector('.header__container')
        let top = document.querySelector('.header__top')

        if(block.classList.contains('expanded')) {
            block.classList.remove('expanded')
            let bot = document.querySelector('header')
            bot.style.marginTop = ``;
            let but = document.querySelector('.header__topButtons span:first-child')
            but.style.display = 'block'
            setTimeout(() => but.style.opacity = '1', 100)
        } else {
            block.classList.add('collapsed')
            setTimeout(() => top.classList.add('release'), 100)
            localStorage.setItem('topCollapsed', 'true')
        }
    }

    let collapseBut = document.querySelector('.header__topButtons > span:last-child')

    if (collapseBut !== null) {
        let addBut = document.querySelector('.collapseAdditionalButton')
        collapseBut.addEventListener('mouseup', collapse)
        addBut.addEventListener('mouseup', collapse)
    }

    function expandAgain() {
        let block = document.querySelector('.header__container')
        block.classList.remove('collapsed')
        localStorage.removeItem('topCollapsed')

        setTimeout(expand, 200)
    }

    let expandAgainBut = document.querySelector('.header__topButtonsHidden > span:first-child')

    if (expandAgainBut !== null) {
        expandAgainBut.addEventListener('mouseup', expandAgain)
    }


})

function editBackgroundImage() {
    let blc = document.querySelector('.header__top')
    let set = blc.dataset.srcSet.split(',')
    let desk =  set[0]
    let mob = set[1]
    if (document.documentElement.clientWidth >= 1023) {
        blc.style.backgroundImage = `url('${desk}')`
    } else {
        blc.style.backgroundImage = `url('${mob}')`
    }
}

editBackgroundImage()