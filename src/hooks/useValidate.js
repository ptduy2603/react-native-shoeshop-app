import { useState } from "react"

// Custom hook for form
const useValidate = () => {
    const [invalidFields, setInvalidFields] = useState({})

    const handleSetInvalidFields = (input, message) => {
        setInvalidFields(prevState => ({ 
            ...prevState,
            [input] : message
        }))
    }

    const handleResetInvalidFields = (input) => {
        setInvalidFields(prevState => {
            const {[input]: removeFeild, ...updatedInvalidFeilds} = prevState
            return updatedInvalidFeilds
       })
    }

    const handleCheckInvalid = (input) => {
        return Object.keys(invalidFields).includes(input)
    }

    return { invalidFields, handleCheckInvalid, handleSetInvalidFields, handleResetInvalidFields }
}

export default useValidate