/**
 * basic.js
 * @author NHN Ent. FE Development Team <dl_javascript@nhn.com>
 * @fileoverview
 */
/* eslint-disable vars-on-top,no-var,strict,prefer-template,prefer-arrow-callback,prefer-destructuring,object-shorthand,require-jsdoc,complexity,prefer-const,no-unused-vars */
var PIXELATE_FILTER_DEFAULT_VALUE = 20;
var supportingFileAPI = !!(window.File && window.FileList && window.FileReader);
var rImageType = /data:(image\/.+);base64,/;
var shapeOptions = {};
var shapeType;
var activeObjectId;

// Buttons
var $btns = $('.menu-item');
var $btnsActivatable = $btns.filter('.activatable');
var $inputImage = $('#input-image-file');
var $inputImage2 = $('#input-image-file2');
var $btnDownload = $('#btn-download');

var $btnUndo = $('#btn-undo');
var $btnRedo = $('#btn-redo');
var $btnClearObjects = $('#btn-clear-objects');
var $btnRemoveActiveObject = $('#btn-remove-active-object');
var $btnCrop = $('.btn-crop');
var $btnFlip = $('#btn-flip');
var $btnRotation = $('#btn-rotation');
var $btnDrawLine = $('#btn-draw-line');
var $btnDrawShape = $('#btn-draw-shape');
var $btnApplyCrop = $('#btn-apply-crop');
var $btnCancelCrop = $('#btn-cancel-crop');
var $btnFlipX = $('#btn-flip-x');
var $btnFlipY = $('#btn-flip-y');
var $btnResetFlip = $('#btn-reset-flip');
var $btnRotateClockwise = $('#btn-rotate-clockwise');
var $btnRotateCounterClockWise = $('#btn-rotate-counter-clockwise');
var $btnText = $('#btn-text');
var $btnTextStyle = $('.btn-text-style');
var $btnTextFamily = $('.btn-text-family');
var $btnAddIcon = $('#btn-add-icon');
var $btnRegisterIcon = $('#btn-register-icon');
var $btnMaskFilter = $('#btn-mask-filter');
var $btnImageFilter = $('#btn-image-filter');
var $btnLoadMaskImage = $('#input-mask-image-file');
var $btnApplyMask = $('#btn-apply-mask');
var $btnClose = $('.close');

// Input etc.
var $inputRotationRange = $('#input-rotation-range');
var $inputBrushWidthRange = $('#input-brush-width-range');
var $inputFontSizeRange = $('#input-font-size-range');
var $inputStrokeWidthRange = $('#input-stroke-width-range');
var $inputCheckTransparent = $('#input-check-transparent');
var $inputCheckFilter = $('#input-check-filter');
var $inputCheckGrayscale = $('#input-check-grayscale');
var $inputCheckInvert = $('#input-check-invert');
var $inputCheckSepia = $('#input-check-sepia');
var $inputCheckSepia2 = $('#input-check-sepia2');
var $inputCheckBlur = $('#input-check-blur');
var $inputCheckSharpen = $('#input-check-sharpen');
var $inputCheckEmboss = $('#input-check-emboss');
var $inputCheckRemoveWhite = $('#input-check-remove-white');
var $inputRangeRemoveWhiteThreshold = $('#input-range-remove-white-threshold');
var $inputRangeRemoveWhiteDistance = $('#input-range-remove-white-distance');
var $inputCheckBrightness = $('#input-check-brightness');
var $inputRangeBrightnessValue = $('#input-range-brightness-value');
var $inputCheckNoise = $('#input-check-noise');
var $inputRangeNoiseValue = $('#input-range-noise-value');
var $inputCheckPixelate = $('#input-check-pixelate');
var $inputRangePixelateValue = $('#input-range-pixelate-value');
var $inputCheckTint = $('#input-check-tint');
var $inputRangeTintOpacityValue = $('#input-range-tint-opacity-value');
var $inputCheckMultiply = $('#input-check-multiply');
var $inputCheckBlend = $('#input-check-blend');
var $inputCheckColorFilter = $('#input-check-color-filter');
var $inputRangeColorFilterValue = $('#input-range-color-filter-value');

// Sub menus
var $displayingSubMenu = $();
var $cropSubMenu = $('#crop-sub-menu');
var $flipSubMenu = $('#flip-sub-menu');
var $rotationSubMenu = $('#rotation-sub-menu');
var $freeDrawingSubMenu = $('#free-drawing-sub-menu');
var $drawLineSubMenu = $('#draw-line-sub-menu');
var $drawShapeSubMenu = $('#draw-shape-sub-menu');
var $textSubMenu = $('#text-sub-menu');
var $iconSubMenu = $('#icon-sub-menu');
var $filterSubMenu = $('#filter-sub-menu');
var $imageFilterSubMenu = $('#image-filter-sub-menu');

