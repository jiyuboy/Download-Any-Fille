const fileInput = document.querySelector("input"),
  downloadBtn = document.querySelector("button");

downloadBtn.addEventListener("click", (e) => {
  e.preventDefault(); // preventing form from submitting
  downloadBtn.innerText = "Downloading file...";
  fetchFile(fileInput.value);
});

function fetchFile(url) {
  // fetching file & returning response as blob
  fetch(url)
    .then((res) => res.blob())
    .then((file) => {
      // URL.createObjURL creates a url of passed object
      let tempUrl = URL.createObjectURL(file);
      let aTag = document.createElement("a");
      aTag.href = tempUrl; // passing tempURL as href value of <a> tag
      // passing file last name & extension as download value of <a> tag
      aTag.download = url.replace(/^.*[\\\/]/, ``);
      document.body.appendChild(aTag); // adding <a> tag inside body
      aTag.click(); // clicking <a> tag so the file download
      aTag.remove(); // removing <a> tag once file downloaded
      URL.revokeObjectURL(tempUrl); // removing tempURL from the document
      downloadBtn.innerText = "Downloading file...";
      downloadBtn.style.background = "#eee";
      downloadBtn.style.color = "#00c49a";
      downloadBtn.innerText = "File downloaded succefully";
      setTimeout(() => {
        fileInput.value = "";
        downloadBtn.innerText = "Download File";
        downloadBtn.style.background = "#00c49a";
        downloadBtn.style.color = "#eee";
      }, 3000);
    })
    .catch(() => {
      // catch will call if any error comes during downloading
      downloadBtn.innerText = "Download file";
      alert("This file is private, we can't access to it");
      fileInput.value = "";
    });
}
