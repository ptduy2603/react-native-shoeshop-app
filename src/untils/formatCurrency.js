const formatCurrency = (value) => {
    if(!Number(value))
        return 0
   return new Intl.NumberFormat('en-DE').format(value)
} 

export default formatCurrency