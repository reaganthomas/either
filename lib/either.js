module.exports = Either;

var clone = Object.create;
var unimplemented = function(){ throw new Error('Not implemented.'); };
var noop = function(){ return this; };

// Either
function Either(){}

Left.prototype = clone(Either.prototype);
function Left(a) {
  this.value = a;
}

Right.prototype = clone(Either.prototype);
function Right(a) {
  this.value = a;
}

// Constructors
Either.Left = function(a) {
  return new Left(a);
};
Either.prototype.Left = Either.Left;

Either.Right = function(a) {
  return new Right(a);
};
Either.prototype.Right = Either.Right;

// Conversions
Either.fromNullable = function(a) {
  return a !== null ? this.Right(a) : this.Left(a);
};
Either.prototype.fromNullable = Either.fromNullable;

Either.fromValidation = function(a) {
  return a.fold(this.Left.bind(this), this.Right.bind(this));
};

// Predicates
Either.prototype.isLeft = false;
Either.prototype.isRight = false;
Left.prototype.isLeft = true;
Left.prototype.isRight = true;

// Applicatives
Either.of = function(a) {
  return this.Right(a);
};
Either.prototype.of = Either.of;

Either.prototype.ap = unimplemented;

Left.prototype.ap = function(b) {
  return b;
};

Right.prototype.ap = function(b) {
  return b.map(this.value);
};

// Functor
Either.prototype.map = unimplemented;
Left.prototype.map = noop;

Right.prototype.map = function(f) {
  return this.of(f(this.value));
};

// Chain
Either.prototype.chain = unimplemented;
Left.prototype.chain = noop;

Right.prototype.chain = function(f) {
  return f(this.value);
};

// Show
Either.prototype.toString = unimplemented;

Left.prototype.toString = function() {
  return 'Either.Left(' + this.value + ')';
};

Right.prototype.toString = function() {
  return 'Either.Right(' + this.value + ')';
};

// Equal
Either.prototype.isEqual = unimplemented;

Left.prototype.isEqual = function(a) {
  return a.isLeft && (a.value === this.value);
};

Right.prototype.isEqual = function(a) {
  return a.isRight && (a.value === this.value);
};

// Extract and Recover
Either.prototype.get = unimplemented;

Left.prototype.get = function() {
  throw new TypeError('Can\'t extract the value of a Left(a).');
};

Right.prototype.get = function() {
  return this.value;
};





Either.prototype.getOrElse = unimplemented;

Left.prototype.getOrElse = function(a) {
  return a;
};

Right.prototype.getOrElse = function(_) {
  return this.value;
};



Either.prototype.orElse = unimplemented;
Right.prototype.orElse = noop;

Left.prototype.orElse = function(f) {
  return f(this.value);
};



Either.prototype.merge = function() {
  return this.value;
};



// Folds and Transformations
Either.prototype.fold = unimplemented;

Left.prototype.fold = function(f, _) {
  return f(this.value);
};

Right.prototype.fold = function(_, g) {
  return g(this.value);
};


// Catamorphism
Either.prototype.cata = unimplemented;

Left.prototype.cata = function(pattern) {
  return pattern.Left(this.value);
};

Right.prototype.cata = function(pattern) {
  return pattern.Right(this.value);
};



Either.prototype.swap = unimplemented;

Left.prototype.swap = function() {
  return this.Right(this.value);
};

Right.prototype.swap = function() {
  return this.Left(this.value);
};



Either.prototype.bimap = unimplemented;

Left.prototype.bimap = function(f, _) {
  return this.Left(f(this.value));
};

Right.prototype.bimap = function(_, g) {
  return this.Right(g(this.value));
};



Either.prototype.leftMap = unimplemented;
Right.prototype.leftMap = noop;

Left.prototype.leftMap = function(f) {
  return this.Left(f(this.value));
};
