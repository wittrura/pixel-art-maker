(function () {

  // config
  let config = {
    countPixels: 100
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
        document.getElementById('pallete-current-color').style.backgroundColor = color;
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
      let canvas = this.getCanvas()

      for (var i = 0; i < config.countPixels; i++) {
        let pixelDiv = document.createElement('div');
        pixelDiv.classList.add("pixel");
        canvas.appendChild(pixelDiv);
      }
    },


    init: function() {
      this.buildPixelGrid();

      let canvas = this.getCanvas();
      canvas.addEventListener('click', function(e) {
        controller.paintPixel(e.target);
      });

      let pallete = document.getElementById('pallete');
      pallete.addEventListener('click', function(e) {
        controller.updateActiveColor(e.target.dataset.color);
      });

    }
  };

  controller.init();
})()
