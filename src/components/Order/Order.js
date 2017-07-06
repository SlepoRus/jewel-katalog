import React from 'react';
import './Order.less';
import {Order as api} from '../../api';
import InfiniteScroll from 'redux-infinite-scroll';
import { Input } from '../lib';
export default class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: [],
      err: '',
      offset: 0,
      loadingMore: false,
      hasMore: true,
      search_text:'',
    }
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this._renderCatalog = this._renderCatalog.bind(this);
  }

  handleAdd(e) {
    this.setState({ err: '' })
    api.create().then((val)=> {
      console.log(this.state.order);
      var order = this.state.order.push(val.data);
      this.setState({ order });
    }).catch((err) => {
      console.log(err);
      this.setState({ err:'Произошла ошибка' })
    })
  }
  handleRemove(e) {
    const { id } = e;
    const { order } = this.state;
    api.delete({id}).then((val)=> {
      order.forEach((val,key) => {
        if (key == id) {
          delete order[key];
          return;
        }
      })
      this.setState({ order });
    }).catch((err) => {
      console.log(err);
      this.setState({ err:'Произошла ошибка' })
    })
  }
  _loadMore() {
    var { order,offset, search_text } = this.state;
    const OFFSET = 60;
    this.setState({ loadingMore: true });
    const tmp_text = search_text;
    setTimeout(() => {
      api.read({id:search_text, offset:offset}).then((val) => {
        if (val.data.length<1) {
          this.setState({ hasMore: false })
        }
        if (this.state.search_text == tmp_text)
          this.setState({ order:order.concat(val.data), offset:offset+OFFSET, loadingMore: false})
        else
          this.setState({ loadingMore: false})
      }).catch((err) => {
        console.log(err);
      });
    }, 500)
  }
  _renderCatalog() {
    const { order,err } = this.state;
    return order.map((val,key) => (<div key={key}>{val}
        <button onClick={this.handleRemove.bind(this,{id:key})} className={'jewel-button warning'} style={{backgroundColor:'#32CD32'}}>{err || 'Удалить'}</button>
        </div>)
    )
  }
  render() {
    const { order,err,loadingMore,hasMore,search_text } = this.state;
    return (
      <div className={'order-window'}>
        <h1>Оформление заказа</h1>
          <div className={'catalog-search'} id="search">
            <Input placeholder={"Поиск..."} onChange={this.handleChange} value={ search_text }/>
          </div>
        <div>
          <button onClick={this.handleAdd} className={'jewel-button ' + (err ? 'warning' : 'success')} style={{backgroundColor:'#32CD32'}}>{err || 'Добавить'}</button>
        </div>

        <InfiniteScroll
            loadingMore = {loadingMore}
            hasMore = {hasMore}
            items = {this._renderCatalog()}
            elementIsScrollable={false}
            loader={<div><img src="../../../public/stuff/01-progress.gif" width={'120px'} /></div>}
            loadMore={this._loadMore.bind(this)} />
      </div>
    )
  }
}
