(function () {

  // config
  let config = {
    countPixels: 864,
    paletteColors: ["limegreen", "palegreen", "forestgreen","darkgreen", "yellow",
                    "khaki","coral","orange","orangered","firebrick","lightsalmon","lightpink",
                    "palevioletred","crimson","red","darkred","darkmagenta","purple","indigo",
                    "lavender","slateblue","darkblue","mediumblue","dodgerblue","powderblue",
                    "lightskyblue","cadetblue","lightcyan","white","grey","black","bisque",
                    "burlywood","tan","saddlebrown"
                  ]
  };

  // model
  let model = {
    brushColor: ''
  };


  // controller
  let controller = {
    getActiveColor: function() {
      return model.brushColor;
    },

    updateActiveColor: function(color) {
      if (color) {
        model.brushColor = color;
        document.getElementById('palette-current-color').style.backgroundColor = color;
      }
    },

    paintPixel: function(pixel) {
      pixel.style.backgroundColor = this.getActiveColor();
      pixel.style.borderColor = this.getActiveColor();
    },

    // resets to the default colors of the pixels
    resetPixel: function(pixel) {
      pixel.style.backgroundColor = 'white';
      pixel.style.borderColor = 'gainsboro';
    },

    // to track when combining mousedown and mouseover events
    mouseDown: false,

    init: function() {
      view.init();
    }
  };


  // view
  let view = {
    getCanvas: function() {
      return document.getElementById('canvas');
    },

    buildPixelGrid: function() {
      let canvas = this.getCanvas();

      for (var i = 0; i < config.countPixels; i++) {
        let pixelDiv = document.createElement('div');
        pixelDiv.classList.add("pixel");
        canvas.appendChild(pixelDiv);
      }
    },

    buildPalette: function() {
      let palette = document.getElementById('palette');
      let colors = config.paletteColors;
      colors.forEach(function(color) {
        let colorSwatch = document.createElement('div');
        colorSwatch.className = 'palette-color';
        colorSwatch.style.backgroundColor = color;
        palette.appendChild(colorSwatch);
      });

      let userSelect = document.createElement('input');
      userSelect.className = 'palette-color';
      userSelect.type = 'color';
      palette.appendChild(userSelect);

      let span = document.createElement('span');
      span.innerText = 'CURRENT COLOR ->';
      palette.appendChild(span);

      let currentColor = document.createElement('div');
      currentColor.id = 'palette-current-color';
      palette.appendChild(currentColor);
    },

    addListeners: function() {
      let canvas = this.getCanvas();

      canvas.addEventListener('mousedown', function(e) {
        controller.mouseDown = true;
        // reset to default if the pixel is already the active color
        // OR paint that pixel if it is a different color
        if (e.target.style.backgroundColor === controller.getActiveColor()) {
          controller.resetPixel(e.target);
        } else {
          controller.paintPixel(e.target);
        }
      });

      canvas.addEventListener('mouseup', function(e) {
        controller.mouseDown = false;
      });

      canvas.addEventListener('mouseover', function(e) {
        if (controller.mouseDown) {
          controller.paintPixel(e.target);
        }
      });


      let palette = document.getElementById('palette');
      palette.addEventListener('click', function(e) {
        controller.updateActiveColor(e.target.style.backgroundColor);
      });

      palette.addEventListener('input', function(e) {
        controller.updateActiveColor(e.target.value);
      });
    },

    init: function() {
      this.buildPixelGrid();
      this.buildPalette();
      this.addListeners();
    }
  };

  controller.init();
})()
