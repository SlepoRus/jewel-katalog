import React from 'react';
import './Catalog.less';
import PropTypes from 'prop-types';
import InfiniteScroll from 'redux-infinite-scroll';
import { Input } from '../lib';
import { connect } from 'react-redux';
var api = require('../../api').Jewelry;
const propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.any,
  catalog: PropTypes.any,
  offset: PropTypes.any,
};
class Catalog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingMore: false,
      catalog: [],
      offset: 0,
      hasMore: true,
      search_text: this.props.search_text,
    }
    this._loadMore = this._loadMore.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  _loadMore() {
    var { catalog, offset, value, search_text } = this.state;
    const OFFSET = 60;
    this.setState({ loadingMore: true });
      api.read({id:search_text, offset:offset}).then((val) => {
        if (val.data.length<1) {
          this.setState({ hasMore: false })
        }
        this.setState({ catalog:catalog.concat(val.data), offset:offset+OFFSET, loadingMore: false})
      }).catch((err) => {
        console.log(err);
      });
  }
  _renderCatalog() {
    return this.state.catalog && this.state.catalog.map((val) => {
      return <Elem {...val} {...this.props} />
    });
  }
  handleSearch(e) {
    const { value } = e.target;
    this.setState({ search_text: value , catalog:[], offset: 0, hasMore:true })
  }
  render() {
    const { search_text,loadingMore } = this.state;
    return (
      <div className={'catalog'}>
        <div className={'catalog-search'}>
          <Input placeholder={"Поиск..."} onChange={this.handleSearch} value={search_text}/>
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
const Elem = (props) => {
  if (props.MainLink !== undefined)
  return (
  <div className={'catalog-elem'}>
    <div className={'catalog-images'}>
    {props.MainLink.left ? (
      <div>
        <img src={props.MainLink.left} width={"160px"}/>
        <img src={props.MainLink.right} width={"160px"}/>
      </div>
    ) : (
      <img src={props.MainLink} width={"160px"}/>
    )}
    </div>
    <p>{props.Article}</p>
  </div>
  )
  else return (<span></span>);
}
Elem.defaultProps = {
  rules: {},
}
export default connect(mapStateToProps)(Catalog);
