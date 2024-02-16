// ======= 2. Ioc改造 =========

class Order {
    // 依赖模块
    static modules = new Map()

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
        // 初始化注入的模块
        Order.modules.forEach(v => {
            v.init(this)
        })
    }
    getOrderInfo() {
        return {
            id: this.#id,
            message: this.#message
        }
    }
    // 依赖注入函数
    static injectable(module) {
        Order.modules.set(module.constructor.name, module)
    }
}

class Rate {
    #rate
    constructor(rate) {
        this.#rate = rate
    }
    init(root) {
        root.rate = this
    }
    setR(rate) {
        this.#rate = rate
    }
    getR() {
        return this.#rate
    }
}

class ShareAbility {
    #platform;
    constructor(platform) {
        this.#platform = platform
    }
    init(root) {
        root.share = this
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

// 提前注入低层依赖，在外部初始化
const rate = new Rate(5)
const shareAbility = new ShareAbility('weixin')
Order.injectable(rate)
Order.injectable(shareAbility)

const order = new Order({ id: 1, message: 2 })
order.share.shareTo()