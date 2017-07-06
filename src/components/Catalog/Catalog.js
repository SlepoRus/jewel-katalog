import React from 'react';
import './Catalog.less';
import PropTypes from 'prop-types';
import InfiniteScroll from 'redux-infinite-scroll';
import { catalogRequest } from '../../redux/actions/catalog'

import {
  Image,
  Input } from '../lib';
import { connect } from 'react-redux';
var api = require('../../api').Jewelry;
const propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.any,
  search_text: PropTypes.any,
  rules: PropTypes.any,
};
class Catalog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingMore: false,
      catalog: [],
      offset: 0,
      hasMore: true,
      search_text: '',
    }
    this._loadMore = this._loadMore.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  _loadMore() {
    var { catalog, offset, value, search_text } = this.state;
    const OFFSET = 60;
    this.setState({ loadingMore: true });
    const tmp_text = search_text;
    setTimeout(() => {
      api.read({id:search_text, offset:offset}).then((val) => {
        if (val.data.length<1) {
          this.setState({ hasMore: false })
        }
        if (this.state.search_text == tmp_text)
          this.setState({ catalog:catalog.concat(val.data), offset:offset+OFFSET, loadingMore: false})
        else
          this.setState({ loadingMore: false})
      }).catch((err) => {
        console.log(err);
      });
    }, 500)

  }
  _renderCatalog() {
    return this.state.catalog && this.state.catalog.map((val,key) => {
      return <Image {...val} {...this.props} key={key}/>
    });
  }
  handleChange(e) {
    this.props.dispatch(catalogRequest(e.target.value));
  }
  handleSearch(e) {
    this.setState({ search_text: e , catalog:[], offset: 0, hasMore:true })
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.search_text !== this.props.search_text) {
      this.handleSearch(nextProps.search_text)
    }
  }
  render() {
    const { search_text,loadingMore } = this.state;
    return (
      <div className={'catalog'}>
        <div className={'catalog-search'} id="search">
          <Input placeholder={"Поиск..."} onChange={this.handleChange} value={ search_text }/>
        </div>
        <InfiniteScroll
            loadingMore = {this.state.loadingMore}
            hasMore = {this.state.hasMore}
            items = {this._renderCatalog()}
            elementIsScrollable={false}
            loader={<div><img src="../../../public/stuff/01-progress.gif" width={'120px'} /></div>}
            loadMore={this._loadMore} />
      </div>
    )
  }
}
Catalog.PropTypes = propTypes;

function mapStateToProps(state) {
  const { rules } = state.auth;
  const { search_text } = state.catalog;
  return { rules,search_text };
}

export default connect(mapStateToProps)(Catalog);
