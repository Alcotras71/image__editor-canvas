if(window.matchMedia('(max-width: 769px)').matches){
  $('.title img').attr('src', '/img/mobile/title.png');
  $('.preview__image img').attr('src', '/img/mobile/main.png');
  $('.aside').removeClass('hide');
  $('.aside__upload img').attr('src', '/img/mobile/icons/upload_img.svg');
  $('.aside__download img').attr('src', '/img/mobile/icons/download_img.svg');
  $('#btn-clear-objects').hide();
  $('#btn-crop-rotate img').attr('src', '/img/mobile/icons/crop_rotate.svg');
  $('#btn-image-filter img').attr('src', '/img/mobile/icons/filters.svg');
  $('#btn-text img').attr('src', '/img/mobile/icons/text.svg');
  $('#hidden-li').removeClass('hide');
  $('.add-happy__aside-btn').show();
  $('.add-happy__aside-btn').children('img').attr('src', '/img/mobile/icons/masks.svg');
  $('.add-happy__aside-btn').addClass('disabled');
  $('.tui-image-editor').attr('style', 'width:' + document.documentElement.clientWidth + 'px; ' + 'height:' + (document.documentElement.clientHeight - 220) + 'px;');
  $('.preview__btn').on('click', function() {
    $('.main__upload').click();
    $('#input-image-file').click();
    $('.add-happy').addClass('hide');
  });

  $('.footer-crop').on('click', function() {
    $(this).attr('src', '/img/mobile/icons/active/crop_rotate.svg');
    $('.footer-filter').attr('src', '/img/mobile/icons/filters.svg');
    $('.footer-text').attr('src', '/img/mobile/icons/text.svg');
    $('.add-happy__aside-btn').children('img').attr('src', '/img/mobile/icons/masks.svg');
  })
  
  $('.footer-filter').on('click', function() {
    $(this).attr('src', '/img/mobile/icons/active/filters.svg');
    $('.footer-crop').attr('src', '/img/mobile/icons/crop_rotate.svg');
    $('.footer-text').attr('src', '/img/mobile/icons/text.svg');
    $('.add-happy__aside-btn').children('img').attr('src', '/img/mobile/icons/masks.svg');
  })
  
  $('.footer-text').on('click', function() {
    $(this).attr('src', '/img/mobile/icons/active/text.svg');
    $('.footer-filter').attr('src', '/img/mobile/icons/filters.svg');
    $('.footer-crop').attr('src', '/img/mobile/icons/crop_rotate.svg');
    $('.add-happy__aside-btn').children('img').attr('src', '/img/mobile/icons/masks.svg');
  })

  $('.add-happy__aside-btn').on('click', function() {
    $('.add-happy__aside-btn').children('img').attr('src', '/img/mobile/icons/active/masks.svg');
    $('.footer-text').attr('src', '/img/mobile/icons/text.svg');
    $('.footer-filter').attr('src', '/img/mobile/icons/filters.svg');
    $('.footer-crop').attr('src', '/img/mobile/icons/crop_rotate.svg');
  })

  $('.add-happy__aside-btn').on('click', function() {
    $('.mobile-happy__img').toggleClass('hide');
    $('.mobile-happy__img').slick({
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 4
    });
  });


  // masks
  var $btnAddSantamob = $('#btn-add-santa-mob');
  var $btnAddNosemob = $('#btn-add-nose-mob');
  var $btnAddSnowmanmob = $('#btn-add-snowman-mob');
  var $btnAddTreemob = $('#btn-add-tree-mob');

  // characters
  var $btnAddSantamanmob = $('#btn-add-santaman-mob');
  var $btnAddSnowmanfullmob = $('#btn-add-snowmanfull-mob');
  var $btnAddBearmob = $('#btn-add-bear-mob');
  var $btnAddDeermob = $('#btn-add-deer-mob');

  // subjects
  var $btnAddBellmob = $('#btn-add-bell-mob');
  var $btnAddFlagsmob = $('#btn-add-flags-mob');
  var $btnAddGiftmob = $('#btn-add-gift-mob');
  var $btnAddCrhisttreemob = $('#btn-add-crhisttree-mob');

  // elements
  var $btnAddScarfmob = $('#btn-add-scarf-mob');
  var $btnAddTextmob = $('#btn-add-text-mob');
  var $btnAddBezelmob = $('#btn-add-bezel-mob');
  var $btnAddSnowflakemob = $('#btn-add-snowflake-mob');


  // mobs
  $btnAddSantamob.on('click', function() {
    imageEditor.addImageObject('./img/masks-pro/santa.svg');
  });
  $btnAddNosemob.on('click', function() {
    imageEditor.addImageObject('./img/masks-pro/nose.svg');
  });
  $btnAddSnowmanmob.on('click', function() {
    imageEditor.addImageObject('./img/masks-pro/snowman.svg');
  });
  $btnAddTreemob.on('click', function() {
    imageEditor.addImageObject('./img/masks-pro/tree.svg');
  });

  // characters
  $btnAddSantamanmob.on('click', function() {
    imageEditor.addImageObject('./img/characters-pro/santaman.svg');
  });
  $btnAddSnowmanfullmob.on('click', function() {
    imageEditor.addImageObject('./img/characters-pro/snowmanfull.svg');
  });
  $btnAddBearmob.on('click', function() {
    imageEditor.addImageObject('./img/characters-pro/bear.svg');
  });
  $btnAddDeermob.on('click', function() {
    imageEditor.addImageObject('./img/characters-pro/deer.svg');
  });

  // subjects
  $btnAddBellmob.on('click', function() {
    imageEditor.addImageObject('./img/subjects-pro/bell.svg');
  });
  $btnAddFlagsmob.on('click', function() {
    imageEditor.addImageObject('./img/subjects-pro/flags.svg');
  });
  $btnAddGiftmob.on('click', function() {
    imageEditor.addImageObject('./img/subjects-pro/gift.svg');
  });
  $btnAddCrhisttreemob.on('click', function() {
    imageEditor.addImageObject('./img/subjects-pro/crhisttree.svg');
  });

  // elements
  $btnAddScarfmob.on('click', function() {
    imageEditor.addImageObject('./img/elements-pro/scarf.svg');
  });
  $btnAddTextmob.on('click', function() {
    imageEditor.addImageObject('./img/elements-pro/text.svg');
  });
  $btnAddBezelmob.on('click', function() {
    imageEditor.addImageObject('./img/elements-pro/bezel.svg');
  });
  $btnAddSnowflakemob.on('click', function() {
    imageEditor.addImageObject('./img/elements-pro/snowflake.svg');
  });

  function checkCorrection(selectorChecked, selector, text) {
    if($(selectorChecked).is(':checked')) {
      if (selector) {
        $(selector).css('display', 'block');
        $('.correction').css('padding-top', '40px');
      }
      $('.correction').text(text);
    } else{
      if (selector) {
        $(selector).css('display', 'none')
        $('.correction').css('padding-top', '15px');
      }
      $('.correction').text('КОРРЕКЦИЯ');
    }
  }

  $('#input-check-noise').on('click', () => checkCorrection('#input-check-noise','#input-range-noise-value', 'Коррекция. Шум'));
  $('#input-check-pixelate').on('click', () => checkCorrection('#input-check-pixelate','#input-range-pixelate-value', 'Коррекция. Пикселизация'));
  $('#input-check-grayscale').on('click', () => checkCorrection('#input-check-grayscale','', 'ФИЛЬТР. ЧЕРНО-БЕЛЫЙ'));
  $('#input-check-sharpen').on('click', () => checkCorrection('#input-check-sharpen','', 'ФИЛЬТР. РЕЗКОСТЬ'));


  $('.text__family-mobile').show();
  $('.btn-text-family').show();
  $('.btn-text-fam').hide();
  $('.text__family-dropdown').hover(function() {
    $('.btn-text-family').show();
  },function() {
    $('.btn-text-family').show();
  })

  $('.btn-text-family').each(function() {
    $(this).html("<div>Aa</div>" + "<p>" + $(this).text() + "</p>")
  });

  function toggleTextMobile(button, selector, wrapper = '#text-sub-menu') {
    $(button).on('click', function() {
      $(selector).toggle();
      if ($(selector).css('display') == 'block' && $(selector).length == 2) {
        $(wrapper).css('padding-top', '115px');
      } else if ($(selector).css('display') == 'block' && $(selector).hasClass('color__picker')){
        $(wrapper).css('padding-top', '70px');
      } else if ($(selector).css('display') == 'block'){
        $(wrapper).css('padding-top', '50px');
      } else{
        $(wrapper).css('padding-top', '0px');
      }
     });
  }
  
  
  toggleTextMobile('.mobile__text-style','.text__mobile-style');
  toggleTextMobile('.mobile__decoration','.text__dec');
  toggleTextMobile('.mobile__color','#tui-text-color-picker');
  toggleTextMobile('.mobile__align', '.align__mobile');

// var elems = $('.color__picker .tui-colorpicker-clearfix li');

// function giveLiWrapper() {
//   let content = [];
//   let temp = [];
  
//   for(var i = 0; i < elems.length; i++) {
//       var elem = elems[i];
//       temp.push(elem);
//       if (i === 7 || i + 1 === elems.length) {
//           content.push(temp);
//           temp = [];
//       }
//   };
                   
//   $.each(content, function(i) {
//       var elem = $(this);
//       elem.wrapAll($('<div class="color_wrapper"></div>'));
//   });
// }

// $(document).ready(function() {
//   elems.each(function() {
//     $(this).on('click', giveLiWrapper());
//   })
//   giveLiWrapper();
// }) ;


}