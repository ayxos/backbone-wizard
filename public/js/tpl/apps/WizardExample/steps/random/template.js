define(['jade'], function(jade){
  return function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('random slide<br/>hi, this is the random slide<br/><button id="a" value="a" class="btn btn-primary">Option A</button><button id="b" value="b" class="btn btn-primary">Option B</button>');
}
return buf.join("");
};
});