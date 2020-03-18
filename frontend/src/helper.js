const validYouTubeUrl = (url) => {
  if (url !== undefined || url !== '') {
    // eslint-disable-next-line no-useless-escape
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      // change to embedded
      this.currentMediaUrl = `https://www.youtube.com/embed/${match[2]}`;
      const youtubeEmbedded = `https://www.youtube.com/embed/${match[2]}`;
      return [true, youtubeEmbedded];
    }
  }
  return false;
};

const getMediaType = (url) => {
  let newUrl = url;
  let type = 'invalid media URL';
  const isYoutubeUrl = validYouTubeUrl(url);
  if (isYoutubeUrl[0]) {
    // eslint-disable-next-line prefer-destructuring
    newUrl = isYoutubeUrl[1];
    type = 'youtube';
  } else {
    // eslint-disable-next-line no-useless-escape
    const extension = url.split(/\#|\?/)[0].split('.').pop().trim().toLowerCase();
    if (extension === 'jpg' || extension === 'png' || extension === 'jpeg' || extension === 'tiff' || extension === 'gif' || extension === 'webp') {
      type = 'image';
    } else if (extension === 'mp4' || extension === 'webm') {
      type = 'video';
    }
  }
  return [newUrl, type];
};

module.exports = { getMediaType };
