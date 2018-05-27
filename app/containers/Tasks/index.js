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


export class Tasks extends Component {
  static propTypes = {
    // DATA
    categoryList: PropTypes.array.isRequired,
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
    return {
      draggabe: true,
      data: {
        lanes: [],
      },
    };
  }

  render() {
    return (
      <div>
        <h1>Tasks</h1>
        <Board {...this.boardProps} />
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
