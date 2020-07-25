'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var PROPERTY_PHOTO_SIDE = 70;
  var PROPERTY_PHOTO_MARGIN = '0 10px 10px 0';
  var PROPERTY_PHOTO_ALT = 'Фотография предложения';

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
          photo.width = PROPERTY_PHOTO_SIDE;
          photo.height = PROPERTY_PHOTO_SIDE;
          photo.style.margin = PROPERTY_PHOTO_MARGIN;
          photo.alt = PROPERTY_PHOTO_ALT;
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
