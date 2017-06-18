import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import { changeBackground, callAsyncAction } from './actions';

export class App extends React.Component {
  static propTypes = {
    changeBackground: PropTypes.func.isRequired,
    callAsyncAction: PropTypes.func.isRequired,
    background: PropTypes.string.isRequired,
    requestStatus: PropTypes.string,
  }

  static defaultProps = {
    requestStatus: null,
  }

  render() {
    const { changeBackground, background, requestStatus, callAsyncAction } = this.props;
    return (
      <div className={styles.app_body}>
        <div className={styles.app_wrapper}>
          <h1>Sample app</h1>
          <div className={styles.wrapper}>
            <p>
              This is sample React component.
              Put your components in <code>/src/components/</code> directory.
            </p>
          </div>
          <div className={styles.wrapper}>
            <div className={styles.inner_wrapper} style={{ backgroundColor: background }}>
              <button className={styles.button} onClick={changeBackground}>Change color</button>
              <p>
                <b>Current color:</b>{background}
              </p>
              <button className={styles.button} onClick={callAsyncAction}>Call async action</button>
              { requestStatus && <p>{requestStatus}</p>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { background, requestStatus } = state.app;
  return {
    background,
    requestStatus,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    changeBackground,
    callAsyncAction,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