// Select line type
var $selectLine = $('[name="select-line-type"]');

// Select shape type
var $selectShapeType = $('[name="select-shape-type"]');

// Select color of shape type
var $selectColorType = $('[name="select-color-type"]');

// Select blend type
var $selectBlendType = $('[name="select-blend-type"]');

// Image editor
var imageEditor = new tui.ImageEditor('.tui-image-editor', {
    cssMaxWidth: 710,
    cssMaxHeight: 450,
    selectionStyle: {
        cornerSize: 10,
        rotatingPointOffset: 50
    }
});

if(window.matchMedia('(max-width: 768px)').matches){
  var imageEditor = new tui.ImageEditor('.tui-image-editor', {
    cssMaxWidth: document.documentElement.clientWidth,
    cssMaxHeight: document.documentElement.clientHeight,
    selectionStyle: {
        cornerSize: 40,
        rotatingPointOffset: 70
  }
});
}

// Color picker for free drawing
var brushColorpicker = tui.colorPicker.create({
    container: $('#tui-brush-color-picker')[0],
    color: '#000000'
});

// Color picker for text palette
var textColorpicker = tui.colorPicker.create({
    container: $('#tui-text-color-picker')[0],
    color: '#E21E26'
});

// Color picker for shape
var shapeColorpicker = tui.colorPicker.create({
    container: $('#tui-shape-color-picker')[0],
    color: '#000000'
});

// Color picker for icon
var iconColorpicker = tui.colorPicker.create({
    container: $('#tui-icon-color-picker')[0],
    color: '#000000'
});

var tintColorpicker = tui.colorPicker.create({
    container: $('#tui-tint-color-picker')[0],
    color: '#000000'
});

var multiplyColorpicker = tui.colorPicker.create({
    container: $('#tui-multiply-color-picker')[0],
    color: '#000000'
});

var blendColorpicker = tui.colorPicker.create({
    container: $('#tui-blend-color-picker')[0],
    color: '#00FF00'
});

// Common global functions
// HEX to RGBA
function hexToRGBa(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16);
    var g = parseInt(hex.slice(3, 5), 16);
    var b = parseInt(hex.slice(5, 7), 16);
    var a = alpha || 1;

    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
}

function base64ToBlob(data) {
    var mimeString = '';
    var raw, uInt8Array, i, rawLength;

    raw = data.replace(rImageType, function(header, imageType) {
        mimeString = imageType;

        return '';
    });

    raw = atob(raw);
    rawLength = raw.length;
    uInt8Array = new Uint8Array(rawLength); // eslint-disable-line

    for (i = 0; i < rawLength; i += 1) {
        uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], {type: mimeString});
}

function resizeEditor() {
    var $editor = $('.tui-image-editor');
    var $container = $('.tui-image-editor-canvas-container');
    var height = parseFloat($container.css('max-height'));

    $editor.height(height);
}

function getBrushSettings() {
    var brushWidth = parseInt($inputBrushWidthRange.val(), 10);
    var brushColor = brushColorpicker.getColor();

    return {
        width: brushWidth,
        color: hexToRGBa(brushColor, 0.5)
    };
}

function activateShapeMode() {
    if (imageEditor.getDrawingMode() !== 'SHAPE') {
        imageEditor.stopDrawingMode();
        imageEditor.startDrawingMode('SHAPE');
    }
}

function activateIconMode() {
    imageEditor.stopDrawingMode();
}

function activateTextMode() {
    if (imageEditor.getDrawingMode() !== 'TEXT') {
        imageEditor.stopDrawingMode();
        imageEditor.startDrawingMode('TEXT');
    }
}

function setTextToolbar(obj) {
    var fontSize = obj.fontSize;
    var fontColor = obj.fill;

    $inputFontSizeRange.val(fontSize);
    textColorpicker.setColor(fontColor);
}

function setIconToolbar(obj) {
    var iconColor = obj.fill;

    iconColorpicker.setColor(iconColor);
}

function setShapeToolbar(obj) {
    var fillColor, isTransparent, isFilter;
    var colorType = $selectColorType.val();
    var changeValue = colorType === 'stroke' ? obj.stroke : obj.fill.type;
    isTransparent = (changeValue === 'transparent');
    isFilter = (changeValue === 'filter');

    if (colorType === 'stroke') {
        if (!isTransparent && !isFilter) {
            shapeColorpicker.setColor(changeValue);
        }
    } else if (colorType === 'fill') {
        if (!isTransparent && !isFilter) {
            fillColor = obj.fill.color;
            shapeColorpicker.setColor(fillColor);
        }
    }

    $inputCheckTransparent.prop('checked', isTransparent);
    $inputCheckFilter.prop('checked', isFilter);
    $inputStrokeWidthRange.val(obj.strokeWidth);
}

