// 📘 TypeScript Full Feature Guide with Commentary

// ========== 1. BASIC TYPES ==========
let isDone: boolean = false; // ✅ Boolean type
declare const username: string; // ✅ String type (declare for globals)
// 🔍 'declare' tells TypeScript that this variable exists somewhere (global scope or provided by external scripts), but it's not defined here.
// It's often used in .d.ts files or to type-check existing JavaScript code without emitting actual JavaScript.
let age: number = 30; // ✅ Number type
let notSure: any = 4; // ❗️Any disables type safety
let u: undefined = undefined; // ✅ Explicit undefined
declare let n: null; // ✅ Null type

// ========== 2. ARRAYS ==========
let list: number[] = [1, 2, 3]; // ✅ Array of numbers
let names: Array<string> = ["Alice", "Bob"] // ✅ Generic syntax

// ========== 3. TUPLES ==========
let tuple: [string, number] = ["hello", 10]; // ✅ Tuple with specific types

// ========== 4. ENUMS ==========
enum Color {
  Red,    // 0
  Green,  // 1
  Blue    // 2
}
let c: Color = Color.Green; // ✅ Enum usage

// ========== 5. UNION TYPES ==========
function padLeft(value: string, padding: string | number) {
  if (typeof padding === "number") {
    return Array(padding + 1).join(" ") + value;
  }
  return padding + value;
}

// ========== 6. INTERFACES ==========
interface Person {
  name: string;
  age?: number; // optional property
  readonly id: number; // readonly field
}

let user: Person = {
  name: "John",
  id: 123
};

// 🔍 Interfaces vs Type Aliases:
// - Interfaces are extendable and preferable for object shapes and class contracts.
// - Type aliases are more flexible: can represent unions, intersections, primitives, etc.
// - Interfaces can be merged (declaration merging), while types cannot.

// ========== 7. TYPE ALIASES ==========
type Point = {
  x: number;
  y: number;
};

let point: Point = { x: 1, y: 2 };

// ========== 8. FUNCTIONS ==========
function add(x: number, y: number): number {
  return x + y;
}

const multiply = (a: number, b: number): number => a * b;

// Function with optional and default params
function greet(name: string = "Guest", greeting?: string): string {
  return `${greeting || "Hello"}, ${name}`;
}

// ========== 9. INTERSECTION TYPES ==========
type A = { a: number };
type B = { b: string };
type C = A & B;
const example: C = { a: 1, b: "x" };

// ========== 10. LITERAL TYPES ==========
type Direction = "left" | "right" | "up" | "down";
let move: Direction = "left";

// ========== 11. TYPE GUARDS ==========
function isString(x: unknown): x is string {
  return typeof x === "string";
}

function printId(id: string | number) {
  if (typeof id === "string") {
    console.log("string id:", id);
  } else {
    console.log("numeric id:", id);
  }
}

// ========== 12. CLASSES ==========
class Animal {
  constructor(public name: string) {}
  move(distance: number): void {
    console.log(`${this.name} moved ${distance}m.`);
  }
}

class Dog extends Animal {
  bark(): void {
    console.log("Woof!");
  }
}

const dog = new Dog("Buddy");
dog.bark();
dog.move(10);

// ========== 13. GENERICS ==========
// 🔍 Generics allow writing reusable, type-safe code with placeholders for types.
function identity<T>(arg: T): T {
  return arg;
}
let output = identity<string>("myString");

// Generic interface
interface Box<T> {
  value: T;
}

const box: Box<number> = { value: 100 };

// ========== 14. UTILITY TYPES ==========
type PersonPartial = Partial<Person>; // All props optional
type PersonRequired = Required<Person>; // All props required
type PersonPick = Pick<Person, "name">; // Select properties
type PersonOmit = Omit<Person, "age">; // Remove property

// ========== 15. MAPPED TYPES ==========
// 🔍 Mapped types transform keys of an existing type using 'in' and keyof.
type ReadonlyPoint = {
  readonly [K in keyof Point]: Point[K];
};

// ========== 16. CONDITIONAL TYPES ==========
// 🔍 Conditional types select one of two types based on a condition.
type IsString<T> = T extends string ? true : false;
type ACheck = IsString<"abc">; // true
type BCheck = IsString<123>;   // false

// ========== 17. DECLARATIONS & MODULES ==========
declare module "my-module" {
  export function customThing(): void;
}

// ========== 18. NAMESPACES ==========
// 🔍 Namespaces group related logic and prevent global name pollution.
// Used mainly in older TS or when not using modules.
namespace Geometry {
  export interface Shape {
    area(): number;
  }
  export class Square implements Shape {
    constructor(public size: number) {}
    area(): number {
      return this.size ** 2;
    }
  }
}

// ========== 19. ADVANCED TYPES ==========
// Indexed Access Types
type NameType = Person["name"];

// Template Literal Types
type Greeting = `Hello, ${string}`;

// ========== 20. INFER TYPES ==========
// 🔍 'infer' allows capturing a type variable within conditional types.
type ElementType<T> = T extends (infer U)[] ? U : T;
type StringElement = ElementType<string[]>; // string

// ========== 21. NEVER TYPE ==========
function fail(msg: string): never {
  throw new Error(msg);
}

// ========== 22. TYPE ASSERTIONS ==========
// 🔍 Type assertions tell TS "I know better what type this is".
let someValue: unknown = "this is a string";
let strLength: number = (someValue as string).length;

// ========== 23. MODULE IMPORTS ==========
// import { Component } from "@angular/core"; // Example

// ========== 24. DECORATORS (Experimental) ==========
// 🔍 'sealed' decorator prevents modifications to class and its prototype.
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return "Hello, " + this.greeting;
  }
}

// End of File YEY!!! 🚀
