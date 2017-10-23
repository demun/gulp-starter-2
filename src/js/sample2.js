const name = 'bob';

let time = 'yesterday';
time = 'today';

// Template string
console.log(`Hello ${name}, how are you ${time}?`);

const bob = {
  // Object shorthand
  name,
  // Object method
  sayMyName() {
    console.log(this.name);
  }
};