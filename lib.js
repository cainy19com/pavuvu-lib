// 
Object.prototype.getKeyByValue = function (value) {
  for (const key in this)
    if (this[key] === value)
      return key
  return null
}


// 
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const LOG = console.log.bind(console)


const QS = (se, el = document) => el.querySelector(se)
const QSA = (se, el = document) => el.querySelectorAll(se)


// 
const GV = {} // Global variables
const GF = {} // Global functions
const GC = {} // Global classes


// 
GF.range = n => {
  return [...Array(n).keys()]
}


GF.fetch = (api_url, json_data) => {
  return fetch(api_url, {
    method: "POST",
    body: JSON.stringify(json_data),
  }).then(res => {
    if (res.status === 200)
      return res.json()
    else
      return { code: 1, msg: res.statusText }
  })
}


GF.get_search_param = key => {
  // Get single search param by key
  return new URL(window.location.href).searchParams.get(key)
}


GF.set_theme_color = color => {
  $(`meta[name="theme-color"]`).content = color
}


GF.is_iphone = () => {
  return /iphone/i.test(window.navigator.userAgent)
}


GF.b_to_kb = (bytes, round) => {
  // File size should be >= original after conversion & rounding
  // Note that "toFixed" returns string
  // ret: num
  const kb = bytes / 1024
  const ro = parseFloat(kb.toFixed(round))
  if (ro >= kb)
    return ro
  else
    return parseFloat((ro + 1 / 10 ** round).toFixed(round))
}


GF.b_to_mb = (bytes, round) => {
  const mb = bytes / 1048576
  const ro = parseFloat(mb.toFixed(round))
  if (ro >= mb)
    return ro
  else
    return parseFloat((ro + 1 / 10 ** round).toFixed(round))
}


GF.tap_highlight = async ({
  el = null,
  color = "#eee",
  duration = 50,
  zIndex = -1 } = {}) => {
  /*
  For cases when z-index doesn't work,
  el has to use an inner span with position relative
  */

  // 
  const rect = el.getBoundingClientRect()

  // 
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")

  // 
  canvas.width = rect.width
  canvas.height = rect.height

  canvas.style.position = "absolute"
  canvas.style.top = 0
  canvas.style.left = 0
  canvas.style.zIndex = zIndex

  // 
  ctx.fillStyle = color
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Requires el position not static
  el.style.position = "relative" // TODO
  el.prepend(canvas)

  // 
  await new Promise((res, rej) => {
    setTimeout(() => {
      // DOM update may be async, f like "alert" will pause the rm
      canvas.remove()
      setTimeout(() => res(), 10)
    }, duration)
  })
}


GF.update_search_params = pairs => {
  /*
  input: a list of key-value pairs, [["", ""], [], ...]
  */
  const url = new URL(window.location.href)

  pairs.forEach(pair => {
    url.searchParams.set(...pair)
  })

  history.pushState(null, "", url)
  window.dispatchEvent(new Event("popstate")) // TODO
}

