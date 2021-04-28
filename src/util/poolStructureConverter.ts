import { AppGachaPool, OfficialGachaPool } from '../types'

export function poolStructureConverter(data: OfficialGachaPool): AppGachaPool {
  let org = {
    banner: '',
    content: '',
    date_range: '限时活动',
    gacha_type: 302,
    r3_prob_list: [
      {
        is_up: 0,
        item_id: -47,
        item_name: '弹弓',
        item_type: '武器',
        order_value: 47,
        rank: 3,
      },
    ],
    r4_prob_list: [
      {
        is_up: 1,
        item_id: -3,
        item_name: '祭礼弓',
        item_type: '武器',
        order_value: 3,
        rank: 4,
      },
    ],
    r4_up_items: [
      {
        item_attr: '',
        item_id: -6,
        item_img:
          'https://webstatic.mihoyo.com/upload/op-public/2021/04/25/082064131cb3b486af21946605f84e47_522056580853571576.png',
        item_name: '千岩古剑',
        item_type: '武器',
        item_type_cn: '武器',
      },
    ],
    r5_prob_list: [
      {
        is_up: 1,
        item_id: -1,
        item_name: '尘世之锁',
        item_type: '武器',
        order_value: 1,
        rank: 5,
      },
    ],
    r5_up_items: [
      {
        item_attr: '',
        item_id: -2,
        item_img:
          'https://webstatic.mihoyo.com/upload/op-public/2021/04/25/c45f9325d40db3584fd6bf54f648f587_4841001188128724595.png',
        item_name: '斫峰之刃',
        item_type: '武器',
        item_type_cn: '武器',
      },
    ],
    title: '「<color=#EF7C1AFF>神铸</color>赋形」活动祈愿',
  }

  const pool = {
    name: '',
    type: '',
    upSSR: [],
    upSR: [],
    ssr: [],
    sr: [],
    r: [],
  }

  pool.name = data.title
  pool.type = data.gacha_type
}