function showSubMenu(type) {
    var $submenu;

    switch (type) {
        case 'shape':
            $submenu = $drawShapeSubMenu;
            break;
        case 'icon':
            $submenu = $iconSubMenu;
            break;
        case 'text':
            $submenu = $textSubMenu;
            break;
        default:
            $submenu = 0;
    }

    $displayingSubMenu.hide();
    $displayingSubMenu = $submenu.show();
}

function applyOrRemoveFilter(applying, type, options) {
    if (applying) {
        imageEditor.applyFilter(type, options).then(function(result) {
            console.log(result);
        });
    } else {
        imageEditor.removeFilter(type);
    }
}

// Attach image editor custom events
imageEditor.on({
    objectAdded: function(objectProps) {
        console.info(objectProps);
    },
    undoStackChanged: function(length) {
        if (length) {
            $btnUndo.removeClass('disabled');
        } else {
            $btnUndo.addClass('disabled');
        }
        resizeEditor();
    },
    redoStackChanged: function(length) {
        if (length) {
            $btnRedo.removeClass('disabled');
        } else {
            $btnRedo.addClass('disabled');
        }
        resizeEditor();
    },
    objectScaled: function(obj) {
        if (obj.type === 'text') {
            $inputFontSizeRange.val(obj.fontSize);
        }
    },
    addText: function(pos) {
        imageEditor.addText('С Новым Годом!', {
            styles: {
              fill: '#E21E26',
              fontFamily: 'Pacifico'
            },
            position: pos.originPosition
        }).then(function(objectProps) {
            console.log(objectProps);
        });
    },
    objectActivated: function(obj) {
        activeObjectId = obj.id;
        if (obj.type === 'rect' || obj.type === 'circle' || obj.type === 'triangle') {
            showSubMenu('shape');
            setShapeToolbar(obj);
            activateShapeMode();
        } else if (obj.type === 'icon') {
            showSubMenu('icon');
            setIconToolbar(obj);
            activateIconMode();
        } else if (obj.type === 'text') {
            showSubMenu('text');
            setTextToolbar(obj);
            activateTextMode();
        }
    },
    mousedown: function(event, originPointer) {
        if ($imageFilterSubMenu.is(':visible') && imageEditor.hasFilter('colorFilter')) {
            imageEditor.applyFilter('colorFilter', {
                x: parseInt(originPointer.x, 10),
                y: parseInt(originPointer.y, 10)
            });
        }
    }
});

// Attach button click event listeners
$btns.on('click', function() {
    $btnsActivatable.removeClass('active');
});

$btnsActivatable.on('click', function() {
    $(this).addClass('active');
});

$btnUndo.on('click', function() {
    $displayingSubMenu.hide();

    if (!$(this).hasClass('disabled')) {
        imageEditor.undo();
    }
});

$btnRedo.on('click', function() {
    $displayingSubMenu.hide();

    if (!$(this).hasClass('disabled')) {
        imageEditor.redo();
    }
});

$btnClearObjects.on('click', function() {
    $displayingSubMenu.hide();
    imageEditor.clearObjects();
});

$btnRemoveActiveObject.on('click', function() {
    $displayingSubMenu.hide();
    imageEditor.removeObject(activeObjectId);
});

$btnCrop.on('click', function() {
    $displayingSubMenu.hide();
    $displayingSubMenu = $cropSubMenu.show();
});

$('.crop').on('click', function() {
  imageEditor.startDrawingMode('CROPPER');
});

$btnFlip.on('click', function() {
    imageEditor.stopDrawingMode();
    $displayingSubMenu.hide();
    $displayingSubMenu = $flipSubMenu.show();
});

$btnRotation.on('click', function() {
    imageEditor.stopDrawingMode();
    $displayingSubMenu.hide();
    $displayingSubMenu = $rotationSubMenu.show();
});

$btnClose.on('click', function() {
    imageEditor.stopDrawingMode();
    $displayingSubMenu.hide();
});

$btnApplyCrop.on('click', function() {
    imageEditor.crop(imageEditor.getCropzoneRect()).then(function() {
        imageEditor.stopDrawingMode();
        resizeEditor();
    });
});

$btnCancelCrop.on('click', function() {
    imageEditor.stopDrawingMode();
    imageEditor.setAngle(0);
});

