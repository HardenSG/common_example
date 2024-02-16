// ======= 1. 什么场景适用Ioc =========

// 1. 假设我需要对一个订单功能

class Order {
    #id;
    #message;
    /**
     * @param { {
     *  id: Number
     *  message: String
     * } }
     * @memberof Order
     */
    constructor({ id, message }) {
        this.#id = id
        this.#message = message
    }
    getOrderInfo() {
        return {
            id: this.#id,
            message: this.#message
        }
    }
}

const order = new Order({ id: 1, message: '专车订单' })
console.log(order.getOrderInfo());


// 2. 现在我需要对订单类添加评分功能
class Rate {
    #rate
    constructor(rate) {
        this.#rate = rate
    }
    setR(rate) {
        this.#rate = rate
    }
    getR() {
        return this.#rate
    }
}
class OrderWithRate {
    #id;
    #message;
    rate
    /**
     * @param { {
     *  id: Number
     *  message: String
     * } }
     * @memberof Order
     */
    constructor({ id, message }) {
        this.#id = id
        this.#message = message
        this.rate = new Rate()
    }
    getOrderInfo() {
        return {
            id: this.#id,
            message: this.#message
        }
    }
}

const orderWithRate = new OrderWithRate({ id: 1, message: '快车订单' });
console.log(orderWithRate.getOrderInfo());
orderWithRate.rate.setR(5);
console.log('评分为：《 ' + orderWithRate.rate.getR() + ' 》');

// 3. 现在我还需要分享订单的能力
class ShareAbility {
    #platform;
    constructor(platform) {
        this.#platform = platform
    }
    setP(platform) {
        this.#platform = platform
    }
    getP() {
        return this.#platform
    }
    shareTo() {
        const platform = this.getP()
        switch (platform) {
            case 'weixin': {
                console.log('分享到微信');
                break;
            }
            case 'ali': {
                console.log('分享到支付宝');
                break;
            }
            case 'weibo': {
                console.log('分享到微博');
                break;
            }
            default: {
                console.log('分享失败');
                // trackError
            }
        }
    }
}
class OrderWithShare {
    #id;
    #message;
    rate
    share
    /**
     * @param { {
     *  id: Number
     *  message: String
     * } }
     * @memberof Order
     */
    constructor({ id, message }) {
        this.#id = id
        this.#message = message
        this.rate = new Rate()
        this.share = new ShareAbility()
    }
    getOrderInfo() {
        return {
            id: this.#id,
            message: this.#message
        }
    }
}

const orderWithShareAbility = new OrderWithShare({ id: 1, message: '特惠快车订单' });
orderWithShareAbility.rate.setR(5);
orderWithShareAbility.share.setP('weixin');
console.log('评分为： 《' + orderWithShareAbility.rate.getR() + ' 》');
orderWithShareAbility.share.shareTo();