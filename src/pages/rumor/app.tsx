import Taro, { Config } from '@tarojs/taro'

import { List } from '../components/list'
import { BasePage } from '../components/base-page'
import { RumorCard } from '../components/rumor-card'

import { IRumorState } from '../../base/interfaces'

import './app.scss'

export default class Rumor extends List {
  listFieldName = 'rumorList'

  fetchMethodFieldName = 'fetchRumorList'

  config: Config = {
    navigationBarTitleText: '辟除谣言',
  }

  state: IRumorState = {
    ...Rumor.defaultProps,
    rumorList: [],
  }

  render() {
    const { rumorList } = this.state

    return (
      <BasePage
        title='辟除谣言'
        className='rumor'
        onScrollToUpper={this.reachTopEventHandler}
        onScrollToLower={this.reachBottomEventHandler}
      >
        {rumorList.map((rumor, index, list) => (
          <RumorCard
            key={index + 1}
            body={rumor.body}
            index={index + 1}
            title={rumor.title}
            rumorType={rumor.rumorType}
            mainSummary={rumor.mainSummary}
            isLast={index + 1 === list.length}
          />
        ))}
      </BasePage>
    )
  }
}
