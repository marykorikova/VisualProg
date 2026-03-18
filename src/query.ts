import { Transform, Where, Sort, GroupBy, Having, Group } from './types';


type StepFunction = (data: any) => any;

export function query<T>(
  ...steps: StepFunction[]
): Transform<T> {
  return (initialData: T[]): T[] => {
    let processedData: any = initialData;
    
    for (let i = 0; i < steps.length; i++) {
      processedData = steps[i](processedData);
    }
    
    return processedData as T[];
  };
}

export function createWhere<T>(): Where<T> {
  return (fieldName, fieldValue) => (array) => 
    array.filter(element => element[fieldName] === fieldValue);
}

export function createSort<T>(): Sort<T> {
  return (fieldName) => (array) => 
    [...array].sort((first, second) => {
      const val1 = first[fieldName];
      const val2 = second[fieldName];
      
      if (val1 < val2) return -1;
      if (val1 > val2) return 1;
      return 0;
    });
}

export function createGroupBy<T>(): GroupBy<T> {
  return <K extends keyof T>(key: K) => (data: T[]): Group<T, K>[] => {
    const groupsObject: Record<string, T[]> = {};
    
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      const groupValue = String(item[key]);
      
      if (!groupsObject[groupValue]) {
        groupsObject[groupValue] = [];
      }
      
      groupsObject[groupValue].push(item);
    }
    
    const result: Group<T, K>[] = [];
    for (const groupKey in groupsObject) {
      result.push({
        key: groupsObject[groupKey][0][key],
        items: groupsObject[groupKey]
      });
    }
    
    return result;
  };
}

export function createHaving<T>(): Having<T> {
  return (filterFunction) => (groupArray) => 
    groupArray.filter(filterFunction);
}