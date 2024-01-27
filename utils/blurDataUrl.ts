

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#202020" offset="20%" />
      <stop stop-color="#444" offset="50%" />
      <stop stop-color="#202020" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#202020" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export const shimmerBlurDataUrl = (w: number, h: number) =>
  `svg+xml;base64,${toBase64(shimmer(w, h))}`;

export const blurDataUrl = "data:image/jpeg;base64,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"