
function tomins (time) {
  let minutes = Math.floor(time / 60)
  let seconds = time - minutes * 60
  let result = [minutes,seconds]
  return result
}
module.exports = tomins