$btnFlipX.on('click', function() {
    imageEditor.flipX().then(function(status) {
        console.log('flipX: ', status.flipX);
        console.log('flipY: ', status.flipY);
        console.log('angle: ', status.angle);
    });
});

$btnFlipY.on('click', function() {
    imageEditor.flipY().then(function(status) {
        console.log('flipX: ', status.flipX);
        console.log('flipY: ', status.flipY);
        console.log('angle: ', status.angle);
    });
});

$btnResetFlip.on('click', function() {
    imageEditor.resetFlip().then(function(status) {
        console.log('flipX: ', status.flipX);
        console.log('flipY: ', status.flipY);
        console.log('angle: ', status.angle);
    });
});

$btnRotateClockwise.on('click', function() {
    imageEditor.rotate(30);
});

$btnRotateCounterClockWise.on('click', function() {
    imageEditor.rotate(-30);
});

$inputRotationRange.on('mousedown', function() {
    var changeAngle = function() {
        imageEditor.setAngle(parseInt($inputRotationRange.val(), 10))['catch'](function() {});
    };
    $(document).on('mousemove', changeAngle);
    $(document).on('mouseup', function stopChangingAngle() {
        $(document).off('mousemove', changeAngle);
        $(document).off('mouseup', stopChangingAngle);
    });
});

$inputRotationRange.on('change', function() {
    imageEditor.setAngle(parseInt($inputRotationRange.val(), 10))['catch'](function() {});
});

$inputBrushWidthRange.on('change', function() {
    imageEditor.setBrush({width: parseInt(this.value, 10)});
});

$inputImage.on('change', function(event) {
    var file;

    if (!supportingFileAPI) {
        alert('This browser does not support file-api');
    }

    file = event.target.files[0];
    imageEditor.loadImageFromFile(file).then(function(result) {
        console.log(result);
        imageEditor.clearUndoStack();
    });
});

$inputImage2.on('change', function(event) {
  var file;

  if (!supportingFileAPI) {
      alert('This browser does not support file-api');
  }

  file = event.target.files[0];
  imageEditor.loadImageFromFile(file).then(function(result) {
      console.log(result);
      imageEditor.clearUndoStack();
  });
});

$btnDownload.on('click', function() {
    var imageName = imageEditor.getImageName();
    var dataURL = imageEditor.toDataURL();
    var blob, type, w;

    if (supportingFileAPI) {
        blob = base64ToBlob(dataURL);
        type = blob.type.split('/')[1];
        if (imageName.split('.').pop() !== type) {
            imageName.split('.')[0] += '.' + type;
        }

        // Library: FileSaver - saveAs
        saveAs(blob, imageName); // eslint-disable-line
    } else {
        alert('This browser needs a file-server');
        w = window.open();
        w.document.body.innerHTML = '<img src="' + dataURL + '">';
    }
});

// control draw line mode
$btnDrawLine.on('click', function() {
    imageEditor.stopDrawingMode();
    $displayingSubMenu.hide();
    $displayingSubMenu = $drawLineSubMenu.show();
    $selectLine.eq(0).change();
});

$selectLine.on('change', function() {
    var mode = $(this).val();
    var settings = getBrushSettings();

    imageEditor.stopDrawingMode();
    if (mode === 'freeDrawing') {
        imageEditor.startDrawingMode('FREE_DRAWING', settings);
    } else {
        imageEditor.startDrawingMode('LINE_DRAWING', settings);
    }
});

brushColorpicker.on('selectColor', function(event) {
    imageEditor.setBrush({
        color: hexToRGBa(event.color, 0.5)
    });
});

// control draw shape mode
$btnDrawShape.on('click', function() {
    showSubMenu('shape');

    // step 1. get options to draw shape from toolbar
    shapeType = $('[name="select-shape-type"]:checked').val();

    shapeOptions.stroke = '#000000';
    shapeOptions.fill = '#ffffff';

    shapeOptions.strokeWidth = Number($inputStrokeWidthRange.val());

    // step 2. set options to draw shape
    imageEditor.setDrawingShape(shapeType, shapeOptions);

    // step 3. start drawing shape mode
    activateShapeMode();
});

$selectShapeType.on('change', function() {
    shapeType = $(this).val();

    imageEditor.setDrawingShape(shapeType);
});
$selectColorType.on('change', function() {
    var colorType = $(this).val();
    if (colorType === 'stroke') {
        $inputCheckFilter.prop('disabled', true);
        $inputCheckFilter.prop('checked', false);
    } else {
        $inputCheckTransparent.prop('disabled', false);
        $inputCheckFilter.prop('disabled', false);
    }
});

