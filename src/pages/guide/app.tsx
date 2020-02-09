import Taro, { Config } from '@tarojs/taro'

import { List } from '../components/list'
import { BasePage } from '../components/base-page'
import { GuideCard } from '../components/guide-card'

import { IGuide, IGuideState } from '../../base/interfaces'

import './app.scss'

export default class Guide extends List {
  listFieldName = 'guideList'

  fetchMethodFieldName = 'fetchGuideList'

  config: Config = {
    navigationBarTitleText: '预防指南',
  }

  state: IGuideState = {
    ...Guide.defaultProps,
    guideList: [],
  }

  responseFilter(list: IGuide[]) {
    return list.map(({ title, imgUrl, linkUrl, createTime, contentType }) => ({
      title,
      imgUrl,
      linkUrl,
      createTime,
      contentType,
    }))
  }

  render() {
    const { guideList } = this.state

    return (
      <BasePage
        title='疾病知识'
        className='guide'
        onScrollToUpper={this.reachTopEventHandler}
        onScrollToLower={this.reachBottomEventHandler}
      >
        {guideList.map((guide, index) => (
          <GuideCard
            key={index + 1}
            title={guide.title}
            imgUrl={guide.imgUrl}
            linkUrl={guide.linkUrl}
            createTime={guide.createTime}
            contentType={guide.contentType}
          />
        ))}
      </BasePage>
    )
  }
}
