# GenshinGachaKit

自定义原神抽卡模拟器！

## 特色功能

- 轻量：这是一个非常基础的库，仅从数据层面对原神抽卡进行仿真模拟，十万数据测试稳定且精准。
- 扩展：利用这个库模拟得到的结果，您可以自由定制表现的形式。模拟抽卡网页？聊天 bot？随你想象！
- 同步：支持自动获取游戏内最新的当期卡池数据。懒得倒入数据？那就用游戏里的实时卡池数据吧！
- 定制：除了官方卡池，您还可以轻松定制自己的卡池数据。自制小道具？同人小游戏？通通没问题！

---

**GenshinGachaKit API 文档**

## `GenshinGachaKit` {class}

返回：App 实例

## `App.setPool(pool: GachaPool): this`

配置卡池信息。

```js
interface GachaPool {
  name: string
  type: 'character' | 'weapon' | 'newcomers'
  upSSR: AppGachaItem[]
  upSR: AppGachaItem[]
  ssr: AppGachaItem[]
  sr: AppGachaItem[]
  r: AppGachaItem[]
}
```

## `App.setOfficialPool(type: keyof OfficialGachaType): Promise<this>`

使用游戏内实时卡池数据。

## `App.singleWish(): AppGachaItem`

进行单次抽取，并取得结果。

## `App.multiWish(count: number): AppGachaItem[]`

进行多次抽取，并取得结果集合。

## `App.getResult(type?: keyof WishResult): WishResult | AppGachaItem[]`

获取指定类型的抽卡结果记录，若未指定则以键值对返回全部抽卡结果记录。

抽卡结果类型：

- `ssr` 五星
- `sr` 四星
- `r` 三星

## `App.getCounter(name?: keyof AppCounter): number | number[] | AppCounter`

获取指定计数器记录，若未指定则以键值对返回全部计数器记录。

计数器类型：

- `total {number}` 总抽取数
- `ensureSSR {0 | 1}` 是否位于“大保底”状态
- `lastUpSSR {number}` 距离上一次 UP 5 星已过去多少抽
- `lastUpSR {number}` 距离上一次 UP 4 星已过去多少抽
- `lastSSR {number}` 距离上一次 5 星已过去多少抽
- `lastSR {number}` 距离上一次 4 星已过去多少抽
- `upSSR {number[]}` 每次获取 UP 5 星的间隔
- `upSR {number[]}` 每次获取 UP 4 星的间隔
- `ssr {number[]}` 每次获取 5 星的间隔
- `sr {number[]}` 每次获取 4 星的间隔