$inputCheckTransparent.on('change', onChangeShapeFill);
$inputCheckFilter.on('change', onChangeShapeFill);
shapeColorpicker.on('selectColor', function(event) {
    $inputCheckTransparent.prop('checked', false);
    $inputCheckFilter.prop('checked', false);
    onChangeShapeFill(event);
});

function onChangeShapeFill(event) {
    var colorType = $selectColorType.val();
    var isTransparent = $inputCheckTransparent.prop('checked');
    var isFilter = $inputCheckFilter.prop('checked');
    var shapeOption;

    if (event.color) {
        shapeOption = event.color;
    } else if (isTransparent) {
        shapeOption = 'transparent';
    } else if (isFilter) {
        shapeOption = {
            type: 'filter',
            filter: [{pixelate: PIXELATE_FILTER_DEFAULT_VALUE}]
        };
    }

    if (colorType === 'stroke') {
        imageEditor.changeShape(activeObjectId, {
            stroke: shapeOption
        });
    } else if (colorType === 'fill') {
        imageEditor.changeShape(activeObjectId, {
            fill: shapeOption
        });
    }

    imageEditor.setDrawingShape(shapeType, shapeOptions);
}

$inputStrokeWidthRange.on('change', function() {
    var strokeWidth = Number($(this).val());

    imageEditor.changeShape(activeObjectId, {
        strokeWidth: strokeWidth
    });

    imageEditor.setDrawingShape(shapeType, shapeOptions);
});

// control text mode
$btnText.on('click', function() {
    showSubMenu('text');
    activateTextMode();
});

$inputFontSizeRange.on('change', function() {
    imageEditor.changeTextStyle(activeObjectId, {
        fontSize: parseInt(this.value, 10)
    });
});

$('.btn-text-style, .btn-text-family').on('click', function(e) { // eslint-disable-line
    var styleType = $(this).attr('data-style-type');
    var styleObj;

    e.stopPropagation();

    switch (styleType) {
        case 'u':
            styleObj = {textDecoration: 'underline'};
            break;
        case 'c':
            styleObj = {fontStyle: 'italic'};
            break;
        case 'b':
            styleObj = {fontWeight: '700'};
            break;
        case 'l':
            styleObj = {textAlign: 'left'};
            break;
        case 'c':
            styleObj = {textAlign: 'center'};
            break;
        case 'r':
            styleObj = {textAlign: 'right'};
            break;
        case 'pac':
          styleObj = {fontFamily: 'Pacifico'};
          break;
        case 'mon':
          styleObj = {fontFamily: 'Montserrat'};
          break;
        case 'pla':
          styleObj = {fontFamily: 'Playfair Display'};
          break;
        case 'lob':
          styleObj = {fontFamily: 'Lobster'};
          break;
        case 'beb':
          styleObj = {fontFamily: 'Bebas Neue'};
          break;
        default:
            styleObj = {};
    }

    imageEditor.changeTextStyle(activeObjectId, styleObj);
});

textColorpicker.on('selectColor', function (event) {
  imageEditor.changeTextStyle(activeObjectId, {
    fill: event.color,
  });
});

// control mask filter
$btnMaskFilter.on('click', function() {
    imageEditor.stopDrawingMode();
    $displayingSubMenu.hide();

    $displayingSubMenu = $filterSubMenu.show();
});

$btnImageFilter.on('click', function() {
    var filters = {
        'grayscale': $inputCheckGrayscale,
        'invert': $inputCheckInvert,
        'sepia': $inputCheckSepia,
        'sepia2': $inputCheckSepia2,
        'blur': $inputCheckBlur,
        'shapren': $inputCheckSharpen,
        'emboss': $inputCheckEmboss,
        'removeWhite': $inputCheckRemoveWhite,
        'brightness': $inputCheckBrightness,
        'noise': $inputCheckNoise,
        'pixelate': $inputCheckPixelate,
        'tint': $inputCheckTint,
        'multiply': $inputCheckMultiply,
        'blend': $inputCheckBlend,
        'colorFilter': $inputCheckColorFilter
    };

    tui.util.forEach(filters, function($value, key) {
        $value.prop('checked', imageEditor.hasFilter(key));
    });
    $displayingSubMenu.hide();

    $displayingSubMenu = $imageFilterSubMenu.show();
});

$btnLoadMaskImage.on('change', function() {
    var file;
    var imgUrl;

    if (!supportingFileAPI) {
        alert('This browser does not support file-api');
    }

    file = event.target.files[0];

    if (file) {
        imgUrl = URL.createObjectURL(file);

        imageEditor.loadImageFromURL(imageEditor.toDataURL(), 'FilterImage').then(function() {
            imageEditor.addImageObject(imgUrl).then(function(objectProps) {
                URL.revokeObjectURL(file);
                console.log(objectProps);
            });
        });
    }
});

