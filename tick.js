let counter = 1;
const tick = () => {
    setTimeout(() => {
        console.log(`Tick ${counter}`)
        counter++
        if (counter <= 15) {
            tick()
        }
    }, 1000)
}

module.exports = {
    tick
}