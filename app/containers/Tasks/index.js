import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { actionTasksFindTaskListRequest } from './actions';
import reducer, { initialState } from './reducer';
import saga from './saga';
import { makeSelectTaskList } from './selectors';


export class Tasks extends Component {
  static propTypes = {
    // DATA
    taskList: PropTypes.array.isRequired,

    // ACTIONS
    requestTaskList: PropTypes.func.isRequired,
  }

  static defaultProps = {
    // DATA
    taskList: [],
  }

  componentDidMount = () => {
    this.props.requestTaskList();
  }

  render() {
    const { taskList } = this.props;

    const tasks = taskList.map((task) => <li key={task.id}>{task.name}</li>);

    return (
      <div>
        <h1>Tasks</h1>
        <ul>
          {tasks}
        </ul>
      </div>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  taskList: makeSelectTaskList(),
});

function mapDispatchToProps(dispatch) {
  return {
    requestTaskList: () => dispatch(actionTasksFindTaskListRequest()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'tasks', reducer, initialState });
const withSaga = injectSaga({ key: 'tasks', saga });

export default compose(withReducer, withSaga, withConnect)(Tasks);
