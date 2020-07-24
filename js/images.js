'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarChooser = document.querySelector('#avatar');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var avatarDefault = avatarPreview.src;
  var properyPhotoChooser = document.querySelector('#images');
  var properyPhotoPreview = document.querySelector('.ad-form__photo');

  var onAvatarChange = function () {
    var file = avatarChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  var onProperyPhotoChange = function () {
    Array.from(properyPhotoChooser.files).forEach(function (file) {
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          var photo = document.createElement('img');
          photo.width = 70;
          photo.height = 70;
          photo.style.margin = '0 10px 10px 0';
          photo.scr = 'Фотографии предложения';
          photo.src = reader.result;
          properyPhotoPreview.appendChild(photo);
        });

        reader.readAsDataURL(file);
      }
    });
  };

  var clearAvatar = function () {
    avatarPreview.src = avatarDefault;
  };

  var clearPropertyPhoto = function () {
    var photos = properyPhotoPreview.querySelectorAll('img');
    photos.forEach(function (photo) {
      photo.remove();
    });
  };

  window.images = {
    avatar: avatarChooser,
    onAvatarChange: onAvatarChange,
    clearAvatar: clearAvatar,
    property: properyPhotoChooser,
    onProperyPhotoChange: onProperyPhotoChange,
    clearPropertyPhoto: clearPropertyPhoto
  };
})();
