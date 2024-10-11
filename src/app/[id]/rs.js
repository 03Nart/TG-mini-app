'use server'
export  async  function Rst(listss){

    const str = listss


    const cleanedStr = str.replace(/^\[|\]$/g, '');
    
    const resultArray = cleanedStr.split(',').map(item => item.trim());
    
    return resultArray
}


