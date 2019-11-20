const existsOrError = (value, msg, res) => {
    if (!value) return res.status(400).send({ err: msg })
    if (Array.isArray(value) && value.length === 0) return res.status(400).send({ err: msg })
    if (typeof value === 'string' && !value.trim()) return res.status(400).send({ err: msg })
}

const notExistsOrError = (value, msg, res) => {
    try {
        existsOrError(value, msg, res)
    } catch (msg) {
        return
    }
    return res.status(400).send({ err: msg })
}

const equalsOrError = (valueA, valueB, msg, res) => {
    if (valueA !== valueB) return res.status(400).send({ err: msg })
}

const validateEmail = (email, msg, res) => {
    let parseEmail = /^[a-z0-9.-_&]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    if (!parseEmail.test(email.trim()))
        return res.status(400).send({ err: msg })
}


module.exports = { existsOrError, notExistsOrError, equalsOrError, validateEmail }
