import React from 'react';
import Modal from '../Modal';
export default class Elem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    }
    this.handleModal = this.handleModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.hotHideModal = this.hotHideModal.bind(this);
  }
  hideModal(e) {
    if (e.target.className=='modal-window' || e.target.className=='modal-close') {
      this.setState({modal:false});
    }
  }
  hotHideModal() {
    this.setState({modal:false});
  }
  handleModal() {
    this.setState({modal:true})
  }
  render() {
    const { MainLink, Article } = this.props;
    if ( MainLink !== undefined )
    return (
      <div style={{display:'inline-block',margin:'1px'}}>
        <div className={'catalog-elem'} onClick={this.handleModal}>
          <div className={'catalog-images'}>
          { MainLink.left ? (
            <div>
              <img src={ MainLink.left } width={"160px"}/>
              <img src={ MainLink.right } width={"160px"}/>
            </div>
          ) : (
            <img src={ MainLink } height={"240px"}/>
          )}
          </div>
          <p>{ Article }</p>
        </div>
        {this.state.modal ? (
          <Modal {...this.props} hideModal={this.hideModal} hotHideModal={this.hotHideModal}/>
        ) : ''}
      </div>
    )
    else return (<span></span>);
  }
}

Elem.defaultProps = {
  rules: {},
}