$btnApplyMask.on('click', function() {
    imageEditor.applyFilter('mask', {
        maskObjId: activeObjectId
    }).then(function(result) {
        console.log(result);
    });
});

$inputCheckGrayscale.on('change', function() {
    applyOrRemoveFilter(this.checked, 'Grayscale', null);
});

$inputCheckInvert.on('change', function() {
    applyOrRemoveFilter(this.checked, 'Invert', null);
});

$inputCheckSepia.on('change', function() {
    applyOrRemoveFilter(this.checked, 'Sepia', null);
});

$inputCheckSepia2.on('change', function() {
    applyOrRemoveFilter(this.checked, 'Sepia2', null);
});

$inputCheckBlur.on('change', function() {
    applyOrRemoveFilter(this.checked, 'Blur', null);
});

$inputCheckSharpen.on('change', function() {
    applyOrRemoveFilter(this.checked, 'Sharpen', null);
});

$inputCheckEmboss.on('change', function() {
    applyOrRemoveFilter(this.checked, 'Emboss', null);
});

$inputCheckRemoveWhite.on('change', function() {
    applyOrRemoveFilter(this.checked, 'removeWhite', {
        threshold: parseInt($inputRangeRemoveWhiteThreshold.val(), 10),
        distance: parseInt($inputRangeRemoveWhiteDistance.val(), 10)
    });
});

$inputRangeRemoveWhiteThreshold.on('change', function() {
    applyOrRemoveFilter($inputCheckRemoveWhite.is(':checked'), 'removeWhite', {
        threshold: parseInt(this.value, 10)
    });
});

$inputRangeRemoveWhiteDistance.on('change', function() {
    applyOrRemoveFilter($inputCheckRemoveWhite.is(':checked'), 'removeWhite', {
        distance: parseInt(this.value, 10)
    });
});

$inputCheckBrightness.on('change', function() {
    applyOrRemoveFilter(this.checked, 'brightness', {
        brightness: parseInt($inputRangeBrightnessValue.val(), 10)
    });
});

$inputRangeBrightnessValue.on('change', function() {
    applyOrRemoveFilter($inputCheckBrightness.is(':checked'), 'brightness', {
        brightness: parseInt(this.value, 10)
    });
});

$inputCheckNoise.on('change', function() {
    applyOrRemoveFilter(this.checked, 'noise', {
        noise: parseInt($inputRangeNoiseValue.val(), 10)
    });
});

$inputRangeNoiseValue.on('change', function() {
    applyOrRemoveFilter($inputCheckNoise.is(':checked'), 'noise', {
        noise: parseInt(this.value, 10)
    });
});

$inputCheckPixelate.on('change', function() {
    applyOrRemoveFilter(this.checked, 'pixelate', {
        blocksize: parseInt($inputRangePixelateValue.val(), 10)
    });
});

$inputRangePixelateValue.on('change', function() {
    applyOrRemoveFilter($inputCheckPixelate.is(':checked'), 'pixelate', {
        blocksize: parseInt(this.value, 10)
    });
});

$inputCheckTint.on('change', function() {
    applyOrRemoveFilter(this.checked, 'tint', {
        color: tintColorpicker.getColor(),
        opacity: parseFloat($inputRangeTintOpacityValue.val())
    });
});

tintColorpicker.on('selectColor', function(e) {
    applyOrRemoveFilter($inputCheckTint.is(':checked'), 'tint', {
        color: e.color
    });
});

$inputRangeTintOpacityValue.on('change', function() {
    applyOrRemoveFilter($inputCheckTint.is(':checked'), 'tint', {
        opacity: parseFloat($inputRangeTintOpacityValue.val())
    });
});

$inputCheckMultiply.on('change', function() {
    applyOrRemoveFilter(this.checked, 'multiply', {
        color: multiplyColorpicker.getColor()
    });
});

multiplyColorpicker.on('selectColor', function(e) {
    applyOrRemoveFilter($inputCheckMultiply.is(':checked'), 'multiply', {
        color: e.color
    });
});

$inputCheckBlend.on('change', function() {
    applyOrRemoveFilter(this.checked, 'blend', {
        color: blendColorpicker.getColor(),
        mode: $selectBlendType.val()
    });
});

blendColorpicker.on('selectColor', function(e) {
    applyOrRemoveFilter($inputCheckBlend.is(':checked'), 'blend', {
        color: e.color
    });
});

