"use strict";

function toggleForm() {
  var uploadForm = document.querySelector('.upload-form');
  uploadForm.classList.toggle('active');
}

(function uploadFormInit() {
  var imagesContainer = document.querySelector('#index .images');

  if (imagesContainer) {
    imagesContainer.insertAdjacentHTML('beforeend', "<div class=\"item add\"><i JS_HOOK_FORM_TOGGLE>+</></div>");
    var JS_HOOK_FORM_TOGGLE = document.querySelectorAll('[js_hook_form_toggle]');
    JS_HOOK_FORM_TOGGLE.forEach(function (hook) {
      return hook.addEventListener('click', toggleForm);
    });
  }
})();