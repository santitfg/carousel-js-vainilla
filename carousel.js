const carousel = (insertIn, ...imgPaths) => {
  const insert = document.querySelector(insertIn);
  const divWrarpper = document.createElement("div");
  const divCarousel = document.createElement("carousel");

  const DivBtnR = document.createElement("div");
  const DivBtnL = document.createElement("div");
  DivBtnR.innerHTML = "»";
  DivBtnR.setAttribute("id", "myBtnR");
  DivBtnR.classList.add("btn");
  DivBtnR.setAttribute("type", "button");
  DivBtnL.innerHTML = "«";
  DivBtnL.setAttribute("id", "myBtnL");
  DivBtnL.classList.add("btn");
  DivBtnL.setAttribute("type", "button");

  const listaIdsImg = ["img-left", "img-center", "img-right"];

  var punteros = [imgPaths.length - 1, 0, 1];

  const actualizarImgByID = (id, img_) => {
    const imageRef = document.getElementById(id);
    imageRef.setAttribute("src", img_);
    imageRef.setAttribute("alt", img_);
  };

  //tres punteros, para la izquierda centro y derecha;
  const funcionBtn = (e) => {
    e.target.prevent;
    // console.log(e.target.id);
    // console.log(punteros);
    if (e.target.id === "myBtnL") {
      console.log("izq");
      punteros.forEach((e, i) => {
        punteros[i] -= 1;
      });
    }
    if (e.target.id === "myBtnR") {
      console.log("der");
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
      actualizarImgByID(id, imgPaths[punteros[index]]);
    });
  };

  // creacion de los elementos de carrusel
  DivBtnR.addEventListener("click", funcionBtn);
  DivBtnL.addEventListener("click", funcionBtn);

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
