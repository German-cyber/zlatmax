export function imagesWrapper() {
  const images = document.querySelectorAll("img");
  const formats = ["avif", "webp"];

  images.forEach((imges) => {
    let checkSvg = imges.dataset.src;
    if (checkSvg) {
      // путь к изображению без расширения
      let path = imges.dataset.src.slice(0, imges.dataset.src.indexOf("."));

      // расширения изображения
      let exten = imges.dataset.src.slice(imges.dataset.src.indexOf(".") + 1); // +1 чтоб не учитывать точку (.png => png)

      // добавление атрибута загрузки
      imges.loading = "lazy";

      // составляем  путь
      imges.src = `${path}-3x.${exten}`;

      // создаем picture
      const picture = document.createElement("picture");

      let imageFormats = [...formats, exten]; // форматы которые нужны для данного изображения

      // массив уникальных элементов (чтоб расширения файлов не повторялись)
      let imageFormatsUniq = [...new Set(imageFormats)];

      // создаем source (изображения формата 3x)
      for (let i = 0; i < imageFormatsUniq.length; i++)
        createSourceMedia3X(picture, path, imageFormatsUniq[i]);

      // создаем source (изображения формата 2x)
      for (let i = 0; i < imageFormatsUniq.length; i++)
        createSource2X(picture, path, imageFormatsUniq[i]);

      // создаем source (изображения формата 1x - они используются по умолчанию)
      for (let i = 0; i < imageFormatsUniq.length; i++)
        createSourceMedia1X(picture, path, imageFormatsUniq[i]);

      // создаем обертку picture > img
      picture.appendChild(imges.cloneNode(true));
      imges.parentNode.replaceChild(picture, imges);
    }
  });

  // функция создания soure (для картинок 3x - срабатывает при ширине больше чем 1500px)
  function createSourceMedia3X(picture, path, format) {
    const source = document.createElement("source");
    source.type = `image/${format}`;
    source.srcset = `${path}-3x.${format}`;
    source.media = "(min-width: 1500px)";
    picture.appendChild(source);
  }

  // функция создания soure (для картинок 2x - срабатывает при ширине больше чем 500px)
  function createSource2X(picture, path, format) {
    const source = document.createElement("source");
    source.type = `image/${format}`;
    source.srcset = `${path}-2x.${format}`;
    source.media = "(min-width: 500px)";
    picture.appendChild(source);
  }

  // функция создания soure (для картинок 1x - срабатывает при ширине меньше чем 500px)
  function createSourceMedia1X(picture, path, format) {
    const source = document.createElement("source");
    source.type = `image/${format}`;
    source.srcset = `${path}.${format}`;
    picture.appendChild(source);
  }

  // медиа выражения для проверки ширины экрана
  const mediaQueryMin = window.matchMedia("(max-width: 500px)");
  const mediaQuery = window.matchMedia(
    "(min-width: 500px) and (max-width: 1500px)"
  );
  const mediaQueryMax = window.matchMedia("(min-width: 1500px)");

  // если ширина экрана попадает под определеный медиа запрос то вызываем examinationImg
  function handleTabletChange(e) {
    if (e.matches) {
      examinationImg();
    }
  }

  function examinationImg() {
    const imges = document.querySelectorAll("img"); // получаем все картинки
    imges.forEach((img) => {
      img.onload = function () {
        //display ok
      };
      img.onerror = function () {
        const currentPath = img.attributes.src.ownerElement.currentSrc; // получаем путь картинке которая вызвала ошибку
        let start = currentPath.indexOf("img/");
        let path = currentPath.slice(start);
        const source = document.querySelector(`source[srcset='${path}']`);
        if (source) document.querySelector(`source[srcset='${path}']`).remove();
      };
    });
  }

  // вызов медиа-запросов
  mediaQueryMin.addListener(handleTabletChange);
  mediaQuery.addListener(handleTabletChange);
  mediaQueryMax.addListener(handleTabletChange);
  handleTabletChange(mediaQueryMin); // вызываем функцию первоночально
  handleTabletChange(mediaQuery); // вызываем функцию первоночально
  handleTabletChange(mediaQueryMax); // вызываем функцию первоночально
}