define(['jade'], function(jade){
  return function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('random slide<br/>hi, this is the random slide<br/><button id="3g" value="3g" class="btn btn-primary">3g</button><button id="wifi" value="wifi" class="btn btn-primary">wifi</button>');
}
return buf.join("");
};
});