$selectBlendType.on('change', function() {
    applyOrRemoveFilter($inputCheckBlend.is(':checked'), 'blend', {
        mode: this.value
    });
});

$inputCheckColorFilter.on('change', function() {
    applyOrRemoveFilter(this.checked, 'colorFilter', {
        color: '#FFFFFF',
        threshold: $inputRangeColorFilterValue.val()
    });
});

$inputRangeColorFilterValue.on('change', function() {
    applyOrRemoveFilter($inputCheckColorFilter.is(':checked'), 'colorFilter', {
        threshold: this.value
    });
});

// Etc..

// Load sample image
imageEditor.loadImageFromURL('img/upload.png', 'SampleImage').then(function(sizeValue) {
    console.log(sizeValue);
    imageEditor.clearUndoStack();
});

// IE9 Unselectable
$('.menu').on('selectstart', function() {
    return false;
});


iconColorpicker.on('selectColor', function(event) {
  imageEditor.changeIconColor(activeObjectId, event.color);
});

// masks
var $btnAddSantaMask = $('#btn-add-santa-mask');
var $btnAddNoseMask = $('#btn-add-nose-mask');
var $btnAddSnowmanMask = $('#btn-add-snowman-mask');
var $btnAddTreeMask = $('#btn-add-tree-mask');

// characters
var $btnAddSantamanMask = $('#btn-add-santaman-mask');
var $btnAddSnowmanfullMask = $('#btn-add-snowmanfull-mask');
var $btnAddBearMask = $('#btn-add-bear-mask');
var $btnAddDeerMask = $('#btn-add-deer-mask');

// subjects
var $btnAddBellMask = $('#btn-add-bell-mask');
var $btnAddFlagsMask = $('#btn-add-flags-mask');
var $btnAddGiftMask = $('#btn-add-gift-mask');
var $btnAddCrhisttreeMask = $('#btn-add-crhisttree-mask');

// elements
var $btnAddScarfMask = $('#btn-add-scarf-mask');
var $btnAddTextMask = $('#btn-add-text-mask');
var $btnAddBezelMask = $('#btn-add-bezel-mask');
var $btnAddSnowflakeMask = $('#btn-add-snowflake-mask');


// masks
$btnAddSantaMask.on('click', function() {
  imageEditor.addImageObject('./img/masks-pro/santa.svg');
});
$btnAddNoseMask.on('click', function() {
  imageEditor.addImageObject('./img/masks-pro/nose.svg');
});
$btnAddSnowmanMask.on('click', function() {
  imageEditor.addImageObject('./img/masks-pro/snowman.svg');
});
$btnAddTreeMask.on('click', function() {
  imageEditor.addImageObject('./img/masks-pro/tree.svg');
});

// characters
$btnAddSantamanMask.on('click', function() {
  imageEditor.addImageObject('./img/characters-pro/santaman.svg');
});
$btnAddSnowmanfullMask.on('click', function() {
  imageEditor.addImageObject('./img/characters-pro/snowmanfull.svg');
});
$btnAddBearMask.on('click', function() {
  imageEditor.addImageObject('./img/characters-pro/bear.svg');
});
$btnAddDeerMask.on('click', function() {
  imageEditor.addImageObject('./img/characters-pro/deer.svg');
});

// subjects
$btnAddBellMask.on('click', function() {
  imageEditor.addImageObject('./img/subjects-pro/bell.svg');
});
$btnAddFlagsMask.on('click', function() {
  imageEditor.addImageObject('./img/subjects-pro/flags.svg');
});
$btnAddGiftMask.on('click', function() {
  imageEditor.addImageObject('./img/subjects-pro/gift.svg');
});
$btnAddCrhisttreeMask.on('click', function() {
  imageEditor.addImageObject('./img/subjects-pro/crhisttree.svg');
});

// elements
$btnAddScarfMask.on('click', function() {
  imageEditor.addImageObject('./img/elements-pro/scarf.svg');
});
$btnAddTextMask.on('click', function() {
  imageEditor.addImageObject('./img/elements-pro/text.svg');
});
$btnAddBezelMask.on('click', function() {
  imageEditor.addImageObject('./img/elements-pro/bezel.svg');
});
$btnAddSnowflakeMask.on('click', function() {
  imageEditor.addImageObject('./img/elements-pro/snowflake.svg');
});



// Custom fields
var $startBtn = $('.preview__btn');
var $mainTuiCanva = $('.tui-image-editor');
var $preview = $('.preview');
var $mainUpload = $('.main__upload');


