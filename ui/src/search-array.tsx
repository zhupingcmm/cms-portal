import React, { useEffect } from "react";
import { useArray } from "./utils/hook.util";
interface P {
  name: string;
  age: number;
}

export const SearchArray = () => {
  let person: P[] = [
    { name: "zp", age: 11 },
    { name: "cmm", age: 11 },
  ];
  const { add, removeIndex, clear, value } = useArray(person);
  return (
    <div>
      <button onClick={() => add({ name: "john", age: 22 })}>add john</button>
      <button onClick={() => removeIndex(0)}>remove 0</button>
      <button onClick={() => clear()}>clear</button>
      {value.map((v, index) => {
        return (
          <div>
            <span>{v.name}</span>
            <span>{v.age}</span>
          </div>
        );
      })}
    </div>
  );
};
