import React from 'react';
import './Modal.less';
import { connect } from 'react-redux';
import { catalogRequest } from '../../../redux/actions/catalog';
import NavLink from 'react-router-dom/NavLink';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: this.props.MainLink,
      images: {
        left: this.props.MainLink.left ? this.props.MainLink.left : null,
        right: this.props.MainLink.right ? this.props.MainLink.right : null,
      },
      article: this.props.Range[0].clear ? this.props.Range[0].clear : this.props.Range[0].Article,
    }
  }
  handleChange(e) {

    if (this.state.images.left) {

      const { left, right } = e;
      this.setState({ images:{left:left,right:right },article: e.article})
    } else {
      this.setState({ image: e.image, article: e.article });
    }
  }
  handleGetResults(e) {
    this.props.hotHideModal();
    this.props.dispatch(catalogRequest(e.value))
  }
  render() {
    const { hideModal } = this.props;
    const { image,images, article } = this.state;
    return (
      <div className={'modal-window'} onClick={hideModal}>
        <div className={'modal-content'}>
          <div className={'modal-group'}>
            {images.left ? (
              <div className={'shadow-in'} style={{display:'inline-block'}}>
                <img src={images.left} className={'modal-double-images'}/>
                <img src={images.right} className={'modal-double-images'}/>
              </div>
            ) : (
              <div className={'shadow-in'} style={{display:'inline-block'}}>
                <img src={image} className={'modal-images'}/>
              </div>
            )}

            <div className={'modal-info'}>
              <label>
                Артикул
              </label>
              <span>{article}</span>
              <label>
                Комплекты
              </label>
              {this.props.Pare.map((val,key) => {
                return (<div key={key}><NavLink to="/catalog" onClick={this.handleGetResults.bind(this,{value:val.Article})}>{val.Article}</NavLink></div>)
              })}
            </div>
            <div className={'modal-close-fixer'}>
              <img src="/public/stuff/cross.png"  className={'modal-close'}/>
            </div>
          </div>
          <div style={{fontWeight:'bold',padding:'3px',textAlign:'center'}}>
            Разновидности:
          </div>

          <div className={'modal-range'}>
            {this.props.Range.map((val,key) => {
              if (val.left)
              return (
                <div key={key}
                className={'modal-range-double-images ' +(images.left==val.left.Image ? 'img-active' : 'img-notactive')} key={key} onClick={this.handleChange.bind(this,{left:val.left.Image,right:val.right.Image,article:val.clear})} style={{display:'inline-block'}}>
                  <img
                    src={val.left.Image}/>
                  <img
                    src={val.right.Image}/>
                </div>)
              else
              return (<img
                src={val.Image}
                className={'modal-range-images ' + (image==val.Image ? 'img-active' : 'img-notactive')}
                key={key}
                onClick={this.handleChange.bind(this,{image:val.Image,article:val.Article})}/>)
              })
            }
          </div>
        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  const { rules } = state.auth;
  const { search_text } = state.catalog;
  return { rules,search_text };
}

export default connect(mapStateToProps)(Modal);
