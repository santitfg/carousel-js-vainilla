const carousel = (insertIn, ...imgPaths) => {
  const insert = document.querySelector(insertIn);
  const divWrarpper = document.createElement("div");
  // const divCarousel = document.createElement("carousel");
  divWrarpper.classList.add("carousel-wrapers");
  const DivBtnR = document.createElement("div");
  const DivBtnL = document.createElement("div");
  DivBtnR.innerHTML = "»";
  DivBtnR.setAttribute("id", "myBtnR");
  DivBtnR.classList.add("btn-carousel");
  DivBtnR.setAttribute("type", "button");
  DivBtnL.innerHTML = "«";
  DivBtnL.setAttribute("id", "myBtnL");
  DivBtnL.classList.add("btn-carousel");
  DivBtnL.setAttribute("type", "button");

  const listaIdsImg = ["img-left", "img-center", "img-right"];

  var punteros = [imgPaths.length - 1, 0, 1];
  var direccion = null;
  var cambioImgCentro = null;
  const actualizarImgByID = (id, img_) => {
    const imageRef = document.getElementById(id);
    imageRef.setAttribute("src", img_);
    imageRef.setAttribute("alt", img_);
    // imageRef.style.transform = "translate(100px)";
  };

  //tres punteros, para la izquierda centro y derecha;
  const funcionBtn = (e) => {
    e.target.prevent;
    // console.log(e.target.id);
    // console.log(punteros);
    //Generar una transicion de opacidad desplazamiento y luego cambio?
    // [ a b c d e ] (0 1 2)[b,c,d]  | (1 2 3)[b to c, c to d , d to e]
    // o pensar en 0 1 2 abc => 120 bcd img actual derecha e izq y solo necesito 2 img pero 3 precargadas?

    if (e.target.id === "myBtnL") {
      console.log("izq");
      direccion = false;
      punteros.forEach((e, i) => {
        punteros[i] -= 1;
      });
    }
    if (e.target.id === "myBtnR") {
      console.log("der");
      direccion = true;
      punteros.forEach((e, i) => {
        punteros[i] += 1;
      });
    }

    //puesta en bucle la lista
    punteros.forEach((e, i) => {
      if (e > imgPaths.length - 1) punteros[i] = 0;
      if (e < 0) punteros[i] = imgPaths.length - 1;
    });

    listaIdsImg.map((id, index) => {
      /*  if (direccion) {
        if (index < 2) {
          document.getElementById(id).style.transform = "translate(100px)";
          // document.getElementById(id).style.opacity = "100";
        }
      } else {
        if (index > 0) {
          document.getElementById(id).style.transform = "translate(-100px)";
          // document.getElementById(id).style.opacity = "100";
        }
      }
       */
      // if (index == 1) document.getElementById(id).style.opacity = "0";
      if (index !== 1) {
        actualizarImgByID(id, imgPaths[punteros[index]]);
      } // if (direccion)
      //   document.getElementById(id).style.transform = "translate(100px)";
      // else document.getElementById(id).style.transform = "translate(-100px)";
    });
    clearTimeout(cambioImgCentro);

    cambioImgCentro = setTimeout(() => {
      actualizarImgByID("img-center", imgPaths[punteros[1]]);
    }, 20000);
  };
  // creacion de los elementos de carrusel
  DivBtnR.addEventListener("click", funcionBtn);
  DivBtnL.addEventListener("click", funcionBtn);

  // divWrarpper.style.transform = "translate(100px)";

  listaIdsImg.map((id, index) => {
    const div = document.createElement("div");
    const img = document.createElement("img");
    img.setAttribute("id", id);
    img.setAttribute("src", imgPaths[punteros[index]]);
    img.setAttribute("alt", imgPaths[punteros[index]]);
    img.classList.add("image");
    div.appendChild(img);
    // divCarousel.appendChild(div);
    divWrarpper.appendChild(div);
  });

  // divWrarpper.appendChild(divCarousel);

  divWrarpper.appendChild(DivBtnR);
  divWrarpper.appendChild(DivBtnL);
  insert.appendChild(divWrarpper);
};

export { carousel };
