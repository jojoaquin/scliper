import { JSDOM } from "jsdom";

// (async () => {
//   const getTextContent = async () => {
//     const result = [];
//     for (let j = 0; j < 14; j++) {
//       const response = await fetch(
//         `https://projects.co.id/public/browse_projects/listing?page=${j}`
//       );
//       const html = await response.text();

//       const dom = new JSDOM(html);

//       const length = dom.window.document.getElementsByClassName(
//         "col-md-10 align-left"
//       ).length;

//       for (let i = 0; i < length; i++) {
//         const content = dom.window.document
//           .getElementsByClassName("col-md-10 align-left")
//           .item(i);
//         const judul = content.querySelector("h2");
//         const desc = content.querySelector("p");

//         result.push({
//           title: judul.textContent,
//           description: desc.textContent,
//         });

//         // console.log(`Judul: ${judul.textContent}`);
//         // console.log(`Deskripsi: ${desc.textContent}`);
//       }
//     }
//     return result;
//   };

//   const hasil = await getTextContent();
//   for (let i = 0; i < hasil.length; i++) {
//     console.log(`no: ${i} ${JSON.stringify(hasil[i])}`);
//   }
//   console.log(hasil.length);
// })();

// (async () => {
//   const getTextContent = async () => {
//     const result = [];
//     const response = await fetch(
//       `https://www.webscraper.io/test-sites?utm_source=extension&utm_medium=popup`
//     );
//     const html = await response.text();

//     const dom = new JSDOM(html);

//     const length =
//       dom.window.document.getElementsByClassName("row test-site").length;
//     console.log(length);

//     for (let i = 0; i < length; i++) {
//       const content = dom.window.document
//         .getElementsByClassName("row test-site")
//         .item(i);
//       const judul = content.querySelector("a");
//       const desc = content.querySelector("p");

//       result.push({
//         title: judul.textContent,
//         description: desc.textContent,
//       });
//     }

//     return result;
//   };

//   const hasil = await getTextContent();
//   for (let i = 0; i < hasil.length; i++) {
//     const title = hasil[i].title.replaceAll("\n", "").replaceAll("\t", "");
//     console.log(`no: ${i} ${title}`);
//   }
//   console.log(hasil.length);
// })();

// (async () => {
//   const getTextContent = async () => {
//     const result = [];
//     for (let j = 0; j < 216; j++) {
//       const response = await fetch(
//         `https://komikcast.cafe/daftar-komik/page/${j}`
//       );
//       const html = await response.text();
//       const res = await response.statusText;

//       const dom = new JSDOM(html);

//       const length =
//         dom.window.document.getElementsByClassName("post-item").length;
//       console.log(length);

//       for (let i = 0; i < length; i++) {
//         const content = dom.window.document
//           .getElementsByClassName("post-item-box")
//           .item(i);
//         const judul = content.querySelector("h4");
//         const image = content.querySelector("img").getAttribute("src");

//         result.push({
//           title: judul.textContent,
//           imageSrc: image,
//         });
//       }

//       return result;
//     }
//   };

//   const hasil = await getTextContent();
//   for (let i = 0; i < hasil.length; i++) {
//     const title = hasil[i].title.replaceAll("\n", "").replaceAll("\t", "");
//     const image = hasil[i].imageSrc.replaceAll("\n", "").replaceAll("\t", "");
//     console.log(`no: ${i} ${title} - ${image}`);
//   }
//   console.log(hasil.length);
// })();

(async () => {
  const totalPages = 3; // Jumlah halaman yang akan diambil
  const result = [];

  const updateProgress = (progress) => {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`Loading: ${progress}%`);
  };

  const getTextContent = async () => {
    for (let j = 1; j <= totalPages; j++) {
      // Mengubah mulai dari halaman 1
      const response = await fetch(
        `https://komikcast.cafe/daftar-komik/page/${j}`
      );
      const html = await response.text();

      const dom = new JSDOM(html);

      const elements =
        dom.window.document.getElementsByClassName("post-item-box");
      const length = elements.length;

      for (let i = 0; i < length; i++) {
        const content = elements.item(i);
        const judul = content.querySelector("h4");
        const image = content.querySelector("img").getAttribute("src");

        result.push({
          title: judul.textContent.trim(),
          imageSrc: image,
        });
      }

      const progress = Math.ceil((j / totalPages) * 100); // Hitung persentase progress
      updateProgress(progress);
    }
    process.stdout.write("\n"); // Tambahkan baris baru setelah selesai loading
    return result;
  };

  const hasil = await getTextContent();
  for (let i = 0; i < hasil.length; i++) {
    const title = hasil[i].title.replaceAll("\n", "").replaceAll("\t", "");
    const image = hasil[i].imageSrc.replaceAll("\n", "").replaceAll("\t", "");
    console.log(`no: ${i + 1} ${title} - ${image}`);
  }
  console.log(`Total items: ${hasil.length}`);
})();
