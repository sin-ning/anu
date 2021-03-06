import React from '@react';
import './index.less';
import RightNav from '@components/navRight/index';
class Classify extends React.Component {
    constructor() {
        super();
        this.state = {
            curNav: 12,
            navLeftItems: [],
            navRightItems: [],
            curIndex: 0,
            toView: 'index12',
            scrollTop: 0,
            itemHeight: 288
        };
    }

  config = {
      backgroundTextStyle: 'white',
      navigationBarTextStyle: 'white',
      navigationBarTitleText: '分类',
      navigationBarBackgroundColor: '#292929',
      backgroundColor: '#F2F2F2',
      enablePullDownRefresh: true
  };

  componentWillMount() {
      var that = this;
      React.api.request({
          url: 'http://yapi.demo.qunar.com/mock/17668/wemall/goodstype/typebrandList',
          method: 'GET',
          data: {},
          header: {
              Accept: 'application/json'
          },
          success: function(res) {
              that.setState({
                  navLeftItems: res.data.left,
                  navRightItems: res.data.right
              });
          }
      });
  }

  switchRightTab(id, index) {
      let height = this.state.itemHeight;
      this.setState({
          curNav: id,
          curIndex: index,
          toView: 'index' + id,
          scrollTop: height * index
      });
  }
  scrollLeftTab(index) {
      // eslint-disable-next-line
      console.log('index12', index);
      let id = this.state.navLeftItems[index].id;
      let height = this.state.itemHeight;
      if (index !== this.state.curIndex) {
          this.setState({
              curNav: id,
              curIndex: index,
              toView: 'index' + id,
              scrollTop: height * index
          });
      }
  }

  render() {
      return (
          <div className="chat-container">
              <div className="nav_left">
                  {this.state.navLeftItems.map(function(item, index) {
                      return (
                          <div
                              key={item.id}
                              className={'nav_left_items ' + (this.state.curIndex === index ? 'active' : '')}
                              onTap={this.switchRightTab.bind(this, item.id, index)}
                          >
                              {item.desc}
                          </div>
                      );
                  })}
              </div>
              <RightNav
                  data={this.state.navRightItems}
                  id={this.state.curNav}
                  index={this.state.curIndex}
                  toView={this.state.toView}
                  scrollLeftTab={this.scrollLeftTab.bind(this)}
                  scrollTop={this.state.scrollTop}
                  itemHeight={this.state.itemHeight}
              />
          </div>
      );
  }
}

export default Classify;
