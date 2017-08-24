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

      let span = document.createElement('span');
      span.innerText = 'CURRENT COLOR ->';
      palette.appendChild(span);

      let currentColor = document.createElement('div');
      currentColor.id = 'palette-current-color';
      palette.appendChild(currentColor);
    },

    init: function() {
      this.buildPixelGrid();
      this.buildPalette();

      let canvas = this.getCanvas();
      canvas.addEventListener('click', function(e) {
        controller.paintPixel(e.target);
      });

      let palette = document.getElementById('palette');
      palette.addEventListener('click', function(e) {
        controller.updateActiveColor(e.target.style.backgroundColor);
      });

    }
  };

  controller.init();
})()
