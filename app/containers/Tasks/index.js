import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import Board from 'react-trello';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { actionTasksFindTaskListRequest } from './actions';
import reducer, { initialState } from './reducer';
import saga from './saga';
import {
  makeSelectCategoryList,
  makeSelectActiveCategoryTaskList,
} from './selectors';
import { mapTaskListToReactTrello } from './helpers';
import { Card } from './components';


export class Tasks extends Component {
  static propTypes = {
    // DATA
    // categoryList: PropTypes.array.isRequired,
    taskList: PropTypes.array.isRequired,

    // ACTIONS
    requestTaskList: PropTypes.func.isRequired,
  }

  static defaultProps = {
    // DATA
    categoryList: [],
    taskList: [],
  }

  componentDidMount = () => {
    this.props.requestTaskList();
  }

  get boardProps() {
    const { taskList } = this.props;

    return {
      customCardLayout: true,
      data: {
        lanes: mapTaskListToReactTrello(taskList),
      },
    };
  }

  render() {
    return (
      <div>
        <h1>Tasks</h1>
        <Board {...this.boardProps} >
          <Card />
        </Board>
      </div>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  categoryList: makeSelectCategoryList(),
  taskList: makeSelectActiveCategoryTaskList(),
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
