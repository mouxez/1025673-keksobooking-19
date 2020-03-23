'use strict';

(function () {
  var avatarInput = window.adForm.querySelector('.ad-form-header__input');
  var housePhotoInput = window.adForm.querySelector('.ad-form__upload input[type=file]');
  var housePreview = window.adForm.querySelector('.ad-form__photo');
  var avatarPreview = window.adForm.querySelector('.ad-form-header__preview img');

  var onPhotoUpload = function (input, insert) {
    var file = input.files[0];
    var fileName = file.name.toLowerCase();

    var match = window.const.IMG_TYPES.some(function (el) {
      return fileName.endsWith(el);
    });

    if (match) {
      var reader = new FileReader();
      if (insert.tagName.toLowerCase() === 'img') {
        reader.addEventListener('load', function () {
          insert.src = reader.result;
        });
      } else if (insert.tagName.toLowerCase() === 'div') {
        reader.addEventListener('load', function () {
          var newImg = housePreview.cloneNode(true);
          window.adForm.querySelector('.ad-form__photo-container').insertBefore(newImg, insert);

          newImg.style.backgroundImage = 'url(' + reader.result + ')';
          newImg.style.backgroundSize = 'cover';
          newImg.style.backgroundPosition = '50%';
          newImg.style.backgroundRepeat = 'no-repeat';
        });
      }
      reader.readAsDataURL(file);
    }
  };

  housePhotoInput.addEventListener('change', function () {
    onPhotoUpload(housePhotoInput, housePreview);
  });
  avatarInput.addEventListener('change', function () {
    onPhotoUpload(avatarInput, avatarPreview);
  });
})();
