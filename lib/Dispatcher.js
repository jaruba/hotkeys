module.exports = Dispatcher;

var Keymap          = require('./Keymap');

function Dispatcher(el, keymap) {
    this._root = el || window.document.body;
    this._keymap = keymap || new Keymap();
    this._root.addEventListener('keydown', this._dispatch.bind(this), true);
}

Dispatcher.prototype.getKeymap = function() {
    return this._keymap;
}

Dispatcher.prototype.on = function(hotkey, fn) {
    this._keymap.bind(hotkey, fn);
    return this;
}

Dispatcher.prototype._dispatch = function(evt) {

    var binding = this._keymap.bindingForEvent(evt);
    if (binding) {
        evt.stopPropagation();
        evt.preventDefault();
        binding.action();
    }

}