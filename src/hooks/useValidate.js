import { useState } from "react"

// Custom hook for form
const useValidate = () => {
    const [invalidFeilds, setInvalidFeilds] = useState({})

    const handleSetInvalidFeilds = (input, message) => {
        setInvalidFeilds(prevState => ({ 
            ...prevState,
            [input] : message
        }))
    }

    const handleResetInvalidFeilds = (input) => {
       setInvalidFeilds(prevState => {
            const {[input]: removeFeild, ...updatedInvalidFeilds} = prevState
            return updatedInvalidFeilds
       })
    }

    const handleCheckInvalid = (input) => {
        return Object.keys(invalidFeilds).includes(input)
    }

    return { invalidFeilds, handleCheckInvalid, handleResetInvalidFeilds, handleSetInvalidFeilds }
}

export default useValidate