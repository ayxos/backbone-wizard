define(['jade'], function(jade){
  return function anonymous(locals, attrs, escape, rethrow, merge
/**/) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('inittt slide<br/>hi, this is the inittt slide');
}
return buf.join("");
};
});