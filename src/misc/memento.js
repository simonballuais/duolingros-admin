export default function () {
    let history = [];

    let memento = {
        addState(state) {
            const newState = JSON.stringify(state)
            window.console.log('Saving', newState)
            return history.push(newState)
        },
        undo() {
            history.pop()
            let previousStep = history.slice(-1)[0]

            if (!previousStep) {
                return null
            }

            window.console.log('Undoing to', previousStep)
            return JSON.parse(previousStep)
        },
        reset(state) {
            window.console.log('Resetting to ', JSON.stringify(state))
            history = [JSON.stringify(state)]
        },
    }

    return memento
}
