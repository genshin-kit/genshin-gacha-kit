# GenshinGachaKit

自定义原神抽卡模拟器！

## 特色功能

- 轻量：这是一个非常基础的工具库，对原神抽卡进行最基本的模拟。
- 定制：使用它，您可以轻松定制自己的卡池数据。
- 扩展：您可以使用内部工具来定制您的概率规则！

---

**GenshinGachaKit 原生 API 文档**

## `GenshinGachaKit` {class}

返回：App 实例

## `App.setPool(pool: GachaPool): this`

配置卡池信息。

```js
interface GachaPool {
  name: string
  type: 'character' | 'weapon' | 'newcomers'
  upSSR: string[]
  upSR: string[]
  ssr: string[]
  sr: string[]
  r: string[]
}
```

## `App.singleWish(): string`

进行单次抽取，并取得结果。

## `App.multiWish(count: number): string[]`

进行多次抽取，并取得结果集合。

## `App.getResult(type?: keyof WishResult): WishResult | string[]`

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
