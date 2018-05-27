import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import Board from 'react-trello';
import { Dropdown, Header, Segment } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  actionTasksChangeCategory,
  actionTasksFindTaskListRequest,
} from './actions';
import reducer, { initialState } from './reducer';
import saga from './saga';
import {
  makeSelectCategoryList,
  makeSelectActiveCategoryTaskList,
  makeSelectIsLoading,
} from './selectors';
import {
  mapCategoryListToDropdown,
  mapTaskListToReactTrello,
} from './helpers';
import { Card } from './components';


export class Tasks extends Component {
  static propTypes = {
    // DATA
    categoryList: PropTypes.array.isRequired,
    isLoading: PropTypes.bool,
    taskList: PropTypes.array.isRequired,

    // ACTIONS
    changeCategory: PropTypes.func.isRequired,
    requestTaskList: PropTypes.func.isRequired,
  }

  static defaultProps = {
    // DATA
    categoryList: [],
    isLoading: false,
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

  get dropdownProps() {
    const { categoryList } = this.props;

    return {
      onChange: this.handleCategoryChange,
      options: mapCategoryListToDropdown(categoryList),
      style: {
        paddingLeft: 8,
        zIndex: 9999,
      },
    };
  }

  get headerProps() {
    return {
      as: 'h1',
      style: {
        display: 'inline-block',
        marginTop: 12,
        marginLeft: 12,
        marginBottom: 4,
      },
    };
  }

  get segmentProps() {
    return {
      basic: true,
      loading: this.props.isLoading,
      style: {
        margin: 0,
        padding: 0,
      },
    };
  }

  handleCategoryChange = (evt, { value }) => {
    this.props.changeCategory({ categoryId: value });
  }

  render() {
    const {
      boardProps,
      dropdownProps,
      headerProps,
      segmentProps,
    } = this;

    return (
      <div>
        <Header {...headerProps} >Tasks for
          <Dropdown {...dropdownProps} />
        </Header>
        <Segment {...segmentProps} >
          <Board {...boardProps} >
            <Card />
          </Board>
        </Segment>
      </div>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  categoryList: makeSelectCategoryList(),
  isLoading: makeSelectIsLoading(),
  taskList: makeSelectActiveCategoryTaskList(),
});

function mapDispatchToProps(dispatch) {
  return {
    changeCategory: ({ categoryId }) => dispatch(actionTasksChangeCategory({ categoryId })),
    requestTaskList: () => dispatch(actionTasksFindTaskListRequest()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'tasks', reducer, initialState });
const withSaga = injectSaga({ key: 'tasks', saga });

export default compose(withReducer, withSaga, withConnect)(Tasks);
