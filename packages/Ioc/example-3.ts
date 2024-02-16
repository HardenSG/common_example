// @ts-nocheck

/**
 * 模块需要显式的声明init方法，容器需要显示的注入依赖并且初始化。
 * 这些业务无关的内容我们可以通过封装进入基类、子类进行继承的方式来优化，
 * 也可以通过修饰器方法来进行简化。
 */

class Aftermarket {
    repair() {
        console.log('已收到您的售后请求');
    }
}

class Rate {
    star(stars) {
        console.log(`评分为${stars}星`);
    }
}

class Share {
    shareTo(platform) {
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
    }
}

// 依赖注入
function Injectable(modules) {
    return function(target) {
        modules.forEach((module) => {
            target.prototype[module.name] = new module();
        });
    };
}

@Injectable([Aftermarket, Share, Rate])
class Order {
    constructor() {}
}

const order = new Order();
order.Share.shareTo('weixin');