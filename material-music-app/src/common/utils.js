export function isUndef(v) {
  return v === undefined || v === null
}

export function isEmptyObj(v) {
  return Object.keys(v).length === 0
}

// 将base64转换为文件(兼容IOS和安卓)
export function base64toBlob(base64, filename = new Date().getTime() + ".jpg") {

  const blobToFile = (theBlob) => {
    theBlob.lastModifiedDate = new Date()
    theBlob.name = filename
    return theBlob
  }

  let arr = base64.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }

  const blob = new Blob([u8arr], { type: mime })
  return blobToFile(blob)
}

// 将base64转换为文件(不兼容IOS)
export function _base64toBlob(base64, filename = new Date().getTime() + ".jpg") {
  let arr = base64.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}