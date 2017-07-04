import React from 'react';
import './Catalog.less';
import PropTypes from 'prop-types';
import InfiniteScroll from 'redux-infinite-scroll';
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
    }
    this._loadMore = this._loadMore.bind(this);
  }
  _loadMore() {
    var { catalog, offset } = this.state;
    const OFFSET = 60;
    this.setState({ loadingMore: true });
    setTimeout(() => {
      api.read({offset:offset}).then((val) => {
        if (val.data.length<1) {
          this.setState({ hasMore: false })
        }
        this.setState({ catalog:catalog.concat(val.data), offset:offset+OFFSET, loadingMore: false})
      }).catch((err) => {
        console.log(err);
      });
    },500)
  }
  _renderCatalog() {
    return this.state.catalog && this.state.catalog.map((val) => {
      return <Elem {...val} />
    });
  }
  render() {
    const { loading, error, catalog, offset } = this.props;
    return (
      <div className={'catalog'}>
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
  const { loading, errors, catalog, offset  } = state.catalog;
  return { loading, errors, catalog, offset };
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

export default Catalog;
