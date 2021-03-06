let bottomBlock = {
    up: '',
    bottom: '',
    button: '',
    height: document.documentElement.clientHeight,
    getBlock(opt = true) {
        this.up = document.querySelector('.bottomFixedBlock')
        this.button = document.querySelector('.bottomFixedBlock__collapse')
        if (this.up == null) return

        if(opt) {
            let func = this.onScroll.bind(bottomBlock)
            let click = this.buttonClick.bind(bottomBlock)
            document.addEventListener('scroll', func, {passive: true})
            this.button.addEventListener('click', click)
            setTimeout(this.bottomMargin(), 1000)

        } else {
            this.up.classList.add('hidden')
        }
    },
    onScroll() {
        if(pageYOffset > 100 && !((pageYOffset + 300 + this.height) > this.bottom)) {
            if(!this.up.classList.contains('visible')) {
                this.on()
            }
        }
        else if(pageYOffset < 100 || (pageYOffset + 300 + this.height) > this.bottom) {
            if(this.up.classList.contains('visible')) {
                this.off()
            }
        }
    },
    on() {
        this.up.style.display = 'flex'
        setTimeout(() => this.up.classList.add('visible'), 500)
    },
    off() {
        this.up.classList.remove('visible')
        setTimeout(() => this.up.style.display = '', 500)
    },
    buttonClick() {
        this.up.classList.add('hidden')
        localStorage.setItem('bottomBlock', 'hidden')
    },
    bottomMargin() {
        let cookie = document.querySelector('#cookie-notice.cookie-notice-visible')
        if (cookie != null) {
            this.up.style.bottom = cookie.offsetHeight + 'px'
            let buttons = []
            buttons.push(cookie.querySelector('#cn-accept-cookie'))
            buttons.push(cookie.querySelector('#cn-close-notice'))
            for (let but of buttons) {
                but.addEventListener('click', () => {
                    bottomBlock.up.style.bottom = '0'
                }, {
                    once: true
                })
            }

        }
    }

}

if(localStorage.getItem("bottomBlock") !== "hidden") {
    setTimeout(() => {
        bottomBlock.bottom = document.querySelector('body').clientHeight
        bottomBlock.getBlock()
    }, 2000)
}
else {
    bottomBlock.getBlock(false)
}