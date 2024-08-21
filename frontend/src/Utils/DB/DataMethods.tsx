
//filter properties for objects
export const filterPropsObj = (dataProperties: readonly string[], dataArray: any): { [key: string]: any } => {
    return dataProperties.reduce((acc, elem) => {
      if (elem in dataArray) {
        acc[elem] = dataArray[elem];
      }
      return acc;
    }, {} as { [key: string]: any });
  };


  //filter properties for array of objects
  export const filterPropsObjArr = (dataProperties: readonly string[], dataArray: any[]): { [key: string]: any }[] => {
    return dataArray.slice(0, 4).map((item) => {
      return dataProperties.reduce((acc, elem) => {
        if (elem in item) {
          acc[elem] = item[elem];
        }
        return acc;
      }, {} as { [key: string]: any });
    });
  };