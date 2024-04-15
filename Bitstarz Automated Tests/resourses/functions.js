import guestDataUS from '../resourses/guestDataUS.json'

const dataMapper = {
    'US': guestDataUS 
  }
  
  const getCountryParameter = () => {
    return process.env.COUNTRY || 'US'    
  }
  
  const getCountrySpecificData = () => {
    const country = getCountryParameter()
    return dataMapper[country]
  }
  
  export const data = getCountrySpecificData();