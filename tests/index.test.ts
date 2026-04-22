import { describe, it, expectTypeOf } from 'vitest';
import { DeepReadonly, PickedByType, EventHandlers } from '../src';

describe('DeepReadonly<T>', () => {
  it('should make all properties readonly recursively', () => {
    type Nested = {
      name: string;
      address: {
        city: string;
        coordinates: {
          lat: number;
          lng: number;
        };
      };
      greet: () => void;
    };
    
    type ReadonlyNested = DeepReadonly<Nested>;
    
    expectTypeOf<ReadonlyNested>().toMatchTypeOf<{
      readonly name: string;
      readonly address: {
        readonly city: string;
        readonly coordinates: {
          readonly lat: number;
          readonly lng: number;
        };
      };
      readonly greet: () => void;
    }>();
  });
});

describe('PickedByType<T, U>', () => {
  it('should pick properties of a specific type', () => {
    type User = {
      id: number;
      name: string;
      age: number;
      city: string;
      active: boolean;
    };

    type StringProps = PickedByType<User, string>;
    
    expectTypeOf<StringProps>().toMatchTypeOf<{
      name: string;
      city: string;
    }>();
    expectTypeOf<StringProps>().not.toHaveProperty('id');
    expectTypeOf<StringProps>().not.toHaveProperty('age');
    expectTypeOf<StringProps>().not.toHaveProperty('active');
  });
  
  it('should work with union types', () => {
    type Mixed = {
      a: string;
      b: string | number;
      c: number;
    };
    
    type StringOrNumber = PickedByType<Mixed, string | number>;
    
    expectTypeOf<StringOrNumber>().toMatchTypeOf<{
      a: string;
      b: string | number;
      c: number;
    }>();
  });
});

describe('EventHandlers<T>', () => {
  it('should generate event handlers with on prefix', () => {
    type Events = {
      click: { x: number; y: number };
      submit: { data: string };
    };
    
    type Handlers = EventHandlers<Events>;
    
    expectTypeOf<Handlers>().toMatchTypeOf<{
      onClick: (payload: { x: number; y: number }) => void;
      onSubmit: (payload: { data: string }) => void;
    }>();
  });
  
  it('should handle events with no payload', () => {
    type Events = {
      close: void;
      open: void;
    };
    
    type Handlers = EventHandlers<Events>;
    
    expectTypeOf<Handlers>().toMatchTypeOf<{
      onClose: (payload: void) => void;
      onOpen: (payload: void) => void;
    }>();
  });
});