// Custom js
$startBtn.on('click', () => {
  $preview.removeClass('active');
  $preview.hide();
  $mainTuiCanva.addClass('active');
  $mainTuiCanva.removeClass('hide');
  $mainUpload.removeClass('hide');
});

$('.main__upload').on('click', () => {
  $('.main__upload').addClass('hide');
  $('.add-happy').removeClass('hide');
  $('.aside').removeClass('hide');
  if ($mainTuiCanva.hasClass('active')){
    $('.menu-item, .add-happy__aside-btn').removeClass('disabled');
    $('.undo').addClass('disabled');
    $('.redo').addClass('disabled');
  }
});

$('.add-happy__masks').hide();
$('.add-happy__aside-btn').hide();

$('.add-happy__btn').each(function(){
  $(this).on('click', () => {
    $('.add-happy__masks').show();
    $('.big-happy').hide();
    $('#crop-sub-menu').hide();
    $('#image-filter-sub-menu').hide();
    $('#text-sub-menu').hide();
    $('#btn-cancel-crop').click();
    $('.footer-text').attr('src', '/img/icons/text.svg');
    $('.footer-filter').attr('src', '/img/icons/filters.svg');
    $('.footer-crop').attr('src', '/img/icons/crop_rotate.svg');
  });
})

$('.add-happy__masks-list').each(function() {
  $(this).hide();
})

$('#masks-mask').show();

$('#masks').on('click', () => {
  $('.add-happy__masks-menu').children('li').each(function() {
    $(this).removeClass('active-mask');
  });
  $('#masks').addClass('active-mask');
  $('.add-happy__masks-list').each(function() {
    $(this).hide();
  })
  $('#masks-mask').show();
});

$('#characters').on('click', () => {
  $('.add-happy__masks-menu').children('li').each(function() {
    $(this).removeClass('active-mask');
  });
  $('#characters').addClass('active-mask');
  $('.add-happy__masks-list').each(function() {
    $(this).hide();
  })
  $('#characters-mask').show();
});

$('#subjects').on('click', () => {
  $('.add-happy__masks-menu').children('li').each(function() {
    $(this).removeClass('active-mask');
  });
  $('#subjects').addClass('active-mask');
  $('.add-happy__masks-list').each(function() {
    $(this).hide();
  })
  $('#subjects-mask').show();
});

$('#elements').on('click', () => {
  $('.add-happy__masks-menu').children('li').each(function() {
    $(this).removeClass('active-mask');
  });
  $('#elements').addClass('active-mask');
  $('.add-happy__masks-list').each(function() {
    $(this).hide();
  })
  $('#elements-mask').show();
});

$('.btn-crop').each(function(){
  $(this).on('click',() => {
    $('.add-happy__btn').hide();
    $('.add-happy__aside-btn').show();
    $('.add-happy__masks').hide();
    $('.mobile-happy__img').addClass('hide');
  });
});

$('#btn-image-filter').on('click', () => {
  $('.add-happy__btn').hide();
  $('.add-happy__aside-btn').show();
  $('.add-happy__masks').hide();
  $('.mobile-happy__img').addClass('hide');
});

$('#btn-text').on('click', () => {
  $('.add-happy__btn').hide();
  $('.add-happy__aside-btn').show();
  $('.add-happy__masks').hide();
  $('.mobile-happy__img').addClass('hide');
});


$('.btn-text-family').hide();

$('.btn-text-family').each(function(){
  $(this).on('click', function() {
    $('.btn-text-family').removeClass('active-family');
    $(this).addClass('active-family');
    $('.btn-text-fam').html($('.active-family').text());
    $('.btn-text-fam').removeClass('pac mon pla lob beb')
    $('.btn-text-fam').addClass($('.active-family').attr('data-style-type'));
  })
});

$('.text__family-dropdown').hover(function() {
  $('.btn-text-family').show();
},function() {
  $('.btn-text-family').hide();
})



$('.footer-crop').on('click', function() {
  $(this).attr('src', '/img/icons/active/crop_rotate.svg');
  $('.footer-filter').attr('src', '/img/icons/filters.svg');
  $('.footer-text').attr('src', '/img/icons/text.svg');
})

$('.footer-filter').on('click', function() {
  $(this).attr('src', '/img/icons/active/filters.svg');
  $('.footer-crop').attr('src', '/img/icons/crop_rotate.svg');
  $('.footer-text').attr('src', '/img/icons/text.svg');
})

$('.footer-text').on('click', function() {
  $(this).attr('src', '/img/icons/active/text.svg');
  $('.footer-filter').attr('src', '/img/icons/filters.svg');
  $('.footer-crop').attr('src', '/img/icons/crop_rotate.svg');
})


$('.text__family-mobile').hide();