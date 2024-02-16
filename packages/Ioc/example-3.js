// @ts-nocheck
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
/**
 * 模块需要显式的声明init方法，容器需要显示的注入依赖并且初始化。
 * 这些业务无关的内容我们可以通过封装进入基类、子类进行继承的方式来优化，
 * 也可以通过修饰器方法来进行简化。
 */
var Aftermarket = /** @class */ (function () {
    function Aftermarket() {
    }
    Aftermarket.prototype.repair = function () {
        console.log('已收到您的售后请求');
    };
    return Aftermarket;
}());
var Rate = /** @class */ (function () {
    function Rate() {
    }
    Rate.prototype.star = function (stars) {
        console.log("\u8BC4\u5206\u4E3A".concat(stars, "\u661F"));
    };
    return Rate;
}());
var Share = /** @class */ (function () {
    function Share() {
    }
    Share.prototype.shareTo = function (platform) {
        switch (platform) {
            case 'weixin':
                console.log('分享至微信好友');
                break;
            case 'wxposts':
                console.log('分享至微信朋友圈');
                break;
            case 'weibo':
                console.log('分享至微博');
                break;
            default:
                console.error('分享失败，请检查platform');
                break;
        }
    };
    return Share;
}());
function Injectable(modules) {
    return function (target) {
        modules.forEach(function (module) {
            target.prototype[module.name] = new module();
        });
    };
}
var Order = function () {
    var _classDecorators = [Injectable([Aftermarket, Share, Rate])];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var Order = _classThis = /** @class */ (function () {
        function Order_1() {
        }
        return Order_1;
    }());
    __setFunctionName(_classThis, "Order");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Order = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Order = _classThis;
}();
var order = new Order();
order.Share.shareTo('weixin');
