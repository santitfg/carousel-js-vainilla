const carousel = (insertIn, ...imgPaths) => {
  /*
cambios a seguir, modificar los ids por clases y que la funcion carousel reciba el id de su padre
limpiar las multiples llamadas al dom 
y minimizarlas solamente llamando al componente padre extrasyendo los elementos con clases desde la funcion btn
*/

  const insert = document.querySelector(insertIn);
  const divWrarpper = document.createElement("div");
  const divCarousel = document.createElement("carousel");
  divWrarpper.classList.add("carousel-wrapper");
  divCarousel.classList.add("carousel-container");

  const divBtnR = document.createElement("div");
  const divBtnL = document.createElement("div");

  divBtnR.innerHTML = "»";
  divBtnR.setAttribute("id", "myBtnR");
  divBtnR.classList.add("btn-carousel");
  divBtnR.setAttribute("type", "button");
  divBtnL.innerHTML = "«";
  divBtnL.setAttribute("id", "myBtnL");
  divBtnL.classList.add("btn-carousel");
  divBtnL.setAttribute("type", "button");

  const listaIdsImg = ["img-left", "img-center", "img-right"];

  var pointers = [imgPaths.length - 1, 0, 1];
  var direccion = null;
  var timeRunning = null;
  var chageImg = null;

  const actualizarImgByID = (id, img_) => {
    //quizas directamente utilizar una referencia global y pasarla a la func
    const imageRef = document.getElementById(id);
    imageRef.setAttribute("src", img_);
    imageRef.setAttribute("alt", img_);
    // imageRef.style.transform = "translate(100px)";
  };

  const delayChangeImg = () => {
    timeRunning = true;
    chageImg = setTimeout(() => {
      actualizarImgByID("img-left", imgPaths[pointers[0]]);
      actualizarImgByID("img-center", imgPaths[pointers[1]]);
      actualizarImgByID("img-right", imgPaths[pointers[2]]);
      timeRunning = false;
    }, 2000);
    // chageImg = setTimeout(() => {
    //   actualizarImgByID("img-left", imgPaths[pointers[0]]);
    //   // actualizarImgByID("img-center", imgPaths[pointers[1]]);
    //   actualizarImgByID("img-right", imgPaths[pointers[2]]);
    //   timeRunning = false;
    // }, 2000);
  };
  //tres pointers, para la izquierda centro y derecha;
  const funcionBtn = (e) => {
    e.target.prevent;
    if (timeRunning) {
      clearTimeout(chageImg);
      //esto cambiarlo por una clase, asi si obtengo un wrarper desde id, todas las clase
      //var targetDiv = document.getElementById("foo").getElementsByClassName("bar");
      actualizarImgByID("img-left", imgPaths[pointers[0]]);
      actualizarImgByID("img-center", imgPaths[pointers[1]]);
      actualizarImgByID("img-right", imgPaths[pointers[2]]);
    }

    if (e.target.id === "myBtnL") {
      console.log("izq");
      direccion = false;
      pointers.forEach((e, i) => {
        pointers[i] -= 1;
      });
    }
    if (e.target.id === "myBtnR") {
      console.log("der");
      direccion = true;
      pointers.forEach((e, i) => {
        pointers[i] += 1;
      });
    }

    //puesta en bucle la lista
    pointers.forEach((e, i) => {
      if (e > imgPaths.length - 1) pointers[i] = 0;
      if (e < 0) pointers[i] = imgPaths.length - 1;
    });
    //creo que no hace falta este bucle simplemente por q con direccion y dos img se cumple la animacion

    // listaIdsImg.map((id, index) => {
    //   const image = document.getElementById(id);
    //   image.classList.remove("to-right", "to-left");
    //   void image.offsetWidth;
    //   if (direccion) {
    //     image.classList.add("to-left");
    //   } else {
    //     image.classList.add("to-right");
    //   }
    // });
    //esto hacerlo clase
    const imageR = document.getElementById("img-right");
    const imageL = document.getElementById("img-left");
    const imageC = document.getElementById("img-center");

    imageR.classList.remove("to-left");
    imageC.classList.remove("to-right", "to-left");
    imageL.classList.remove("to-right");
    void imageR.offsetWidth;
    void imageL.offsetWidth;
    void imageC.offsetWidth;
    if (direccion) {
      imageC.classList.add("to-left");
      imageR.classList.add("to-left");
    } else {
      imageC.classList.add("to-right");
      imageL.classList.add("to-right");
    }

    //funcion para seteo de las imgs luego de la animacion
    delayChangeImg();
  };

  // creacion de los elementos de carrusel
  divBtnR.addEventListener("click", funcionBtn);
  divBtnL.addEventListener("click", funcionBtn);

  listaIdsImg.map((id, index) => {
    const div = document.createElement("div");
    const img = document.createElement("img");
    img.setAttribute("id", id);
    img.setAttribute("src", imgPaths[pointers[index]]);
    img.setAttribute("alt", imgPaths[pointers[index]]);
    img.classList.add("image");
    div.appendChild(img);
    // divCarousel.appendChild(div);
    divCarousel.appendChild(div);
  });

  divWrarpper.appendChild(divCarousel);

  divWrarpper.appendChild(divBtnR);
  divWrarpper.appendChild(divBtnL);
  insert.appendChild(divWrarpper);
};

export { carousel };
