(function () {

  // config
  let config = {

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
    },

    init: function() {
      view.init();
    }
  };


  // view
  let view = {
    init: function() {
      let canvas = document.getElementById('canvas');
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
