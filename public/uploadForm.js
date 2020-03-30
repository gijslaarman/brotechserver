function toggleForm() {
    const uploadForm = document.querySelector('.upload-form')
    uploadForm.classList.toggle('active')
}


(function uploadFormInit() {
    const imagesContainer = document.querySelector('#index .images')
    if (imagesContainer) {
        imagesContainer.insertAdjacentHTML('beforeend', `<div class="item add"><i JS_HOOK_FORM_TOGGLE>+</></div>`)
        const JS_HOOK_FORM_TOGGLE = document.querySelectorAll('[js_hook_form_toggle]')
        JS_HOOK_FORM_TOGGLE.forEach(hook => hook.addEventListener('click', toggleForm))
    }
})()
