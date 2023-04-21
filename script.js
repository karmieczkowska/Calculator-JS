const numbers = document.querySelectorAll('.number')
const operators = document.querySelectorAll('.operator')
const clear = document.querySelector('.clear')
const remove = document.querySelector('.remove')
const equals = document.querySelector('.equals')
const previous = document.querySelector('.previous')
const current = document.querySelector('.current')

let currentOperation = ''
let operation = undefined
let previousOperation = ''


const calculate = () => {
    let count
    if (!previousOperation || !currentOperation) {
        return
    }

    const old = parseFloat(previousOperation)
    const actual = parseFloat(currentOperation)

    if (isNaN(old) || isNaN(actual)) {
        return
    }

    switch (operation) {
        case '+':
            count = old + actual
        break;
        case '-':
            count = old - actual
        break;
        case '×':
            count = old * actual
        break;
        case '÷':
        if(actual === 0)
        {
            clearResult()
            return
        }
            count = old / actual
        break;
        case '%':
            count = old / 100 * actual
        break;
        default:
            return
    }

    currentOperation = count
    operation = undefined
    previousOperation = ''
}


const chooseOperation = (operator) => {
    if (currentOperation === '') {
        return
    }
    if (previousOperation !== '') {
        const old = previous.innerText
        if(currentOperation.toString() === '0' && old[old.length - 1] === '÷') {
            clearResult()
            return
        }
        calculate()
    }
    operation = operator
    previousOperation = currentOperation
    currentOperation = ''
}


const updateResult = () => {
    current.innerText = currentOperation

    if (operation != null) {
        previous.innerText = previousOperation + operation
    } else {
        previous.innerText = ''
    }

}

const addNumber = (number) => {
    if(number === '•') {
        if(currentOperation.includes('.')) {
          return
        }
        number = '.'
      }
    currentOperation = currentOperation.toString() + number.toString()
}

const removeNumber = () => {
    currentOperation = currentOperation.toString().slice(0, -1)
}

const clearResult = () => {
    currentOperation = ''
    operation = undefined
    previousOperation = ''
}

numbers.forEach((number) => {
    number.addEventListener('click', () => {
        addNumber(number.innerText)
        updateResult()
    })
})

remove.addEventListener('click', () => {
    removeNumber()
    updateResult()
})

clear.addEventListener('click', () => {
    clearResult()
    updateResult()
})

operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        chooseOperation(operator.innerText)
        updateResult()
    })
})

equals.addEventListener('click', () => {
    calculate()
    updateResult()
})