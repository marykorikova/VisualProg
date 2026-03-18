import { describe, it, expect } from 'vitest';
import { query, createWhere, createSort, createGroupBy, createHaving } from '../src/query';
import { Group } from '../src/types'; 

type User = {
  id: number;
  name: string;
  surname: string;
  age: number;
  city: string;
};



const testUsers: User[] = [
  { id: 1, name: "John", surname: "Doe", age: 34, city: "NY" },
  { id: 2, name: "John", surname: "Doe", age: 33, city: "NY" },
  { id: 3, name: "John", surname: "Doe", age: 35, city: "LA" },
  { id: 4, name: "Mike", surname: "Doe", age: 35, city: "LA" },
  { id: 5, name: "Anna", surname: "Smith", age: 28, city: "NY" },
];

describe('Query pipeline', () => {
  const where = createWhere<User>();
  const sort = createSort<User>();
  const groupBy = createGroupBy<User>();
  const having = createHaving<User>();

  it('should filter by condition', () => {
    const pipeline = query<User>(where("city", "NY"));
    const result = pipeline(testUsers);
    
    expect(result).toHaveLength(3);
    expect(result.every(u => u.city === "NY")).toBe(true);
  });

it('should sort by age', () => {
  const pipeline = query<User>(sort("age"));
  const result = pipeline(testUsers);
  
  expect(result).toHaveLength(5); 
  expect(result[0]?.age).toBe(28); 
  expect(result[1]?.age).toBe(33);
  expect(result[2]?.age).toBe(34);
  expect(result[3]?.age).toBe(35);
  expect(result[4]?.age).toBe(35);
});

it('should filter then sort', () => {
  const pipeline = query<User>(
    where("name", "John"),
    sort("age")
  );
  const result = pipeline(testUsers);
  
  expect(result).toHaveLength(3);
  expect(result[0]?.age).toBe(33);
  expect(result[1]?.age).toBe(34);
  expect(result[2]?.age).toBe(35);
});



  it('should group by city', () => {
    const pipeline = query<User>(groupBy("city"));
    const result = pipeline(testUsers) as unknown as Group<User, "city">[]; 
    
    expect(result).toHaveLength(2);
    
    const nyGroup = result.find(g => g.key === "NY");
    expect(nyGroup?.items).toHaveLength(3);
    
    const laGroup = result.find(g => g.key === "LA");
    expect(laGroup?.items).toHaveLength(2);
  });



  it('should filter groups with more than 1 item', () => {
    const pipeline = query<User>(
      groupBy("city"),
      having((group) => group.items.length > 1)
    );
    const result = pipeline(testUsers) as unknown as Group<User, "city">[];
    
    expect(result).toHaveLength(2);
  });


  it('should filter, group, then filter groups', () => {
    const pipeline = query<User>(
      where("surname", "Doe"),
      groupBy("city"),
      having((group) => group.items.length > 1)
    );
    const result = pipeline(testUsers) as unknown as Group<User, "city">[];
    
    expect(result).toHaveLength(2);
  });


  
  it('should handle empty pipeline', () => {
    const pipeline = query<User>();
    const result = pipeline(testUsers);
    
    expect(result).toEqual(testUsers);
  });
});