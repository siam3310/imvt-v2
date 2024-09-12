const download = (filename: string, content: string) => {
  var element = document.createElement('a');
  element.setAttribute('href', content);
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
};

export const handleDownload = async (imageUrl: string, imageName: string) => {
  try {
    const result = await fetch(imageUrl, {
      method: 'GET',
      headers: {},
    });
    const blob = await result.blob();
    const url = URL.createObjectURL(blob);
    download(imageName, url);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error(error);
  }
};
