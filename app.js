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
      let pixels = document.getElementsByClassName('pixel');

      for (var i = 0; i < pixels.length; i++) {
        pixels[i].addEventListener('click', function() {
          controller.paintPixel(this);
          // this.setAttribute("style", "background-color:red;");
        });
      }

      let pallete = document.getElementById('pallete');
      pallete.addEventListener('click', function(e) {
        controller.updateActiveColor(e.target.dataset.color);
      });


    }
  };

  controller.init();
})()
